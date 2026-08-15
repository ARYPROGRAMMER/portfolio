"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { startScroll, stopScroll } from "./LenisProvider";
import { profile } from "@/data/site";
import { prefersReducedMotion, useClientFlag, useMediaQuery } from "@/lib/hooks";

const KEY = "aps:intro-seen";
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Cached at module scope on purpose: we write to sessionStorage while the intro
 * is still animating out, and re-reading it would flip this value mid-flight and
 * cut the exit short.
 */
let introSeen: boolean | null = null;

function isFirstVisitThisSession() {
  if (introSeen === null) {
    try {
      introSeen = Boolean(sessionStorage.getItem(KEY));
    } catch {
      // Storage blocked (private mode, embedded) — skip the intro rather than
      // replaying it on every navigation.
      introSeen = true;
    }
  }
  return !introSeen;
}

/**
 * Counter-and-curtain intro. Shown once per browser session so returning to the
 * page mid-visit doesn't make you sit through it again.
 */
export function Preloader() {
  const reduced = useMediaQuery(prefersReducedMotion);
  const firstVisit = useClientFlag(isFirstVisitThisSession);
  const [dismissed, setDismissed] = useState(false);
  const [count, setCount] = useState(0);

  const active = firstVisit && !reduced && !dismissed;

  // Lock scrolling for the duration.
  useEffect(() => {
    if (!active) return;
    stopScroll();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      startScroll();
    };
  }, [active]);

  // Drive the counter with rAF so it tracks real elapsed time, not tick count.
  useEffect(() => {
    if (!active) return;

    const DURATION = 1700;
    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION, 1);
      // Ease-out so it sprints then lands.
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          // Non-fatal: the module-level flag still prevents a replay this session.
        }
        setTimeout(() => setDismissed(true), 380);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[95] flex flex-col justify-between bg-bg px-5 py-6 md:px-10 md:py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            <span>{profile.name}</span>
            <span className="hidden sm:block">{profile.location}</span>
          </div>

          <div className="flex flex-1 items-center">
            <div className="w-full">
              <div className="overflow-hidden">
                <motion.h2
                  className="display-lg"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                >
                  Building things
                  <br />
                  <span className="text-accent">that ship.</span>
                </motion.h2>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            {/* Fill bar tracks the same value as the numeral. */}
            <div className="h-px flex-1 bg-line">
              <div
                className="h-full bg-accent transition-[width] duration-100 ease-linear"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="font-display text-[clamp(2.5rem,10vw,7rem)] font-extrabold leading-none tabular-nums tracking-tighter">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
