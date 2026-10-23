export type SecurityDecision = "SAFE" | "REVIEW" | "BLOCK";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type TierType = "free-local" | "free-cloud" | "pro";

export type ReviewPolicy = "block" | "warn" | "allow";

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
  /** Active tier used for this inspection */
  tier: TierType;
  /** Remaining prompt evaluations in current monthly billing cycle (if cloud tier) */
  quota_remaining?: number;
  /** Monthly quota limit for current tier */
  quota_limit?: number;

  /**
   * Whether downstream LLM execution is safe to call.
   * false if decision is BLOCK, or if decision is REVIEW and reviewPolicy === 'block'.
   */
  model_called: boolean;

  /**
   * SHA-256 cryptographic hash of the input prompt for zero-PII audit logging.
   */
  prompt_hash?: string;

  /**
   * Flag indicating if a canary token was detected in the prompt or in downstream model output.
   */
  canary_detected?: boolean;

  /**
   * SDK Package version (e.g. "1.1.0").
   */
  package_version?: string;

  /**
   * Gateway defense model version.
   */
  model_version?: string;
}

export interface PrivacyOptions {
  /**
   * If true, never print or log raw prompt text to consoles or telemetry (only SHA-256 hashes).
   * Default: true in production.
   */
  hashOnly?: boolean;

  /**
   * If true, mask sensitive prompt substrings when logging.
   */
  maskPrompts?: boolean;
}

export interface CordonGuardOptions {
  /**
   * Your Cordon API key (e.g. 'st_free_...' or 'st_pro_...').
   * If omitted, cordonguard automatically defaults to Free Local Mode (In-Memory Heuristics).
   */
  apiKey?: string;
  /**
   * Custom endpoint URL for the Cordon security gateway.
   * Default: production Cordon cloud gateway or local development gateway.
   */
  baseUrl?: string;
  /**
   * Maximum milliseconds to wait for security inspection before fallback (default: 800ms).
   */
  timeoutMs?: number;
  /**
   * If the security gateway fails or times out, whether to allow the request through (fail-open)
   * or reject it (fail-closed). Default: true (fail-open).
   */
  failOpen?: boolean;
  /**
   * Inspection execution mode:
   * - 'auto': uses cloud gateway if apiKey is provided, otherwise runs local free heuristics.
   * - 'local': forces in-memory local heuristic evaluation with 0ms network overhead.
   * - 'cloud': forces cloud gateway inspection across ML + Qdrant vectors.
   */
  mode?: "auto" | "local" | "cloud";

  /**
   * Policy for handling prompts marked as "REVIEW":
   * - 'warn': logs a warning but sets model_called = true (default).
   * - 'block': sets model_called = false and treats REVIEW as a security block.
   * - 'allow': allows model execution silently.
   */
  reviewPolicy?: ReviewPolicy;

  /**
   * Synthetic canary secret token used in isolated system prompts to monitor actual model leakage.
   */
  canaryToken?: string;

  /**
   * Privacy and zero-retention logging options.
   */
  privacy?: PrivacyOptions;
}

export interface WrapModelResult<T> {
  /** Result of security evaluation */
  inspection: InspectResult;
  /** Output from downstream LLM (undefined if blocked) */
  result?: T;
  /** Whether prompt was blocked from reaching the model */
  blocked: boolean;
  /** Whether the canary token was leaked in downstream model response */
  canaryLeaked: boolean;
}

export interface MiddlewareOptions extends CordonGuardOptions {
  /** Name of the field in req.body containing the prompt (default: "prompt" or "message") */
  promptField?: string;
  /** Custom handler when a prompt is classified as BLOCK */
  onBlock?: (req: any, res: any, inspection: InspectResult) => void;
  /** Custom handler when a prompt is classified as REVIEW */
  onReview?: (req: any, res: any, inspection: InspectResult) => void;
}

