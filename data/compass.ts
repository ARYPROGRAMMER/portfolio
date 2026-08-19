export type CompassPath = {
  id: string;
  label: string;
  question: string;
  /** Short answer shown as the panel headline. */
  headline: string;
  body: string;
  points: { label: string; value: string }[];
  cta: { label: string; href: string; external?: boolean };
};

/**
 * The "what brings you here" chooser. Each path answers the question that kind
 * of visitor actually arrived with, instead of making them hunt for it.
 */
export const compassPaths: CompassPath[] = [
  {
    id: "hiring",
    label: "I'm hiring",
    question: "Can he do the job, and is he free?",
    headline: "Yes, and from mid-2027.",
    body: "I graduate from IIIT Ranchi in 2027 and I'm open to new-grad software roles now. I've already shipped production code at three companies, all of them remote, so the ramp-up is short.",
    points: [
      { label: "Available", value: "New-grad roles, 2027" },
      { label: "Strongest in", value: "TypeScript · React · Next.js" },
      { label: "And on mobile", value: "Flutter · Dart · BLoC" },
      { label: "Proof", value: "53% build-time cut in month one" },
    ],
    cta: { label: "Read the résumé", href: "/resume.pdf", external: true },
  },
  {
    id: "building",
    label: "I'm building something",
    question: "Would he be useful on my team?",
    headline: "Probably — I like the messy parts.",
    body: "I've taken products from an empty repository to production — web app, Flutter client, the REST backend behind both and the deployment pipeline underneath. If the hard bit is that nobody wants to own the whole vertical slice, that's the bit I want.",
    points: [
      { label: "Built from zero", value: "A wearable health platform, end to end" },
      { label: "Mobile", value: "Flutter + BLoC, clean architecture" },
      { label: "Comfortable with", value: "REST APIs, Docker, AWS EC2" },
      { label: "Open source", value: "GoFr, CopilotKit, Permit CLI" },
    ],
    cta: { label: "See the work", href: "#work" },
  },
  {
    id: "curious",
    label: "I'm just curious",
    question: "What's he actually like?",
    headline: "Someone who ships on weekends too.",
    body: "203 public repositories and 299 stars is mostly a record of curiosity — a text-to-video pipeline, realtime diagramming, a mental-health app, a 2D game for a graphics assignment. Most of it started as \"I wonder if this works\".",
    points: [
      { label: "Repositories", value: "203 public" },
      { label: "Stars earned", value: "299" },
      { label: "First commit", value: "December 2020" },
      { label: "Currently learning", value: "Whatever the problem needs" },
    ],
    cta: { label: "Browse GitHub", href: "https://github.com/ARYPROGRAMMER", external: true },
  },
];
