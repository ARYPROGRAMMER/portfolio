import Link from "next/link";

import type { Metadata } from "next";

// A 404 must never enter the index — it would compete with the real page.
export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="shell flex min-h-svh flex-col justify-center py-32">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-xl mt-4 uppercase">
        Nothing
        <br />
        <span className="stroke-text">here</span>
      </h1>
      <p className="mt-8 max-w-md text-sm leading-relaxed text-dim">
        That page doesn&apos;t exist — or it did, two rebuilds ago.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit rounded-full bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink"
      >
        Back home
      </Link>
    </div>
  );
}
