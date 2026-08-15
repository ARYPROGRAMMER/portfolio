"use client";

import { ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { signals } from "@/data/signals";
import { useStaggerReveal } from "@/lib/useStaggerReveal";
import { cn } from "@/lib/utils";

const kindColor: Record<string, string> = {
  Award: "text-accent border-accent/40",
  "Open source": "text-hot border-hot/40",
  Competition: "text-ink border-line-strong",
  Community: "text-dim border-line",
};

export function Signals() {
  const grid = useStaggerReveal<HTMLUListElement>();

  return (
    <section
      id="signals"
      aria-label="Awards and open-source contributions"
      className="shell scroll-mt-24 py-24 md:py-32"
    >
      <SectionHeader
        index="06"
        title="Signals"
        meta="Hackathons won, frameworks contributed to, and the parts of the work that happened in public."
      />

      <ul
        ref={grid}
        className="mt-14 grid gap-px border border-line bg-line md:mt-20 md:grid-cols-2 lg:grid-cols-3"
      >
        {signals.map((s) => {
          const Wrapper = s.href ? "a" : "div";

          return (
            <li key={s.id} className="bg-bg">
              <Wrapper
                {...(s.href
                  ? {
                      href: s.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "data-cursor": "Open",
                    }
                  : {})}
                className={cn(
                  "flex h-full flex-col justify-between gap-8 p-6 transition-colors md:p-8",
                  s.href && "group hover:bg-elev",
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]",
                        kindColor[s.kind],
                      )}
                    >
                      {s.kind}
                    </span>
                    {s.href && (
                      <ArrowUpRight className="size-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    )}
                  </div>

                  <h3 className="mt-5 text-balance font-display text-lg font-bold leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-dim">
                    {s.detail}
                  </p>
                </div>

                <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  <span>{s.org}</span>
                  <span>{s.year}</span>
                </p>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
