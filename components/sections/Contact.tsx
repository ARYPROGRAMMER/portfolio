"use client";

import { ArrowUpRight, Check, Coffee, Copy } from "lucide-react";
import { useState } from "react";

import { Magnetic } from "@/components/ui/Magnetic";
import { RevealWords } from "@/components/ui/Reveal";
import { profile, socials, support } from "@/data/site";
import { useStaggerReveal } from "@/lib/useStaggerReveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const elsewhere = useStaggerReveal<HTMLUListElement>({ y: 12, stagger: 0.05 });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context or denied) — the mailto link still works.
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-28 md:py-40"
    >
      <div
        className="blueprint pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      />

      <div className="shell relative">
        <p className="eyebrow">(07) Contact</p>

        <RevealWords
          as="h2"
          text="Let's build something"
          className="display-xl mt-6 uppercase"
          stagger={0.05}
        />
        <RevealWords
          as="p"
          text="worth shipping."
          className="display-xl uppercase text-accent"
          stagger={0.05}
        />

        <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="max-w-md text-pretty text-base leading-relaxed text-dim">
              I&apos;m {profile.status.label.toLowerCase()}, and always up for a
              conversation about a hard frontend problem, a Flutter build that
              won&apos;t behave, or anything in between.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={16}>
                {/*
                  Lower-case and loosely tracked: it's a real address people
                  will read and retype, not a label.
                */}
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="Email"
                  className="group flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] tracking-[0.04em] text-accent-ink sm:text-xs"
                >
                  {profile.email}
                  <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={copy}
                aria-label="Copy email address"
                className="flex items-center gap-2 rounded-full border border-line px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" /> Copy
                  </>
                )}
              </button>
            </div>

            {/* Desktop only — there's no ⌘K on a phone, and the dock has Find. */}
            <p className="mt-6 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-faint md:block">
              Or press{" "}
              <kbd className="border border-line px-1.5 py-0.5">⌘K</kbd> to jump
              anywhere on this page.
            </p>

            <a
              href={support.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Support"
              className="group mt-10 flex max-w-md items-center justify-between gap-4 border border-line p-5 transition-colors hover:border-accent/50 hover:bg-elev"
            >
              <span className="flex items-center gap-4">
                <Coffee
                  className="size-5 shrink-0 text-accent transition-transform group-hover:-rotate-6"
                  strokeWidth={1.5}
                />
                <span>
                  <span className="block font-display text-base font-bold tracking-tight transition-colors group-hover:text-accent">
                    {support.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {support.blurb}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </div>

          {/* Elsewhere */}
          <div className="md:col-span-5 md:col-start-8">
            <p className="eyebrow">Elsewhere</p>
            {/* Email is already the primary call to action on the left. */}
            <ul ref={elsewhere} className="mt-5 border-t border-line">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <li key={s.label} className="border-b border-line">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Open"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-accent">
                        {s.label}
                      </span>
                      <span className="flex items-center gap-3 font-mono text-[11px] text-faint">
                        <span className="truncate">{s.handle}</span>
                        <ArrowUpRight className="size-3.5 shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
