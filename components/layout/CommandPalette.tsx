"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { scrollToSection, startScroll, stopScroll } from "./LenisProvider";
import { projects, repoUrl } from "@/data/projects";
import { navItems, profile, socials, support } from "@/data/site";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Projects" | "Links" | "Actions";
  run: () => void;
};

/**
 * ⌘K / Ctrl+K palette. Everything on the page is reachable from the keyboard —
 * sections, project repos, socials, resume, and the theme switch.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const openExternal = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close],
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = navItems.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      hint: "Jump to section",
      group: "Navigate",
      run: () => {
        close();
        setTimeout(() => scrollToSection(item.href, -8), 80);
      },
    }));

    const proj: Command[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      label: p.title,
      hint: p.live ? "Open live site" : "Open on GitHub",
      group: "Projects",
      run: () => openExternal(p.live ?? repoUrl(p.repo)),
    }));

    const links: Command[] = socials.map((s) => ({
      id: `social-${s.label}`,
      label: s.label,
      hint: s.handle,
      group: "Links",
      run: () => openExternal(s.href),
    }));

    const actions: Command[] = [
      {
        id: "resume",
        label: "Download résumé",
        hint: "PDF",
        group: "Actions",
        run: () => openExternal(profile.resume),
      },
      {
        id: "support",
        label: support.label,
        hint: support.handle,
        group: "Actions",
        run: () => openExternal(support.href),
      },
      {
        id: "theme",
        label: `Switch to ${resolvedTheme === "light" ? "dark" : "light"} theme`,
        hint: "Appearance",
        group: "Actions",
        run: () => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
          close();
        },
      },
      {
        id: "copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        run: () => {
          void navigator.clipboard?.writeText(profile.email);
          close();
        },
      },
      {
        id: "top",
        label: "Back to top",
        hint: "Scroll",
        group: "Actions",
        run: () => {
          close();
          setTimeout(() => scrollToSection("#top"), 80);
        },
      },
    ];

    return [...nav, ...proj, ...links, ...actions];
  }, [close, openExternal, resolvedTheme, setTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  // Global open/close shortcut, plus the custom event the nav button fires.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    const onToggle = () => setOpen((v) => !v);

    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:toggle", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:toggle", onToggle);
    };
  }, [close]);

  useEffect(() => {
    if (open) stopScroll();
    else startScroll();
  }, [open]);

  // Typing always re-aims at the first result, so the cursor can't point past
  // the end of a shrinking result set.
  const onQueryChange = (value: string) => {
    setQuery(value);
    setCursor(0);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[cursor]?.run();
    }
  };

  // Scroll the active row into view as the cursor moves.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[98] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden border border-line-strong bg-elev shadow-2xl"
            initial={{ y: -16, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-xs text-accent">$</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search sections, projects, links…"
                aria-label="Search"
                className="w-full bg-transparent py-4 font-mono text-sm text-ink outline-none placeholder:text-faint"
              />
              <kbd className="hidden shrink-0 border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="px-4 py-8 text-center font-mono text-xs text-dim">
                  Nothing matches “{query}”.
                </p>
              )}

              {results.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup;
                lastGroup = cmd.group;

                return (
                  <div key={cmd.id}>
                    {showGroup && (
                      <p className="eyebrow px-4 pb-1 pt-3">{cmd.group}</p>
                    )}
                    <button
                      type="button"
                      data-index={i}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => cmd.run()}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors",
                        cursor === i ? "bg-accent text-accent-ink" : "text-ink",
                      )}
                    >
                      <span className="truncate text-sm">{cmd.label}</span>
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em]",
                          cursor === i ? "text-accent-ink/70" : "text-faint",
                        )}
                      >
                        {cmd.hint}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
              <span>↑↓ navigate · ↵ select</span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
