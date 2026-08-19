export const SITE_URL = "https://aryapratapsingh.xyz";

/**
 * The one-line answer to "what does he do". Hoisted out of `profile` so the
 * About section's oversized lead statement and the metadata summary are the
 * same sentence by construction — they had drifted apart once already.
 */
const LEAD =
  "I build products end to end — the web interface people touch, the Flutter app in their pocket, and the services behind both.";

export const profile = {
  name: "Arya Pratap Singh",
  shortName: "Arya",
  initials: "AS",
  handle: "ARYPROGRAMMER",
  role: "Software Engineer",
  /**
   * The discipline line, defined once. Every surface that states what Arya
   * does — hero byline, OG card, meta title — reads from here, so the site
   * can't end up describing him three different ways.
   */
  disciplineLine: "Full-stack · Flutter · Infrastructure",
  /** Rotating words under the hero headline. */
  disciplines: ["full-stack", "Flutter", "mobile", "infrastructure"],
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",
  email: "arya.2023ug1104@iiitranchi.ac.in",
  resume: "/resume.pdf",
  avatar: "/profile.jpg",
  status: {
    label: "Open to 2027 Openings",
    available: true,
  },
  now: {
    company: "Global Groupware Solutions",
    product: "EmployWise",
    role: "Software Engineer Intern",
  },
  /** The oversized lead statement in About. */
  lead: LEAD,
  /** Lead plus current context. Used in the hero and the page metadata. */
  summary: `${LEAD} Currently shipping MyEmployWise 2.0 at Global Groupware Solutions, and finishing a CSE degree at IIIT Ranchi.`,
  bio: [
    "I'm a final-year CSE student at IIIT Ranchi who spends most of his time shipping production software rather than sitting in lectures. Over the last two years I've interned at three companies — building web products on React and Next.js and mobile clients in Flutter, usually both for the same product.",
    "The through-line is that I like the whole stack. I'll happily spend a morning cutting a build from minutes to seconds with rspack and swc, and the afternoon getting a Framer-grade interaction to feel right on a mid-range Android. Both jobs are the same job: making something feel fast to the person using it.",
  ],
} as const;

/**
 * Buy Me a Coffee. Deliberately a plain link rather than the vendor's widget
 * script: that script is a render-blocking third-party bundle that lands a
 * fixed-position button on top of the mobile dock, and it would undo the
 * Core Web Vitals work the rest of this site is doing.
 */
export const support = {
  label: "Buy me a coffee",
  short: "Coffee",
  handle: "@aryasingh",
  href: "https://buymeacoffee.com/aryasingh",
  blurb: "Help me build more open source.",
} as const;

export const socials = [
  {
    label: "GitHub",
    handle: "@ARYPROGRAMMER",
    href: "https://github.com/ARYPROGRAMMER",
  },
  {
    label: "LinkedIn",
    handle: "in/its-arya",
    href: "https://linkedin.com/in/its-arya",
  },
  {
    label: "X",
    handle: "@ARYPROGRAMMER",
    href: "https://x.com/ARYPROGRAMMER",
  },
  {
    label: "Dev.to",
    handle: "@aryprogrammer",
    href: "https://dev.to/aryprogrammer",
  },
  {
    label: "Medium",
    handle: "@aryasingh8405",
    href: "https://medium.com/@aryasingh8405",
  },
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
  },
] as const;

export const navItems = [
  { label: "About", href: "#about", index: "01" },
  { label: "Experience", href: "#experience", index: "02" },
  { label: "Work", href: "#work", index: "03" },
  { label: "Approach", href: "#principles", index: "04" },
  { label: "Stack", href: "#stack", index: "05" },
  { label: "Signals", href: "#signals", index: "06" },
  { label: "Contact", href: "#contact", index: "07" },
] as const;

/* ------------------------------------------------------------------ *
 *  Search
 * ------------------------------------------------------------------ */

/**
 * The one-sentence description search engines and social cards quote. Kept
 * under ~155 characters so Google renders it whole instead of truncating it,
 * and deliberately front-loaded with the name — the query most people who land
 * here actually typed.
 */
export const metaDescription =
  "Arya Pratap Singh — full-stack engineer and Flutter developer in Mumbai. Ships production React, Next.js, Go and Flutter. IIIT Ranchi CSE, class of 2027.";

/**
 * Every form of the name a person might actually type. Google treats these as
 * aliases of the same entity, which is what lets "arya singh iiit ranchi" and
 * "aryprogrammer" resolve to the same page as the full name.
 */
export const nameVariants = [
  "Arya Pratap Singh",
  "Arya Singh",
  "Arya",
  "ARYPROGRAMMER",
  "aryprogrammer",
] as const;

/**
 * Topics for the Person entity in JSON-LD. Search engines use these to place
 * the page in a topic graph; keep them to things the page genuinely evidences,
 * strongest discipline first.
 */
export const knowsAbout = [
  "Full-stack web development",
  "Flutter development",
  "Mobile app development",
  "Dart",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Go",
  "Cross-platform mobile apps",
  "Cloud infrastructure",
  "Kubernetes",
  "Build tooling and performance",
] as const;

/**
 * Terms this page can honestly rank for. Name variants come first: those are
 * the queries with real intent behind them, and the only ones a single
 * personal site can realistically win.
 */
export const keywords = [
  "Arya Pratap Singh",
  "Arya Singh",
  "Arya Pratap Singh portfolio",
  "Arya Pratap Singh software engineer",
  "Arya Pratap Singh Flutter",
  "Arya Singh IIIT Ranchi",
  "Arya IIIT Ranchi",
  "ARYPROGRAMMER",
  "full-stack engineer India",
  "Flutter developer India",
  "Flutter developer Mumbai",
  "React developer Mumbai",
  "Next.js developer",
  "IIIT Ranchi computer science",
  "2027 new grad software engineer",
  "open source contributor GoFr CopilotKit",
] as const;

/**
 * Snapshot of the GitHub profile, taken 2026-08-14. These are rendered as
 * static figures — refresh them by hand rather than hitting the API on load.
 */
export const stats = [
  { value: 203, label: "Public repositories", suffix: "" },
  { value: 299, label: "Stars earned", suffix: "" },
  { value: 3, label: "Companies shipped for", suffix: "" },
  { value: 53, label: "Build time cut", suffix: "%" },
] as const;
