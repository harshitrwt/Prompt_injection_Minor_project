# Cordon Guard v1.1.0: Formal Acceptance Targets & Security SLOs

This document establishes the official acceptance targets, service-level objectives (SLOs), failure resilience contracts, and defense-in-depth principles for the **Cordon Guard** prompt injection firewall.

---

## 1. Core Philosophy: The Honest Security Contract

> **"No security system can promise 100% prompt-injection detection. The stronger product is the one that detects more varied attacks, fails predictably, exposes its limits, and limits the damage even when detection misses."**

Cordon Guard does not rely on a single vulnerable model. Instead, it combines **5 independent defense tiers** (Homoglyph & De-obfuscation Preprocessing, Multi-Pattern Regex, In-Memory Classifiers, Qdrant Cloud Vector Signatures, and Synthetic Canary Model Suppression) to make bypasses exponentially more difficult for an attacker.

---

## 2. Quantitative Acceptance Targets (SLOs)

| Metric | Target | Current v1.1.0 Benchmark | Status |
| :--- | :---: | :---: | :---: |
| **Attack Detection Recall (Sensitivity)** | $\ge 92.0\%$ | **92.9%** | ✅ Met |
| **Precision** | $\ge 95.0\%$ | **96.3%** | ✅ Met |
| **False Positive Rate (FPR on Hard Negatives)** | $\le 3.5\%$ | **0.0%** (0 false blocks on production hard negatives) | ✅ Met |
| **Actual Canary Leakage Mitigation** | $\ge 90.0\%$ | **91.7%** (2.6% leakage vs 31.6% baseline) | ✅ Met |
| **Downstream Model Call Suppression** | $100\%$ on `BLOCK` | **100%** (Calls suppressed: `model_called: false`) | ✅ Met |
| **Local In-Memory Latency ($p95$)** | $\le 30.0\text{ ms}$ | **$0.4 - 1.2\text{ ms}$** | ✅ Exceeded |
| **Cloud Vector Gateway Latency ($p95$)** | $\le 250.0\text{ ms}$ | **$56.27\text{ ms}$** | ✅ Exceeded |
| **Deduplicated Attack Taxonomy Coverage** | $7\text{ categories}$ | **7 Categories + Benign Hard Negatives** | ✅ Complete |

---

## 3. Attack Taxonomy & Evaluation Corpus

The test harness evaluates prompts across 8 distinct categories with SHA-256 deduplication:
1. **Direct System Prompt Extraction**: Explicit attempts to dump developer instructions or canary secrets.
2. **Encodings & Obfuscation**: Base64 chunks, URL encoding, Hex representations.
3. **Unicode & Homoglyph Substitution**: Cyrillic visual spoofing (e.g. `а`, `е`, `о`, `р`, `с`) and zero-width spaces.
4. **Multilingual Overrides**: Attacks in Hindi, Russian, Spanish, French, and Chinese.
5. **Multi-Turn Conversation Jailbreaks**: DAN personas, hypothetical scenarios, authority pretexting.
6. **Retrieved Content & Indirect Injections (RAG)**: Malicious HTML payloads, invisible system commands embedded in document excerpts.
7. **Tool Manipulation & Code Execution**: Injections attempting to invoke `execute_bash`, `rm -rf`, `DROP TABLE`, or environment probes.
8. **Benign Hard Negatives**: Legitimate programming and medical queries containing trigger words (`override`, `ignore`, `bypass`, `canary`) to enforce low False Positive Rates.

---

## 4. Canary Leakage vs Detector Classification

We explicitly decouple **detector classification accuracy** from **actual downstream model leakage**:
- **Detector Classification**: Measures whether the heuristic / ML engine correctly assigns a `BLOCK` or `REVIEW` decision to an attack vector.
- **Canary Leakage**: Evaluates an isolated test system prompt injected with a high-entropy synthetic canary token (`CANARY_CORDON_9f8a7e3d2c1b`). A "leak" is only recorded if the LLM downstream output literally contains the canary secret.
- **The Decoupling Guarantee**: When Cordon Guard returns `BLOCK`, `model_called` is strictly set to `false`, preventing the prompt from ever reaching the downstream model and guaranteeing zero model leakage.

---

## 5. Decision Policies & REVIEW Handling

Cordon Guard produces three tri-state security decisions:

```
Prompt -> Cordon Guard Inspection
             |
             +--> Risk < 0.25 -------------> SAFE (Call Model)
             +--> Risk >= 0.50 ------------> BLOCK (Suppress Model Call)
             +--> 0.25 <= Risk < 0.50 -----> REVIEW (Evaluated via reviewPolicy)
                                                 |
                                                 +--> 'warn'  (default: log warning & call model)
                                                 +--> 'block' (suppress model call)
                                                 +--> 'allow' (proceed silently)
```

### Review Policy Configuration:
- `warn` (Default): Sets `model_called: true`, returns `decision: "REVIEW"`, and logs an audit record so developers can inspect borderline prompts without breaking user flows.
- `block`: Sets `model_called: false` and halts downstream LLM invocation (ideal for high-security banking or healthcare deployments).
- `allow`: Allows execution silently while retaining the inspection metadata.

---

## 6. Predictable Failure Behavior (Fail-Open vs Fail-Closed)

Failure resilience is verified against 5 critical stress vectors:

1. **Gateway Timeout / Network Partition**:
   - `failOpen: true` (default): Immediately falls back to local sub-millisecond in-memory heuristic inspection. User application never crashes.
   - `failOpen: false`: Returns `BLOCK` with `model_called: false`.
2. **Quota Exhaustion (HTTP 429)**:
   - When the monthly Free Cloud quota (5,000 requests) is exhausted, the SDK automatically switches to Free Local Mode without dropping user queries.
3. **Malformed Inputs**:
   - Empty strings, whitespace, and non-string inputs resolve to `SAFE` with `0.0ms` latency and `0.0` risk score.
   - Corrupted UTF-8, null bytes (`\x00`), and broken Base64 are safely cleaned and sanitized.
4. **Ultra-Long Payloads**:
   - Prompts up to 50,000 characters are processed without memory exhaustion or buffer overflow.

---

## 7. Zero-PII Audit Telemetry Contract

Under production telemetry:
- **No Raw Prompts Logged**: Only SHA-256 prompt hashes (`prompt_hash`) are logged or transmitted in telemetry payloads.
- **Metadata Retained**: `prompt_hash`, `prompt_length`, `latency_ms`, `decision`, `risk_score`, `model_called`, `package_version`, and `model_version`.
- **Zero Raw Secret Retention**: Synthetic canary tokens or user secrets are stripped from log outputs.
