"use client";

import { useRef } from "react";

import { principles } from "@/data/principles";
import { allowsMotion, gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion, useMediaQuery } from "@/lib/hooks";

const COUNT = principles.length;
/** Degrees between faces of the drum. Four faces → a square prism. */
const STEP = 360 / COUNT;
/**
 * Distance from the axis to each face, as a multiple of face height:
 * (h / 2) / tan(STEP / 2). Derived from COUNT rather than hard-coded, so
 * adding or removing a principle keeps the prism closed. Kept in CSS so the
 * drum stays correct as the face height flexes.
 */
const RADIUS = `calc(var(--face-h) * ${(
  0.5 / Math.tan(Math.PI / COUNT)
).toFixed(6)})`;

/**
 * A rotating prism of statements, driven by scroll.
 *
 * ScrollTrigger pins the stage and scrubs a single rotateX on the drum. Faces
 * are placed with static transforms and culled by `backface-visibility` rather
 * than per-face opacity, so scrolling only ever writes one transform.
 */
export function Principles() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const drum = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery(prefersReducedMotion);

  useGSAP(
    () => {
      if (!allowsMotion()) return;

      // Trigger on the stage, not the section: the pin has to begin exactly
      // when the stage reaches the top of the viewport, otherwise it freezes
      // mid-screen with the section header still above it.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          // ~0.5 viewports of scroll per face — enough to read one, not so
          // much that the pin outstays its welcome.
          end: () => `+=${window.innerHeight * COUNT * 0.5}`,
          pin: stage.current,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        drum.current,
        { rotateX: -STEP * (COUNT - 1), ease: "none" },
        0,
      ).fromTo(rail.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    },
    { scope: section },
  );

  const header = (
    <div className="shell">
      <div className="h-px w-full bg-line-strong" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-5 md:pt-7">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
            (04)
          </span>
          <h2 className="display-lg">How I work</h2>
        </div>
        <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-dim">
          Four things I&apos;ve learned the expensive way.
        </p>
      </div>
    </div>
  );

  // Without the scrub there's nothing to turn the drum, so the faces would sit
  // stacked on top of each other. Read it as a list instead.
  if (reduced) {
    return (
      <section
        id="principles"
        aria-label="How I work"
        className="scroll-mt-24 py-24 md:py-32"
      >
        {header}
        <ol className="shell mt-12 divide-y divide-line border-y border-line">
          {principles.map((p, i) => (
            <li key={p.id} className="flex flex-col gap-2 py-8 md:flex-row md:gap-10">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent md:w-16">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display-md">{p.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={section}
      id="principles"
      aria-label="How I work"
      className="scroll-mt-24 py-24 md:py-32"
    >
      {header}

      <div
        ref={stage}
        className="relative mt-8 flex h-svh items-center justify-center overflow-hidden"
        style={
          {
            perspective: "1400px",
            "--face-h": "clamp(15rem, 34vh, 21rem)",
          } as React.CSSProperties
        }
      >
        {/*
          Horizon rules the drum turns between. Positioned with inline styles
          rather than arbitrary classes, since a `/` inside a Tailwind bracket
          reads as an opacity modifier.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-line"
          style={{ transform: "translateY(calc(var(--face-h) * -0.5))" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-line"
          style={{ transform: "translateY(calc(var(--face-h) * 0.5))" }}
        />

        <div
          ref={drum}
          className="relative w-[min(90vw,56rem)]"
          style={{ height: "var(--face-h)", transformStyle: "preserve-3d" }}
        >
          {principles.map((p, i) => (
            <div
              key={p.id}
              className="absolute inset-0 flex flex-col justify-center px-2 backface-hidden"
              style={{
                transform: `rotateX(${i * STEP}deg) translateZ(${RADIUS})`,
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(COUNT).padStart(2, "0")}
              </span>
              {/* display-md, not -lg: a two-line title has to fit the face. */}
              <h3 className="display-md mt-4 text-balance">{p.title}</h3>
              <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-dim md:text-base">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto w-[min(90vw,56rem)]">
          <div className="h-px w-full bg-line">
            <div ref={rail} className="h-full origin-left scale-x-0 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
