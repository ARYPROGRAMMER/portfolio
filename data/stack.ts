export type StackGroup = {
  title: string;
  index: string;
  items: string[];
};

/**
 * Deliberately not exhaustive. Each group lists what actually ends up in
 * production work — a longer list reads as a keyword dump, not a toolkit.
 */
export const stackGroups: StackGroup[] = [
  {
    title: "Languages",
    index: "01",
    items: [
      "TypeScript",
      "JavaScript",
      "Dart",
      "Go",
      "Python",
      "C",
      "C++",
      "SQL",
    ],
  },
  {
    title: "Web",
    index: "02",
    items: [
      "React",
      "Next.js",
      "Tauri",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Three.js",
      "Redux",
      "Nx",
    ],
  },
  {
    // Its own group, not a line item under "Frontend" — the Flutter work is
    // half of what Arya ships, and it reads as an afterthought buried in a web
    // list.
    title: "Mobile",
    index: "03",
    items: [
      "Flutter",
      "Dart",
      "BLoC",
      "Clean architecture",
      "Firebase",
      "Android",
    ],
  },
  {
    title: "Backend & Data",
    index: "04",
    items: [
      "Node.js",
      "Hono",
      "Express",
      "FastAPI",
      "REST APIs",
      "Convex",
      "PostgreSQL",
      "Neon",
      "Redis",
      "Prisma",
      "Drizzle ORM",
      "Kafka",
    ],
  },
  {
    title: "Infra & Tooling",
    index: "05",
    items: [
      "AWS",
      "GCP",
      "Docker",
      "Kubernetes",
      "Cloudflare",
      "Vercel",
      "Render",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "rspack",
      "swc",
    ],
  },
  {
    title: "AI & ML",
    index: "06",
    items: [
      "RAG",
      "LangChain",
      "LangGraph",
      "Vercel AI SDK",
      "CopilotKit",
      "OpenAI",
      "Gemini",
      "Groq",
      "Llama",
      "TensorFlow",
      "scikit-learn",
    ],
  },
];

/** Flat list for the scrolling marquee. */
export const marqueeStack = [
  "TypeScript",
  "Flutter",
  "Next.js",
  "React",
  "Dart",
  "Go",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Kubernetes",
  "LangChain",
  "Hono",
  "Redis",
  "Docker",
  "Python",
  "Tailwind",
  "Kafka",
];
