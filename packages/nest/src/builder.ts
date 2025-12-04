import { BaseBuilder, createBaseBuilderConfig } from '@workflow/builders';
import { join } from 'pathe';
import { mkdir, writeFile } from 'node:fs/promises';

export class NestJSBuilder extends BaseBuilder {
  #outDir: string;

  constructor() {
    const workingDir = process.cwd();
    const outDir = join(workingDir, '.nestjs/workflow');
    super({
      ...createBaseBuilderConfig({
        workingDir: workingDir,
        dirs: ['src'],
      }),
      buildTarget: 'nest',
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

    if (process.env.VERCEL_DEPLOYMENT_ID === undefined) {
      await writeFile(join(this.#outDir, '.gitignore'), '*');
    }
  }
}
