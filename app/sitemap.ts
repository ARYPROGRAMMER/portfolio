import type { MetadataRoute } from "next";

import { SITE_URL, profile } from "@/data/site";

/**
 * A single-page site, so a single URL. Fragment links (#work, #about) are
 * deliberately absent: Google discards the fragment and would read them as
 * duplicates of the root.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/opengraph-image`, `${SITE_URL}${profile.avatar}`],
    },
    {
      url: `${SITE_URL}${profile.resume}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
