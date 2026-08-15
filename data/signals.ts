export type Signal = {
  id: string;
  kind: "Award" | "Open source" | "Competition" | "Community";
  title: string;
  org: string;
  year: string;
  detail: string;
  href?: string;
};

export const signals: Signal[] = [
  {
    id: "code-for-impact",
    kind: "Award",
    title: "Winner — Code for Impact",
    org: "Hackathon",
    year: "2024",
    detail:
      "Won with a mental-health solution built on fine-tuned GPT-4o, Gemini 1.5 Pro and SDXL 2.0.",
  },
  {
    id: "sih",
    kind: "Competition",
    title: "Qualifier & Top Performer — Smart India Hackathon",
    org: "Government of India",
    year: "2024",
    detail:
      "Crop disease prediction with realtime weather, paired with a custom hardware rover for field use.",
  },
  {
    id: "gofr",
    kind: "Open source",
    title: "Contributor — GoFr",
    org: "Zopsmart",
    year: "2024",
    detail:
      "Opinionated Go framework for scalable web services. Contributed API optimisation and scaling work.",
    href: "https://github.com/gofr-dev/gofr",
  },
  {
    id: "copilotkit",
    kind: "Open source",
    title: "Contributor — CopilotKit",
    org: "CopilotKit",
    year: "2024",
    detail:
      "Toolkit for building AI-powered in-app copilots. Added a feature and worked on API scaling.",
    href: "https://github.com/CopilotKit/CopilotKit",
  },
  {
    id: "permit",
    kind: "Open source",
    title: "Contributor — Permit CLI",
    org: "Permit.io",
    year: "2025",
    detail:
      "Authorisation-as-a-service tooling. Also built an RBAC demo integrating Permit.io with Next.js.",
    href: "https://github.com/permitio/permit-cli",
  },
  {
    id: "msme",
    kind: "Competition",
    title: "Participant — MSME Hackathon",
    org: "MSME India",
    year: "2024",
    detail:
      "Multiple AI-assisted solutions for the Indian MSME sector, taken forward as a startup direction.",
  },
];
