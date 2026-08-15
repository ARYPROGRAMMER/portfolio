import { ImageResponse } from "next/og";

import { profile } from "@/data/site";
import { DISPLAY_FONT_NAME, loadDisplayFont } from "@/lib/og-font";

export const alt = `${profile.name} — ${profile.role}. ${profile.disciplineLine}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const bold = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#f4f4f0",
          padding: 72,
          // Blueprint grid, same motif as the site.
          backgroundImage:
            "linear-gradient(to right, rgba(244,244,240,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,244,240,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8b8b85",
          }}
        >
          <span>{profile.name}</span>
          <span>{profile.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 0.86,
              letterSpacing: -5,
              textTransform: "uppercase",
            }}
          >
            Software
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 0.86,
              letterSpacing: -5,
              textTransform: "uppercase",
              color: "#c8ff3d",
            }}
          >
            Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(244,244,240,0.18)",
            paddingTop: 28,
            fontSize: 22,
            color: "#8b8b85",
          }}
        >
          <span style={{ maxWidth: 700 }}>{profile.disciplineLine}</span>
          <span style={{ color: "#c8ff3d" }}>aryapratapsingh.xyz</span>
        </div>
      </div>
    ),
    bold
      ? {
          ...size,
          fonts: [
            {
              name: DISPLAY_FONT_NAME,
              data: bold,
              weight: 400 as const,
              style: "normal" as const,
            },
          ],
        }
      : size,
  );
}
