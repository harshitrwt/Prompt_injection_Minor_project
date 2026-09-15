import { CodeBlock } from "../CodeBlock";

const steps = [
  {
    n: "1",
    title: "Get your key",
    body: "Create an account and grab an API key from your dashboard. The demo tier needs no card.",
  },
  {
    n: "2",
    title: "Install the package",
    body: "Add the SDK to whatever runs your bot — Node, Python, or a raw HTTP call all work the same way.",
  },
  {
    n: "3",
    title: "Screen the message",
    body: "Pass the incoming prompt to Cordon before your LLM sees it, and act on the verdict it returns.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t-[3px] border-ink bg-paper py-24">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-14 max-w-[560px]">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-ink">
            Three steps, ten minutes
          </h2>
          <p className="mt-4 font-body text-[16px] leading-relaxed text-ink-60">
            No infrastructure to run. Cordon is a hosted screening layer —
            you call it, it answers, your bot decides what to do next.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col gap-3">
              <span className="font-display text-[15px] text-ink-60">
                {s.n}
              </span>
              <h3 className="font-body text-[19px] font-semibold text-ink">
                {s.title}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-ink-60">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-[220px_1fr] lg:items-start">
          <div className="hidden lg:block">
            <p className="font-body text-[13px] leading-relaxed text-ink-60">
              A middleware call, same shape as the ones you already write
              for auth or logging.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <CodeBlock label="Terminal" code={`npm i cordon-sdk`} />
            <CodeBlock
              label="bot.js"
              code={`import { Cordon } from "cordon-sdk";

const cordon = new Cordon({ apiKey: process.env.CORDON_API_KEY });

app.post("/chat", async (req, res) => {
  const verdict = await cordon.screen(req.body.message);

  if (verdict.decision === "BLOCK") {
    return res.send("I can't help with that one.");
  }

  const reply = await yourLLM.respond(req.body.message);
  res.send(reply);
});`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
