// Duplicate workflow from 99_e2e.ts to ensure we handle unique IDs
// and the function isn't dropped from colliding export names
/**__internal_workflows{"workflows":{"src/workflows/98_duplicate_case.ts":{"addTenWorkflow":{"workflowId":"workflow//src/workflows/98_duplicate_case.ts//addTenWorkflow"}}},"steps":{"src/workflows/98_duplicate_case.ts":{"add":{"stepId":"step//src/workflows/98_duplicate_case.ts//add"}}}}*/;
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
    add: function() {
        return add;
    },
    addTenWorkflow: function() {
        return addTenWorkflow;
    }
});
async function addTenWorkflow(input) {
    throw new Error("You attempted to execute workflow addTenWorkflow function directly. To start a workflow, use start(addTenWorkflow) from workflow/api");
}
addTenWorkflow.workflowId = "workflow//src/workflows/98_duplicate_case.ts//addTenWorkflow";
async function add(a, b) {
    return a + b;
}

//# sourceMappingURL=98_duplicate_case.js.map