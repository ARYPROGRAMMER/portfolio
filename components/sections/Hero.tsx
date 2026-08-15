"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { scrollToSection } from "@/components/layout/LenisProvider";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { marqueeStack } from "@/data/stack";
import { profile } from "@/data/site";
import { allowsMotion, gsap, useGSAP } from "@/lib/gsap";
import {
  hasWebGL,
  isLowPowerDevice,
  useClientFlag,
  useMediaQuery,
} from "@/lib/hooks";

// WebGL is client-only and entirely optional. Gated at the call site below, so
// the three.js chunk is never even requested on devices that won't render it.
const HeroField = dynamic(
  () => import("@/components/three/HeroField").then((m) => m.HeroField),
  { ssr: false },
);

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // A phone with a finger for a pointer gets the static hero: the field costs
  // battery and buys nothing without a cursor to react to.
  const coarse = useMediaQuery("(pointer: coarse)");
  const narrow = useMediaQuery("(max-width: 767px)");
  const capable = useClientFlag(() => hasWebGL() && !isLowPowerDevice());
  const showField = capable && !reduced && !(coarse && narrow);

  // Headline drifts up and dims as the hero leaves.
  useGSAP(
    () => {
      if (!allowsMotion()) return;

      gsap.to(inner.current, {
        yPercent: 18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-24 md:pt-28"
    >
      {showField && (
        <HeroField className="pointer-events-none absolute inset-0 z-0 opacity-70" />
      )}
      <div
        className="blueprint pointer-events-none absolute inset-0 z-0 opacity-60"
        aria-hidden="true"
      />

      <div ref={inner} className="shell relative z-10 flex-1">
        <StatusPill />

        <h1 className="mt-8 md:mt-12">
          <span className="sr-only">
            {profile.name} — full-stack software engineer and Flutter developer.
          </span>

          <Line delay={0.05}>Arya</Line>
          <Line delay={0.13}>Pratap</Line>

          <span className="flex items-center gap-4 md:gap-8" aria-hidden="true">
            <Line delay={0.21} className="text-accent">
              Singh
            </Line>
            <motion.span
              className="hidden h-px flex-1 origin-left bg-line-strong sm:block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
            />
            <motion.span
              className="hidden shrink-0 text-accent sm:block"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
            >
              <ArrowUpRight className="size-8 md:size-12" strokeWidth={1.25} />
            </motion.span>
          </span>
        </h1>

        {/* Byline: the role sits under the name, editorial masthead style. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-ink sm:text-xs md:tracking-[0.34em]"
        >
          Software Engineer
          <span className="hidden text-line-strong sm:inline">/</span>
          <span className="text-dim">{profile.disciplineLine}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-balance text-sm leading-relaxed text-dim md:text-base">
            {profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={14}>
              <button
                type="button"
                onClick={() => scrollToSection("#work", -8)}
                data-cursor="View"
                className="group flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink transition-transform"
              >
                Selected work
                <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </Magnetic>

            <Magnetic strength={14}>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Résumé
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Foot of the hero: coordinates, scroll cue, then the ticker. */}
      <div className="relative z-10 mt-14">
        <div className="shell flex items-end justify-between gap-6 pb-6">
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim sm:grid-cols-3"
          >
            <div>
              <dt className="text-faint">Based in</dt>
              <dd className="text-ink">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-faint">Local time</dt>
              <dd className="text-ink">
                <LocalTime />
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-faint">Currently</dt>
              <dd className="text-ink">
                {profile.now.role} · {profile.now.product}
              </dd>
            </div>
          </motion.dl>

          <motion.button
            type="button"
            onClick={() => scrollToSection("#about", -8)}
            aria-label="Scroll to about"
            // -my-2 keeps the enlarged hit area from shifting the row it sits in.
            className="-my-2 hidden shrink-0 items-center gap-2 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-accent sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Scroll
            <motion.span
              animate={reduced ? {} : { y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="size-3.5" />
            </motion.span>
          </motion.button>
        </div>

        <div className="border-y border-line bg-bg/60 py-3 backdrop-blur-sm">
          <Marquee
            speed={38}
            items={marqueeStack.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim"
              >
                {s}
              </span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Line({
  children,
  delay,
  className,
}: {
  children: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`display-xl block uppercase ${className ?? ""}`}
        initial={{ y: "104%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function StatusPill() {
  const [i, setI] = useState(0);

  // Cycle the discipline word so the pill has something to say.
  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % profile.disciplines.length),
      2400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="flex flex-wrap items-center gap-x-4 gap-y-2"
    >
      <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
        {profile.status.label}
      </span>

      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        <span>Working in</span>
        <span className="relative inline-flex h-4 min-w-24 items-center overflow-hidden text-accent">
          <AnimatePresence mode="wait">
            <motion.span
              key={profile.disciplines[i]}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute whitespace-nowrap"
            >
              {profile.disciplines[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </motion.div>
  );
}
