import { route, type RouteConfigEntry } from '@react-router/dev/routes';

export function workflowRoutes(): RouteConfigEntry[] {
  return [
    route('.well-known/workflow/v1/flow', '../.workflow/flow.ts'),
    route('.well-known/workflow/v1/step', '../.workflow/step.ts'),
    route(
      '.well-known/workflow/v1/webhook/:token',
      '../.workflow/webhook/[token].ts'
    ),
  ];
}
