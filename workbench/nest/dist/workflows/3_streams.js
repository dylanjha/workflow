/**__internal_workflows{"workflows":{"src/workflows/3_streams.ts":{"streams":{"workflowId":"workflow//src/workflows/3_streams.ts//streams"}}},"steps":{"src/workflows/3_streams.ts":{"consumeStreams":{"stepId":"step//src/workflows/3_streams.ts//consumeStreams"},"genStream":{"stepId":"step//src/workflows/3_streams.ts//genStream"}}}}*/;
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
    consumeStreams: function() {
        return consumeStreams;
    },
    genStream: function() {
        return genStream;
    },
    streams: function() {
        return streams;
    }
});
async function genStream() {
    const stream = new ReadableStream({
        async start (controller) {
            const encoder = new TextEncoder();
            for(let i = 0; i < 30; i++){
                const chunk = encoder.encode(`${i}\n`);
                controller.enqueue(chunk);
                console.log(`Enqueued number: ${i}`);
                await new Promise((resolve)=>setTimeout(resolve, 2500));
            }
            controller.close();
        }
    });
    return stream;
}
async function consumeStreams(...streams) {
    const parts = [];
    console.log('Consuming streams', streams);
    await Promise.all(streams.map(async (s, i)=>{
        const reader = s.getReader();
        while(true){
            const result = await reader.read();
            if (result.done) break;
            console.log(`Received ${result.value.length} bytes from stream ${i}: ${JSON.stringify(new TextDecoder().decode(result.value))}`);
            parts.push(result.value);
        }
    }));
    return Buffer.concat(parts).toString('utf8');
}
async function streams() {
    throw new Error("You attempted to execute workflow streams function directly. To start a workflow, use start(streams) from workflow/api");
}
streams.workflowId = "workflow//src/workflows/3_streams.ts//streams";

//# sourceMappingURL=3_streams.js.map