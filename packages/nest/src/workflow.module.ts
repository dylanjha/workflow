import {
  type DynamicModule,
  Module,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@nestjs/common';
import { NestJSBuilder } from './builder.js';
import { WorkflowController } from './workflow.controller.js';
import { createBuildQueue } from '@workflow/builders';

const enqueue = createBuildQueue();
const builder = new NestJSBuilder();

@Module({})
export class WorkflowModule implements OnModuleInit, OnModuleDestroy {
  static forRoot(): DynamicModule {
    return {
      module: WorkflowModule,
      controllers: [WorkflowController],
      providers: [{ provide: 'WORKFLOW_OPTIONS', useValue: {} }],
      global: true,
    };
  }

  static async build() {
    await enqueue(() => builder.build());
  }

  async onModuleInit() {
    await enqueue(() => builder.build());
  }

  async onModuleDestroy() {
    // Cleanup if needed
  }
}
