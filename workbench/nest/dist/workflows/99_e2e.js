/**__internal_workflows{"workflows":{"src/workflows/99_e2e.ts":{"addTenWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//addTenWorkflow"},"childWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//childWorkflow"},"closureVariableWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//closureVariableWorkflow"},"crossFileErrorWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//crossFileErrorWorkflow"},"fetchWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//fetchWorkflow"},"hookCleanupTestWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//hookCleanupTestWorkflow"},"hookWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//hookWorkflow"},"nestedErrorWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//nestedErrorWorkflow"},"nullByteWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//nullByteWorkflow"},"outputStreamInsideStepWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//outputStreamInsideStepWorkflow"},"outputStreamWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//outputStreamWorkflow"},"promiseAllWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//promiseAllWorkflow"},"promiseAnyWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//promiseAnyWorkflow"},"promiseRaceStressTestWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//promiseRaceStressTestWorkflow"},"promiseRaceWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//promiseRaceWorkflow"},"readableStreamWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//readableStreamWorkflow"},"retryAttemptCounterWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//retryAttemptCounterWorkflow"},"retryableAndFatalErrorWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//retryableAndFatalErrorWorkflow"},"sleepingWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//sleepingWorkflow"},"spawnWorkflowFromStepWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//spawnWorkflowFromStepWorkflow"},"stepFunctionPassingWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//stepFunctionPassingWorkflow"},"stepFunctionWithClosureWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//stepFunctionWithClosureWorkflow"},"webhookWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//webhookWorkflow"},"workflowAndStepMetadataWorkflow":{"workflowId":"workflow//src/workflows/99_e2e.ts//workflowAndStepMetadataWorkflow"}}},"steps":{"src/workflows/99_e2e.ts":{"add":{"stepId":"step//src/workflows/99_e2e.ts//add"},"awaitWorkflowResult":{"stepId":"step//src/workflows/99_e2e.ts//awaitWorkflowResult"},"doubleNumber":{"stepId":"step//src/workflows/99_e2e.ts//doubleNumber"},"doubleValue":{"stepId":"step//src/workflows/99_e2e.ts//doubleValue"},"genReadableStream":{"stepId":"step//src/workflows/99_e2e.ts//genReadableStream"},"nullByteStep":{"stepId":"step//src/workflows/99_e2e.ts//nullByteStep"},"promiseRaceStressTestDelayStep":{"stepId":"step//src/workflows/99_e2e.ts//promiseRaceStressTestDelayStep"},"randomDelay":{"stepId":"step//src/workflows/99_e2e.ts//randomDelay"},"sendWebhookResponse":{"stepId":"step//src/workflows/99_e2e.ts//sendWebhookResponse"},"spawnChildWorkflow":{"stepId":"step//src/workflows/99_e2e.ts//spawnChildWorkflow"},"specificDelay":{"stepId":"step//src/workflows/99_e2e.ts//specificDelay"},"stepCloseOutputStream":{"stepId":"step//src/workflows/99_e2e.ts//stepCloseOutputStream"},"stepCloseOutputStreamInsideStep":{"stepId":"step//src/workflows/99_e2e.ts//stepCloseOutputStreamInsideStep"},"stepThatCallsStepFn":{"stepId":"step//src/workflows/99_e2e.ts//stepThatCallsStepFn"},"stepThatFails":{"stepId":"step//src/workflows/99_e2e.ts//stepThatFails"},"stepThatRetriesAndSucceeds":{"stepId":"step//src/workflows/99_e2e.ts//stepThatRetriesAndSucceeds"},"stepThatThrowsRetryableError":{"stepId":"step//src/workflows/99_e2e.ts//stepThatThrowsRetryableError"},"stepWithMetadata":{"stepId":"step//src/workflows/99_e2e.ts//stepWithMetadata"},"stepWithNamedOutputStreamInsideStep":{"stepId":"step//src/workflows/99_e2e.ts//stepWithNamedOutputStreamInsideStep"},"stepWithOutputStreamBinary":{"stepId":"step//src/workflows/99_e2e.ts//stepWithOutputStreamBinary"},"stepWithOutputStreamInsideStep":{"stepId":"step//src/workflows/99_e2e.ts//stepWithOutputStreamInsideStep"},"stepWithOutputStreamObject":{"stepId":"step//src/workflows/99_e2e.ts//stepWithOutputStreamObject"},"stepWithStepFunctionArg":{"stepId":"step//src/workflows/99_e2e.ts//stepWithStepFunctionArg"}}}}*/;
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
    },
    childWorkflow: function() {
        return childWorkflow;
    },
    closureVariableWorkflow: function() {
        return closureVariableWorkflow;
    },
    crossFileErrorWorkflow: function() {
        return crossFileErrorWorkflow;
    },
    fetchWorkflow: function() {
        return fetchWorkflow;
    },
    hookCleanupTestWorkflow: function() {
        return hookCleanupTestWorkflow;
    },
    hookWorkflow: function() {
        return hookWorkflow;
    },
    nestedErrorWorkflow: function() {
        return nestedErrorWorkflow;
    },
    nullByteWorkflow: function() {
        return nullByteWorkflow;
    },
    outputStreamInsideStepWorkflow: function() {
        return outputStreamInsideStepWorkflow;
    },
    outputStreamWorkflow: function() {
        return outputStreamWorkflow;
    },
    promiseAllWorkflow: function() {
        return promiseAllWorkflow;
    },
    promiseAnyWorkflow: function() {
        return promiseAnyWorkflow;
    },
    promiseRaceStressTestDelayStep: function() {
        return promiseRaceStressTestDelayStep;
    },
    promiseRaceStressTestWorkflow: function() {
        return promiseRaceStressTestWorkflow;
    },
    promiseRaceWorkflow: function() {
        return promiseRaceWorkflow;
    },
    readableStreamWorkflow: function() {
        return readableStreamWorkflow;
    },
    retryAttemptCounterWorkflow: function() {
        return retryAttemptCounterWorkflow;
    },
    retryableAndFatalErrorWorkflow: function() {
        return retryableAndFatalErrorWorkflow;
    },
    sleepingWorkflow: function() {
        return sleepingWorkflow;
    },
    spawnWorkflowFromStepWorkflow: function() {
        return spawnWorkflowFromStepWorkflow;
    },
    stepFunctionPassingWorkflow: function() {
        return stepFunctionPassingWorkflow;
    },
    stepFunctionWithClosureWorkflow: function() {
        return stepFunctionWithClosureWorkflow;
    },
    webhookWorkflow: function() {
        return webhookWorkflow;
    },
    workflowAndStepMetadataWorkflow: function() {
        return workflowAndStepMetadataWorkflow;
    }
});
async function add(a, b) {
    return a + b;
}
async function addTenWorkflow(input) {
    throw new Error("You attempted to execute workflow addTenWorkflow function directly. To start a workflow, use start(addTenWorkflow) from workflow/api");
}
addTenWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//addTenWorkflow";
async function nestedErrorWorkflow() {
    throw new Error("You attempted to execute workflow nestedErrorWorkflow function directly. To start a workflow, use start(nestedErrorWorkflow) from workflow/api");
}
nestedErrorWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//nestedErrorWorkflow";
//////////////////////////////////////////////////////////
async function randomDelay(v) {
    await new Promise((resolve)=>setTimeout(resolve, Math.random() * 3000));
    return v.toUpperCase();
}
async function promiseAllWorkflow() {
    throw new Error("You attempted to execute workflow promiseAllWorkflow function directly. To start a workflow, use start(promiseAllWorkflow) from workflow/api");
}
promiseAllWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//promiseAllWorkflow";
//////////////////////////////////////////////////////////
async function specificDelay(delay, v) {
    await new Promise((resolve)=>setTimeout(resolve, delay));
    return v.toUpperCase();
}
async function promiseRaceWorkflow() {
    throw new Error("You attempted to execute workflow promiseRaceWorkflow function directly. To start a workflow, use start(promiseRaceWorkflow) from workflow/api");
}
promiseRaceWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//promiseRaceWorkflow";
//////////////////////////////////////////////////////////
async function stepThatFails() {
    throw new FatalError('step failed');
}
async function promiseAnyWorkflow() {
    throw new Error("You attempted to execute workflow promiseAnyWorkflow function directly. To start a workflow, use start(promiseAnyWorkflow) from workflow/api");
}
promiseAnyWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//promiseAnyWorkflow";
//////////////////////////////////////////////////////////
// Name should not conflict with genStream in 3_streams.ts
// TODO: swc transform should mangle names to avoid conflicts
async function genReadableStream() {
    const encoder = new TextEncoder();
    return new ReadableStream({
        async start (controller) {
            for(let i = 0; i < 10; i++){
                console.log('enqueueing', i);
                controller.enqueue(encoder.encode(`${i}\n`));
                await new Promise((resolve)=>setTimeout(resolve, 1000));
            }
            console.log('closing controller');
            controller.close();
        }
    });
}
async function readableStreamWorkflow() {
    throw new Error("You attempted to execute workflow readableStreamWorkflow function directly. To start a workflow, use start(readableStreamWorkflow) from workflow/api");
}
readableStreamWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//readableStreamWorkflow";
async function hookWorkflow(token, customData) {
    throw new Error("You attempted to execute workflow hookWorkflow function directly. To start a workflow, use start(hookWorkflow) from workflow/api");
}
hookWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//hookWorkflow";
//////////////////////////////////////////////////////////
async function sendWebhookResponse(req) {
    const body = await req.text();
    await req.respondWith(new Response('Hello from webhook!'));
    return body;
}
async function webhookWorkflow(token, token2, token3) {
    throw new Error("You attempted to execute workflow webhookWorkflow function directly. To start a workflow, use start(webhookWorkflow) from workflow/api");
}
webhookWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//webhookWorkflow";
async function sleepingWorkflow() {
    throw new Error("You attempted to execute workflow sleepingWorkflow function directly. To start a workflow, use start(sleepingWorkflow) from workflow/api");
}
sleepingWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//sleepingWorkflow";
//////////////////////////////////////////////////////////
async function nullByteStep() {
    return 'null byte \0';
}
async function nullByteWorkflow() {
    throw new Error("You attempted to execute workflow nullByteWorkflow function directly. To start a workflow, use start(nullByteWorkflow) from workflow/api");
}
nullByteWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//nullByteWorkflow";
//////////////////////////////////////////////////////////
async function stepWithMetadata() {
    const stepMetadata = getStepMetadata();
    const workflowMetadata = getWorkflowMetadata();
    return {
        stepMetadata,
        workflowMetadata
    };
}
async function workflowAndStepMetadataWorkflow() {
    throw new Error("You attempted to execute workflow workflowAndStepMetadataWorkflow function directly. To start a workflow, use start(workflowAndStepMetadataWorkflow) from workflow/api");
}
workflowAndStepMetadataWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//workflowAndStepMetadataWorkflow";
//////////////////////////////////////////////////////////
async function stepWithOutputStreamBinary(writable, text) {
    const writer = writable.getWriter();
    // binary data
    await writer.write(new TextEncoder().encode(text));
    writer.releaseLock();
}
async function stepWithOutputStreamObject(writable, obj) {
    const writer = writable.getWriter();
    // object data
    await writer.write(obj);
    writer.releaseLock();
}
async function stepCloseOutputStream(writable) {
    await writable.close();
}
async function outputStreamWorkflow() {
    throw new Error("You attempted to execute workflow outputStreamWorkflow function directly. To start a workflow, use start(outputStreamWorkflow) from workflow/api");
}
outputStreamWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//outputStreamWorkflow";
//////////////////////////////////////////////////////////
async function stepWithOutputStreamInsideStep(text) {
    // Call getWritable directly inside the step function
    const writable = getWritable();
    const writer = writable.getWriter();
    await writer.write(new TextEncoder().encode(text));
    writer.releaseLock();
}
async function stepWithNamedOutputStreamInsideStep(namespace, obj) {
    // Call getWritable with namespace directly inside the step function
    const writable = getWritable({
        namespace
    });
    const writer = writable.getWriter();
    await writer.write(obj);
    writer.releaseLock();
}
async function stepCloseOutputStreamInsideStep(namespace) {
    // Call getWritable directly inside the step function and close it
    const writable = getWritable({
        namespace
    });
    await writable.close();
}
async function outputStreamInsideStepWorkflow() {
    throw new Error("You attempted to execute workflow outputStreamInsideStepWorkflow function directly. To start a workflow, use start(outputStreamInsideStepWorkflow) from workflow/api");
}
outputStreamInsideStepWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//outputStreamInsideStepWorkflow";
async function fetchWorkflow() {
    throw new Error("You attempted to execute workflow fetchWorkflow function directly. To start a workflow, use start(fetchWorkflow) from workflow/api");
}
fetchWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//fetchWorkflow";
async function promiseRaceStressTestDelayStep(dur, resp) {
    console.log(`sleep`, resp, `/`, dur);
    await new Promise((resolve)=>setTimeout(resolve, dur));
    console.log(resp, `done`);
    return resp;
}
async function promiseRaceStressTestWorkflow() {
    throw new Error("You attempted to execute workflow promiseRaceStressTestWorkflow function directly. To start a workflow, use start(promiseRaceStressTestWorkflow) from workflow/api");
}
promiseRaceStressTestWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//promiseRaceStressTestWorkflow";
//////////////////////////////////////////////////////////
async function stepThatRetriesAndSucceeds() {
    const { attempt } = getStepMetadata();
    console.log(`stepThatRetriesAndSucceeds - attempt: ${attempt}`);
    // Fail on attempts 1 and 2, succeed on attempt 3
    if (attempt < 3) {
        console.log(`Attempt ${attempt} - throwing error to trigger retry`);
        throw new Error(`Failed on attempt ${attempt}`);
    }
    console.log(`Attempt ${attempt} - succeeding`);
    return attempt;
}
async function retryAttemptCounterWorkflow() {
    throw new Error("You attempted to execute workflow retryAttemptCounterWorkflow function directly. To start a workflow, use start(retryAttemptCounterWorkflow) from workflow/api");
}
retryAttemptCounterWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//retryAttemptCounterWorkflow";
//////////////////////////////////////////////////////////
async function stepThatThrowsRetryableError() {
    const { attempt, stepStartedAt } = getStepMetadata();
    if (attempt === 1) {
        throw new RetryableError('Retryable error', {
            retryAfter: '10s'
        });
    }
    return {
        attempt,
        stepStartedAt,
        duration: Date.now() - stepStartedAt.getTime()
    };
}
async function crossFileErrorWorkflow() {
    throw new Error("You attempted to execute workflow crossFileErrorWorkflow function directly. To start a workflow, use start(crossFileErrorWorkflow) from workflow/api");
}
crossFileErrorWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//crossFileErrorWorkflow";
async function retryableAndFatalErrorWorkflow() {
    throw new Error("You attempted to execute workflow retryableAndFatalErrorWorkflow function directly. To start a workflow, use start(retryableAndFatalErrorWorkflow) from workflow/api");
}
retryableAndFatalErrorWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//retryableAndFatalErrorWorkflow";
async function hookCleanupTestWorkflow(token, customData) {
    throw new Error("You attempted to execute workflow hookCleanupTestWorkflow function directly. To start a workflow, use start(hookCleanupTestWorkflow) from workflow/api");
}
hookCleanupTestWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//hookCleanupTestWorkflow";
async function stepFunctionPassingWorkflow() {
    throw new Error("You attempted to execute workflow stepFunctionPassingWorkflow function directly. To start a workflow, use start(stepFunctionPassingWorkflow) from workflow/api");
}
stepFunctionPassingWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//stepFunctionPassingWorkflow";
async function stepWithStepFunctionArg(stepFn) {
    // Call the passed step function reference
    const result = await stepFn(10);
    return result * 2;
}
async function doubleNumber(x) {
    return x * 2;
}
async function stepFunctionWithClosureWorkflow() {
    throw new Error("You attempted to execute workflow stepFunctionWithClosureWorkflow function directly. To start a workflow, use start(stepFunctionWithClosureWorkflow) from workflow/api");
}
stepFunctionWithClosureWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//stepFunctionWithClosureWorkflow";
async function stepThatCallsStepFn(stepFn, value) {
    // Call the passed step function - closure vars should be preserved
    const result = await stepFn(value);
    return `Wrapped: ${result}`;
}
async function closureVariableWorkflow(baseValue) {
    throw new Error("You attempted to execute workflow closureVariableWorkflow function directly. To start a workflow, use start(closureVariableWorkflow) from workflow/api");
}
closureVariableWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//closureVariableWorkflow";
async function childWorkflow(value) {
    throw new Error("You attempted to execute workflow childWorkflow function directly. To start a workflow, use start(childWorkflow) from workflow/api");
}
childWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//childWorkflow";
async function doubleValue(value) {
    return value * 2;
}
// Step function that spawns another workflow using start()
async function spawnChildWorkflow(value) {
    // start() can only be called inside a step function, not directly in workflow code
    const childRun = await start(childWorkflow, [
        value
    ]);
    return childRun.runId;
}
// Step function that waits for a workflow run to complete and returns its result
async function awaitWorkflowResult(runId) {
    const run = getRun(runId);
    const result = await run.returnValue;
    return result;
}
async function spawnWorkflowFromStepWorkflow(inputValue) {
    throw new Error("You attempted to execute workflow spawnWorkflowFromStepWorkflow function directly. To start a workflow, use start(spawnWorkflowFromStepWorkflow) from workflow/api");
}
spawnWorkflowFromStepWorkflow.workflowId = "workflow//src/workflows/99_e2e.ts//spawnWorkflowFromStepWorkflow";

//# sourceMappingURL=99_e2e.js.map