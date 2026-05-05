// app/layout.tsx
// (Server component — do NOT add "use client" here)
import "./global.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteContact } from "@/lib/siteContact";

const siteUrl = "https://intellecta.uk";
const siteTitle = "Intellecta Education — Study in the UK";
const siteDescription =
  "Intellecta Education: University support, Visa support, post-arrival advice, and post-study employment advice for students planning to study in the UK.";
const siteLogo = siteContact.logoPath;

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
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: siteUrl },
  applicationName: "Intellecta Education",
  keywords: [
    "Intellecta Education",
    "study in the UK",
    "UK university support",
    "student visa support",
    "post-arrival advice",
    "post-study employment advice",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    siteName: "Intellecta Education",
    description: siteDescription,
    images: [
      {
        url: siteLogo,
        width: 1200,
        height: 1200,
        alt: "Intellecta Education logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteLogo],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: siteLogo, type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteContact.businessName,
    url: siteUrl,
    logo: `${siteUrl}${siteLogo}`,
    image: `${siteUrl}${siteLogo}`,
    email: siteContact.email,
    telephone: siteContact.phoneRaw,
    sameAs: [
      siteContact.socials.instagram,
      siteContact.socials.facebook,
      siteContact.socials.tiktok,
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
