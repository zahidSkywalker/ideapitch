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
  const words = idea.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
  const powerWords = ["Pro", "Nova", "Flow", "Hub", "Sync", "Pulse", "Edge", "Core", "Vibe", "Zen", "Spark", "Wave", "Link", "Nest", "Beam"];
  const core = words.filter(w => w.length > 3).slice(0, 2);
  if (core.length >= 2) {
    return core[0].charAt(0).toUpperCase() + core[0].slice(1) + core[1].charAt(0).toUpperCase() + core[1].slice(1);
  }
  const main = words.find(w => w.length > 2) || "app";
  const pw = powerWords[Math.abs(idea.length * 7) % powerWords.length];
  return pw + main.charAt(0).toUpperCase() + main.slice(1);
}

function generateTagline(idea: string): string {
  const hooks = [
    `The smartest way to ${idea.toLowerCase().includes("app") ? "use" : "experience"} ${idea.replace(/app|platform|system|service/gi, "").trim()}.`,
    `Reimagining ${idea.toLowerCase()} for the modern world.`,
    `Where ${idea.toLowerCase()} meets intelligent design.`,
    `${idea.charAt(0).toUpperCase() + idea.slice(1)}, but actually useful.`,
    `Making ${idea.toLowerCase()} effortless and delightful.`,
  ];
  return hooks[Math.abs(idea.length * 3) % hooks.length];
}

function generateProblem(idea: string): string {
  return `Right now, anyone trying to ${idea.toLowerCase().replace(/app|platform|system|service/gi, "").trim()} faces a fragmented, time-consuming experience. Existing solutions are either too complex for everyday users, too expensive for individuals, or simply don't deliver on their promises. People waste hours on manual processes, juggle multiple disconnected tools, and still end up frustrated with subpar results. There's no single platform that gets it right.`;
}

function generateSolution(idea: string): string {
  return `${generateName(idea)} is an intelligent ${idea.toLowerCase().replace("ai-powered ", "").replace("smart ", "")} that eliminates the friction entirely. It uses smart automation and a beautifully simple interface to handle the heavy lifting for you. Whether you're a beginner or a power user, it adapts to your needs and delivers results in seconds — not hours. Think of it as having an expert assistant that never sleeps.`;
}

function generateFeatures(idea: string) {
  const lower = idea.toLowerCase();
  const featureSets: Record<string, { icon: string; title: string; description: string }[]> = {
    default: [
      { icon: "⚡", title: "Instant Setup", description: "Get started in under 30 seconds. No learning curve, no complex configs." },
      { icon: "🧠", title: "Smart Automation", description: "AI-powered suggestions and actions that learn from your behavior over time." },
      { icon: "📊", title: "Live Analytics", description: "Real-time insights and beautiful dashboards to track what matters most." },
      { icon: "🔒", title: "Privacy First", description: "End-to-end encryption. Your data stays yours — always." },
    ],
    food: [
      { icon: "🍽️", title: "Meal Planning", description: "AI generates weekly meal plans based on your preferences and budget." },
      { icon: "🛒", title: "Smart Shopping", description: "Auto-generates optimized grocery lists from your meal plan." },
      { icon: "📈", title: "Nutrition Tracking", description: "Track macros, calories, and nutrients with zero manual effort." },
      { icon: "💰", title: "Budget Optimizer", description: "Finds the best deals and reduces your grocery bill by up to 30%." },
    ],
    social: [
      { icon: "💬", title: "Smart Matching", description: "AI connects you with like-minded people based on shared interests." },
      { icon: "📸", title: "Rich Profiles", description: "Showcase your personality with photos, stories, and activity feeds." },
      { icon: "📍", title: "Local Discovery", description: "Find nearby events, meetups, and communities tailored to you." },
      { icon: "🔔", title: "Instant Notifications", description: "Never miss a message or event with smart, non-intrusive alerts." },
    ],
    education: [
      { icon: "📚", title: "Adaptive Learning", description: "Content adjusts to your skill level and learning pace in real-time." },
      { icon: "🎯", title: "Progress Tracking", description: "Visual milestones and streaks to keep you motivated every day." },
      { icon: "🧩", title: "Interactive Exercises", description: "Hands-on practice with instant feedback and detailed explanations." },
      { icon: "🏆", title: "Achievements", description: "Earn badges, compete on leaderboards, and share your progress." },
    ],
    transport: [
      { icon: "🚗", title: "Smart Matching", description: "AI pairs you with the best travel partners based on routes and schedules." },
      { icon: "🗺️", title: "Route Optimization", description: "Finds the fastest, most fuel-efficient route for every trip." },
      { icon: "💰", title: "Split Costs", description: "Automatic fare calculation and instant in-app payment splitting." },
      { icon: "🌍", title: "Carbon Tracking", description: "See your environmental impact and earn green rewards for sharing." },
    ],
    plant: [
      { icon: "🌱", title: "Plant Identification", description: "Snap a photo and instantly identify any plant with AI precision." },
      { icon: "💧", title: "Smart Watering", description: "Personalized watering schedules based on plant type and local weather." },
      { icon: "🌡️", title: "Health Monitoring", description: "Early detection of diseases, pests, and nutrient deficiencies." },
      { icon: "📖", title: "Care Guides", description: "Comprehensive, easy-to-follow care instructions for 10,000+ species." },
    ],
  };

  if (lower.includes("food") || lower.includes("grocery") || lower.includes("meal") || lower.includes("cook") || lower.includes("recipe")) return featureSets.food;
  if (lower.includes("social") || lower.includes("community") || lower.includes("network") || lower.includes("connect") || lower.includes("pet")) return featureSets.social;
  if (lower.includes("learn") || lower.includes("tutor") || lower.includes("education") || lower.includes("study") || lower.includes("course")) return featureSets.education;
  if (lower.includes("car") || lower.includes("rideshare") || lower.includes("pool") || lower.includes("transport") || lower.includes("commut")) return featureSets.transport;
  if (lower.includes("plant") || lower.includes("garden") || lower.includes("crop") || lower.includes("farm")) return featureSets.plant;
  return featureSets.default;
}

function generateCTA(name: string): string {
  const numbers = ["2,500", "5,000", "10,000", "8,400", "3,200", "12,000"];
  const actions = ["on the waitlist", "already signed up", "beta testing", "requested early access"];
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

    const deck = {
      name,
      tagline: generateTagline(trimmed),
      problem: generateProblem(trimmed),
      solution: generateSolution(trimmed),
      features: generateFeatures(trimmed),
      cta: generateCTA(name),
      gradient: pickGradient(trimmed),
    };

    return NextResponse.json(deck);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}