import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { BaseBuilder } from '@workflow/builders';

const NORMALIZE_REQUEST_CONVERTER = `
async function normalizeRequestConverter(request) {
  const options = {
    method: request.method,
    headers: new Headers(request.headers)
  };
  if (!['GET', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT'].includes(request.method)) {
    options.body = await request.arrayBuffer();
  }
  return new Request(request.url, options);
}
`;

export class LocalBuilder extends BaseBuilder {
  constructor() {
    super({
      dirs: ['.'],
      buildTarget: 'react-router' as const,
      stepsBundlePath: '',
      workflowsBundlePath: '',
      webhookBundlePath: '',
      workingDir: process.cwd(),
    });
  }

  override async build(): Promise<void> {
    const workflowGeneratedDir = resolve(
      this.config.workingDir,
      'app/routes/.workflow'
    );

    await mkdir(workflowGeneratedDir, { recursive: true });

    if (process.env.VERCEL_DEPLOYMENT_ID === undefined) {
      await writeFile(join(workflowGeneratedDir, '.gitignore'), '*');
    }

    const inputFiles = await this.getInputFiles();
    const tsConfig = await this.getTsConfigOptions();

    const options = {
      inputFiles,
      workflowGeneratedDir,
      tsBaseUrl: tsConfig.baseUrl,
      tsPaths: tsConfig.paths,
    };

    await this.buildStepsRoute(options);
    await this.buildWorkflowsRoute(options);
    await this.buildWebhookRoute({ workflowGeneratedDir });
  }

  private async buildStepsRoute({
    inputFiles,
    workflowGeneratedDir,
    tsPaths,
    tsBaseUrl,
  }: {
    inputFiles: string[];
    workflowGeneratedDir: string;
    tsBaseUrl?: string;
    tsPaths?: Record<string, string[]>;
  }) {
    // 1. Generate implementation file (step-impl.ts)
    const stepsImplFile = join(workflowGeneratedDir, 'step-impl.ts');
    await this.createStepsBundle({
      format: 'esm',
      inputFiles,
      outfile: stepsImplFile,
      externalizeNonSteps: true,
      tsBaseUrl,
      tsPaths,
    });

    // Modify step-impl.ts to export handleRequest instead of POST
    let implContent = await readFile(stepsImplFile, 'utf-8');
    // Handle both bundled format: `export { stepEntrypoint as POST };`
    // and re-export format: `export { stepEntrypoint as POST } from 'workflow/runtime';`
    implContent = implContent.replace(
      /export\s*\{\s*stepEntrypoint\s+as\s+POST\s*\}[^;]*;?/gm,
      'export const handleRequest = stepEntrypoint;'
    );
    await writeFile(stepsImplFile, implContent);

    // 2. Generate thin route wrapper (step.ts) with dynamic import
    const stepsRouteFile = join(workflowGeneratedDir, 'step.ts');
    const routeContent = `// biome-ignore-all lint: generated file
/* eslint-disable */
// Thin route wrapper - uses dynamic import to avoid Node.js imports at top level
${NORMALIZE_REQUEST_CONVERTER}
export async function action({ request }: { request: Request }) {
  const impl = await import("./step-impl");
  const normalRequest = await normalizeRequestConverter(request);
  return impl.handleRequest(normalRequest);
}
`;
    await writeFile(stepsRouteFile, routeContent);
  }

  private async buildWorkflowsRoute({
    inputFiles,
    workflowGeneratedDir,
    tsPaths,
    tsBaseUrl,
  }: {
    inputFiles: string[];
    workflowGeneratedDir: string;
    tsBaseUrl?: string;
    tsPaths?: Record<string, string[]>;
  }) {
    // 1. Generate implementation file (flow-impl.ts)
    const flowImplFile = join(workflowGeneratedDir, 'flow-impl.ts');
    await this.createWorkflowsBundle({
      format: 'esm',
      outfile: flowImplFile,
      bundleFinalOutput: false,
      inputFiles,
      tsBaseUrl,
      tsPaths,
    });

    // Modify flow-impl.ts to export handleRequest instead of POST
    let implContent = await readFile(flowImplFile, 'utf-8');
    implContent = implContent.replace(
      /export const POST = workflowEntrypoint\(workflowCode\);?$/m,
      'export const handleRequest = workflowEntrypoint(workflowCode);'
    );
    await writeFile(flowImplFile, implContent);

    // 2. Generate thin route wrapper (flow.ts) with dynamic import
    const flowRouteFile = join(workflowGeneratedDir, 'flow.ts');
    const routeContent = `// biome-ignore-all lint: generated file
/* eslint-disable */
// Thin route wrapper - uses dynamic import to avoid Node.js imports at top level
${NORMALIZE_REQUEST_CONVERTER}
export async function action({ request }: { request: Request }) {
  const impl = await import("./flow-impl");
  const normalRequest = await normalizeRequestConverter(request);
  return impl.handleRequest(normalRequest);
}
`;
    await writeFile(flowRouteFile, routeContent);
  }

  private async buildWebhookRoute({
    workflowGeneratedDir,
  }: {
    workflowGeneratedDir: string;
  }) {
    // 1. Generate implementation file (webhook/[token]-impl.ts)
    const webhookImplFile = join(
      workflowGeneratedDir,
      'webhook/[token]-impl.ts'
    );

    await this.createWebhookBundle({
      outfile: webhookImplFile,
      bundle: false,
    });

    let implContent = await readFile(webhookImplFile, 'utf-8');

    // Modify handler to accept token as parameter instead of extracting from URL
    implContent = implContent.replace(
      /async function handler\(request\) \{[\s\S]*?const token = decodeURIComponent\(pathParts\[pathParts\.length - 1\]\);/,
      `async function handler(request, token) {`
    );

    implContent = implContent.replace(
      /const url = new URL\(request\.url\);[\s\S]*?const pathParts = url\.pathname\.split\('\/'\);[\s\S]*?\n/,
      ''
    );

    // Replace HTTP method exports with a single handleRequest export
    implContent = implContent.replace(
      /export const GET = handler;\nexport const POST = handler;\nexport const PUT = handler;\nexport const PATCH = handler;\nexport const DELETE = handler;\nexport const HEAD = handler;\nexport const OPTIONS = handler;/,
      'export const handleRequest = handler;'
    );

    await writeFile(webhookImplFile, implContent);

    // 2. Generate thin route wrapper (webhook/[token].ts) with dynamic import
    const webhookRouteFile = join(workflowGeneratedDir, 'webhook/[token].ts');
    const routeContent = `// biome-ignore-all lint: generated file
/* eslint-disable */
// Thin route wrapper - uses dynamic import to avoid Node.js imports at top level
${NORMALIZE_REQUEST_CONVERTER}
// react-router uses loader for GET requests and action for mutations
export async function loader({ request, params }: { request: Request; params: { token: string } }) {
  const impl = await import("./[token]-impl");
  const normalRequest = await normalizeRequestConverter(request);
  return impl.handleRequest(normalRequest, params.token);
}

export async function action({ request, params }: { request: Request; params: { token: string } }) {
  const impl = await import("./[token]-impl");
  const normalRequest = await normalizeRequestConverter(request);
  return impl.handleRequest(normalRequest, params.token);
}
`;
    await writeFile(webhookRouteFile, routeContent);
  }
}
