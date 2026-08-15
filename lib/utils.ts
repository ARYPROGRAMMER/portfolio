import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Splits a string into words that keep their trailing space, for per-word reveals. */
export function toWords(text: string): string[] {
  return text.split(" ").filter(Boolean);
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
