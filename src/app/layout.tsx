// app/layout.tsx
// (Server component — do NOT add "use client" here)
import "./global.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b2a4a" },
    { color: "#0A66C2" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://intellecta.uk"),
  title: "Intellecta Education — Study in the UK",
  description:
    "Intellecta Education: University support, Visa support (with accredited immigration firm partnership), Post-Arrival Advice, and Post-Study Employment Advice.",
  alternates: { canonical: "https://intellecta.uk" },
  openGraph: {
    type: "website",
    url: "https://intellecta.uk",
    title: "Intellecta Education — Study in the UK",
    siteName: "Intellecta Education",
    description:
      "University support • Visa support • Post-Arrival Advice • Post-Study Employment Advice",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellecta Education — Study in the UK",
    description:
      "University support • Visa support • Post-Arrival Advice • Post-Study Employment Advice",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Intellecta Education",
    url: "https://intellecta.uk",
    logo: "https://intellecta.uk/apple-touch-icon.png",
    sameAs: [
      "https://www.instagram.com/",
      "https://www.facebook.com/",
      "https://www.tiktok.com/",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Performance hints for fonts (safe even if you later add Google Fonts) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* JSON-LD (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>

<body
  suppressHydrationWarning
  className="
    relative min-h-dvh w-full max-w-[100vw]
    overflow-x-hidden lg:[overflow-x:clip]
    bg-[rgb(var(--bg))] text-[rgb(var(--ink))] antialiased
    selection:bg-[rgb(var(--primary))]/15
  "
>

        {/* Animated silver/zinc background (clear but tasteful).
            Remove 'vivid' if you prefer a softer look. */}
        <div
          aria-hidden
          className="motion-bg vivid pointer-events-none fixed inset-0 -z-10"
        />

        {/* Accessibility: Skip link */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] rounded-md bg-white px-3 py-2 text-sm font-semibold shadow"
        >
          Skip to content
        </a>

        {/* Main content */}
        <main id="main" className="w-full">
          {children}
        </main>

        {/* Optional: live region for form/status messages (a11y helper) */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="sr-status"
        />
      </body>
    </html>
  );
}
