"use client";

import { useRef } from "react";

import { allowsMotion, gsap, useGSAP } from "@/lib/gsap";
import { cn, toWords } from "@/lib/utils";

/**
 * A block of text whose words brighten one after another as it moves through
 * the viewport. Words render fully lit, and the tween only dims the ones that
 * haven't been reached yet — so if it never runs, the paragraph still reads.
 */
export function ScrollHighlight({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = toWords(text);

  useGSAP(
    () => {
      if (!allowsMotion()) return;

      gsap.from(".highlight-word", {
        opacity: 0.16,
        ease: "none",
        stagger: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="highlight-word mr-[0.28em] inline-block"
        >
          {word}
        </span>
      ))}
    </p>
  );
}
