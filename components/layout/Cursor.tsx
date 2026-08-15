"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useCanHover } from "@/lib/hooks";

type Mode = "default" | "hover" | "label";

/**
 * Replacement cursor. Uses mix-blend-difference so it stays visible over any
 * background, and reads `data-cursor="..."` off the hovered element to show a
 * label (e.g. "VIEW") instead of a dot.
 *
 * Only mounts on devices with a precise pointer — never on touch.
 */
export function Cursor() {
  const enabled = useCanHover();
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.25 });

  // Mirrors of the React state, so the hot path can compare without re-rendering.
  const modeRef = useRef<Mode>("default");
  const labelRef = useRef("");
  const seenRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // pointermove fires continuously — it must only touch motion values, which
    // write straight to the DOM without going through React.
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!seenRef.current) {
        seenRef.current = true;
        setVisible(true);
      }
    };

    // pointerover only fires when the pointer enters a *different* element, so
    // the DOM query and any state change happen once per target, not per frame.
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea",
      );

      const custom = el?.dataset.cursor ?? "";
      const nextMode: Mode = !el ? "default" : custom ? "label" : "hover";

      if (modeRef.current !== nextMode || labelRef.current !== custom) {
        modeRef.current = nextMode;
        labelRef.current = custom;
        setMode(nextMode);
        setLabel(custom);
      }
    };

    const leave = () => {
      seenRef.current = false;
      setVisible(false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  // Hide the native cursor only while ours is active.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "label" ? 76 : mode === "hover" ? 44 : 12;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-white"
        animate={{
          width: size,
          height: size,
          x: -size / 2,
          y: -size / 2,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {mode === "label" && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.16 }}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-black"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
