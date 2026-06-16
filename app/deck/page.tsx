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
  accent: string;
  theme: string;
  stat: { value: string; label: string };
  category: string;
}

/* ─── Accent color utilities ─── */
function getAccentClasses(accent: string) {
  const map: Record<string, { text: string; bg: string; border: string; glow: string; bgSoft: string; borderSoft: string; ring: string }> = {
    violet:  { text: "text-violet-400",  bg: "bg-violet-500",  border: "border-violet-500/30",  glow: "shadow-violet-500/20",  bgSoft: "bg-violet-500/10",  borderSoft: "border-violet-500/15", ring: "ring-violet-500/20" },
    cyan:    { text: "text-cyan-400",    bg: "bg-cyan-500",    border: "border-cyan-500/30",    glow: "shadow-cyan-500/20",    bgSoft: "bg-cyan-500/10",    borderSoft: "border-cyan-500/15", ring: "ring-cyan-500/20" },
    rose:    { text: "text-rose-400",    bg: "bg-rose-500",    border: "border-rose-500/30",    glow: "shadow-rose-500/20",    border: "border-rose-500/15", bgSoft: "bg-rose-500/10",     ring: "ring-rose-500/20" },
    emerald: { text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", border: "border-emerald-500/15", bgSoft: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
    amber:   { text: "text-amber-400",   bg: "bg-amber-500",   border: "border-amber-500/30",   glow: "shadow-amber-500/20",   border: "border-amber-500/15", bgSoft: "bg-amber-500/10",  ring: "ring-amber-500/20" },
    indigo:  { text: "text-indigo-400",  bg: "bg-indigo-500",  border: "border-indigo-500/30",  glow: "shadow-indigo-500/20",  border: "border-indigo-500/15", bgSoft: "bg-indigo-500/10", ring: "ring-indigo-500/20" },
    pink:    { text: "text-pink-400",    bg: "bg-pink-500",    border: "border-pink-500/30",    glow: "shadow-pink-500/20",    border: "border-pink-500/15", bgSoft: "bg-pink-500/10",    ring: "ring-pink-500/20" },
    sky:     { text: "text-sky-400",     bg: "bg-sky-500",     border: "border-sky-500/30",     glow: "shadow-sky-500/20",     border: "border-sky-500/15", bgSoft: "bg-sky-500/10",     ring: "ring-sky-500/20" },
  };
  return map[accent] || map.violet;
}

/* ─── THEME: Minimal ─── */
function ThemeMinimal({ deck, a }: { deck: DeckData; a: ReturnType<typeof getAccentClasses> }) {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${deck.gradient} gradient-animate relative`}>
        <div className="slide-up text-center max-w-3xl mx-auto">
          <div className={`inline-block px-4 py-1.5 rounded-full border ${a.borderSoft} bg-white/[0.06] backdrop-blur-sm mb-10`}>
            <span className="text-white/50 text-xs font-medium tracking-[0.3em] uppercase">Pitch Deck</span>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white mb-8 leading-[0.92] tracking-tight">
            {deck.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-xl mx-auto">
            {deck.tagline}
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 slide-up-delay-3">
          <div className="w-5 h-9 rounded-full border-2 border-white/15 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stat Banner */}
      <section className="py-16 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`slide-up inline-flex flex-col items-center gap-3 px-10 py-8 rounded-2xl border ${a.borderSoft} bg-white/[0.02]`}>
            <span className={`text-5xl sm:text-6xl font-extrabold ${a.text}`}>{deck.stat.value}</span>
            <span className="text-zinc-500 text-sm font-medium tracking-wide">{deck.stat.label}</span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-28 md:py-36 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>The Problem</span>
          <div className={`w-8 h-px ${a.bg} opacity-40 mx-auto mb-10`} />
          <p className="text-lg sm:text-xl md:text-[22px] text-zinc-400 leading-[1.9] font-light">
            {deck.problem}
          </p>
        </div>
      </section>

      <div className="section-divider max-w-xs mx-auto" />

      {/* Solution */}
      <section className="py-28 md:py-36 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>The Solution</span>
          <div className={`w-8 h-px ${a.bg} opacity-40 mx-auto mb-10`} />
          <p className="text-lg sm:text-xl md:text-[22px] text-zinc-400 leading-[1.9] font-light">
            {deck.solution}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>Key Features</span>
            <div className={`w-8 h-px ${a.bg} opacity-40 mx-auto`} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className={`feature-card group p-8 md:p-10 rounded-2xl border ${a.borderSoft} bg-white/[0.015] hover:bg-white/[0.035] slide-up-delay-${i + 1}`}
              >
                <span className="text-3xl block mb-5">{f.icon}</span>
                <h3 className="text-base font-semibold text-zinc-100 mb-2.5">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-[1.75]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-32 md:py-44 flex flex-col items-center justify-center px-8 bg-gradient-to-t ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative z-10 text-center max-w-xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-[1.1]">
            {deck.cta}
          </h2>
          <p className="text-white/35 text-sm mb-12 tracking-wide font-light">{deck.name} &mdash; Coming Soon</p>
          <button className={`group relative px-10 py-4 ${a.bg} text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-200 text-base cursor-pointer shadow-lg ${a.glow}`}>
            Get Early Access
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── THEME: Bold ─── */
function ThemeBold({ deck, a }: { deck: DeckData; a: ReturnType<typeof getAccentClasses> }) {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-white/[0.04] blur-[80px] float-orb" />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-white/[0.03] blur-[60px] float-orb-delay" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="slide-up">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-white mb-6 leading-[0.85] tracking-tighter uppercase">
              {deck.name}
            </h1>
            <div className={`w-20 h-1.5 ${a.bg} mx-auto mb-8 rounded-full`} />
            <p className="text-xl sm:text-2xl text-white/55 font-light max-w-lg mx-auto leading-relaxed">
              {deck.tagline}
            </p>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 slide-up-delay-4">
          <div className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stat */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { val: deck.stat.value, lbl: deck.stat.label },
            { val: "3", lbl: "Simple steps to start" },
            { val: "\u221E", lbl: "Possibilities unlocked" },
          ].map((s, i) => (
            <div key={i} className={`text-center p-8 rounded-2xl border ${a.borderSoft} bg-white/[0.015] slide-up-delay-${i + 1}`}>
              <div className={`text-4xl sm:text-5xl font-black ${a.text} mb-2`}>{s.val}</div>
              <div className="text-zinc-500 text-sm">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem — big quote style */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-3xl mx-auto">
          <span className={`inline-block ${a.text} text-[11px] font-bold uppercase tracking-[0.4em] mb-10`}>The Problem</span>
          <div className={`text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-200 leading-[1.5] tracking-tight`}>
            &ldquo;{deck.problem}&rdquo;
          </div>
        </div>
      </section>

      <div className="section-divider max-w-sm mx-auto" />

      {/* Solution */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-3xl mx-auto">
          <span className={`inline-block ${a.text} text-[11px] font-bold uppercase tracking-[0.4em] mb-10`}>The Solution</span>
          <p className="text-lg sm:text-xl text-zinc-400 leading-[1.9] font-light">
            {deck.solution}
          </p>
        </div>
      </section>

      {/* Features — large cards */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-block ${a.text} text-[11px] font-bold uppercase tracking-[0.4em] mb-8`}>Key Features</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className={`feature-card group p-10 md:p-12 rounded-3xl border ${a.borderSoft} bg-white/[0.02] hover:bg-white/[0.04] slide-up-delay-${i + 1}`}
              >
                <span className="text-4xl block mb-6">{f.icon}</span>
                <h3 className="text-xl font-bold text-zinc-100 mb-3">{f.title}</h3>
                <p className="text-zinc-500 text-[15px] leading-[1.8]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-36 md:py-48 flex flex-col items-center justify-center px-8 bg-gradient-to-t ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="relative z-10 text-center max-w-xl">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-[1] tracking-tight">
            {deck.cta}
          </h2>
          <p className="text-white/30 text-sm mb-14 tracking-widest uppercase font-light">{deck.name} &mdash; Coming Soon</p>
          <button className={`px-12 py-5 ${a.bg} text-white font-bold rounded-2xl hover:opacity-90 transition-all duration-200 text-lg cursor-pointer shadow-2xl ${a.glow}`}>
            Get Early Access
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── THEME: Glassmorphism ─── */
function ThemeGlassmorphism({ deck, a }: { deck: DeckData; a: ReturnType<typeof getAccentClasses> }) {
  return (
    <div className="min-h-screen bg-[#09090b] relative">
      <div className="fixed inset-0 dot-pattern opacity-40 pointer-events-none" />

      {/* Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${deck.gradient} gradient-animate relative`}>
        <div className="slide-up text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.1] mb-10">
            <div className={`w-2 h-2 rounded-full ${a.bg} shadow-[0_0_10px_currentColor]`} />
            <span className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase">Pitch Deck</span>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-white mb-8 leading-[0.92] tracking-tight">
            {deck.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/55 font-light leading-relaxed max-w-xl mx-auto">
            {deck.tagline}
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 slide-up-delay-3">
          <div className="w-5 h-9 rounded-full border-2 border-white/15 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Problem — glass card */}
      <section className="py-28 md:py-36 flex items-center justify-center px-8 relative z-10">
        <div className={`max-w-2xl w-full p-10 md:p-14 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]`}>
          <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>The Problem</span>
          <p className="text-lg sm:text-xl text-zinc-300 leading-[1.9] font-light">
            {deck.problem}
          </p>
        </div>
      </section>

      {/* Stat */}
      <section className="py-16 px-8 relative z-10">
        <div className="max-w-md mx-auto text-center">
          <div className={`inline-flex flex-col items-center gap-2 px-8 py-6 rounded-2xl bg-white/[0.04] backdrop-blur-lg border border-white/[0.07]`}>
            <span className={`text-4xl sm:text-5xl font-extrabold ${a.text}`}>{deck.stat.value}</span>
            <span className="text-zinc-500 text-xs font-medium tracking-wider uppercase">{deck.stat.label}</span>
          </div>
        </div>
      </section>

      {/* Solution — glass card */}
      <section className="py-28 md:py-36 flex items-center justify-center px-8 relative z-10">
        <div className={`max-w-2xl w-full p-10 md:p-14 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]`}>
          <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>The Solution</span>
          <p className="text-lg sm:text-xl text-zinc-300 leading-[1.9] font-light">
            {deck.solution}
          </p>
        </div>
      </section>

      {/* Features — glass cards */}
      <section className="py-28 md:py-36 px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>Key Features</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className={`feature-card group p-8 md:p-10 rounded-2xl bg-white/[0.03] backdrop-blur-lg border border-white/[0.06] hover:bg-white/[0.06] slide-up-delay-${i + 1}`}
              >
                <span className="text-3xl block mb-5">{f.icon}</span>
                <h3 className="text-base font-semibold text-zinc-100 mb-2.5">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-[1.75]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-32 md:py-44 flex flex-col items-center justify-center px-8 bg-gradient-to-t ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 text-center max-w-xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-[1.1]">
            {deck.cta}
          </h2>
          <p className="text-white/30 text-sm mb-12 tracking-wide font-light">{deck.name} &mdash; Coming Soon</p>
          <button className={`px-10 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/15 hover:bg-white/15 transition-all duration-200 text-base cursor-pointer`}>
            Get Early Access
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── THEME: Geometric ─── */
function ThemeGeometric({ deck, a }: { deck: DeckData; a: ReturnType<typeof getAccentClasses> }) {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute inset-0 grid-pattern opacity-50" />
        {/* Corner accents */}
        <div className="absolute top-16 left-16 w-24 h-24 border-t-2 border-l-2 border-white/10 rounded-tl-3xl" />
        <div className="absolute bottom-16 right-16 w-24 h-24 border-b-2 border-r-2 border-white/10 rounded-br-3xl" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="slide-up">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className={`w-12 h-px ${a.bg} opacity-60`} />
              <span className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.4em]">Pitch Deck</span>
              <div className={`w-12 h-px ${a.bg} opacity-60`} />
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.88] tracking-tighter uppercase">
              {deck.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/50 font-light leading-relaxed max-w-md mx-auto">
              {deck.tagline}
            </p>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 slide-up-delay-3">
          <div className="w-5 h-9 rounded-full border-2 border-white/15 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-28 md:py-36 px-8 relative">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className={`w-10 h-10 rounded-lg ${a.bgSoft} ${a.borderSoft} border flex items-center justify-center`}>
              <span className={`text-sm font-bold ${a.text}`}>01</span>
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-[0.35em] ${a.text}`}>The Problem</span>
          </div>
          <p className="text-lg sm:text-xl md:text-[22px] text-zinc-400 leading-[1.9] font-light pl-14">
            {deck.problem}
          </p>
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Solution */}
      <section className="py-28 md:py-36 px-8 relative">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className={`w-10 h-10 rounded-lg ${a.bgSoft} ${a.borderSoft} border flex items-center justify-center`}>
              <span className={`text-sm font-bold ${a.text}`}>02</span>
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-[0.35em] ${a.text}`}>The Solution</span>
          </div>
          <p className="text-lg sm:text-xl md:text-[22px] text-zinc-400 leading-[1.9] font-light pl-14">
            {deck.solution}
          </p>
        </div>
      </section>

      {/* Stat */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { val: deck.stat.value, lbl: deck.stat.label },
            { val: deck.features.length.toString(), lbl: "Core features" },
            { val: "<1min", lbl: "Time to value" },
          ].map((s, i) => (
            <div key={i} className={`text-center py-8 px-6 rounded-xl border ${a.borderSoft} bg-white/[0.015]`}>
              <div className={`text-3xl sm:text-4xl font-black ${a.text} mb-1.5`}>{s.val}</div>
              <div className="text-zinc-500 text-xs tracking-wider uppercase">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features — numbered */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className={`w-10 h-10 rounded-lg ${a.bgSoft} ${a.borderSoft} border flex items-center justify-center`}>
              <span className={`text-sm font-bold ${a.text}`}>03</span>
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-[0.35em] ${a.text}`}>Key Features</span>
          </div>
          <div className="space-y-4 pl-14">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className={`feature-card group flex items-start gap-6 p-6 md:p-8 rounded-2xl border ${a.borderSoft} bg-white/[0.015] hover:bg-white/[0.035]`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-zinc-100 mb-1.5">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-[1.75]">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-32 md:py-44 flex flex-col items-center justify-center px-8 bg-gradient-to-t ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10 text-center max-w-xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-[1] tracking-tight uppercase">
            {deck.cta}
          </h2>
          <p className="text-white/30 text-sm mb-12 tracking-widest uppercase font-light">{deck.name} &mdash; Coming Soon</p>
          <button className={`px-10 py-4 ${a.bg} text-white font-bold rounded-xl hover:opacity-90 transition-all duration-200 text-base cursor-pointer shadow-lg ${a.glow}`}>
            Get Early Access
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── THEME: Organic ─── */
function ThemeOrganic({ deck, a }: { deck: DeckData; a: ReturnType<typeof getAccentClasses> }) {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-white/[0.04] blur-[120px] float-orb" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-white/[0.03] blur-[100px] float-orb-delay" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="slide-up">
            <p className="text-white/40 text-sm font-medium tracking-[0.2em] uppercase mb-8">Introducing</p>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white mb-8 leading-[0.92] tracking-tight">
              {deck.name}
            </h1>
            <div className={`w-16 h-16 rounded-full ${a.bg} opacity-20 mx-auto mb-10 blur-xl`} />
            <p className="text-lg sm:text-xl text-white/55 font-light leading-relaxed max-w-md mx-auto">
              {deck.tagline}
            </p>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 slide-up-delay-3">
          <div className="w-5 h-9 rounded-full border-2 border-white/15 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-28 md:py-40 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <div className={`w-10 h-10 rounded-full ${a.bgSoft} border ${a.borderSoft} flex items-center justify-center mx-auto mb-8`}>
            <span className={`text-xs font-bold ${a.text}`}>!</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-200 mb-8">The Problem</h3>
          <p className="text-lg sm:text-xl text-zinc-400 leading-[1.9] font-light">
            {deck.problem}
          </p>
        </div>
      </section>

      {/* Stat */}
      <section className="py-16 px-8">
        <div className="max-w-md mx-auto text-center">
          <div className={`slide-up inline-flex flex-col items-center gap-2 py-8`}>
            <span className={`text-5xl sm:text-6xl font-extrabold ${a.text}`}>{deck.stat.value}</span>
            <span className="text-zinc-500 text-xs font-medium tracking-wider uppercase">{deck.stat.label}</span>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-28 md:py-40 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          <div className={`w-10 h-10 rounded-full ${a.bgSoft} border ${a.borderSoft} flex items-center justify-center mx-auto mb-8`}>
            <span className={`text-sm font-bold ${a.text}`}>\u2713</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-200 mb-8">The Solution</h3>
          <p className="text-lg sm:text-xl text-zinc-400 leading-[1.9] font-light">
            {deck.solution}
          </p>
        </div>
      </section>

      {/* Features — circular icon style */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-xl font-semibold text-zinc-200 mb-2">Key Features</h3>
            <p className="text-zinc-600 text-sm">Everything you need, nothing you don&rsquo;t</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className={`feature-card group flex items-start gap-5 p-7 md:p-8 rounded-2xl border ${a.borderSoft} bg-white/[0.015] hover:bg-white/[0.035]`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${a.bgSoft} border ${a.borderSoft} flex items-center justify-center text-xl`}>
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-zinc-100 mb-1.5">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-[1.75]">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-32 md:py-44 flex flex-col items-center justify-center px-8 bg-gradient-to-t ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 text-center max-w-xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-[1.1]">
            {deck.cta}
          </h2>
          <p className="text-white/35 text-sm mb-12 tracking-wide font-light">{deck.name} &mdash; Coming Soon</p>
          <button className={`px-10 py-4 ${a.bg} text-white font-semibold rounded-full hover:opacity-90 transition-all duration-200 text-base cursor-pointer shadow-lg ${a.glow}`}>
            Get Early Access
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── THEME: Spotlight ─── */
function ThemeSpotlight({ deck, a }: { deck: DeckData; a: ReturnType<typeof getAccentClasses> }) {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <section className={`min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-br ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full ${a.bg} opacity-[0.07] blur-[120px]`} />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="slide-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/[0.08] mb-10">
              <span className="text-white/50 text-xs font-medium tracking-[0.3em] uppercase">Pitch Deck</span>
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.88] tracking-tight">
              {deck.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto">
              {deck.tagline}
            </p>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 slide-up-delay-3">
          <div className="w-5 h-9 rounded-full border-2 border-white/15 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-3xl mx-auto relative">
          <div className={`absolute -top-4 -left-4 w-32 h-32 rounded-full ${a.bg} opacity-[0.04] blur-[60px]`} />
          <div className="relative">
            <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>The Problem</span>
            <p className="text-lg sm:text-xl md:text-[22px] text-zinc-400 leading-[1.9] font-light">
              {deck.problem}
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-xl mx-auto" />

      {/* Stat */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-16 sm:gap-24">
          <div className="text-center">
            <div className={`text-4xl sm:text-5xl font-black ${a.text}`}>{deck.stat.value}</div>
            <div className="text-zinc-500 text-xs mt-2 tracking-wider uppercase">{deck.stat.label}</div>
          </div>
          <div className={`w-px h-16 bg-zinc-800`} />
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-black text-zinc-200">{deck.features.length}</div>
            <div className="text-zinc-500 text-xs mt-2 tracking-wider uppercase">Core features</div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-3xl mx-auto relative">
          <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full ${a.bg} opacity-[0.04] blur-[60px]`} />
          <div className="relative">
            <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>The Solution</span>
            <p className="text-lg sm:text-xl md:text-[22px] text-zinc-400 leading-[1.9] font-light">
              {deck.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 md:py-36 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-block ${a.text} text-[11px] font-semibold uppercase tracking-[0.35em] mb-8`}>Key Features</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deck.features.map((f, i) => (
              <div
                key={i}
                className={`feature-card group p-8 md:p-9 rounded-2xl border border-zinc-800/40 bg-zinc-900/30 hover:border-zinc-700/40 hover:bg-zinc-900/50 slide-up-delay-${i + 1}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="text-base font-semibold text-zinc-100">{f.title}</h3>
                </div>
                <p className="text-zinc-500 text-sm leading-[1.75]">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-32 md:py-44 flex flex-col items-center justify-center px-8 bg-gradient-to-t ${deck.gradient} gradient-animate relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] ${a.bg} opacity-[0.08] blur-[120px]`} />
        </div>
        <div className="relative z-10 text-center max-w-xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-[1] tracking-tight">
            {deck.cta}
          </h2>
          <p className="text-white/30 text-sm mb-12 tracking-wide font-light">{deck.name} &mdash; Coming Soon</p>
          <button className={`px-10 py-4 ${a.bg} text-white font-bold rounded-xl hover:opacity-90 transition-all duration-200 text-base cursor-pointer shadow-2xl ${a.glow}`}>
            Get Early Access
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── THEME ROUTER ─── */
function ThemeRenderer({ deck }: { deck: DeckData }) {
  const a = getAccentClasses(deck.accent);
  const theme = deck.theme || "minimal";

  switch (theme) {
    case "bold": return <ThemeBold deck={deck} a={a} />;
    case "glassmorphism": return <ThemeGlassmorphism deck={deck} a={a} />;
    case "geometric": return <ThemeGeometric deck={deck} a={a} />;
    case "organic": return <ThemeOrganic deck={deck} a={a} />;
    case "spotlight": return <ThemeSpotlight deck={deck} a={a} />;
    default: return <ThemeMinimal deck={deck} a={a} />;
  }
}

/* ─── MAIN PAGE ─── */
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 bg-[#09090b]">
        <p className="text-zinc-400 text-lg">No deck data found.</p>
        <button
          onClick={() => router.push("/")}
          className={`text-sm font-medium px-6 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/15 transition-all duration-200 cursor-pointer`}
        >
          &larr; Create a new pitch deck
        </button>
      </div>
    );
  }

  return (
    <>
      <ThemeRenderer deck={deck} />
      {/* Footer */}
      <footer className="py-14 flex flex-col items-center gap-4 bg-[#09090b]">
        <button
          onClick={() => router.push("/")}
          className="text-zinc-600 hover:text-zinc-300 transition-colors text-sm cursor-pointer"
        >
          &larr; Create another pitch deck
        </button>
        <p className="text-zinc-800 text-xs">Built with IdeaPitch</p>
      </footer>
    </>
  );
}

export default function DeckPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full spin-slow" />
        </div>
      }
    >
      <DeckContent />
    </Suspense>
  );
}