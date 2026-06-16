import { NextRequest, NextResponse } from "next/server";

const GRADIENTS = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-blue-600 via-cyan-500 to-teal-600",
  "from-fuchsia-600 via-pink-500 to-rose-600",
  "from-emerald-600 via-teal-500 to-cyan-700",
  "from-amber-500 via-orange-500 to-red-600",
  "from-indigo-500 via-blue-500 to-sky-600",
  "from-rose-500 via-pink-500 to-fuchsia-600",
  "from-cyan-500 via-sky-400 to-blue-600",
];

const ACCENT_COLORS = [
  "violet",
  "cyan",
  "rose",
  "emerald",
  "amber",
  "indigo",
  "pink",
  "sky",
];

const THEMES = [
  "minimal",
  "bold",
  "glassmorphism",
  "geometric",
  "organic",
  "spotlight",
];

function pickGradient(idea: string): string {
  let hash = 0;
  for (let i = 0; i < idea.length; i++) hash = idea.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function pickAccent(idea: string): string {
  let hash = 0;
  for (let i = 0; i < idea.length; i++) hash = idea.charCodeAt(i) + ((hash << 7) - hash);
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

function pickTheme(idea: string): string {
  let hash = 0;
  for (let i = 0; i < idea.length; i++) hash = idea.charCodeAt(i) + ((hash << 3) - hash);
  return THEMES[Math.abs(hash) % THEMES.length];
}

function detectCategory(idea: string): string {
  const lower = idea.toLowerCase();
  const map: [string, string[]][] = [
    ["plant", ["plant", "garden", "crop", "farm", "botani", "flora", "leaf", "bloom", "seed", "harvest"]],
    ["food", ["food", "grocery", "meal", "cook", "recipe", "restaurant", "kitchen", "diet", "nutrition", "eat"]],
    ["health", ["health", "fitness", "workout", "medical", "doctor", "hospital", "therapy", "mental", "wellness"]],
    ["finance", ["finance", "budget", "invest", "bank", "payment", "money", "crypto", "trading", "expense"]],
    ["transport", ["car", "ride", "pool", "transport", "commut", "taxi", "uber", "lyft", "drive", "road", "vehicle"]],
    ["education", ["learn", "tutor", "education", "study", "course", "teach", "school", "academy", "student"]],
    ["social", ["social", "community", "network", "connect", "pet", "friend", "dating", "chat", "meetup"]],
  ];
  for (const [cat, keywords] of map) {
    if (keywords.some(kw => lower.includes(kw))) return cat;
  }
  return "default";
}

function generateName(idea: string): string {
  const lower = idea.toLowerCase();
  const stop = new Set(["the","a","an","for","with","that","this","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","can","shall","to","of","in","for","on","at","by","from","and","or","but","not","no","it","its","my","your","our","their","i","you","he","she","we","they","me","him","her","us","them"]);

  const categoryNames: Record<string, string[]> = {
    plant: ["Plantify", "GreenPulse", "Bloomly", "Botanica", "LeafLink", "GrowSync", "Verdant", "SproutAI"],
    food: ["MealFlow", "NutriSync", "FreshPlan", "KitchenAI", "DishCraft", "Savora", "Plated", "NourishAI"],
    social: ["Circl", "Bondr", "Tribe", "VibeCheck", "Connecta", "Gather", "Nearr", "Mingle"],
    education: ["LearnPulse", "MindForge", "SkillPath", "StudyAI", "BrainWave", "Cognita", "Lessonly", "Knowl"],
    transport: ["RideSync", "CommuteAI", "Poolr", "TripMatch", "Fleetly", "JourneyAI", "RouteFlow", "MoveSync"],
    health: ["VitalFlow", "HealthPulse", "CareSync", "WellnessAI", "MediTrack", "PulseAI", "Thrive", "BodySync"],
    finance: ["PayFlow", "CoinSync", "WealthAI", "Budgetly", "FinPulse", "SpendWise", "Ledger", "FundsAI"],
  };

  const category = detectCategory(idea);
  if (category !== "default" && categoryNames[category]) {
    const names = categoryNames[category];
    return names[Math.abs(idea.length * 7 + idea.charCodeAt(0)) % names.length];
  }

  const words = lower.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => !stop.has(w) && w.length > 2);
  if (words.length >= 2) {
    const w1 = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    const w2 = words[1].charAt(0).toUpperCase() + words[1].slice(1);
    return w1 + w2;
  }
  if (words.length === 1) {
    const suffixes = ["ify", "ly", "io", "ai", "go", "hub", "lab", "flow"];
    const w = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    const sfx = suffixes[Math.abs(idea.length * 3) % suffixes.length];
    return w + sfx;
  }
  return "LaunchPad";
}

function generateTagline(idea: string): string {
  const lower = idea.toLowerCase();
  const cleaned = lower.replace(/^(an?|the)\s+/, "").replace(/\s+(app|platform|system|service|solution|tool)$/i, "").trim();
  const cap = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  const hooks = [
    `${cap}, reimagined with intelligence.`,
    `The future of ${cleaned}. Simplified.`,
    `Because ${cleaned} shouldn't be this hard.`,
    `${cap} that actually works.`,
    `Your smarter way to ${cleaned}.`,
    `Rethinking ${cleaned} from the ground up.`,
    `${cap}, designed for humans.`,
    `Finally, ${cleaned} done right.`,
  ];
  return hooks[Math.abs(idea.length * 3 + idea.charCodeAt(Math.min(2, idea.length - 1))) % hooks.length];
}

function generateProblem(idea: string): string {
  const lower = idea.toLowerCase().replace(/^(an?|the)\s+/i, "").replace(/\s+(app|platform|system|service)$/i, "").trim();
  const problems = [
    `Right now, anyone trying to ${lower} faces a fragmented, frustrating experience. Existing tools are either bloated with features nobody uses, priced out of reach for individuals, or so bare-bones they create more work than they save. The result? People waste countless hours stitching together patchwork solutions that were never designed to work together, and the gap between what users actually need and what the market offers keeps growing wider every day.`,
    `The current landscape for ${lower} is broken. Platforms overload users with complexity while failing at the basics. Data gets scattered across multiple tools, teams waste time on manual processes that should be automated, and the learning curve for even simple tasks is steep enough to drive people away entirely. Something fundamental needs to change.`,
    `Here's the uncomfortable truth about ${lower} today: it's stuck in the past. Despite massive technological advances, the tools people rely on are slow, disconnected, and frustratingly rigid. Users are forced to adapt their workflows to fit the software, instead of the other way around. That disconnect isn't just inconvenient \u2014 it's costing people time, money, and energy every single day.`,
  ];
  return problems[Math.abs(idea.length * 5) % problems.length];
}

function generateSolution(idea: string): string {
  const name = generateName(idea);
  const lower = idea.toLowerCase().replace(/^(an?|the)\s+/i, "").replace(/\s+(app|platform|system|service)$/i, "").trim();
  const solutions = [
    `${name} takes a completely different approach. Instead of piling on features, we stripped ${lower} down to its essence and rebuilt it from scratch. The result is an experience that feels intuitive from the first second, adapts to how you actually work, and delivers results instantly. No config screens, no learning curve, no compromises \u2014 just a tool that works the way you always wished it would.`,
    `Enter ${name}. We combined intelligent automation with obsessive attention to design to create something that doesn't just solve the ${lower} problem \u2014 it makes you forget the problem ever existed. One unified experience that replaces your entire toolkit, learns your preferences over time, and gets out of your way so you can focus on what actually matters.`,
    `${name} is the answer to every frustration you've had with ${lower}. We built it around three principles: simplicity, intelligence, and speed. The AI handles the complexity behind the scenes, the interface stays clean and focused, and everything happens in real time. Whether you're a complete beginner or a seasoned expert, ${name} meets you exactly where you are.`,
  ];
  return solutions[Math.abs(idea.length * 7) % solutions.length];
}

function generateFeatures(idea: string) {
  const category = detectCategory(idea);
  const featureSets: Record<string, { icon: string; title: string; description: string }[]> = {
    default: [
      { icon: "\u26A1", title: "Instant Setup", description: "Up and running in under 30 seconds. No tutorials, no config, no friction." },
      { icon: "\uD83E\uDDE0", title: "Smart Automation", description: "Learns your patterns over time and automates repetitive work silently in the background." },
      { icon: "\uD83D\uDCCA", title: "Live Insights", description: "Clean, actionable dashboards that show you exactly what matters, right when you need it." },
      { icon: "\uD83D\uDD12", title: "Privacy First", description: "End-to-end encrypted by default. Your data stays yours, always." },
    ],
    plant: [
      { icon: "\uD83C\uDF31", title: "Instant Plant ID", description: "Snap a photo and identify any plant species with over 95% accuracy in seconds." },
      { icon: "\uD83D\uDCA7", title: "Smart Watering", description: "Personalized watering schedules based on species type, local climate, and current season." },
      { icon: "\uD83C\uDF21\uFE0F", title: "Health Diagnostics", description: "Early detection of diseases, pest infestations, and nutrient deficiencies before they spread." },
      { icon: "\uD83D\uDCD6", title: "Care Encyclopedia", description: "Expert-verified care guides for over 10,000 species, tailored to your specific environment." },
    ],
    food: [
      { icon: "\uD83C\uDF7D\uFE0F", title: "AI Meal Planning", description: "Weekly meal plans built around your taste preferences, dietary needs, and actual grocery budget." },
      { icon: "\uD83D\uDED2", title: "Smart Grocery Lists", description: "One-tap shopping lists auto-generated from your meal plan, organized by store aisle." },
      { icon: "\uD83D\uDCC8", title: "Nutrition Tracking", description: "Automatic macro and calorie tracking across every meal \u2014 zero manual data entry required." },
      { icon: "\uD83D\uDCB0", title: "Budget Optimization", description: "Finds real-time deals and suggests swaps to cut your weekly grocery spend by up to 30%." },
    ],
    social: [
      { icon: "\uD83D\uDCAC", title: "Intelligent Matching", description: "AI connects you with people who genuinely share your interests and lifestyle." },
      { icon: "\uD83D\uDCF8", title: "Rich Profiles", description: "Multimedia profiles with stories, feeds, and highlights that show the real you." },
      { icon: "\uD83D\uDCCD", title: "Local Discovery", description: "Curated events, meetups, and experiences tailored to your taste and location." },
      { icon: "\uD83D\uDD14", title: "Smart Notifications", description: "Only get alerted about what actually matters. The rest stays quiet." },
    ],
    education: [
      { icon: "\uD83D\uDCDA", title: "Adaptive Learning", description: "Content that dynamically adjusts difficulty based on your real-time performance." },
      { icon: "\uD83C\uDFAF", title: "Progress Tracking", description: "Visual streaks, milestones, and achievements that keep you motivated every day." },
      { icon: "\uD83E\uDDE9", title: "Hands-On Practice", description: "Interactive exercises with instant, detailed feedback on every attempt." },
      { icon: "\uD83C\uDFC6", title: "Global Leaderboards", description: "Compete with learners worldwide, earn recognition, and track your ranking in real time." },
    ],
    transport: [
      { icon: "\uD83D\uDE97", title: "Smart Ride Matching", description: "AI finds your ideal commute partner based on route, schedule, and preferences." },
      { icon: "\uD83D\uDDFA\uFE0F", title: "Optimized Routing", description: "Dynamic route optimization that saves time, fuel, and money on every single trip." },
      { icon: "\uD83D\uDCB0", title: "Instant Fare Splitting", description: "Fares calculated and split automatically between all passengers \u2014 no awkward math." },
      { icon: "\uD83C\uDF0D", title: "Carbon Tracking", description: "See your CO2 savings in real time and earn rewards for choosing eco-friendly rides." },
    ],
    health: [
      { icon: "\uD83D\uDCAA", title: "Personalized Plans", description: "Workout and nutrition programs tailored specifically to your goals, body type, and schedule." },
      { icon: "\uD83D\uDCCA", title: "Holistic Metrics", description: "Track weight, sleep quality, heart rate, nutrition, and activity in one unified dashboard." },
      { icon: "\uD83E\uDDD8", title: "Mindfulness Sessions", description: "Guided meditations and breathing exercises designed for daily mental wellness." },
      { icon: "\uD83C\uDFAF", title: "Goal Achievement", description: "Set meaningful targets, visualize your progress, and celebrate every milestone you hit." },
    ],
    finance: [
      { icon: "\uD83D\uDCB3", title: "Auto Categorization", description: "Every transaction categorized in real time without any manual tagging or rules setup." },
      { icon: "\uD83D\uDCC8", title: "Adaptive Budgets", description: "AI-powered budgets that learn your spending patterns and adjust dynamically each month." },
      { icon: "\uD83C\uDFAF", title: "Savings Goals", description: "Visual progress tracking with smart nudges to keep you on track toward your targets." },
      { icon: "\uD83D\uDCCA", title: "Spending Insights", description: "Weekly and monthly breakdowns that reveal exactly where your money is going." },
    ],
  };

  return featureSets[category] || featureSets.default;
}

function generateCTA(name: string): string {
  const numbers = ["2,500", "5,000", "10,000", "8,400", "3,200", "12,000", "7,500", "15,000"];
  const actions = ["on the waitlist", "already signed up", "beta testing right now", "who requested early access"];
  const n = numbers[Math.abs(name.length * 11 + name.charCodeAt(0)) % numbers.length];
  const a = actions[Math.abs(name.length * 3) % actions.length];
  return `Join ${n}+ people ${a}`;
}

function generateStat(idea: string): { value: string; label: string } {
  const stats: { value: string; label: string }[] = [
    { value: "10x", label: "Faster than alternatives" },
    { value: "98%", label: "User satisfaction rate" },
    { value: "< 30s", label: "Average onboarding time" },
    { value: "50K+", label: "Tasks automated daily" },
    { value: "4.9", label: "Average App Store rating" },
    { value: "0", label: "Learning curve required" },
    { value: "24/7", label: "AI-powered assistance" },
    { value: "99.9%", label: "Uptime guaranteed" },
  ];
  return stats[Math.abs(idea.length * 13) % stats.length];
}

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();
    if (!idea || typeof idea !== "string" || idea.trim().length < 3) {
      return NextResponse.json({ error: "Idea too short" }, { status: 400 });
    }

    const trimmed = idea.trim();
    const name = generateName(trimmed);
    const category = detectCategory(trimmed);

    return NextResponse.json({
      name,
      tagline: generateTagline(trimmed),
      problem: generateProblem(trimmed),
      solution: generateSolution(trimmed),
      features: generateFeatures(trimmed),
      cta: generateCTA(name),
      gradient: pickGradient(trimmed),
      accent: pickAccent(trimmed),
      theme: pickTheme(trimmed),
      stat: generateStat(trimmed),
      category,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}