"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/lib/hooks";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`grid size-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      {/* Render nothing icon-wise until mounted, to avoid a theme flash mismatch. */}
      {mounted ? (
        isDark ? (
          <Sun className="size-4" strokeWidth={1.6} />
        ) : (
          <Moon className="size-4" strokeWidth={1.6} />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
