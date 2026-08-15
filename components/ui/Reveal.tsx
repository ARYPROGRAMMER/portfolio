"use client";

import { useRef } from "react";

import { allowsMotion, gsap, useGSAP } from "@/lib/gsap";
import { cn, toWords } from "@/lib/utils";

const EASE = "expo.out";

/* ------------------------------------------------------------------ *
 *  Block reveal — fades and lifts once, on enter.
 * ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
  y = 32,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!allowsMotion()) return;

      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: EASE,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [delay, y] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Per-word reveal for headlines and lead paragraphs.
 * ------------------------------------------------------------------ */

export function RevealWords({
  text,
  className,
  wordClassName,
  stagger = 0.035,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const words = toWords(text);

  useGSAP(
    () => {
      if (!allowsMotion()) return;

      // Words start flat in the markup and are pushed down here, so if anything
      // goes wrong with the trigger the text is still readable rather than
      // stuck off-screen behind its mask.
      gsap.from(".reveal-word", {
        yPercent: 115,
        duration: 0.85,
        ease: EASE,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [stagger, text] },
  );

  return (
    <Tag
      // @ts-expect-error — one ref type across the small union of allowed tags.
      ref={ref}
      className={className}
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            /*
             * The mask. display-* utilities use a line-height below 1, so the
             * padding gives the glyph ink somewhere to live and the matching
             * negative margin takes the space back out of the layout.
             */
            className="inline-flex overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
          >
            <span className={cn("reveal-word inline-block", wordClassName)}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
