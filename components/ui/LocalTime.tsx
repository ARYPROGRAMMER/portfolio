"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: profile.timezone,
});

/**
 * Live clock in Arya's timezone. Renders a stable placeholder on the server so
 * the markup matches until the first client tick.
 */
export function LocalTime({ withSeconds = true }: { withSeconds?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const display = time ?? "--:--:--";

  return (
    <span className="tabular-nums">
      {withSeconds ? display : display.slice(0, 5)}
      <span className="ml-1 text-faint">IST</span>
    </span>
  );
}
