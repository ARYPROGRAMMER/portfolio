"use client";

import { useRef, type RefObject } from "react";

import { allowsMotion, gsap, useGSAP } from "@/lib/gsap";

type Options = {
  /** Children to stagger, relative to the container. */
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/**
 * Staggers a group of children in as their container enters the viewport.
 *
 * One tween and one ScrollTrigger per group — not per child — so a page full of
 * card grids costs a handful of triggers rather than dozens of
 * IntersectionObservers plus a React state change per card.
 *
 * `gsap.from` is deliberate: the markup renders in its final, visible state and
 * the animation only ever pulls it away and puts it back. If the tween never
 * runs, the content is still on screen.
 */
export function useStaggerReveal<T extends HTMLElement>(
  options: Options = {},
): RefObject<T | null> {
  const {
    selector = ":scope > *",
    y = 22,
    stagger = 0.06,
    duration = 0.7,
    start = "top 88%",
  } = options;

  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!allowsMotion() || !ref.current) return;

      const items = gsap.utils.toArray<HTMLElement>(selector, ref.current);
      if (!items.length) return;

      gsap.from(items, {
        opacity: 0,
        y,
        duration,
        ease: "expo.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref, dependencies: [selector, y, stagger, duration, start] },
  );

  return ref;
}
