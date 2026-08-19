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
    role: "Software Engineer Intern",
    type: "Internship",
    start: "Jun 2026",
    end: "Present",
    current: true,
    location: "Remote",
    href: "https://www.employwise.com",
    summary:
      "Building the 2.0 web release of MyEmployWise, and making the monorepo that ships it considerably faster.",
    highlights: [
      "Developing the Nx monorepo frontend against Figma and Notion specs, while turning around live client tickets.",
      "Migrated the toolchain to Rspack and SWC, cutting build time and bundle size by 53% inside the first month.",
      "Working directly against production design docs, so the handoff loop stays measured in hours rather than sprints.",
    ],
    stack: ["Nx", "React", "TypeScript", "Rspack", "SWC"],
  },
  {
    id: "stealthera",
    company: "StealthEra Innovations",
    role: "Software Engineer Intern",
    type: "Internship",
    start: "May 2026",
    end: "Aug 2026",
    location: "Remote",
    summary:
      "Built the company's wearable health platform from scratch — the Flutter client, the ingestion backend behind it, and the infrastructure both run on.",
    highlights: [
      "Owned the cross-platform Flutter application end to end: responsive UI screens, reusable component libraries, app-wide state management, local storage, and offline data synchronization.",
      "Architected and implemented the backend services and REST APIs powering real-time health data ingestion from wearable devices, along with the companion analytics dashboard.",
      "Containerized the backend with Docker and deployed to AWS EC2 behind a static Elastic IP, configuring security groups and CI/CD workflows; also shipped the company product website.",
    ],
    stack: ["Flutter", "Dart", "Node.js", "REST APIs", "Docker", "AWS EC2", "CI/CD"],
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
      "Developed full-stack applications for internal and client use cases.",
      "Built and tested complex-scenario applications involving IoT integrations across multiple communication channels.",
      "Integrated backend services including AWS EKS for large-scale deployment, sustaining high uptime while processing 10M+ records.",
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
    credential: "B.Tech. in Computer Science and Engineering",
    detail: "CGPA 8.06/10",
    start: "Aug 2023",
    end: "Expected May 2027",
    location: "Ranchi, Jharkhand",
  },
  {
    institution: "DAV International School",
    credential: "Senior Secondary (CBSE), Science",
    detail: "Class XII 95.6% · Class X 98.2%",
    start: "2021",
    end: "2023",
    location: "Mumbai, Maharashtra",
  },
];
