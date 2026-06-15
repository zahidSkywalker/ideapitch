"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EXAMPLES = [
  "AI-powered plant care app",
  "Smart grocery list that plans meals",
  "Social network for pet owners",
  "AI tutor that adapts to your pace",
  "Car pooling app for commuters",
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
      if (!res.ok) throw new Error();
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
    <div className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/[0.07] blur-[100px] pointer-events-none" />

      {/* Brand */}
      <div className="relative z-10 text-center mb-14">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-zinc-800/60 bg-zinc-900/40">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
          <span className="text-zinc-500 text-xs tracking-wide">AI-Powered</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Idea<span className="text-violet-400">Pitch</span>
        </h1>
        <p className="text-zinc-500 text-base max-w-sm mx-auto leading-relaxed">
          Turn any startup idea into a stunning pitch deck in seconds.
        </p>
      </div>

      {/* Input */}
      <div className="relative z-10 w-full max-w-lg mb-8">
        <div className="flex gap-2.5 p-1.5 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl backdrop-blur-sm">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="Describe your startup idea..."
            className="glow-input flex-1 bg-transparent px-4 py-3.5 text-[15px] text-white placeholder-zinc-600 outline-none"
            disabled={loading}
          />
          <button
            onClick={generate}
            disabled={loading || !idea.trim()}
            className="px-6 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-semibold text-white text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            {loading ? (
              <svg className="w-4 h-4 spin-slow" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" className="opacity-25" />
                <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            ) : (
              "Generate Deck"
            )}
          </button>
        </div>
      </div>

      {/* Examples */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 max-w-lg">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setIdea(ex)}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900/30 border border-zinc-800/30 text-zinc-500 text-xs hover:text-zinc-300 hover:border-zinc-700/50 transition-all duration-200 cursor-pointer"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}