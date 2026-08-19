"use client";

import { ArrowUpRight, GitFork, Star } from "lucide-react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  featuredProjects,
  otherProjects,
  repoUrl,
  type Project,
} from "@/data/projects";
import { profile } from "@/data/site";
import { useStaggerReveal } from "@/lib/useStaggerReveal";
import { cn } from "@/lib/utils";

export function Work() {
  const rows = useStaggerReveal<HTMLUListElement>({ y: 24, stagger: 0.05 });
  const grid = useStaggerReveal<HTMLUListElement>({ stagger: 0.05 });

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="shell relative scroll-mt-24 py-24 md:py-32"
    >
      <SectionHeader
        index="03"
        title="Selected work"
        meta="Five projects that show the range — full-stack web, Flutter clients, and developer tooling."
      />

      {/* Featured rows */}
      <ul ref={rows} className="mt-14 md:mt-20">
        {featuredProjects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </ul>

      {/* Secondary grid */}
      <div className="mt-24 md:mt-32">
        <p className="eyebrow">Also built</p>
        <ul
          ref={grid}
          className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {otherProjects.map((p) => (
            <li key={p.id} className="bg-bg">
              <a
                href={p.live ?? repoUrl(p.repo)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-elev md:p-7"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="size-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-dim">
                    {p.blurb}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                  <span>{p.year}</span>
                  <span className="text-line-strong">·</span>
                  <span>{p.stack.slice(0, 2).join(" · ")}</span>
                  {p.stars > 0 && (
                    <span className="ml-auto flex items-center gap-1">
                      <Star className="size-3" /> {p.stars}
                    </span>
                  )}
                </div>
              </a>
            </li>
          ))}

          {/* Closes the grid off so the last row never leaves a bare cell. */}
          <li className="bg-bg">
            <a
              href={`https://github.com/${profile.handle}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
              className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-elev md:p-7"
            >
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                Everything else lives on GitHub —
                <br />
                <span className="text-accent">200+ public repositories.</span>
              </p>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-dim transition-colors group-hover:text-accent">
                Browse them
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const href = project.live ?? repoUrl(project.repo);

  return (
    <li className="border-b border-line first:border-t">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={project.live ? "Visit" : "GitHub"}
        className="group relative block py-9 md:py-11"
      >
        {/* Accent wash that wipes in from the left on hover. */}
        <span
          aria-hidden="true"
          className="absolute -inset-x-4 inset-y-0 -z-10 origin-left scale-x-0 bg-elev transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
        />

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent md:w-12">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="display-md transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:group-hover:translate-x-4">
              {project.title}
            </h3>
            {/*
              Blurb and note read as one paragraph rather than two stacked
              blocks — same information, half the visual weight.
            */}
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-dim transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:group-hover:translate-x-4">
              {project.blurb}{" "}
              <span className="text-faint">{project.note}</span>
            </p>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-6 md:flex-col md:items-end md:justify-center md:gap-3">
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint md:justify-end">
              {project.stack.slice(0, 3).map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-dim">
              <span>{project.year}</span>
              {project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="size-3" />
                  {project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="size-3" />
                  {project.forks}
                </span>
              )}
              <ArrowUpRight
                className={cn(
                  "size-4 transition-all duration-300",
                  "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent",
                )}
              />
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
