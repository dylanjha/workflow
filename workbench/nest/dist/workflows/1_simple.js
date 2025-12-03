/**__internal_workflows{"workflows":{"src/workflows/1_simple.ts":{"simple":{"workflowId":"workflow//src/workflows/1_simple.ts//simple"}}},"steps":{"src/workflows/1_simple.ts":{"add":{"stepId":"step//src/workflows/1_simple.ts//add"}}}}*/;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "simple", {
    enumerable: true,
    get: function() {
        return simple;
    }
});
async function add(a, b) {
    // Mimic a retryable error 50% of the time
    if (Math.random() < 0.5) {
        throw new Error('Retryable error');
    }
    // Mimic a 5% chance of the workflow actually failing
    if (Math.random() < 0.05) {
        throw new FatalError("We're cooked yo!");
    }
    return a + b;
}
async function simple(i) {
    throw new Error("You attempted to execute workflow simple function directly. To start a workflow, use start(simple) from workflow/api");
}
simple.workflowId = "workflow//src/workflows/1_simple.ts//simple";

//# sourceMappingURL=1_simple.js.map