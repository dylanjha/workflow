"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppController", {
    enumerable: true,
    get: function() {
        return AppController;
    }
});
const _common = require("@nestjs/common");
const _api = require("workflow/api");
const _errors = require("workflow/internal/errors");
const _serialization = require("workflow/internal/serialization");
const _workflow = require("./lib/_workflow.js");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AppController = class AppController {
    async resumeWorkflowHook(body) {
        const { token, data } = body;
        let hook;
        try {
            hook = await (0, _api.getHookByToken)(token);
            console.log('hook', hook);
        } catch (error) {
            console.log('error during getHookByToken', error);
            // TODO: `WorkflowAPIError` is not exported, so for now
            throw new _common.HttpException(null, _common.HttpStatus.NOT_FOUND);
        }
        await (0, _api.resumeHook)(hook.token, {
            ...data,
            // @ts-expect-error metadata is not typed
            customData: hook.metadata?.customData
        });
        return hook;
    }
    async startWorkflowRun(workflowFile = 'workflows/99_e2e.ts', workflowFn = 'simple', argsParam, bodyData) {
        if (!workflowFile) {
            throw new _common.HttpException('No workflowFile query parameter provided', _common.HttpStatus.BAD_REQUEST);
        }
        const workflows = _workflow.allWorkflows[workflowFile];
        if (!workflows) {
            throw new _common.HttpException(`Workflow file "${workflowFile}" not found`, _common.HttpStatus.BAD_REQUEST);
        }
        if (!workflowFn) {
            throw new _common.HttpException('No workflow query parameter provided', _common.HttpStatus.BAD_REQUEST);
        }
        const workflow = workflows[workflowFn];
        if (!workflow) {
            throw new _common.HttpException(`Workflow "${workflowFn}" not found`, _common.HttpStatus.BAD_REQUEST);
        }
        let args = [];
        // Args from query string
        if (argsParam) {
            args = argsParam.split(',').map((arg)=>{
                const num = parseFloat(arg);
                return Number.isNaN(num) ? arg.trim() : num;
            });
        } else if (bodyData && Object.keys(bodyData).length > 0) {
            // Args from body
            args = (0, _serialization.hydrateWorkflowArguments)(bodyData, globalThis);
        } else {
            args = [
                42
            ];
        }
        console.log(`Starting "${workflowFn}" workflow with args: ${args}`);
        try {
            const run = await (0, _api.start)(workflow, args);
            console.log('Run:', run);
            return run;
        } catch (err) {
            console.error(`Failed to start!!`, err);
            throw err;
        }
    }
    async getWorkflowRunResult(runId, outputStreamParam, res) {
        if (!runId) {
            throw new _common.HttpException('No runId provided', _common.HttpStatus.BAD_REQUEST);
        }
        if (outputStreamParam) {
            const namespace = outputStreamParam === '1' ? undefined : outputStreamParam;
            const run = (0, _api.getRun)(runId);
            const stream = run.getReadable({
                namespace
            });
            // Add JSON framing to the stream, wrapping binary data in base64
            const streamWithFraming = new TransformStream({
                transform (chunk, controller) {
                    const data = chunk instanceof Uint8Array ? {
                        data: Buffer.from(chunk).toString('base64')
                    } : chunk;
                    controller.enqueue(`${JSON.stringify(data)}\n`);
                }
            });
            res.setHeader('Content-Type', 'application/octet-stream');
            const readableStream = stream.pipeThrough(streamWithFraming);
            const reader = readableStream.getReader();
            const pump = async ()=>{
                const { done, value } = await reader.read();
                if (done) {
                    res.end();
                    return;
                }
                res.write(value);
                await pump();
            };
            await pump();
            return;
        }
        try {
            const run = (0, _api.getRun)(runId);
            const returnValue = await run.returnValue;
            console.log('Return value:', returnValue);
            // Include run metadata in headers
            const [createdAt, startedAt, completedAt] = await Promise.all([
                run.createdAt,
                run.startedAt,
                run.completedAt
            ]);
            res.setHeader('X-Workflow-Run-Created-At', createdAt?.toISOString() || '');
            res.setHeader('X-Workflow-Run-Started-At', startedAt?.toISOString() || '');
            res.setHeader('X-Workflow-Run-Completed-At', completedAt?.toISOString() || '');
            if (returnValue instanceof ReadableStream) {
                res.setHeader('Content-Type', 'application/octet-stream');
                const reader = returnValue.getReader();
                const pump = async ()=>{
                    const { done, value } = await reader.read();
                    if (done) {
                        res.end();
                        return;
                    }
                    res.write(value);
                    await pump();
                };
                await pump();
                return;
            }
            return res.json(returnValue);
        } catch (error) {
            if (error instanceof Error) {
                if (_errors.WorkflowRunNotCompletedError.is(error)) {
                    return res.status(_common.HttpStatus.ACCEPTED).json({
                        ...error,
                        name: error.name,
                        message: error.message
                    });
                }
                if (_errors.WorkflowRunFailedError.is(error)) {
                    const cause = error.cause;
                    return res.status(_common.HttpStatus.BAD_REQUEST).json({
                        ...error,
                        name: error.name,
                        message: error.message,
                        cause: {
                            message: cause.message,
                            stack: cause.stack,
                            code: cause.code
                        }
                    });
                }
            }
            console.error('Unexpected error while getting workflow return value:', error);
            return res.status(_common.HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Internal server error'
            });
        }
    }
    async invokeStepDirectly(body) {
        // This route tests calling step functions directly outside of any workflow context
        // After the SWC compiler changes, step functions in client mode have their directive removed
        // and keep their original implementation, allowing them to be called as regular async functions
        const { add } = await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("./workflows/99_e2e.js")));
        const { x, y } = body;
        console.log(`Calling step function directly with x=${x}, y=${y}`);
        // Call step function directly as a regular async function (no workflow context)
        const result = await add(x, y);
        console.log(`add(${x}, ${y}) = ${result}`);
        return {
            result
        };
    }
};
_ts_decorate([
    (0, _common.Post)('hook'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AppController.prototype, "resumeWorkflowHook", null);
_ts_decorate([
    (0, _common.Post)('trigger'),
    _ts_param(0, (0, _common.Query)('workflowFile')),
    _ts_param(1, (0, _common.Query)('workflowFn')),
    _ts_param(2, (0, _common.Query)('args')),
    _ts_param(3, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AppController.prototype, "startWorkflowRun", null);
_ts_decorate([
    (0, _common.Get)('trigger'),
    _ts_param(0, (0, _common.Query)('runId')),
    _ts_param(1, (0, _common.Query)('output-stream')),
    _ts_param(2, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        Object,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AppController.prototype, "getWorkflowRunResult", null);
_ts_decorate([
    (0, _common.Post)('test-direct-step-call'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AppController.prototype, "invokeStepDirectly", null);
AppController = _ts_decorate([
    (0, _common.Controller)('api')
], AppController);

//# sourceMappingURL=app.controller.js.map