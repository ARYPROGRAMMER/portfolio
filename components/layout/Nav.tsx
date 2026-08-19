"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

import { scrollToSection, startScroll, stopScroll } from "./LenisProvider";
import { LocalTime } from "@/components/ui/LocalTime";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navItems, profile } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // ScrollTrigger only calls back when the threshold is actually crossed, so
  // this costs one React render per crossing rather than one per scroll frame.
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 24,
      end: "max",
      // `isActive` is `progress > 0 && progress < 1`, so it goes false again on
      // the last pixel of the page — which stripped the header's background at
      // exactly the point it sits over the contact block. Progress 1 is the
      // bottom of the document, not the top, so it still counts as scrolled.
      onToggle: (self) => setScrolled(self.isActive || self.progress === 1),
    });
    return () => trigger.kill();
  }, []);

  // Highlight whichever section owns the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile overlay.
  useEffect(() => {
    if (open) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      startScroll();
    }
    return () => {
      document.body.style.overflow = "";
      startScroll();
    };
  }, [open]);

  // Escape closes the overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback((href: string) => {
    setOpen(false);
    // Let the overlay begin closing before the scroll starts.
    setTimeout(() => scrollToSection(href, -8), 60);
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("palette:toggle"));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between gap-2 md:h-20 lg:gap-4">
          {/* Monogram */}
          <button
            type="button"
            onClick={() => scrollToSection("#top")}
            className="flex items-center"
            aria-label="Back to top"
          >
            {/*
              Initials while the seven nav links are competing for the same row;
              the full name only once there's genuinely room at lg.
            */}
            <span className="font-display text-lg font-extrabold tracking-tight lg:hidden">
              {profile.initials}
            </span>
            <span className="hidden font-display text-base font-extrabold uppercase tracking-tight lg:block">
              {profile.name}
            </span>
          </button>

          {/*
            Desktop links. Labels only — the section numbers live on the
            sections themselves, and seven of them plus their indices don't
            fit this row without crowding the controls off the end.
          */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => go(item.href)}
                  className={cn(
                    "group relative px-2 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors lg:px-3 lg:tracking-[0.14em]",
                    active === item.href
                      ? "text-accent"
                      : "text-dim hover:text-ink",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <span className="hidden font-mono text-[11px] text-dim lg:block">
              <LocalTime withSeconds={false} />
            </span>

            <button
              type="button"
              onClick={openPalette}
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim transition-colors hover:border-accent hover:text-accent md:flex"
              aria-label="Open command palette"
            >
              Search
              <kbd className="rounded-sm border border-line px-1 py-px text-[9px]">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-9 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-4 flex-col gap-[3px]">
                <motion.span
                  className="block h-px w-full bg-ink"
                  animate={open ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="block h-px w-full bg-ink"
                  animate={open ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[75] flex flex-col justify-between bg-bg px-5 pb-10 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                  className="border-b border-line"
                >
                  <button
                    type="button"
                    onClick={() => go(item.href)}
                    className="flex w-full items-baseline gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-[11px] text-accent">
                      {item.index}
                    </span>
                    <span className="display-md">{item.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="space-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
            >
              <p>{profile.location}</p>
              <p>
                <LocalTime />
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="block normal-case tracking-normal text-accent"
              >
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
