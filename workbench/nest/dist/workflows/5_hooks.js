/**__internal_workflows{"workflows":{"src/workflows/5_hooks.ts":{"withCreateHook":{"workflowId":"workflow//src/workflows/5_hooks.ts//withCreateHook"},"withWorkflowMetadata":{"workflowId":"workflow//src/workflows/5_hooks.ts//withWorkflowMetadata"}}},"steps":{"src/workflows/5_hooks.ts":{"getOpenAIResponse":{"stepId":"step//src/workflows/5_hooks.ts//getOpenAIResponse"},"initiateOpenAIResponse":{"stepId":"step//src/workflows/5_hooks.ts//initiateOpenAIResponse"},"stepWithGetMetadata":{"stepId":"step//src/workflows/5_hooks.ts//stepWithGetMetadata"}}}}*/;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    withCreateHook: function() {
        return withCreateHook;
    },
    withWorkflowMetadata: function() {
        return withWorkflowMetadata;
    }
});
/**
 * `getStepMetadata()` is a hook that allows you to access the step's context
 * of the current workflow run.
 *
 * It is useful for accessing the context of the current workflow run, such as
 * the workflow run ID, the workflow started at, and the attempt number.
 */ async function stepWithGetMetadata() {
    const ctx = getStepMetadata();
    console.log('step context', ctx);
    // Mimic a retryable error 50% of the time (so that the `attempt` counter increases)
    if (Math.random() < 0.5) {
        throw new Error('Retryable error');
    }
    return ctx;
}
async function withWorkflowMetadata() {
    throw new Error("You attempted to execute workflow withWorkflowMetadata function directly. To start a workflow, use start(withWorkflowMetadata) from workflow/api");
}
withWorkflowMetadata.workflowId = "workflow//src/workflows/5_hooks.ts//withWorkflowMetadata";
async function initiateOpenAIResponse() {
    const openai = new OpenAI();
    const resp = await openai.responses.create({
        model: 'o3',
        input: 'Write a very long novel about otters in space.',
        background: true
    });
    console.log('OpenAI response:', resp);
    return resp.id;
}
async function getOpenAIResponse(respId) {
    const openai = new OpenAI();
    const resp = await openai.responses.retrieve(respId);
    return resp.output_text;
}
async function withCreateHook() {
    throw new Error("You attempted to execute workflow withCreateHook function directly. To start a workflow, use start(withCreateHook) from workflow/api");
}
withCreateHook.workflowId = "workflow//src/workflows/5_hooks.ts//withCreateHook";

//# sourceMappingURL=5_hooks.js.map