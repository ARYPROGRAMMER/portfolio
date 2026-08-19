import { education, experience } from "@/data/experience";
import { projects, repoUrl } from "@/data/projects";
import { signals } from "@/data/signals";
import {
  SITE_URL,
  knowsAbout,
  metaDescription,
  nameVariants,
  profile,
  socials,
  support,
} from "@/data/site";

/**
 * One `@graph` rather than several loose blocks, so every node can reference
 * the others by `@id`. That is what lets a crawler read "this page is about
 * this person, who works here and built these things" as one statement instead
 * of four unrelated ones.
 *
 * Everything asserted here is also visible on the page — structured data that
 * claims more than the rendered content is a manual-action risk, not a ranking
 * trick.
 */

const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  page: `${SITE_URL}/#webpage`,
  image: `${SITE_URL}/#primaryimage`,
} as const;

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/**
 * ISO month for a "Mon YYYY" string, or undefined when it isn't one.
 *
 * Parsed by hand rather than through `Date`: `new Date("1 May 2026")` is a
 * local-midnight instant, and `toISOString()` then renders it in UTC — which
 * in any timezone east of Greenwich rolls the date back into the previous
 * month, so every start and end date in the structured data came out one
 * month early.
 */
function isoMonth(label: string): string | undefined {
  const match = /^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})$/.exec(label.trim());
  if (!match) return undefined;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  if (month < 0) return undefined;
  return `${match[2]}-${String(month + 1).padStart(2, "0")}`;
}

/**
 * Every role, current and past. `OrganizationRole` is the wrapper schema.org
 * provides for putting dates on an employment relationship — the plain
 * `Organization` form can only say "works here", not "from when to when".
 */
const roles = experience.map((role) => ({
  "@type": "OrganizationRole" as const,
  roleName: role.role,
  startDate: isoMonth(role.start),
  ...(role.end === "Present" ? {} : { endDate: isoMonth(role.end) }),
  worksFor: {
    "@type": "Organization" as const,
    name: role.company,
    ...(role.href ? { url: role.href } : {}),
  },
}));

const person = {
  "@type": "Person",
  "@id": ID.person,
  name: profile.name,
  // Every form of the name that resolves to this person. This is the property
  // that lets "arya singh" and "aryprogrammer" be understood as the same
  // entity as "Arya Pratap Singh" rather than three unrelated strings.
  alternateName: [...nameVariants].filter((n) => n !== profile.name),
  givenName: "Arya",
  additionalName: "Pratap",
  familyName: "Singh",
  url: SITE_URL,
  mainEntityOfPage: { "@id": ID.page },
  image: { "@id": ID.image },
  description: metaDescription,
  disambiguatingDescription: profile.summary,
  jobTitle: ["Software Engineer", "Full-stack Developer", "Flutter Developer"],
  email: `mailto:${profile.email}`,
  knowsLanguage: ["en", "hi"],
  knowsAbout: [...knowsAbout],
  nationality: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  alumniOf: education.map((e) => ({
    "@type": "EducationalOrganization",
    name: e.institution,
    ...(e.location ? { address: e.location } : {}),
  })),
  worksFor: roles,
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Full-stack Software Engineer",
      occupationalCategory: "15-1254.00", // O*NET: Web Developers
      skills: [...knowsAbout].join(", "),
    },
    {
      "@type": "Occupation",
      name: "Flutter Developer",
      occupationalCategory: "15-1252.00", // O*NET: Software Developers
      skills: "Flutter, Dart, BLoC, clean architecture, Firebase, Android",
    },
  ],
  seeks: {
    "@type": "Demand",
    name: profile.status.label,
  },
  award: signals
    .filter((s) => s.kind === "Award" || s.kind === "Competition")
    .map((s) => `${s.title} (${s.org}, ${s.year})`),
  sameAs: [
    ...socials.filter((s) => !s.href.startsWith("mailto:")).map((s) => s.href),
    support.href,
  ],
};

const website = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: profile.name,
  alternateName: [...nameVariants].filter((n) => n !== profile.name),
  description: metaDescription,
  inLanguage: "en",
  publisher: { "@id": ID.person },
  copyrightHolder: { "@id": ID.person },
};

const webPage = {
  "@type": "ProfilePage",
  "@id": ID.page,
  url: SITE_URL,
  name: `${profile.name} — ${profile.disciplineLine}`,
  description: metaDescription,
  isPartOf: { "@id": ID.website },
  about: { "@id": ID.person },
  mainEntity: { "@id": ID.person },
  primaryImageOfPage: { "@id": ID.image },
  inLanguage: "en",
};

const primaryImage = {
  "@type": "ImageObject",
  "@id": ID.image,
  url: `${SITE_URL}${profile.avatar}`,
  contentUrl: `${SITE_URL}${profile.avatar}`,
  caption: `${profile.name} — full-stack software engineer and Flutter developer`,
};

/**
 * The projects, as an ordered list of software works. This is what gives the
 * repo names a chance of surfacing for "<project> Arya Pratap Singh" queries.
 */
const projectList = {
  "@type": "ItemList",
  name: `Selected work by ${profile.name}`,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareSourceCode",
      name: p.title,
      description: p.blurb,
      codeRepository: repoUrl(p.repo),
      ...(p.live ? { url: p.live } : { url: repoUrl(p.repo) }),
      programmingLanguage: p.stack,
      dateCreated: p.year,
      author: { "@id": ID.person },
      creator: { "@id": ID.person },
    },
  })),
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [person, website, webPage, primaryImage, projectList],
};
