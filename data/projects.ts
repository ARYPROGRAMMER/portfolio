export type Project = {
  id: string;
  /** GitHub repo name under github.com/ARYPROGRAMMER */
  repo: string;
  title: string;
  year: string;
  blurb: string;
  /** One line that earns the click — what makes this one interesting. */
  note: string;
  stack: string[];
  stars: number;
  forks: number;
  live?: string;
  featured: boolean;
};

const GH = "https://github.com/ARYPROGRAMMER";

export const projects: Project[] = [
  {
    id: "video-generator-ai",
    repo: "Video-Generator-AI",
    title: "Video Generator AI",
    year: "2024",
    blurb:
      "A SaaS platform that turns a text query into a finished, watchable video — script, voice, captions and all.",
    note: "My most-forked project. Chains GPT-4, ElevenLabs, AssemblyAI and Hugging Face into one render pipeline.",
    stack: ["Next.js 15", "Clerk", "Drizzle", "Neon", "GPT-4", "ElevenLabs"],
    stars: 83,
    forks: 24,
    live: "https://video-generator-ai.vercel.app",
    featured: true,
  },
  {
    id: "learn-coding-copilotkit",
    repo: "Learn-Coding-with-Copilotkit",
    title: "Learn Coding with CopilotKit",
    year: "2025",
    blurb:
      "An AI DSA and competitive-programming tutor with an editor built in, aimed at people prepping for interviews.",
    note: "Doesn't just answer — it visualises the algorithm as it explains it.",
    stack: ["TypeScript", "Next.js", "CopilotKit", "Monaco"],
    stars: 14,
    forks: 3,
    live: "https://learn-coding-with-copilotkit.vercel.app",
    featured: true,
  },
  {
    id: "mindful",
    repo: "Mindful-App",
    title: "Mindful",
    year: "2024",
    blurb:
      "A mental wellness app offering personalised, AI-driven advice alongside a relaxation music player.",
    note: "Runs LLAMA-8B-8192 with a facial emotion recognition model, on a clean-architecture Flutter client.",
    stack: ["Flutter", "Express.js", "PostgreSQL", "Redis", "TensorFlow"],
    stars: 11,
    forks: 4,
    featured: true,
  },
  {
    id: "legal-document-reviewer",
    repo: "Legal-Document-Reviewer",
    title: "Legal Document Reviewer",
    year: "2024",
    blurb:
      "Reads, analyses and organises legal documents, then tells you what actually matters in them.",
    note: "Built on CopilotKit so the review reads as a conversation rather than a report dump.",
    stack: ["Next.js", "TypeScript", "CopilotKit", "Tailwind"],
    stars: 8,
    forks: 0,
    live: "https://legal-document-reviewer.vercel.app",
    featured: true,
  },
  {
    id: "edubox",
    repo: "EduBox",
    title: "EduBox",
    year: "2025",
    blurb:
      "A personalised operating system for student life — schedules, resources, and coursework in one space.",
    note: "Written because my own student life was a mess. Real-time backend on Convex, reasoning on Gemini.",
    stack: ["Next.js", "Convex", "Gemini", "Kendo UI"],
    stars: 5,
    forks: 2,
    live: "https://edubox-ai.vercel.app",
    featured: true,
  },

  // --- Secondary grid ---
  {
    id: "simply-learn",
    repo: "Simply-Learn",
    title: "Simply Learn",
    year: "2025",
    blurb:
      "Create, distribute and consume learning content, with progress tracking and levelling.",
    note: "Secure Next.js frontend on a Xano backend.",
    stack: ["Next.js", "Xano", "TypeScript"],
    stars: 5,
    forks: 0,
    live: "https://simply-learn-xano.vercel.app",
    featured: false,
  },
  {
    id: "drawbetter",
    repo: "DrawBetter",
    title: "DrawBetter",
    year: "2025",
    blurb: "Realtime collaborative diagramming with genuinely low latency.",
    note: "The interesting part is the conflict resolution, not the canvas.",
    stack: ["TypeScript", "WebSockets", "Canvas"],
    stars: 4,
    forks: 2,
    live: "https://draw-better.vercel.app",
    featured: false,
  },
  {
    id: "trackzen",
    repo: "Trackzen",
    title: "Trackzen",
    year: "2025",
    blurb: "Project tracking that does what Jira does, minus the ceremony, plus AI.",
    note: "Next.js on Appwrite, tuned for speed over configurability.",
    stack: ["Next.js", "Appwrite", "TypeScript"],
    stars: 2,
    forks: 0,
    live: "https://trackzenai.vercel.app",
    featured: false,
  },
  {
    id: "interviewme",
    repo: "InterviewMe",
    title: "InterviewMe",
    year: "2025",
    blurb: "A realistic voice interview experience you can actually rehearse against.",
    note: "Built on Vapi for live, interruptible speech.",
    stack: ["Next.js", "Vapi", "TypeScript"],
    stars: 2,
    forks: 0,
    live: "https://interview-me-beta.vercel.app",
    featured: false,
  },
  {
    id: "health-monitoring",
    repo: "health-monitoring-app",
    title: "Health Monitoring",
    year: "2025",
    blurb: "Orchestrates health vitals and renders them as charts you can read at a glance.",
    note: "Flutter client, Express backend, Firebase Admin SDK.",
    stack: ["Flutter", "Express.js", "Firebase"],
    stars: 2,
    forks: 0,
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export const repoUrl = (repo: string) => `${GH}/${repo}`;
