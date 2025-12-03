/**__internal_workflows{"workflows":{"src/workflows/2_control_flow.ts":{"control_flow":{"workflowId":"workflow//src/workflows/2_control_flow.ts//control_flow"}}},"steps":{"src/workflows/2_control_flow.ts":{"add":{"stepId":"step//src/workflows/2_control_flow.ts//add"},"delayedMessage":{"stepId":"step//src/workflows/2_control_flow.ts//delayedMessage"},"failingStep":{"stepId":"step//src/workflows/2_control_flow.ts//failingStep"},"retryableStep":{"stepId":"step//src/workflows/2_control_flow.ts//retryableStep"}}}}*/;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "control_flow", {
    enumerable: true,
    get: function() {
        return control_flow;
    }
});
async function delayedMessage(ms, message) {
    console.log(`Sleeping for ${ms}ms and returning ${message}`);
    await new Promise((resolve)=>setTimeout(resolve, ms));
    return `${message} (sent: ${new Date().toISOString()})`;
}
async function add(a, b) {
    console.log(`Adding ${a} and ${b} (sent: ${new Date().toISOString()})`);
    return a + b;
}
async function failingStep() {
    throw new FatalError(`A failed step (sent: ${new Date().toISOString()})`);
}
async function retryableStep() {
    const { attempt } = getStepMetadata();
    console.log('retryableStep attempt:', attempt);
    if (attempt === 1) {
        console.log('Throwing retryable error - this will be retried after 5 seconds');
        throw new RetryableError('Retryable error', {
            // Retry after 5 seconds
            retryAfter: '5s'
        });
    }
    console.log('Completing successfully');
    return 'Success';
}
async function control_flow() {
    throw new Error("You attempted to execute workflow control_flow function directly. To start a workflow, use start(control_flow) from workflow/api");
}
control_flow.workflowId = "workflow//src/workflows/2_control_flow.ts//control_flow";

//# sourceMappingURL=2_control_flow.js.map