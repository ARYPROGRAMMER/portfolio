import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Cursor } from "@/components/layout/Cursor";
import { MobileDock } from "@/components/layout/MobileDock";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SITE_URL, keywords, metaDescription, profile, socials } from "@/data/site";
import { jsonLd } from "@/lib/jsonLd";

// Only the weights the display utilities actually ask for — each extra weight is
// another font file on the critical path.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["600", "700", "800"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
  weight: ["400", "500"],
});

/**
 * Name first, then the two disciplines someone would actually search for.
 * 56 characters — inside the ~60 Google renders before it truncates.
 */
const title = `${profile.name} — Full-stack & Flutter Developer`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description: metaDescription,
  keywords: [...keywords],
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  // Phone-number autolinking mangles the mono type on iOS.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "profile",
    firstName: "Arya",
    lastName: "Singh",
    username: profile.handle,
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: title,
    description: metaDescription,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: metaDescription,
    creator: "@ARYPROGRAMMER",
    site: "@ARYPROGRAMMER",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: profile.shortName,
    statusBarStyle: "black-translucent",
  },
  // Search Console / Bing verification, when the tokens are configured.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

export const viewport: Viewport = {
  // A single value, not a prefers-color-scheme pair: the theme here is driven
  // by a class with `enableSystem={false}`, so the OS preference says nothing
  // about which palette the visitor is actually looking at. Dark is the default
  // everyone lands on.
  themeColor: "#0b0b0c",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  // No maximumScale / userScalable: pinch-zoom stays available.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* rel="me" ties these profiles back to this domain for identity checks. */}
        {socials
          .filter((s) => !s.href.startsWith("mailto:"))
          .map((s) => (
            <link key={s.href} rel="me" href={s.href} />
          ))}
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled payload built at module scope.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-accent-ink"
          >
            Skip to content
          </a>

          <Preloader />
          <div className="grain" aria-hidden="true" />
          <Cursor />
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <MobileDock />
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
