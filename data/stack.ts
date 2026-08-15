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
    items: ["TypeScript", "JavaScript", "Dart", "Go", "Python", "C++", "SQL"],
  },
  {
    title: "Web",
    index: "02",
    items: ["React", "Next.js", "Tauri", "Tailwind CSS", "Redux", "Nx"],
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
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Kafka",
    ],
  },
  {
    title: "Infra & Tooling",
    index: "05",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Cloudflare",
      "Vercel",
      "rspack",
      "swc",
    ],
  },
  {
    title: "AI & ML",
    index: "06",
    items: [
      "LangChain",
      "TensorFlow",
      "CopilotKit",
      "Gemini",
      "OpenAI",
      "Groq",
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
