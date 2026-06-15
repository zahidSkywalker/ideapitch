import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

const SYSTEM_PROMPT = `You are a startup pitch deck copywriter. Given a startup idea, generate JSON with exactly these 5 sections. Be concise, punchy, and compelling.

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "name": "Short catchy product name (2-3 words max)",
  "tagline": "One powerful hook sentence",
  "problem": "2-3 sentences about the pain point",
  "solution": "2-3 sentences about how this solves it",
  "features": [
    { "icon": "emoji", "title": "Feature name", "description": "One line description" }
  ],
  "cta": "Call to action text (e.g. 'Join 5,000+ on the waitlist')",
  "gradient": "A tailwind gradient class for the hero (e.g. 'from-violet-600 via-purple-600 to-indigo-700')"
}

Rules:
- name: max 3 words, no quotes
- tagline: max 15 words, powerful
- problem: relatable, specific
- solution: clear, confident
- features: exactly 4 items, use relevant emojis for icons
- cta: include a fake impressive number
- gradient: pick from violet, purple, indigo, blue, cyan, fuchsia, pink, emerald, amber palettes — must look great on dark bg`;

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();
    if (!idea || typeof idea !== "string" || idea.trim().length < 3) {
      return NextResponse.json({ error: "Idea too short" }, { status: 400 });
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Generate a pitch deck for: ${idea.trim()}` },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const text = completion.choices[0]?.message?.content || "";
    // Strip code fences if present
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const deck = JSON.parse(cleaned);

    return NextResponse.json(deck);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}