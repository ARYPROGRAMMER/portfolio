"use client";

import {
  Briefcase,
  Layers,
  Mail,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { scrollToSection } from "./LenisProvider";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Five slots, not seven: the dock is thumb-width, and a sixth label stops
 * fitting on a small phone. Experience takes the slot Approach used to hold —
 * it is the section a visitor who is here to hire actually wants — and
 * Approach stays reachable from the nav and the command palette.
 */
const dockItems = [
  { href: "#experience", label: "Work exp", Icon: Briefcase },
  { href: "#work", label: "Projects", Icon: Layers },
  { href: "#stack", label: "Stack", Icon: Wrench },
  { href: "#signals", label: "Signals", Icon: Sparkles },
  { href: "#contact", label: "Contact", Icon: Mail },
];

/**
 * Thumb-reachable navigation for touch devices. Hides while scrolling down so
 * it never covers content, and comes back the moment you scroll up.
 */
export function MobileDock() {
  const [visible, setVisible] = useState(false);

  // ScrollTrigger tracks direction for us and only fires on state changes, so
  // this no longer runs any code on a typical scroll frame.
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 400,
      end: "max",
      onUpdate: (self) => {
        // Visible past the hero, but tuck away while scrolling down.
        const next = self.isActive && !(self.direction === 1 && self.scroll() > 500);
        setVisible((prev) => (prev === next ? prev : next));
      },
      onLeaveBack: () => setVisible(false),
    });
    return () => trigger.kill();
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("palette:toggle"));

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={false}
      animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-3 bottom-3 z-[78] md:hidden",
        // Keep it clear of the iOS home indicator.
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <ul className="flex items-stretch justify-between gap-1 rounded-2xl border border-line bg-bg/85 p-1.5 shadow-2xl backdrop-blur-xl">
        {dockItems.map(({ href, label, Icon }) => (
          <li key={href} className="flex-1">
            <button
              type="button"
              onClick={() => scrollToSection(href, -8)}
              className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-dim transition-colors active:bg-elev active:text-accent"
            >
              <Icon className="size-[18px]" strokeWidth={1.6} />
              <span className="font-mono text-[9px] uppercase tracking-[0.08em]">
                {label}
              </span>
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="flex h-full flex-col items-center justify-center gap-1 rounded-xl bg-accent px-3 py-2 text-accent-ink"
          >
            <Search className="size-[18px]" strokeWidth={1.8} />
            <span className="font-mono text-[9px] uppercase tracking-[0.08em]">
              Find
            </span>
          </button>
        </li>
      </ul>
    </motion.nav>
  );
}
