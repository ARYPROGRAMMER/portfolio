"use client";

import { ArrowUp, Coffee } from "lucide-react";

import { scrollToSection } from "./LenisProvider";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { profile, support } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      {/* Oversized wordmark. Scrolls rather than clips, so it works at any width. */}
      <div className="pt-14 md:pt-20">
        <Marquee
          speed={44}
          items={[0, 1].map((i) => (
            <span
              key={i}
              className="display-xl select-none whitespace-nowrap uppercase leading-none stroke-text"
            >
              {profile.name}
            </span>
          ))}
          separator={
            <span className="mx-8 text-accent md:mx-14" aria-hidden="true">
              ✦
            </span>
          }
        />
      </div>

      {/* Extra bottom padding on mobile so the dock never covers the credits. */}
      <div className="shell flex flex-col gap-8 pb-28 pt-10 md:flex-row md:items-end md:justify-between md:py-14">
        <div className="space-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <p className="text-dim">
            © {year} {profile.name}
          </p>
          <p>
            {profile.location} · <LocalTime />
          </p>
          <p className="text-faint">
            Built with Next.js, GSAP and three.js.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={support.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Support"
            className="group flex items-center gap-2.5 rounded-full border border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim transition-colors hover:border-accent hover:text-accent"
          >
            <Coffee className="size-3.5" strokeWidth={1.6} />
            {support.label}
          </a>

          <Magnetic strength={16}>
            <button
              type="button"
              onClick={() => scrollToSection("#top")}
              className="group flex items-center gap-3 rounded-full border border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim transition-colors hover:border-accent hover:text-accent"
            >
              Back to top
              <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
