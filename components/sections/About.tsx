"use client";

import Image from "next/image";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollHighlight } from "@/components/ui/ScrollHighlight";
import { education } from "@/data/experience";
import { profile, stats } from "@/data/site";
import { useStaggerReveal } from "@/lib/useStaggerReveal";

export function About() {
  const figures = useStaggerReveal<HTMLDivElement>({ stagger: 0.07 });

  return (
    <section
      id="about"
      aria-label="About Arya Pratap Singh"
      className="shell relative scroll-mt-24 py-24 md:py-32"
    >
      {/*
        The one paragraph a visitor is guaranteed to read. Sourced from
        `profile.lead` rather than written inline, so it can't drift from the
        metadata description the way it did before.
      */}
      <ScrollHighlight
        text={profile.lead}
        className="max-w-5xl font-display text-[clamp(1.6rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-tight"
      />

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
        {/* Portrait */}
        <Reveal className="md:col-span-5 lg:col-span-4">
          <figure className="relative">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-line bg-elev">
              <Image
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale transition-[filter,transform] duration-700 hover:scale-[1.03] hover:grayscale-0"
                priority={false}
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              <span>{profile.name}</span>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Bio + education */}
        <div className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
          <p className="eyebrow">(01) About</p>

          <div className="mt-6 space-y-6">
            {profile.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-pretty text-[15px] leading-relaxed text-dim md:text-base">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16} className="mt-12">
            <p className="eyebrow">Education</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {education.map((e) => (
                <li
                  key={e.institution}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-ink">{e.institution}</p>
                    <p className="mt-0.5 text-xs text-dim">
                      {e.credential} · {e.detail}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-faint">
                    {e.start}—{e.end}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Figures */}
      <div
        ref={figures}
        className="mt-20 grid grid-cols-2 gap-px border border-line bg-line md:mt-28 md:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="group bg-bg p-6 transition-colors hover:bg-elev md:p-8"
          >
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-none tracking-tighter transition-colors group-hover:text-accent"
            />
            <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-dim">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
