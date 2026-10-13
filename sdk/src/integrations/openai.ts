import { CordonGuard } from "../client";
import { CordonGuardOptions } from "../types";

/**
 * Wraps an OpenAI client instance to automatically screen inbound prompts
 * before sending them to OpenAI's API.
 */
export function wrapOpenAI<T extends Record<string, any>>(
  openaiClient: T,
  options: CordonGuardOptions
): T {
  const guard = new CordonGuard(options);

  if (!openaiClient.chat || !openaiClient.chat.completions) {
    return openaiClient;
  }

  const originalCreate = openaiClient.chat.completions.create.bind(openaiClient.chat.completions);

  openaiClient.chat.completions.create = async function (params: any, reqOptions?: any) {
    // Extract last user prompt
    if (params && Array.isArray(params.messages)) {
      const lastUser = [...params.messages].reverse().find((m: any) => m.role === "user");
      const prompt = lastUser && typeof lastUser.content === "string" ? lastUser.content : "";

      if (prompt) {
        const check = await guard.inspect(prompt);
        if (check.decision === "BLOCK") {
          const err = new Error(
            `[CordonGuard] Blocked prompt injection attack (Risk score: ${check.risk_score.toFixed(2)})`
          );
          (err as any).status = 403;
          (err as any).verdict = check;
          throw err;
        }
      }
    }

    return originalCreate(params, reqOptions);
  };

  return openaiClient;
}
