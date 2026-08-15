import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Satori can't synthesise weights, so the display face is vendored in /assets
 * and read off disk. Server-only — never import this from a client component.
 *
 * Returns null on failure; callers must then omit `fonts` entirely, because an
 * empty array makes ImageResponse throw.
 */
let cached: Buffer | null | undefined;

export async function loadDisplayFont(): Promise<Buffer | null> {
  if (cached !== undefined) return cached;
  try {
    cached = await readFile(
      join(process.cwd(), "assets", "ArchivoBlack-Regular.ttf"),
    );
  } catch {
    cached = null;
  }
  return cached;
}

export const DISPLAY_FONT_NAME = "Archivo Black";
