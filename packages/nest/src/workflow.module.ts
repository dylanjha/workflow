import {
  type DynamicModule,
  Module,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@nestjs/common';
import { NestJSBuilder } from './builder.js';
import { WorkflowController } from './workflow.controller.js';

export interface WorkflowModuleOptions {
  watch?: boolean;
}

@Module({})
export class WorkflowModule implements OnModuleInit, OnModuleDestroy {
  private builder: NestJSBuilder | null = null;
  private options: WorkflowModuleOptions;

  constructor() {
    this.options = {};
  }

  static forRoot(options: WorkflowModuleOptions = {}): DynamicModule {
    return {
      module: WorkflowModule,
      controllers: [WorkflowController],
      providers: [{ provide: 'WORKFLOW_OPTIONS', useValue: options }],
      global: true,
    };
  }

  async onModuleInit() {
    const isDev = process.env.NODE_ENV !== 'production';
    this.builder = new NestJSBuilder({
      rootDir: process.cwd(),
      watch: this.options.watch ?? isDev,
      dirs: ['src'],
    });
    await this.builder.build();
  }

  async onModuleDestroy() {
    // Cleanup watch mode if needed
  }
}
