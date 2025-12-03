import { All, Controller, Post, Req, Res } from '@nestjs/common';
import { join } from 'pathe';

@Controller('.well-known/workflow/v1')
export class WorkflowController {
  private getOutDir() {
    return join(process.cwd(), '.nestjs/workflow');
  }

  @Post('step')
  async handleStep(@Req() req: any, @Res() res: any) {
    const { POST } = await import(join(this.getOutDir(), 'steps.mjs'));
    const webRequest = this.toWebRequest(req);
    const webResponse = await POST(webRequest);
    await this.sendWebResponse(res, webResponse);
  }

  @Post('flow')
  async handleFlow(@Req() req: any, @Res() res: any) {
    const { POST } = await import(join(this.getOutDir(), 'workflows.mjs'));
    const webRequest = this.toWebRequest(req);
    const webResponse = await POST(webRequest);
    await this.sendWebResponse(res, webResponse);
  }

  @All('webhook/:token')
  async handleWebhook(@Req() req: any, @Res() res: any) {
    const { POST } = await import(join(this.getOutDir(), 'webhook.mjs'));
    const webRequest = this.toWebRequest(req);
    const webResponse = await POST(webRequest);
    await this.sendWebResponse(res, webResponse);
  }

  private toWebRequest(req: any): Request {
    // Works for both Express and Fastify
    const protocol =
      req.protocol ?? (req.raw?.socket?.encrypted ? 'https' : 'http');
    const host = req.hostname ?? req.headers.host;
    const url = req.originalUrl ?? req.url;
    const fullUrl = `${protocol}://${host}${url}`;

    // Fastify uses req.raw for the underlying Node request
    const headers = req.headers;
    const method = req.method;
    const body = req.body;

    return new globalThis.Request(fullUrl, {
      method,
      headers,
      body:
        method !== 'GET' && method !== 'HEAD'
          ? JSON.stringify(body)
          : undefined,
    });
  }

  private async sendWebResponse(res: any, webResponse: globalThis.Response) {
    // Works for both Express and Fastify
    const status = webResponse.status;
    const headers: Record<string, string> = {};
    webResponse.headers.forEach((value, key) => {
      headers[key] = value;
    });
    const body = await webResponse.text();

    // Express: res.status().set().send()
    // Fastify: res.code().headers().send()
    if (typeof res.code === 'function') {
      // Fastify
      res.code(status).headers(headers).send(body);
    } else {
      // Express
      res.status(status);
      Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.send(body);
    }
  }
}
