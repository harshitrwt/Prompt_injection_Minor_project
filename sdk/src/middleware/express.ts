import { CordonGuard } from "../client";
import { MiddlewareOptions, InspectResult } from "../types";

/**
 * Express / Connect compatible middleware that inspects inbound prompts
 * and halts malicious requests before they reach your AI endpoints.
 */
export function cordonguard(options: MiddlewareOptions) {
  const guard = new CordonGuard(options);
  const promptField = options.promptField || "prompt";

  return async function promptGuardMiddleware(req: any, res: any, next: any) {
    try {
      // Extract prompt from common body formats
      let promptText = "";
      if (req.body) {
        if (typeof req.body === "string") {
          promptText = req.body;
        } else if (req.body[promptField]) {
          promptText = req.body[promptField];
        } else if (req.body.message) {
          promptText = req.body.message;
        } else if (Array.isArray(req.body.messages)) {
          // OpenAI style messages array: extract the latest user message
          const lastUserMsg = [...req.body.messages].reverse().find((m: any) => m.role === "user");
          if (lastUserMsg) {
            promptText = typeof lastUserMsg.content === "string" ? lastUserMsg.content : JSON.stringify(lastUserMsg.content);
          }
        }
      }

      if (!promptText) {
        return next();
      }

      const inspection: InspectResult = await guard.inspect(promptText);

      // Attach security verdict to request object for downstream controllers
      req.cordonguard = inspection;

      if (inspection.decision === "BLOCK") {
        if (options.onBlock) {
          return options.onBlock(req, res, inspection);
        }
        return res.status(403).json({
          error: "Forbidden",
          message: "Request blocked: prompt injection or security policy violation detected.",
          security_verdict: {
            decision: inspection.decision,
            risk_score: inspection.risk_score,
            threat_id: inspection.id,
          },
        });
      }

      if (inspection.decision === "REVIEW" && options.onReview) {
        return options.onReview(req, res, inspection);
      }

      return next();
    } catch (err) {
      console.error("[CordonGuard Middleware Error]", err);
      return next(options.failOpen ? null : err);
    }
  };
}
