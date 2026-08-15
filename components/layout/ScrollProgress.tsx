"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

/** Hairline progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            // scrub:true ties the bar directly to scroll position with no lag,
            // which is what you want for a progress indicator.
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-70 h-[2px] origin-left scale-x-0 bg-accent"
    />
  );
}
