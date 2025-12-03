// Benchmark workflows for performance testing
/**__internal_workflows{"workflows":{"src/workflows/97_bench.ts":{"noStepsWorkflow":{"workflowId":"workflow//src/workflows/97_bench.ts//noStepsWorkflow"},"oneStepWorkflow":{"workflowId":"workflow//src/workflows/97_bench.ts//oneStepWorkflow"},"streamWorkflow":{"workflowId":"workflow//src/workflows/97_bench.ts//streamWorkflow"},"tenParallelStepsWorkflow":{"workflowId":"workflow//src/workflows/97_bench.ts//tenParallelStepsWorkflow"},"tenSequentialStepsWorkflow":{"workflowId":"workflow//src/workflows/97_bench.ts//tenSequentialStepsWorkflow"}}},"steps":{"src/workflows/97_bench.ts":{"doWork":{"stepId":"step//src/workflows/97_bench.ts//doWork"},"doubleNumbers":{"stepId":"step//src/workflows/97_bench.ts//doubleNumbers"},"genBenchStream":{"stepId":"step//src/workflows/97_bench.ts//genBenchStream"}}}}*/;
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
    noStepsWorkflow: function() {
        return noStepsWorkflow;
    },
    oneStepWorkflow: function() {
        return oneStepWorkflow;
    },
    streamWorkflow: function() {
        return streamWorkflow;
    },
    tenParallelStepsWorkflow: function() {
        return tenParallelStepsWorkflow;
    },
    tenSequentialStepsWorkflow: function() {
        return tenSequentialStepsWorkflow;
    }
});
async function doWork() {
    return 42;
}
async function noStepsWorkflow(input) {
    throw new Error("You attempted to execute workflow noStepsWorkflow function directly. To start a workflow, use start(noStepsWorkflow) from workflow/api");
}
noStepsWorkflow.workflowId = "workflow//src/workflows/97_bench.ts//noStepsWorkflow";
async function oneStepWorkflow(input) {
    throw new Error("You attempted to execute workflow oneStepWorkflow function directly. To start a workflow, use start(oneStepWorkflow) from workflow/api");
}
oneStepWorkflow.workflowId = "workflow//src/workflows/97_bench.ts//oneStepWorkflow";
async function tenSequentialStepsWorkflow() {
    throw new Error("You attempted to execute workflow tenSequentialStepsWorkflow function directly. To start a workflow, use start(tenSequentialStepsWorkflow) from workflow/api");
}
tenSequentialStepsWorkflow.workflowId = "workflow//src/workflows/97_bench.ts//tenSequentialStepsWorkflow";
async function tenParallelStepsWorkflow() {
    throw new Error("You attempted to execute workflow tenParallelStepsWorkflow function directly. To start a workflow, use start(tenParallelStepsWorkflow) from workflow/api");
}
tenParallelStepsWorkflow.workflowId = "workflow//src/workflows/97_bench.ts//tenParallelStepsWorkflow";
// Step that generates a stream with 10 chunks
async function genBenchStream() {
    const encoder = new TextEncoder();
    return new ReadableStream({
        async start (controller) {
            for(let i = 0; i < 10; i++){
                controller.enqueue(encoder.encode(`${i}\n`));
                // Small delay to avoid synchronous close issues on local world
                await new Promise((resolve)=>setTimeout(resolve, 10));
            }
            controller.close();
        }
    });
}
// Step that transforms a stream by doubling each number
async function doubleNumbers(stream) {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const transformStream = new TransformStream({
        transform (chunk, controller) {
            const text = decoder.decode(chunk, {
                stream: true
            });
            const lines = text.split('\n');
            for (const line of lines){
                if (line.trim()) {
                    const num = parseInt(line, 10);
                    controller.enqueue(encoder.encode(`${num * 2}\n`));
                }
            }
        }
    });
    return stream.pipeThrough(transformStream);
}
async function streamWorkflow() {
    throw new Error("You attempted to execute workflow streamWorkflow function directly. To start a workflow, use start(streamWorkflow) from workflow/api");
}
streamWorkflow.workflowId = "workflow//src/workflows/97_bench.ts//streamWorkflow";

//# sourceMappingURL=97_bench.js.map