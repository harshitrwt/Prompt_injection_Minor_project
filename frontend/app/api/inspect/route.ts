import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, sensitivity } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing or invalid prompt string" }, { status: 400 });
    }

    const gatewayUrl = process.env.GATEWAY_URL || "http://127.0.0.1:8000";
    const apiKey = process.env.CORDON_API_KEY || "test_playground";

    const resp = await fetch(`${gatewayUrl}/v1/inspect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ prompt, sensitivity: sensitivity || "balanced" }),
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });

    const data = await resp.json().catch(() => ({ error: "Invalid gateway response" }));
    if (!resp.ok) {
      return NextResponse.json(
        { error: data.detail || data.error || `Gateway returned ${resp.status}` },
        { status: resp.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: "Inspection gateway is unavailable. Check GATEWAY_URL and the gateway health endpoint.",
        detail: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 503 },
    );
  }
}
