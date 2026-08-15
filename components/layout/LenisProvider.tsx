"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Module-level handle so anything can request a smooth scroll without prop drilling. */
let lenisInstance: Lenis | null = null;

export function scrollToSection(target: string | HTMLElement, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  // Lenis is disabled (reduced motion) or not mounted yet — fall back to native.
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function stopScroll() {
  lenisInstance?.stop();
}

export function startScroll() {
  lenisInstance?.start();
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      // Still let ScrollTrigger drive off native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      // Expo-out: fast take-off, long settle. Matches the CSS easing tokens.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      // Native momentum on touch feels better than an emulated one.
      syncTouch: false,
    });
    lenisInstance = lenis;

    // One scroll system for the whole site: Lenis reports position to
    // ScrollTrigger, and GSAP's ticker is the only rAF loop driving Lenis.
    // Without this you get two independent loops fighting each other, which is
    // what makes Lenis + ScrollTrigger feel like it stutters.
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    // Never let GSAP fake-advance time after a long frame; it desyncs the scroll.
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
