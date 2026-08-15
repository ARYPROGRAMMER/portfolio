"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: React.ReactNode[];
  /** Seconds for one full loop. Lower is faster. */
  speed?: number;
  reverse?: boolean;
  separator?: React.ReactNode;
  className?: string;
  itemClassName?: string;
};

/**
 * Duplicates its children once and translates by -50%, so the seam is invisible.
 * Pauses on hover, and stands still under prefers-reduced-motion (see globals.css).
 */
export function Marquee({
  items,
  speed = 40,
  reverse = false,
  separator = <Slash />,
  className,
  itemClassName,
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center will-change-transform",
          reverse ? "animate-[marquee-rev_var(--dur)_linear_infinite]" : "animate-[marquee_var(--dur)_linear_infinite]",
          "group-hover:[animation-play-state:paused]",
        )}
        style={{ "--dur": `${speed}s` } as React.CSSProperties}
      >
        {track.map((item, i) => (
          <span key={i} className={cn("flex items-center", itemClassName)}>
            {item}
            {separator}
          </span>
        ))}
      </div>
    </div>
  );
}

function Slash() {
  return (
    <span className="mx-6 select-none text-accent md:mx-10" aria-hidden="true">
      /
    </span>
  );
}
