"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion, useMediaQuery } from "@/lib/hooks";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The rendered text starts at 0 on the server *and* on the first client render
 * — `useMediaQuery` reports `false` during hydration by design — so the markup
 * always matches. The real figure is carried on `aria-label`, which is what a
 * screen reader announces regardless of where the tween has got to.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useMediaQuery(prefersReducedMotion);
  const [tweened, setTweened] = useState(0);

  // Derived, not stored: reduced motion skips straight to the figure without
  // an effect having to write state for it.
  const display = reduced ? value : tweened;

  useEffect(() => {
    if (reduced || !inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setTweened(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true" className="tabular-nums">
        {display}
      </span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
