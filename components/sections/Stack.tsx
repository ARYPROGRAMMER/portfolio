"use client";

import { Marquee } from "@/components/ui/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { marqueeStack, stackGroups } from "@/data/stack";
import { useStaggerReveal } from "@/lib/useStaggerReveal";

export function Stack() {
  const grid = useStaggerReveal<HTMLDivElement>();

  return (
    <section
      id="stack"
      aria-label="Technical toolkit"
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div className="shell">
        <SectionHeader
          index="05"
          title="Toolkit"
          meta="What I actually reach for. Ordered by how often it ends up in production, not by how it looks on a CV."
        />

        {/*
          Six groups divide exactly into both the 2-up and 3-up grid, so the
          last row always closes without a filler cell.
        */}
        <div
          ref={grid}
          className="mt-14 grid gap-px border border-line bg-line md:mt-20 md:grid-cols-2 lg:grid-cols-3"
        >
          {stackGroups.map((group) => (
            <div
              key={group.title}
              className="group bg-bg p-6 transition-colors hover:bg-elev md:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  {group.index}
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {group.title}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* One band of oversized type, outlined so it reads as texture. */}
      <div className="mt-24 border-y border-line py-6 md:mt-32 md:py-10">
        <Marquee
          speed={46}
          items={marqueeStack.map((s) => (
            <span key={s} className="display-md font-extrabold uppercase stroke-text">
              {s}
            </span>
          ))}
          separator={<span className="mx-6 text-accent md:mx-10">✦</span>}
        />
      </div>
    </section>
  );
}
