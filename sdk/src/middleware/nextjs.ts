import { CordonGuard } from "../client";
import { CordonGuardOptions, InspectResult } from "../types";

/**
 * Next.js Route Handler wrapper for POST endpoints (e.g. app/api/chat/route.ts).
 * Automatically validates user prompts before invoking the route handler.
 */
export function withCordonGuard(
  optionsOrHandler:
    | (CordonGuardOptions & { extractPrompt?: (body: any) => string })
    | ((req: Request, context?: any) => Promise<Response>),
  maybeHandler?: (req: Request, context?: any) => Promise<Response>
) {
  const isFunction = typeof optionsOrHandler === "function";
  const handler = (isFunction ? optionsOrHandler : maybeHandler) as (req: Request, context?: any) => Promise<Response>;
  const options = (isFunction ? {} : optionsOrHandler) as CordonGuardOptions & {
    extractPrompt?: (body: any) => string;
  };

  const guard = new CordonGuard(options);

  return async function wrappedHandler(req: Request, context?: any): Promise<Response> {
    // Only inspect POST/PUT requests with payloads
    if (req.method !== "POST" && req.method !== "PUT") {
      return handler(req, context);
    }

    try {
      const clonedReq = req.clone();
      let body: any = null;
      try {
        body = await clonedReq.json();
      } catch {
        // Not JSON
        return handler(req, context);
      }

      let promptText = "";
      if (options.extractPrompt) {
        promptText = options.extractPrompt(body);
      } else if (typeof body.prompt === "string") {
        promptText = body.prompt;
      } else if (typeof body.message === "string") {
        promptText = body.message;
      } else if (Array.isArray(body.messages)) {
        const lastUser = [...body.messages].reverse().find((m: any) => m.role === "user");
        if (lastUser) promptText = lastUser.content;
      }

      if (promptText) {
        const verdict: InspectResult = await guard.inspect(promptText);

        if (verdict.decision === "BLOCK") {
          return new Response(
            JSON.stringify({
              error: "Security Policy Violation",
              message: "Prompt injection detected. Request rejected.",
              verdict: {
                decision: verdict.decision,
                risk_score: verdict.risk_score,
                id: verdict.id,
              },
            }),
            {
              status: 403,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }

      return handler(req, context);
    } catch (err: any) {
      if (options.failOpen !== false) {
        return handler(req, context);
      }
      return new Response(
        JSON.stringify({ error: "Security check failed", details: err.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  };
}
