import { BaseBuilder, createBaseBuilderConfig } from '@workflow/builders';
import { join } from 'pathe';
import { mkdir } from 'node:fs/promises';

export interface NestJSBuilderOptions {
  rootDir: string;
  watch?: boolean;
  dirs?: string[];
}

export class NestJSBuilder extends BaseBuilder {
  #outDir: string;

  constructor(options: NestJSBuilderOptions) {
    const outDir = join(options.rootDir, '.nestjs/workflow');
    super({
      ...createBaseBuilderConfig({
        workingDir: options.rootDir,
        watch: options.watch,
        dirs: options.dirs ?? ['workflows', 'src/workflows'],
      }),
      buildTarget: 'next', // Reuse next target format
    });
    this.#outDir = outDir;
  }

  async build() {
    const inputFiles = await this.getInputFiles();
    await mkdir(this.#outDir, { recursive: true });

    await this.createWorkflowsBundle({
      outfile: join(this.#outDir, 'workflows.mjs'),
      bundleFinalOutput: false,
      format: 'esm',
      inputFiles,
    });

    await this.createStepsBundle({
      outfile: join(this.#outDir, 'steps.mjs'),
      externalizeNonSteps: true,
      format: 'esm',
      inputFiles,
    });

    await this.createWebhookBundle({
      outfile: join(this.#outDir, 'webhook.mjs'),
      bundle: false,
    });
  }
}
