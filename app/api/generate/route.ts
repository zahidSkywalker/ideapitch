import { NextRequest, NextResponse } from "next/server";

const GRADIENTS = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-blue-600 via-cyan-600 to-teal-600",
  "from-fuchsia-600 via-pink-600 to-rose-600",
  "from-emerald-600 via-teal-600 to-cyan-700",
  "from-amber-500 via-orange-600 to-red-600",
  "from-indigo-600 via-blue-600 to-cyan-600",
  "from-purple-600 via-violet-600 to-fuchsia-600",
  "from-rose-600 via-pink-600 to-fuchsia-700",
];

function pickGradient(idea: string): string {
  let hash = 0;
  for (let i = 0; i < idea.length; i++) hash = idea.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function generateName(idea: string): string {
  const lower = idea.toLowerCase();
  // Stop words to strip from the idea
  const stop = new Set(["the","a","an","for","with","that","this","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","can","shall","to","of","in","for","on","at","by","from","and","or","but","not","no","it","its","my","your","our","their","i","you","he","she","we","they","me","him","her","us","them"]);

  // Category-aware names
  const categoryNames: Record<string, string[]> = {
    plant: ["Plantify", "GreenPulse", "Bloomly", "Botanica", "LeafLink"],
    food: ["MealFlow", "NutriSync", "FreshPlan", "KitchenAI", "DishCraft"],
    social: ["Circl", "Bondr", "Tribe", "VibeCheck", "Connecta"],
    education: ["LearnPulse", "MindForge", "SkillPath", "StudyAI", "BrainWave"],
    transport: ["RideSync", "CommuteAI", "Poolr", "TripMatch", "Fleetly"],
    health: ["VitalFlow", "HealthPulse", "CareSync", "WellnessAI", "MediTrack"],
    finance: ["PayFlow", "CoinSync", "WealthAI", "Budgetly", "FinPulse"],
  };

  // Detect category
  const categoryMap: Record<string, string[]> = {
    plant: ["plant", "garden", "crop", "farm", "botani", "flora", "leaf", "bloom", "seed", "harvest"],
    food: ["food", "grocery", "meal", "cook", "recipe", "restaurant", "kitchen", "diet", "nutrition", "eat"],
    social: ["social", "community", "network", "connect", "pet", "friend", "dating", "chat", "meetup"],
    education: ["learn", "tutor", "education", "study", "course", "teach", "school", "academy", "student"],
    transport: ["car", "ride", "pool", "transport", "commut", "taxi", "uber", "lyft", "drive", "road", "vehicle"],
    health: ["health", "fitness", "workout", "medical", "doctor", "hospital", "therapy", "mental", "wellness"],
    finance: ["finance", "budget", "invest", "bank", "payment", "money", "crypto", "trading", "expense"],
  };

  let category = "default";
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (keywords.some(kw => lower.includes(kw))) {
      category = cat;
      break;
    }
  }

  if (category !== "default" && categoryNames[category]) {
    const names = categoryNames[category];
    return names[Math.abs(idea.length * 7) % names.length];
  }

  // Fallback: pick meaningful words from the idea
  const words = lower.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => !stop.has(w) && w.length > 2);
  if (words.length >= 2) {
    const w1 = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    const w2 = words[1].charAt(0).toUpperCase() + words[1].slice(1);
    return w1 + w2;
  }
  if (words.length === 1) {
    const suffixes = ["ify", "ly", "io", "ai", "go", "hub", "lab"];
    const w = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    const sfx = suffixes[Math.abs(idea.length * 3) % suffixes.length];
    return w + sfx;
  }
  return "LaunchPad";
}

function generateTagline(idea: string): string {
  const lower = idea.toLowerCase();
  const cleaned = lower.replace(/^(an?|the)\s+/, "").replace(/\s+(app|platform|system|service|solution|tool)$/i, "").trim();
  const hooks = [
    `${cleaned.charAt(0).toUpperCase() + cleaned.slice(1)}, reimagined with intelligence.`,
    `The future of ${cleaned}. Simplified.`,
    `Because ${cleaned} shouldn't be this hard.`,
    `${cleaned.charAt(0).toUpperCase() + cleaned.slice(1)} that actually works.`,
    `Your smarter way to ${cleaned}.`,
  ];
  return hooks[Math.abs(idea.length * 3) % hooks.length];
}

function generateProblem(idea: string): string {
  const lower = idea.toLowerCase().replace(/^(an?|the)\s+/i, "").replace(/\s+(app|platform|system|service)$/i, "").trim();
  return `Today, anyone looking for a better way to ${lower} runs into the same wall. The tools that exist are either painfully complex, ridiculously expensive, or so basic they're useless. You end up juggling five different apps, drowning in options that don't talk to each other, and wasting hours on something that should take minutes. The gap between what people need and what's actually out there is massive.`;
}

function generateSolution(idea: string): string {
  const name = generateName(idea);
  const lower = idea.toLowerCase().replace(/^(an?|the)\s+/i, "").replace(/\s+(app|platform|system|service)$/i, "").trim();
  return `${name} fixes this with a radically simple approach. One app, zero learning curve, instant results. It combines intelligent automation with a design so clean you'll wonder why nobody did this sooner. Whether you're a first-timer or a daily power user, ${name} adapts to you — not the other way around.`;
}

function generateFeatures(idea: string) {
  const lower = idea.toLowerCase();
  const featureSets: Record<string, { icon: string; title: string; description: string }[]> = {
    default: [
      { icon: "⚡", title: "Instant Setup", description: "Up and running in 30 seconds flat. No tutorials needed." },
      { icon: "🧠", title: "Smart Automation", description: "Learns your patterns and automates the boring stuff for you." },
      { icon: "📊", title: "Live Insights", description: "Beautiful dashboards that surface what matters, when it matters." },
      { icon: "🔒", title: "Privacy by Default", description: "End-to-end encrypted. Your data never leaves your control." },
    ],
    plant: [
      { icon: "🌱", title: "Plant ID", description: "Snap a photo — instantly identify any plant with 95% accuracy." },
      { icon: "💧", title: "Smart Watering", description: "Personalized schedules based on species, climate, and season." },
      { icon: "🌡️", title: "Health Monitor", description: "Catches diseases, pests, and nutrient issues before they spread." },
      { icon: "📖", title: "Care Library", description: "Expert guides for 10,000+ species, tailored to your environment." },
    ],
    food: [
      { icon: "🍽️", title: "Meal Planner", description: "AI builds weekly meal plans around your taste, diet, and budget." },
      { icon: "🛒", title: "Smart Lists", description: "One-tap grocery lists generated from your meal plan." },
      { icon: "📈", title: "Nutrition Tracker", description: "Automatic macro and calorie tracking — zero manual entry." },
      { icon: "💰", title: "Budget Saver", description: "Finds deals and cuts your grocery spend by up to 30%." },
    ],
    social: [
      { icon: "💬", title: "Smart Match", description: "AI pairs you with people who share your exact interests." },
      { icon: "📸", title: "Rich Profiles", description: "Photos, stories, and feeds that actually represent you." },
      { icon: "📍", title: "Discover Nearby", description: "Events, meetups, and hangouts curated for your taste." },
      { icon: "🔔", title: "Quiet Notifications", description: "Get alerted about what matters. Silence the rest." },
    ],
    education: [
      { icon: "📚", title: "Adaptive Lessons", description: "Content that adjusts difficulty based on how you're doing." },
      { icon: "🎯", title: "Progress Streaks", description: "Visual milestones and daily streaks to keep you going." },
      { icon: "🧩", title: "Practice Mode", description: "Hands-on exercises with instant, detailed feedback." },
      { icon: "🏆", title: "Leaderboards", description: "Compete with learners worldwide and earn recognition." },
    ],
    transport: [
      { icon: "🚗", title: "Ride Match", description: "AI finds the perfect commute partner based on your route." },
      { icon: "🗺️", title: "Smart Routes", description: "Optimized paths that save time and fuel every trip." },
      { icon: "💰", title: "Auto-Split", description: "Fare calculated and split instantly — no awkward math." },
      { icon: "🌍", title: "Green Impact", description: "Track CO2 saved and earn rewards for eco-friendly rides." },
    ],
    health: [
      { icon: "💪", title: "Custom Plans", description: "Workout and nutrition plans built around your goals." },
      { icon: "📊", title: "Body Metrics", description: "Track weight, sleep, heart rate, and more in one place." },
      { icon: "🧘", title: "Mindfulness", description: "Guided meditation and breathing exercises for daily calm." },
      { icon: "🎯", title: "Goal Tracking", description: "Set targets, log progress, and celebrate milestones." },
    ],
    finance: [
      { icon: "💳", title: "Expense Tracking", description: "Automatic categorization of every transaction in real-time." },
      { icon: "📈", title: "Smart Budgets", description: "AI-powered budgets that adapt to your spending patterns." },
      { icon: "🎯", title: "Savings Goals", description: "Set goals, track progress, and get nudged to stay on track." },
      { icon: "📊", title: "Financial Insights", description: "Weekly reports that show where your money actually goes." },
    ],
  };

  // Category detection — order matters, most specific first
  if (lower.includes("plant") || lower.includes("garden") || lower.includes("crop") || lower.includes("farm") || lower.includes("botani") || lower.includes("flora") || lower.includes("leaf") || lower.includes("bloom")) return featureSets.plant;
  if (lower.includes("food") || lower.includes("grocery") || lower.includes("meal") || lower.includes("cook") || lower.includes("recipe") || lower.includes("kitchen") || lower.includes("diet") || lower.includes("nutrition")) return featureSets.food;
  if (lower.includes("health") || lower.includes("fitness") || lower.includes("workout") || lower.includes("medical") || lower.includes("doctor") || lower.includes("therapy") || lower.includes("mental") || lower.includes("wellness")) return featureSets.health;
  if (lower.includes("finance") || lower.includes("budget") || lower.includes("invest") || lower.includes("bank") || lower.includes("payment") || lower.includes("money") || lower.includes("crypto") || lower.includes("trading") || lower.includes("expense")) return featureSets.finance;
  if (lower.includes("car") || lower.includes("ride") || lower.includes("pool") || lower.includes("transport") || lower.includes("commut") || lower.includes("taxi") || lower.includes("drive") || lower.includes("road") || lower.includes("vehicle")) return featureSets.transport;
  if (lower.includes("learn") || lower.includes("tutor") || lower.includes("education") || lower.includes("study") || lower.includes("course") || lower.includes("teach") || lower.includes("school") || lower.includes("student")) return featureSets.education;
  if (lower.includes("social") || lower.includes("community") || lower.includes("network") || lower.includes("connect") || lower.includes("pet") || lower.includes("friend") || lower.includes("dating") || lower.includes("chat")) return featureSets.social;
  return featureSets.default;
}

function generateCTA(name: string): string {
  const numbers = ["2,500", "5,000", "10,000", "8,400", "3,200", "12,000", "7,500", "15,000"];
  const actions = ["on the waitlist", "already signed up", "beta testing right now", "who requested early access"];
  const n = numbers[Math.abs(name.length * 11) % numbers.length];
  const a = actions[Math.abs(name.length * 3) % actions.length];
  return `Join ${n}+ people ${a}`;
}

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();
    if (!idea || typeof idea !== "string" || idea.trim().length < 3) {
      return NextResponse.json({ error: "Idea too short" }, { status: 400 });
    }

    const trimmed = idea.trim();
    const name = generateName(trimmed);

    return NextResponse.json({
      name,
      tagline: generateTagline(trimmed),
      problem: generateProblem(trimmed),
      solution: generateSolution(trimmed),
      features: generateFeatures(trimmed),
      cta: generateCTA(name),
      gradient: pickGradient(trimmed),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}