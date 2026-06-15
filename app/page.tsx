"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EXAMPLES = [
  "AI-powered plant care app",
  "Smart grocery list that plans meals",
  "Social network for pet owners",
  "AI tutor that adapts to your pace",
  "Car pooling app for office commuters",
];

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generate = async () => {
    const trimmed = idea.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: trimmed }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
      router.push(`/deck?d=${encoded}`);
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* Brand */}
      <div className="slide-up mb-12 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Idea<span className="text-violet-400">Pitch</span>
        </h1>
        <p className="text-zinc-400 mt-3 text-lg">
          Your idea. Stunning pitch deck. 10 seconds.
        </p>
      </div>

      {/* Input */}
      <div className="slide-up slide-up-delay-1 w-full max-w-xl relative z-10">
        <div className="flex gap-3">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="Describe your startup idea..."
            className="glow-input flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl px-5 py-4 text-lg text-white placeholder-zinc-500 outline-none transition-all"
            disabled={loading}
          />
          <button
            onClick={generate}
            disabled={loading || !idea.trim()}
            className="px-6 py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-colors flex items-center gap-2"
          >
            {loading ? (
              <svg className="w-5 h-5 spin-slow" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>

      {/* Example chips */}
      <div className="slide-up slide-up-delay-2 mt-6 flex flex-wrap justify-center gap-2 max-w-xl relative z-10">
        <span className="text-zinc-500 text-sm">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setIdea(ex)}
            className="px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/60 text-zinc-400 text-sm hover:text-violet-300 hover:border-violet-800/50 transition-colors cursor-pointer"
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Footer hint */}
      <p className="slide-up slide-up-delay-3 absolute bottom-8 text-zinc-600 text-sm">
        AI-generated pitch decks — not a real startup, just a demo
      </p>
    </div>
  );
}