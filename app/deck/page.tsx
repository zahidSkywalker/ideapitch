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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Invalid or missing deck data.</p>
      </div>
    );
  }

  const grad = deck.gradient || "from-violet-600 via-purple-600 to-indigo-700";

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Slide 1: Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br ${grad} gradient-animate relative`}>
        <div className="slide-up text-center max-w-3xl">
          <p className="text-white/50 text-sm uppercase tracking-[6px] mb-6">Pitch Deck</p>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            {deck.name}
          </h1>
          <p className="text-2xl md:text-3xl text-white/80 font-light">
            {deck.tagline}
          </p>
        </div>
        <div className="absolute bottom-12 text-white/30 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Slide 2: Problem */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-2xl text-center slide-up">
          <p className="text-violet-400 text-sm uppercase tracking-[4px] mb-4">The Problem</p>
          <div className="w-16 h-0.5 bg-violet-600 mx-auto mb-8" />
          <p className="text-2xl md:text-3xl text-zinc-200 leading-relaxed font-light">
            {deck.problem}
          </p>
        </div>
      </section>

      <div className="section-divider max-w-lg mx-auto" />

      {/* Slide 3: Solution */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center slide-up">
          <p className="text-violet-400 text-sm uppercase tracking-[4px] mb-4">The Solution</p>
          <div className="w-16 h-0.5 bg-violet-600 mx-auto mb-8" />
          <p className="text-2xl md:text-3xl text-zinc-200 leading-relaxed font-light">
            {deck.solution}
          </p>
        </div>
      </section>

      <div className="section-divider max-w-lg mx-auto" />

      {/* Slide 4: Features */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full">
          <p className="text-center text-violet-400 text-sm uppercase tracking-[4px] mb-4 slide-up">Key Features</p>
          <div className="w-16 h-0.5 bg-violet-600 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className={`feature-card slide-up slide-up-delay-${i + 1} bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-7`}
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-lg mx-auto" />

      {/* Slide 5: CTA */}
      <section className={`min-h-[70vh] flex flex-col items-center justify-center px-6 bg-gradient-to-t ${grad} gradient-animate`}>
        <div className="text-center slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {deck.cta}
          </h2>
          <p className="text-white/60 text-lg mb-8">{deck.name} — Coming Soon</p>
          <button className="px-8 py-4 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-colors text-lg cursor-pointer">
            Get Early Access
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <button
          onClick={() => router.push("/")}
          className="text-violet-400 hover:text-violet-300 transition-colors text-sm cursor-pointer"
        >
          ← Create another pitch deck
        </button>
        <p className="text-zinc-700 text-xs mt-2">Built with IdeaPitch</p>
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