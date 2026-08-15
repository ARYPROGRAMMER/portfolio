"use client";

import { useRef } from "react";

import { RevealWords } from "./Reveal";
import { allowsMotion, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  title: string;
  meta?: string;
  className?: string;
};

export function SectionHeader({
  index,
  title,
  meta,
  className,
}: SectionHeaderProps) {
  const rule = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!allowsMotion()) return;

    gsap.from(rule.current, {
      scaleX: 0,
      duration: 1.1,
      ease: "expo.out",
      scrollTrigger: { trigger: rule.current, start: "top 92%", once: true },
    });
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Rule that draws itself in as the section enters. */}
      <div ref={rule} className="h-px w-full origin-left bg-line-strong" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-5 md:pt-7">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            ({index})
          </span>
          <RevealWords as="h2" text={title} className="display-lg" stagger={0.045} />
        </div>

        {meta && (
          <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-dim">
            {meta}
          </p>
        )}
      </div>
    </div>
  );
}
