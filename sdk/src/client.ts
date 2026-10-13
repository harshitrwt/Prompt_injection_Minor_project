import { CordonGuardOptions, InspectResult } from "./types";

export class CordonGuard {
  private apiKey: string;
  private baseUrl: string;
  private timeoutMs: number;
  private failOpen: boolean;

  constructor(options: CordonGuardOptions) {
    if (!options.apiKey) {
      throw new Error("[CordonGuard] API key is required. Pass { apiKey: 'st_live_...' }");
    }
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl || "http://localhost:8000").replace(/\/+$/, "");
    this.timeoutMs = options.timeoutMs || 1000;
    this.failOpen = options.failOpen !== undefined ? options.failOpen : true;
  }

  /**
   * Inspects a text prompt across the ML, Heuristic, and Qdrant vector defense layers.
   * Returns a calibrated security verdict in milliseconds.
   */
  async inspect(prompt: string): Promise<InspectResult> {
    const startTime = Date.now();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return {
        id: `insp_empty_${Date.now()}`,
        decision: "SAFE",
        risk_score: 0.0,
        risk_level: "LOW",
        latency_ms: 0,
        input_prompt: prompt || "",
      };
    }

    const controller = new AbortController();
    const timeoutTimer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}/v1/inspect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      clearTimeout(timeoutTimer);

      if (!response.ok) {
        throw new Error(`[CordonGuard] Gateway returned HTTP ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      const elapsed = Date.now() - startTime;

      return {
        id: data.id || `insp_${Date.now()}`,
        decision: data.decision || data.fusion_output?.decision || "SAFE",
        risk_score: data.risk_score !== undefined ? data.risk_score : (data.fusion_output?.risk_score ?? 0.0),
        risk_level: data.risk_level || data.fusion_output?.risk_level || "LOW",
        latency_ms: data.latency_ms || elapsed,
        input_prompt: prompt,
        cleaned_prompt: data.cleaned_prompt,
        detectors: data.detectors,
      };
    } catch (err: any) {
      clearTimeout(timeoutTimer);
      const elapsed = Date.now() - startTime;

      if (this.failOpen) {
        console.warn(`[CordonGuard Warning] Security check failed or timed out (${err.message}). Failing open (SAFE).`);
        return {
          id: `insp_fallback_${Date.now()}`,
          decision: "SAFE",
          risk_score: 0.0,
          risk_level: "LOW",
          latency_ms: elapsed,
          input_prompt: prompt,
        };
      }

      // Fail-closed policy
      console.error(`[CordonGuard Error] Security check failed (${err.message}). Failing closed (BLOCK).`);
      return {
        id: `insp_error_${Date.now()}`,
        decision: "BLOCK",
        risk_score: 1.0,
        risk_level: "HIGH",
        latency_ms: elapsed,
        input_prompt: prompt,
      };
    }
  }
}

// Convenient alias
export const PromptGuard = CordonGuard;
