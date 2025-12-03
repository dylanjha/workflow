import {
  type DynamicModule,
  Module,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@nestjs/common';
import { NestJSBuilder } from './builder.js';
import { WorkflowController } from './workflow.controller.js';

@Module({})
export class WorkflowModule implements OnModuleInit, OnModuleDestroy {
  private builder: NestJSBuilder | null = null;

  static forRoot(): DynamicModule {
    return {
      module: WorkflowModule,
      controllers: [WorkflowController],
      providers: [{ provide: 'WORKFLOW_OPTIONS', useValue: {} }],
      global: true,
    };
  }

  async onModuleInit() {
    this.builder = new NestJSBuilder();
    await this.builder.build();
  }

  async onModuleDestroy() {
    // Cleanup watch mode if needed
  }
}
