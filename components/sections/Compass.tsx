"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { scrollToSection } from "@/components/layout/LenisProvider";
import { compassPaths } from "@/data/compass";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Lets a visitor say why they came, then answers that specific question.
 * Defaults to the hiring path, since that's the most common reason to land here.
 */
export function Compass() {
  const [activeId, setActiveId] = useState(compassPaths[0].id);
  const active = compassPaths.find((p) => p.id === activeId) ?? compassPaths[0];

  return (
    <section
      id="start"
      aria-label="Start here"
      className="shell scroll-mt-24 py-24 md:py-32"
    >
      <div className="h-px w-full bg-line-strong" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-5 md:pt-7">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            (00)
          </span>
          <h2 className="display-lg">Why are you here?</h2>
        </div>
        <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-dim">
          Pick one. The page answers that question instead of making you dig.
        </p>
      </div>

      {/* Chooser */}
      <div
        role="tablist"
        aria-label="Why are you here?"
        className="mt-10 flex flex-col gap-2 sm:flex-row sm:gap-3"
      >
        {compassPaths.map((path) => {
          const selected = path.id === activeId;
          return (
            <button
              key={path.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`compass-${path.id}`}
              id={`compass-tab-${path.id}`}
              onClick={() => setActiveId(path.id)}
              className={cn(
                "group relative flex-1 overflow-hidden border px-5 py-4 text-left transition-colors sm:py-5",
                selected
                  ? "border-accent text-accent"
                  : "border-line text-dim hover:border-line-strong hover:text-ink",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="compass-fill"
                  className="absolute inset-0 -z-10 bg-accent/8"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <span className="flex items-center justify-between gap-3">
                <span className="font-display text-base font-bold tracking-tight sm:text-lg">
                  {path.label}
                </span>
                <ArrowRight
                  className={cn(
                    "size-4 shrink-0 transition-transform",
                    selected ? "translate-x-0" : "-translate-x-1 opacity-40",
                  )}
                />
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                {path.question}
              </span>
            </button>
          );
        })}
      </div>

      {/* Answer panel */}
      <div className="mt-6 border border-line bg-elev">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`compass-${active.id}`}
            role="tabpanel"
            aria-labelledby={`compass-tab-${active.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="grid gap-8 p-6 md:grid-cols-12 md:gap-10 md:p-10"
          >
            <div className="md:col-span-6">
              <h3 className="display-md text-balance">{active.headline}</h3>
              <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-dim md:text-base">
                {active.body}
              </p>

              {active.cta.external ? (
                <a
                  href={active.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink"
                >
                  {active.cta.label}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection(active.cta.href, -8)}
                  className="group mt-7 inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink"
                >
                  {active.cta.label}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>

            <dl className="grid grid-cols-1 self-start divide-y divide-line border-y border-line md:col-span-5 md:col-start-8">
              {active.points.map((point, i) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {point.label}
                  </dt>
                  <dd className="text-sm text-ink">{point.value}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
