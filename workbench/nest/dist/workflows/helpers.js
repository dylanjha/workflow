// Shared helper functions that can be imported by workflows
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
    callThrower: function() {
        return callThrower;
    },
    throwError: function() {
        return throwError;
    }
});
function throwError() {
    throw new Error('Error from imported helper module');
}
function callThrower() {
    throwError();
}

//# sourceMappingURL=helpers.js.map