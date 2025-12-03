/**__internal_workflows{"workflows":{"src/workflows/6_batching.ts":{"batchInStep":{"workflowId":"workflow//src/workflows/6_batching.ts//batchInStep"},"batchOverSteps":{"workflowId":"workflow//src/workflows/6_batching.ts//batchOverSteps"}}},"steps":{"src/workflows/6_batching.ts":{"logItem":{"stepId":"step//src/workflows/6_batching.ts//logItem"},"processItems":{"stepId":"step//src/workflows/6_batching.ts//processItems"}}}}*/;
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
    batchInStep: function() {
        return batchInStep;
    },
    batchOverSteps: function() {
        return batchOverSteps;
    }
});
async function batchOverSteps() {
    throw new Error("You attempted to execute workflow batchOverSteps function directly. To start a workflow, use start(batchOverSteps) from workflow/api");
}
batchOverSteps.workflowId = "workflow//src/workflows/6_batching.ts//batchOverSteps";
async function logItem(item) {
    console.log(item, Date.now());
}
async function batchInStep() {
    throw new Error("You attempted to execute workflow batchInStep function directly. To start a workflow, use start(batchInStep) from workflow/api");
}
batchInStep.workflowId = "workflow//src/workflows/6_batching.ts//batchInStep";
/**
 * Step function that processes a batch of items with internal parallelism.
 * Called once per batch, with all items processed in parallel inside the step.
 */ async function processItems(items) {
    await Promise.all(items.map(async (item)=>{
        console.log(item, Date.now());
    }));
}

//# sourceMappingURL=6_batching.js.map