/**__internal_workflows{"workflows":{"src/workflows/7_full.ts":{"handleUserSignup":{"workflowId":"workflow//src/workflows/7_full.ts//handleUserSignup"}}},"steps":{"src/workflows/7_full.ts":{"createUser":{"stepId":"step//src/workflows/7_full.ts//createUser"},"sendOnboardingEmail":{"stepId":"step//src/workflows/7_full.ts//sendOnboardingEmail"},"sendWelcomeEmail":{"stepId":"step//src/workflows/7_full.ts//sendWelcomeEmail"}}}}*/;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleUserSignup", {
    enumerable: true,
    get: function() {
        return handleUserSignup;
    }
});
async function handleUserSignup(email) {
    throw new Error("You attempted to execute workflow handleUserSignup function directly. To start a workflow, use start(handleUserSignup) from workflow/api");
}
handleUserSignup.workflowId = "workflow//src/workflows/7_full.ts//handleUserSignup";
async function createUser(email) {
    console.log(`Creating a new user with email: ${email}`);
    return {
        id: crypto.randomUUID(),
        email
    };
}
async function sendWelcomeEmail(user) {
    console.log(`Sending welcome email to user: ${user.id}`);
}
async function sendOnboardingEmail(user, callback) {
    console.log(`Sending onboarding email to user: ${user.id}`);
    console.log(`Click this link to resolve the webhook: ${callback}`);
}

//# sourceMappingURL=7_full.js.map