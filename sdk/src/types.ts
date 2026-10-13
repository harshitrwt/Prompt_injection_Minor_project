export type SecurityDecision = "SAFE" | "REVIEW" | "BLOCK";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface DetectorSignals {
  ml_classifier?: {
    probability: number;
    description: string;
  };
  heuristic_engine?: {
    score: number;
    matched_count: number;
    matches: Array<{
      category: string;
      weight: number;
      pattern?: string;
    }>;
  };
  semantic_detector?: {
    similarity: number;
    raw_cosine?: number;
    engine?: string;
    matched_threat?: Record<string, any>;
    description: string;
  };
}

export interface InspectResult {
  id: string;
  decision: SecurityDecision;
  risk_score: number;
  risk_level: RiskLevel;
  latency_ms: number;
  input_prompt: string;
  cleaned_prompt?: string;
  detectors?: DetectorSignals;
}

export interface CordonGuardOptions {
  /** Your Cordon / PromptGuard API key (e.g. st_live_...) */
  apiKey: string;
  /** Custom endpoint URL (defaults to production or local development gateway) */
  baseUrl?: string;
  /** Maximum milliseconds to wait for security inspection before fallback (default: 800ms) */
  timeoutMs?: number;
  /** If the security gateway fails or times out, whether to allow the request through (fail-open) or reject it (fail-closed). Default: true (fail-open) */
  failOpen?: boolean;
}

export interface MiddlewareOptions extends CordonGuardOptions {
  /** Name of the field in req.body containing the prompt (default: "prompt" or "message") */
  promptField?: string;
  /** Custom handler when a prompt is classified as BLOCK */
  onBlock?: (req: any, res: any, inspection: InspectResult) => void;
  /** Custom handler when a prompt is classified as REVIEW */
  onReview?: (req: any, res: any, inspection: InspectResult) => void;
}
