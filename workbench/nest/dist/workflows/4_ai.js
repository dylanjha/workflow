/**__internal_workflows{"workflows":{"src/workflows/4_ai.ts":{"agent":{"workflowId":"workflow//src/workflows/4_ai.ts//agent"},"ai":{"workflowId":"workflow//src/workflows/4_ai.ts//ai"}}},"steps":{"src/workflows/4_ai.ts":{"getWeatherInformation":{"stepId":"step//src/workflows/4_ai.ts//getWeatherInformation"}}}}*/;
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
    agent: function() {
        return agent;
    },
    ai: function() {
        return ai;
    }
});
async function getWeatherInformation({ city }) {
    console.log('Getting the weather for city: ', city);
    // A 50% chance of randomly failing. Workflow will retry this.
    if (Math.random() < 0.5) {
        throw new Error('Retryable error');
    }
    // A 10% chance of actually failing. The LLM may retry this?
    if (Math.random() < 0.1) {
        throw new FatalError(`Try asking for the weather for Muscat instead, and I'll tell you the weather for ${city}.`);
    }
    const weatherOptions = [
        'sunny',
        'cloudy',
        'rainy',
        'snowy',
        'windy'
    ];
    return weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
}
async function ai(prompt) {
    throw new Error("You attempted to execute workflow ai function directly. To start a workflow, use start(ai) from workflow/api");
}
ai.workflowId = "workflow//src/workflows/4_ai.ts//ai";
async function agent(prompt) {
    throw new Error("You attempted to execute workflow agent function directly. To start a workflow, use start(agent) from workflow/api");
}
agent.workflowId = "workflow//src/workflows/4_ai.ts//agent";

//# sourceMappingURL=4_ai.js.map