"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-level error boundary. Next ships an unstyled fallback in production;
 * this keeps a failure looking like the rest of the site and gives the visitor
 * something to do other than close the tab.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No error-reporting service is wired up, so the console is the only sink.
    console.error(error);
  }, [error]);

  return (
    <div className="shell flex min-h-svh flex-col justify-center py-32">
      <p className="eyebrow">Something broke</p>
      <h1 className="display-xl mt-4 uppercase">
        Well
        <br />
        <span className="stroke-text">that&apos;s</span>
        <br />
        awkward
      </h1>
      <p className="mt-8 max-w-md text-sm leading-relaxed text-dim">
        This page hit an error it didn&apos;t plan for. Trying again usually
        does it.
        {error.digest && (
          <>
            {" "}
            <span className="font-mono text-xs text-faint">
              Reference {error.digest}.
            </span>
          </>
        )}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors hover:border-accent hover:text-accent"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
