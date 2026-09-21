import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "COYS | Your Spurs Matchday Companion",
  description:
    "The ultimate Tottenham Hotspur matchday companion. Away day guides, pub recommendations, ground info, and everything a Spurs fan needs.",
  keywords: [
    "Tottenham Hotspur",
    "Spurs",
    "COYS",
    "matchday",
    "away days",
    "football",
    "Premier League",
  ],
  authors: [{ name: "COYS App" }],
  openGraph: {
    title: "COYS | Your Spurs Matchday Companion",
    description:
      "The ultimate Tottenham Hotspur matchday companion. Away day guides, pub recommendations, ground info, and everything a Spurs fan needs.",
    siteName: "COYS",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "COYS | Your Spurs Matchday Companion",
    description:
      "The ultimate Tottenham Hotspur matchday companion. Away day guides, pub recommendations, and more.",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "COYS",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#132257" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1428" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
