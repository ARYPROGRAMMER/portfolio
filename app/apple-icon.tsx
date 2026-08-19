import { ImageResponse } from "next/og";

import { profile } from "@/data/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon. Padded well inside the frame so it survives the maskable
 * safe-zone crop Android applies.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4d9dff",
          color: "#04101f",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -6,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
