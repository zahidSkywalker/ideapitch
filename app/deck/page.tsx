"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";

interface DeckData {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  features: { icon: string; title: string; description: string }[];
  cta: string;
  gradient: string;
}

function DeckContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const deck: DeckData | null = useMemo(() => {
    try {
      const d = searchParams.get("d");
      if (!d) return null;
      return JSON.parse(decodeURIComponent(atob(d)));
    } catch {
      return null;
    }
  }, [searchParams]);

  if (!deck) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-zinc-400 text-lg">No deck data found.</p>
        <button onClick={() => router.push("/")} className="text-violet-400 hover:text-violet-300 transition-colors">
          &larr; Create a new pitch deck
        </button>
      </div>
    );
  }

  const grad = deck.gradient || "from-violet-600 via-purple-600 to-indigo-700";

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Slide 1: Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${grad} gradient-animate relative`}>
        <div className="slide-up text-center max-w-3xl">
          <p className="text-white/40 text-xs font-medium uppercase tracking-[0.35em] mb-8">Pitch Deck</p>
          <h1 className="text-7xl md:text-9xl font-extrabold text-white mb-8 leading-[0.9] tracking-tight">
            {deck.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-normal leading-relaxed max-w-xl mx-auto">
            {deck.tagline}
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Slide 2: Problem */}
      <section className="py-32 md:py-40 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <p className="text-violet-400/80 text-xs font-semibold uppercase tracking-[0.3em] mb-5">The Problem</p>
          <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-zinc-300 leading-[1.8] font-light">
            {deck.problem}
          </p>
        </div>
      </section>

      {/* Slide 3: Solution */}
      <section className="py-32 md:py-40 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <p className="text-violet-400/80 text-xs font-semibold uppercase tracking-[0.3em] mb-5">The Solution</p>
          <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-zinc-300 leading-[1.8] font-light">
            {deck.solution}
          </p>
        </div>
      </section>

      {/* Slide 4: Features */}
      <section className="py-32 md:py-40 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-violet-400/80 text-xs font-semibold uppercase tracking-[0.3em] mb-5">Key Features</p>
          <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className="group bg-zinc-900/40 border border-zinc-800/40 rounded-2xl p-8 hover:bg-zinc-900/60 hover:border-violet-800/30 transition-all duration-300"
              >
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide 5: CTA */}
      <section className={`py-32 md:py-40 flex flex-col items-center justify-center px-8 bg-gradient-to-t ${grad} gradient-animate`}>
        <div className="text-center max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {deck.cta}
          </h2>
          <p className="text-white/40 text-sm mb-10 tracking-wide">{deck.name} &mdash; Coming Soon</p>
          <button className="group relative px-10 py-4 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-200 text-base cursor-pointer shadow-lg shadow-black/20">
            Get Early Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 flex flex-col items-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="text-zinc-500 hover:text-violet-400 transition-colors text-sm cursor-pointer"
        >
          &larr; Create another pitch deck
        </button>
        <p className="text-zinc-800 text-xs">Built with IdeaPitch</p>
      </footer>
    </div>
  );
}

export default function DeckPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full spin-slow" />
        </div>
      }
    >
      <DeckContent />
    </Suspense>
  );
}