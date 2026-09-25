"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does the browser extension intercept prompts without compromising privacy?",
    a: "Cordon runs natively inside your browser. Prompt de-obfuscation and heuristic checks occur completely in-memory on your device. When vector similarity search is enabled, only mathematical embedding vectors are transmitted to your secure Qdrant instance. No chat conversations are stored or harvested.",
  },
  {
    q: "Does this introduce noticeable latency into my chat workflow?",
    a: "No. The entire 3-detector pipeline executes in under 45 milliseconds. De-obfuscation and heuristic regex run in < 5ms, statistical ML inference takes < 15ms, and vector similarity search takes < 25ms, well below human perceptual delay.",
  },
  {
    q: "Which AI interfaces and web platforms are supported out of the box?",
    a: "Cordon currently provides automated DOM interception hooks for ChatGPT (chatgpt.com), Claude (claude.ai), Google Gemini, Microsoft Copilot, and self-hosted Open-WebUI / Ollama deployments.",
  },
  {
    q: "How does the in-memory de-obfuscator handle encoded payloads?",
    a: "Attackers frequently smuggle malicious prompts using Base64, Hex encoding, or invisible zero-width Unicode homoglyphs. Cordon's preprocessor detects and normalizes these obfuscation layers in-memory before scoring, ensuring covert bypass techniques are exposed.",
  },
  {
    q: "Can I customize detection thresholds or add organization-specific rules?",
    a: "Yes. From the extension popup or the middleware configuration file, you can adjust the stacking fusion risk tolerance (e.g., stricter blocking thresholds) and add custom regex patterns for proprietary tokens or internal credentials.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-ash py-24 sm:py-32">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="mb-14 max-w-[620px]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
            Inquiries &amp; Answers
          </span>
          <h2 className="heading-editorial mt-3 text-[clamp(2rem,4vw,3.2rem)] text-off-black">
            Frequently asked questions.
          </h2>
        </div>

        <div className="border-t border-ash">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="border-b border-ash py-8 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 text-left"
                >
                  <span className="heading-editorial text-[22px] text-off-black sm:text-[24px]">
                    {faq.q}
                  </span>
                  <span
                    className={`mt-1 font-mono text-[20px] text-off-black transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4 max-w-[820px] pr-8">
                    <p className="font-mono text-[15px] leading-relaxed text-graphite">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
