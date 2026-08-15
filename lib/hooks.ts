"use client";

import { useCallback, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a media query as derived state. Uses useSyncExternalStore so the value
 * is correct on the very first client render — no setState-in-effect, and no
 * hydration mismatch, because the server snapshot is always `false`.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Evaluates a client-only predicate that never changes after load (feature
 * probes, storage reads). Returns `false` during SSR and on first paint.
 */
export function useClientFlag(check: () => boolean): boolean {
  return useSyncExternalStore(noopSubscribe, check, () => false);
}

/** True once the component has rendered on the client. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export const prefersReducedMotion = "(prefers-reduced-motion: reduce)";
export const finePointer = "(pointer: fine)";

/** Pointer is precise and the user hasn't asked for less motion. */
export function useCanHover(): boolean {
  const fine = useMediaQuery(finePointer);
  const reduced = useMediaQuery(prefersReducedMotion);
  return fine && !reduced;
}

/** A cached WebGL probe — creating a context is not free, so only do it once. */
let webglSupport: boolean | null = null;

export function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/** Very low core counts usually mean a device that will stutter on shaders. */
export function isLowPowerDevice(): boolean {
  return (
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 2
  );
}
