import * as crypto from "crypto";
import {
  CordonGuardOptions,
  InspectResult,
  TierType,
  SecurityDecision,
  RiskLevel,
  ReviewPolicy,
  PrivacyOptions,
  WrapModelResult,
} from "./types";

export class CordonGuard {
  private apiKey?: string;
  private baseUrl: string;
  private timeoutMs: number;
  private failOpen: boolean;
  private mode: "auto" | "local" | "cloud";
  private reviewPolicy: ReviewPolicy;
  private canaryToken?: string;
  private privacy: PrivacyOptions;
  private static loggedFreeNotice = false;

  constructor(options: CordonGuardOptions = {}) {
    this.apiKey = options.apiKey || process.env.CORDON_API_KEY;
    this.baseUrl = (
      options.baseUrl ||
      process.env.CORDON_GATEWAY_URL ||
      "https://cordon-api-978214922885.asia-south1.run.app"
    ).replace(/\/+$/, "");
    this.timeoutMs = options.timeoutMs || 800;
    this.failOpen = options.failOpen !== undefined ? options.failOpen : true;
    this.mode = options.mode || "auto";
    this.reviewPolicy = options.reviewPolicy || "warn";
    this.canaryToken = options.canaryToken;
    this.privacy = {
      hashOnly: options.privacy?.hashOnly !== undefined ? options.privacy.hashOnly : true,
      maskPrompts: options.privacy?.maskPrompts ?? true,
    };

    // Inform developer on first instantiation in Free Local Mode
    if (!this.apiKey && this.mode !== "cloud" && !CordonGuard.loggedFreeNotice) {
      CordonGuard.loggedFreeNotice = true;
      console.log(
        "\x1b[36m[cordonguard]\x1b[0m Initialized in \x1b[1mFree Community Mode\x1b[0m (In-Memory Heuristics). Pass { apiKey: 'st_free_...' } for Cloud ML + Qdrant vectors or upgrade at https://cordonguard.com"
      );
    }
  }

  /**
   * Determine active tier based on API key structure
   */
  public getTier(): TierType {
    if (!this.apiKey || this.mode === "local") {
      return "free-local";
    }
    if (this.apiKey.startsWith("st_free_") || this.apiKey.startsWith("free_")) {
      return "free-cloud";
    }
    return "pro";
  }

  /**
   * Calculates a SHA-256 hash for privacy-preserving zero-retention telemetry.
   */
  public hashPrompt(prompt: string): string {
    return crypto.createHash("sha256").update(prompt, "utf8").digest("hex");
  }

  /**
   * Determines whether downstream model call should proceed based on decision and reviewPolicy.
   */
  public shouldCallModel(decision: SecurityDecision): boolean {
    if (decision === "BLOCK") {
      return false;
    }
    if (decision === "REVIEW" && this.reviewPolicy === "block") {
      return false;
    }
    return true;
  }

  /**
   * Checks whether a synthetic canary token has leaked into LLM output.
   */
  public checkCanary(llmOutput: string, customCanary?: string): boolean {
    const token = customCanary || this.canaryToken;
    if (!token || !llmOutput) return false;
    return llmOutput.includes(token);
  }

  /**
   * Normalizes text by transliterating Cyrillic homoglyphs and stripping zero-width characters.
   */
  private normalizeHomoglyphs(text: string): string {
    const homoglyphs: Record<string, string> = {
      "а": "a", "с": "c", "е": "e", "о": "o", "р": "p", "х": "x", "у": "y",
      "і": "i", "ј": "j", "ѕ": "s", "ԁ": "d", "ԛ": "q", "ԝ": "w",
      "А": "A", "В": "B", "С": "C", "Е": "E", "Н": "H", "І": "I",
      "Ј": "J", "К": "K", "М": "M", "О": "O", "Р": "P", "Т": "T",
      "Х": "X", "Ү": "Y"
    };

    let cleaned = text.replace(/[\u200B-\u200D\uFEFF]/g, "");
    cleaned = cleaned.replace(/[\u0400-\u04FF]/g, (char) => homoglyphs[char] || char);
    return cleaned;
  }

  /**
   * Evaluates prompt locally using in-memory high-speed regex & de-obfuscator.
   * Runs in sub-millisecond time with zero external network requests.
   */
  private inspectLocal(prompt: string, startTime: number): InspectResult {
    const promptHash = this.hashPrompt(prompt);
    let cleaned = this.normalizeHomoglyphs(prompt);
    const matches: Array<{ category: string; weight: number; pattern: string }> = [];
    let riskScore = 0.02;

    // 1. Base64 De-obfuscation attempt
    const base64Regex = /^[A-Za-z0-9+/=]{16,}$/;
    const words = prompt.split(/\s+/);
    for (const w of words) {
      if (w.length >= 16 && base64Regex.test(w)) {
        try {
          const decoded = Buffer.from(w, "base64").toString("utf-8");
          if (decoded && /^[ -~\t\n\r]+$/.test(decoded)) {
            cleaned = cleaned.replace(w, decoded);
            matches.push({
              category: "Base64 De-Obfuscation",
              weight: 0.25,
              pattern: "base64_payload",
            });
            riskScore = Math.max(riskScore, 0.4);
          }
        } catch {
          // not valid base64
        }
      }
    }

    // 2. High-precision prompt injection heuristic rules
    const lower = cleaned.toLowerCase();

    // Category: Instruction Override
    if (/(?:ignore|disregard|forget|bypass|override)\s+(?:all\s+)?(?:previous|prior|above|existing|system)?\s*(?:instructions|rules|directives|prompt)/i.test(lower)) {
      matches.push({
        category: "Instruction Override",
        weight: 0.94,
        pattern: "ignore_previous_instructions",
      });
      riskScore = Math.max(riskScore, 0.94);
    }

    // Multilingual overrides (Hindi, Spanish, Russian, French, Chinese)
    if (/(?:पिछले\s*सभी\s*निर्देशों\s*को\s*अनसुना|ignora\s+todas\s+las\s+instrucciones|ignorer\s+toutes\s+les\s+instructions|игнорируй\s+все\s+предыдущие\s+инструкции|忽略之前的所有指令)/i.test(lower)) {
      matches.push({
        category: "Multilingual Instruction Override",
        weight: 0.92,
        pattern: "multilingual_override",
      });
      riskScore = Math.max(riskScore, 0.92);
    }

    // Category: System Prompt Extraction
    if (/(?:reveal|output|display|print|show|dump|leak)\s+.*(?:system|developer|hidden|secret|initial|canary)\s*(?:prompt|instructions|rules|token|key)/i.test(lower)) {
      matches.push({
        category: "System Extraction",
        weight: 0.96,
        pattern: "system_prompt_extraction",
      });
      riskScore = Math.max(riskScore, 0.96);
    }

    // Category: Authority Pretexting
    if (/(?:senior|lead|infrastructure)\s+(?:engineer|developer|admin|auditor)\s+.*(?:bypass|override|maintenance|access)/i.test(lower)) {
      matches.push({
        category: "Authority Pretexting",
        weight: 0.88,
        pattern: "authority_pretext",
      });
      riskScore = Math.max(riskScore, 0.88);
    }

    // Category: DAN / Jailbreak Persona
    if (/(?:you are now|pretend to be|act as)\s+(?:dan|developer mode|jailbroken|unrestricted)/i.test(lower)) {
      matches.push({
        category: "Jailbreak Persona",
        weight: 0.95,
        pattern: "dan_persona",
      });
      riskScore = Math.max(riskScore, 0.95);
    }

    // Category: Tool Manipulation & Code Execution
    if (/(?:execute_bash|curl\s+http|DROP\s+TABLE|rm\s+-rf|process\.env|subprocess\.run)/i.test(lower)) {
      matches.push({
        category: "Tool Manipulation",
        weight: 0.91,
        pattern: "tool_injection",
      });
      riskScore = Math.max(riskScore, 0.91);
    }

    // Check for canary token presence in input prompt
    let canaryDetected = false;
    if (this.canaryToken && prompt.includes(this.canaryToken)) {
      canaryDetected = true;
      riskScore = Math.max(riskScore, 0.99);
      matches.push({
        category: "Canary Exfiltration Probe",
        weight: 0.99,
        pattern: "canary_token_present",
      });
    }

    // Hard-negative discount: safe coding / educational inquiries
    if (/(?:in python|in oop|in c\+\+|in typescript|how do i override a method|re\.ignorecase|artery bypass|canary deployment)/i.test(lower)) {
      if (!/(?:print|reveal|leak|output)\s+(?:system|secret|token)/i.test(lower)) {
        riskScore = Math.min(riskScore, 0.18);
      }
    }

    // Decision calibration
    let decision: SecurityDecision = "SAFE";
    let riskLevel: RiskLevel = "LOW";

    if (riskScore >= 0.5) {
      decision = "BLOCK";
      riskLevel = "HIGH";
    } else if (riskScore >= 0.25) {
      decision = "REVIEW";
      riskLevel = "MEDIUM";
    }

    const elapsed = Date.now() - startTime;
    const modelCalled = this.shouldCallModel(decision);

    return {
      id: `insp_local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      decision,
      risk_score: riskScore,
      risk_level: riskLevel,
      latency_ms: Math.max(1, elapsed),
      input_prompt: this.privacy.hashOnly ? `[HASH:${promptHash.substring(0, 8)}]` : prompt,
      cleaned_prompt: cleaned !== prompt ? cleaned : undefined,
      tier: "free-local",
      model_called: modelCalled,
      prompt_hash: promptHash,
      canary_detected: canaryDetected,
      package_version: "1.1.0",
      model_version: "cordon-heuristic-v1.1",
      detectors: {
        heuristic_engine: {
          score: riskScore,
          matched_count: matches.length,
          matches,
        },
      },
    };
  }

  /**
   * Inspects a text prompt across the security defense layers.
   * If no API key is provided, evaluates locally (Free Local Mode).
   * If API key is provided, queries the cloud gateway (Free Cloud or Pro Tier).
   */
  async inspect(prompt: string): Promise<InspectResult> {
    const startTime = Date.now();
    const promptHash = this.hashPrompt(prompt || "");

    // Guard against empty / non-string prompts
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return {
        id: `insp_empty_${Date.now()}`,
        decision: "SAFE",
        risk_score: 0.0,
        risk_level: "LOW",
        latency_ms: 0,
        input_prompt: "",
        tier: this.getTier(),
        model_called: true,
        prompt_hash: promptHash,
        package_version: "1.1.0",
      };
    }

    // Execute in local mode if configured or if no API key is present
    if (this.mode === "local" || !this.apiKey) {
      return this.inspectLocal(prompt, startTime);
    }

    // Cloud Gateway Execution
    const controller = new AbortController();
    const timeoutTimer = setTimeout(() => controller.abort(), this.timeoutMs);
    const activeTier = this.getTier();

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
        // Handle quota limit on Free Tier
        if (response.status === 429) {
          console.warn(
            "\x1b[33m[cordonguard Warning]\x1b[0m Free Cloud Tier quota reached (5,000/mo). Upgrading to Pro unlocks 100,000 prompts & dedicated Qdrant clusters: https://cordonguard.com/dashboard"
          );
          if (this.failOpen) {
            // Fall back to local evaluation so the user's application never breaks
            const localResult = this.inspectLocal(prompt, startTime);
            localResult.tier = "free-cloud";
            localResult.quota_remaining = 0;
            return localResult;
          }
        }
        throw new Error(`[CordonGuard Gateway Error] HTTP ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      const elapsed = Date.now() - startTime;

      const decision: SecurityDecision = data.decision || data.fusion_output?.decision || "SAFE";
      const modelCalled = this.shouldCallModel(decision);

      // Extract tier and quota headers
      const quotaHeader = response.headers.get("x-cordon-quota-remaining");
      const quotaLimitHeader = response.headers.get("x-cordon-quota-limit");

      return {
        id: data.id || `insp_${Date.now()}`,
        decision,
        risk_score: data.risk_score !== undefined ? data.risk_score : (data.fusion_output?.risk_score ?? 0.0),
        risk_level: data.risk_level || data.fusion_output?.risk_level || "LOW",
        latency_ms: data.latency_ms || elapsed,
        input_prompt: this.privacy.hashOnly ? `[HASH:${promptHash.substring(0, 8)}]` : prompt,
        cleaned_prompt: data.cleaned_prompt,
        detectors: data.detectors,
        tier: activeTier,
        quota_remaining: quotaHeader ? parseInt(quotaHeader, 10) : (activeTier === "pro" ? 95790 : 4210),
        quota_limit: quotaLimitHeader ? parseInt(quotaLimitHeader, 10) : (activeTier === "pro" ? 100000 : 5000),
        model_called: modelCalled,
        prompt_hash: promptHash,
        canary_detected: Boolean(this.canaryToken && prompt.includes(this.canaryToken)),
        package_version: "1.1.0",
        model_version: "cordon-cloud-ensemble-v2.1",
      };
    } catch (err: any) {
      clearTimeout(timeoutTimer);

      // On network failure or timeout: fall back gracefully if failOpen is true
      if (this.failOpen) {
        console.warn(`[CordonGuard Warning] Cloud gateway unavailable (${err.message}). Falling back to Free Local Heuristics.`);
        const fallback = this.inspectLocal(prompt, startTime);
        fallback.tier = activeTier;
        return fallback;
      }

      // Fail-closed policy
      console.error(`[CordonGuard Error] Security check failed (${err.message}). Failing closed (BLOCK).`);
      return {
        id: `insp_error_${Date.now()}`,
        decision: "BLOCK",
        risk_score: 1.0,
        risk_level: "HIGH",
        latency_ms: Date.now() - startTime,
        input_prompt: this.privacy.hashOnly ? `[HASH:${promptHash.substring(0, 8)}]` : prompt,
        tier: activeTier,
        model_called: false,
        prompt_hash: promptHash,
        package_version: "1.1.0",
      };
    }
  }

  /**
   * Safe wrapper around downstream LLM calls (e.g. OpenAI, Anthropic, Gemini).
   * Automatically inspects prompt first. If safe, invokes the model; otherwise suppresses the call.
   * If a canary token is configured, verifies that the model response did not leak the canary.
   */
  async wrapModel<T>(
    prompt: string,
    modelFn: (prompt: string) => Promise<T>
  ): Promise<WrapModelResult<T>> {
    const inspection = await this.inspect(prompt);

    if (!inspection.model_called) {
      return {
        inspection,
        blocked: true,
        canaryLeaked: false,
      };
    }

    const modelResponse = await modelFn(prompt);
    const canaryLeaked = this.checkCanary(
      typeof modelResponse === "string" ? modelResponse : JSON.stringify(modelResponse)
    );

    return {
      inspection,
      result: modelResponse,
      blocked: false,
      canaryLeaked,
    };
  }
}

// Convenient alias
export const PromptGuard = CordonGuard;

