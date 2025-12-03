import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { getHookByToken, getRun, resumeHook, start } from 'workflow/api';
import {
  WorkflowRunFailedError,
  WorkflowRunNotCompletedError,
} from 'workflow/internal/errors';
import { hydrateWorkflowArguments } from 'workflow/internal/serialization';
import { allWorkflows } from './lib/_workflow.js';

@Controller('api')
export class AppController {
  @Post('hook')
  async resumeWorkflowHook(@Body() body: { token: string; data: any }) {
    const { token, data } = body;

    let hook: Awaited<ReturnType<typeof getHookByToken>>;
    try {
      hook = await getHookByToken(token);
      console.log('hook', hook);
    } catch (error) {
      console.log('error during getHookByToken', error);
      // TODO: `WorkflowAPIError` is not exported, so for now
      // we'll return 422 assuming it's the "invalid" token test case
      // NOTE: Need to return 422 because Nitro passes 404 requests to the dev server to handle.
      throw new HttpException(null, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await resumeHook(hook.token, {
      ...data,
      // @ts-expect-error metadata is not typed
      customData: hook.metadata?.customData,
    });

    return hook;
  }

  @Post('trigger')
  async startWorkflowRun(
    @Query('workflowFile') workflowFile: string = 'workflows/99_e2e.ts',
    @Query('workflowFn') workflowFn: string = 'simple',
    @Query('args') argsParam: string | undefined,
    @Body() bodyData: any
  ) {
    if (!workflowFile) {
      throw new HttpException(
        'No workflowFile query parameter provided',
        HttpStatus.BAD_REQUEST
      );
    }
    const workflows = allWorkflows[workflowFile as keyof typeof allWorkflows];
    if (!workflows) {
      throw new HttpException(
        `Workflow file "${workflowFile}" not found`,
        HttpStatus.BAD_REQUEST
      );
    }

    if (!workflowFn) {
      throw new HttpException(
        'No workflow query parameter provided',
        HttpStatus.BAD_REQUEST
      );
    }
    const workflow = workflows[workflowFn as keyof typeof workflows];
    if (!workflow) {
      throw new HttpException(
        `Workflow "${workflowFn}" not found`,
        HttpStatus.BAD_REQUEST
      );
    }

    let args: any[] = [];

    // Args from query string
    if (argsParam) {
      args = argsParam.split(',').map((arg) => {
        const num = parseFloat(arg);
        return Number.isNaN(num) ? arg.trim() : num;
      });
    } else if (bodyData && Object.keys(bodyData).length > 0) {
      // Args from body
      args = hydrateWorkflowArguments(bodyData, globalThis);
    } else {
      args = [42];
    }
    console.log(`Starting "${workflowFn}" workflow with args: ${args}`);

    try {
      const run = await start(workflow as any, args as any);
      console.log('Run:', run);
      return run;
    } catch (err) {
      console.error(`Failed to start!!`, err);
      throw err;
    }
  }

  @Get('trigger')
  async getWorkflowRunResult(
    @Query('runId') runId: string | undefined,
    @Query('output-stream') outputStreamParam: string | undefined,
    @Res() res: Response
  ) {
    if (!runId) {
      throw new HttpException('No runId provided', HttpStatus.BAD_REQUEST);
    }

    if (outputStreamParam) {
      const namespace =
        outputStreamParam === '1' ? undefined : outputStreamParam;
      const run = getRun(runId);
      const stream = run.getReadable({
        namespace,
      });
      // Add JSON framing to the stream, wrapping binary data in base64
      const streamWithFraming = new TransformStream({
        transform(chunk, controller) {
          const data =
            chunk instanceof Uint8Array
              ? { data: Buffer.from(chunk).toString('base64') }
              : chunk;
          controller.enqueue(`${JSON.stringify(data)}\n`);
        },
      });

      res.setHeader('Content-Type', 'application/octet-stream');
      const readableStream = stream.pipeThrough(streamWithFraming);
      const reader = readableStream.getReader();

      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }
        res.write(value);
        await pump();
      };
      await pump();
      return;
    }

    try {
      const run = getRun(runId);
      const returnValue = await run.returnValue;
      console.log('Return value:', returnValue);

      // Include run metadata in headers
      const [createdAt, startedAt, completedAt] = await Promise.all([
        run.createdAt,
        run.startedAt,
        run.completedAt,
      ]);

      res.setHeader(
        'X-Workflow-Run-Created-At',
        createdAt?.toISOString() || ''
      );
      res.setHeader(
        'X-Workflow-Run-Started-At',
        startedAt?.toISOString() || ''
      );
      res.setHeader(
        'X-Workflow-Run-Completed-At',
        completedAt?.toISOString() || ''
      );

      if (returnValue instanceof ReadableStream) {
        res.setHeader('Content-Type', 'application/octet-stream');
        const reader = returnValue.getReader();
        const pump = async () => {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            return;
          }
          res.write(value);
          await pump();
        };
        await pump();
        return;
      }

      return res.json(returnValue);
    } catch (error) {
      if (error instanceof Error) {
        if (WorkflowRunNotCompletedError.is(error)) {
          return res.status(HttpStatus.ACCEPTED).json({
            ...error,
            name: error.name,
            message: error.message,
          });
        }

        if (WorkflowRunFailedError.is(error)) {
          const cause = error.cause as any;
          return res.status(HttpStatus.BAD_REQUEST).json({
            ...error,
            name: error.name,
            message: error.message,
            cause: {
              message: cause.message,
              stack: cause.stack,
              code: cause.code,
            },
          });
        }
      }

      console.error(
        'Unexpected error while getting workflow return value:',
        error
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error',
      });
    }
  }

  @Post('test-direct-step-call')
  async invokeStepDirectly(@Body() body: { x: number; y: number }) {
    // This route tests calling step functions directly outside of any workflow context
    // After the SWC compiler changes, step functions in client mode have their directive removed
    // and keep their original implementation, allowing them to be called as regular async functions
    const { add } = await import('./workflows/99_e2e.js');

    const { x, y } = body;

    console.log(`Calling step function directly with x=${x}, y=${y}`);

    // Call step function directly as a regular async function (no workflow context)
    const result = await add(x, y);
    console.log(`add(${x}, ${y}) = ${result}`);

    return { result };
  }
}
