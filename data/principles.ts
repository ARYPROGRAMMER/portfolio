export type Principle = {
  id: string;
  title: string;
  body: string;
};

/**
 * Four statements about how Arya works, drawn from what actually happened.
 * Kept deliberately short — the section is read one face at a time.
 */
export const principles: Principle[] = [
  {
    id: "slice",
    title: "Ship the vertical slice",
    body: "Interface, service and pipeline are one job. I'd rather own a thin slice all the way down than a thick layer in the middle.",
  },
  {
    id: "fast",
    title: "Fast beats clever",
    body: "Cutting a build by 53% in my second week was worth more to the team than any feature I could have written that week.",
  },
  {
    id: "demo",
    title: "The demo is not the product",
    body: "Payments, auth, rate limits and a sane security posture are the difference between a repository and something people trust.",
  },
  {
    id: "explain",
    title: "Explain, don't just answer",
    body: "Building an explanation engine taught me that output nobody can verify is output nobody ends up using.",
  },
];
