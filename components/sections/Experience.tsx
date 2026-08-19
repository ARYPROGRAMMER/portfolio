"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/experience";
import { useStaggerReveal } from "@/lib/useStaggerReveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  // Open the current role by default; everything else is one click away.
  const [open, setOpen] = useState<string | null>(
    experience.find((r) => r.current)?.id ?? experience[0]?.id ?? null,
  );
  const list = useStaggerReveal<HTMLUListElement>();

  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="shell scroll-mt-24 py-24 md:py-32"
    >
      <SectionHeader
        index="02"
        title="Experience"
        meta="Three companies since late 2024, every one remote — web frontends, Flutter clients, and the services behind them."
      />

      <ul ref={list} className="mt-14 border-t border-line md:mt-20">
        {experience.map((role, i) => {
          const isOpen = open === role.id;

          return (
            <li key={role.id} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : role.id)}
                  aria-expanded={isOpen}
                  aria-controls={`role-${role.id}`}
                  className="group flex w-full items-start gap-4 py-6 text-left md:items-center md:gap-8 md:py-8"
                >
                  <span className="mt-1 shrink-0 font-mono text-[11px] tracking-[0.18em] text-accent md:mt-0 md:w-12">
                    0{i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="display-md transition-colors group-hover:text-accent">
                        {role.company}
                      </span>
                      {role.aka && (
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                          ({role.aka})
                        </span>
                      )}
                      {role.current && (
                        <span className="flex items-center gap-1.5 rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                          <span className="size-1 rounded-full bg-accent" />
                          Now
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-dim">
                      {role.role}
                      <span className="mx-2 text-line-strong">·</span>
                      <span className="text-faint">{role.type}</span>
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 md:gap-8">
                    <span className="text-right font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                      {role.start}
                      <span className="mx-1 text-faint">—</span>
                      {role.end}
                    </span>
                    {/* Plus that rotates into a minus. */}
                    <span className="relative grid size-6 shrink-0 place-items-center">
                      <span className="absolute h-px w-3.5 bg-dim transition-colors group-hover:bg-accent" />
                      <motion.span
                        className="absolute h-px w-3.5 bg-dim transition-colors group-hover:bg-accent"
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    </span>
                  </div>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`role-${role.id}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-10 md:pl-20">
                      <div className="md:col-span-5">
                        <p className="text-pretty text-sm leading-relaxed text-ink">
                          {role.summary}
                        </p>
                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                          {role.location}
                          {role.href && (
                            <>
                              <span className="mx-2">·</span>
                              {/* -my-1.5 grows the hit area without moving the line. */}
                              <a
                                href={role.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-wipe -my-1.5 py-1.5 text-accent"
                              >
                                Website
                              </a>
                            </>
                          )}
                        </p>
                      </div>

                      <div className="md:col-span-7">
                        <ul className="space-y-3">
                          {role.highlights.map((h, hi) => (
                            <motion.li
                              key={hi}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + hi * 0.06, duration: 0.4 }}
                              className="flex gap-3 text-sm leading-relaxed text-dim"
                            >
                              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                              {h}
                            </motion.li>
                          ))}
                        </ul>

                        <ul className="mt-6 flex flex-wrap gap-2">
                          {role.stack.map((s) => (
                            <li
                              key={s}
                              className={cn(
                                "rounded-full border border-line px-2.5 py-1",
                                "font-mono text-[10px] uppercase tracking-[0.1em] text-faint",
                              )}
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
