import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { BuyMeCoffeeButton } from "@/components/BuyMeCoffee";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arya's Portfolio",
  description: "Modern & Minimal JS Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/profile.jpg" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BuyMeCoffeeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
