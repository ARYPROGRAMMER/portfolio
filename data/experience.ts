export type Role = {
  id: string;
  company: string;
  aka?: string;
  role: string;
  type: "Full-time" | "Internship";
  start: string;
  end: string;
  current?: boolean;
  location: string;
  href?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "ggsl",
    company: "Global Groupware Solutions",
    aka: "EmployWise",
    role: "SDE Intern",
    type: "Internship",
    start: "Jun 2026",
    end: "Present",
    current: true,
    location: "Remote",
    href: "https://www.employwise.com",
    summary:
      "Building the 2.0 web release of MyEmployWise, and making the monorepo that ships it considerably faster.",
    highlights: [
      "Rebuilt the frontend inside an Nx monorepo against Figma and Notion specs, while turning around live client tickets.",
      "Migrated the build to rspack and swc, cutting build time and bundle size by roughly 53% — inside my second week.",
      "Working directly against production design docs, so the handoff loop stays measured in hours rather than sprints.",
    ],
    stack: ["Nx", "React", "TypeScript", "rspack", "swc"],
  },
  {
    id: "pelton",
    company: "Pelton AI",
    role: "Software Engineer",
    type: "Full-time",
    start: "May 2025",
    end: "Sep 2025",
    location: "Remote",
    summary:
      "Took pelton.ai from an empty repository to a production product with payments, custom GPTs, and a mobile client.",
    highlights: [
      "Built self-made AWS-powered gateways for low-latency chat and Stripe payment processing.",
      "Shipped the core surface area — custom GPTs, project management, user handling — on Redux, fully responsive.",
      "Owned deployments, Cloudflare security posture, and multimodal chat safety across the production system.",
      "Wrote the Flutter client from scratch on BLoC and clean architecture, and tuned the Hono gateway layer.",
    ],
    stack: ["Next.js", "Redux", "Hono", "AWS", "Stripe", "Cloudflare", "Flutter"],
  },
  {
    id: "pinoxio",
    company: "Pinoxio AI",
    role: "SDE Intern",
    type: "Internship",
    start: "Jan 2025",
    end: "Apr 2025",
    location: "Remote",
    summary:
      "Worked on Mioo's Explanation Engine — the part that has to justify itself to the user, not just answer.",
    highlights: [
      "Built the Explanation Engine on LangChain, then integrated it into the product surface.",
      "Shipped the React and Tauri desktop frontend for the Q1 release.",
      "Managed AWS deployment services and explored Phi-4-o1 fine-tuning for the engine.",
    ],
    stack: ["LangChain", "React", "Tauri", "AWS", "Python"],
  },
  {
    id: "acumensa",
    company: "Acumensa Technologies",
    role: "Full Stack Developer Intern",
    type: "Internship",
    start: "Nov 2024",
    end: "Apr 2025",
    location: "Remote",
    summary:
      "Full-stack delivery for internal tools and client work, with a lot of hardware on the other end of the wire.",
    highlights: [
      "Built and tested complex-scenario applications with IoT integrations across communication channels.",
      "Integrated AWS EKS for large-scale deployment, holding high uptime while processing 10M+ records.",
      "Delivered applications for both internal and client-facing use cases.",
    ],
    stack: ["Node.js", "React", "AWS EKS", "Kubernetes", "IoT"],
  },
];

export type Education = {
  institution: string;
  credential: string;
  detail: string;
  start: string;
  end: string;
  location: string;
};

export const education: Education[] = [
  {
    institution: "Indian Institute of Information Technology, Ranchi",
    credential: "B.Tech, Computer Science and Engineering",
    detail: "CGPA 8.06",
    start: "Aug 2023",
    end: "2027",
    location: "Ranchi, Jharkhand",
  },
  {
    institution: "DAV International School",
    credential: "10+2, Science",
    detail: "AISSCE 95.6% · AISSE 98.2%",
    start: "2009",
    end: "Feb 2023",
    location: "Mumbai, Maharashtra",
  },
];
