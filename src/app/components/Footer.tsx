// ──────────────────────────────────────────────────────────────────────────────
// File: components/Footer.tsx  (enhanced, colourful, responsive)
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Music2, MessageCircleMore } from "lucide-react";
import { siteContact } from "@/lib/siteContact";

export function Footer() {
  return (
    <footer
      className="
        relative mt-28 overflow-hidden
        bg-gradient-to-br from-white via-sky-50 to-slate-100
        border-t border-slate-200
      "
    >
      {/* background accents */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(40%_60%_at_15%_40%,rgba(10,102,194,.12),transparent_70%),
              radial-gradient(40%_60%_at_85%_60%,rgba(255,120,200,.1),transparent_70%)]
        "
      />

      <div className="mx-auto w-full max-w-[100rem] px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="overflow-hidden rounded-2xl ring-1 ring-[rgb(var(--primary))]/15 shadow-sm">
              <Image
                src={siteContact.logoPath}
                alt={`${siteContact.businessName} logo`}
                width={56}
                height={56}
                className="h-14 w-14 object-cover"
              />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--primary))]/70">
                Intellecta
              </p>
              <h3 className="text-xl font-bold text-[rgb(var(--primary))]">
                Education
              </h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
            Helping international students achieve their UK study ambitions —
            from university applications and visa guidance to post-study pathways.
          </p>
        </div>

        {/* Column 2 — Contact */}
        <div>
          <h4 className="text-sm font-semibold text-[rgb(var(--primary))] uppercase tracking-wide">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-[rgb(var(--primary))]" />
              <span>North London Business Park, London, UK</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[rgb(var(--primary))]" />
              <a href={siteContact.phoneHref} className="hover:underline hover:text-[rgb(var(--primary))]">
                {siteContact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[rgb(var(--primary))]" />
              <a href={`mailto:${siteContact.email}`} className="hover:underline hover:text-[rgb(var(--primary))]">
                {siteContact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircleMore size={16} className="text-[rgb(var(--primary))]" />
              <a
                href={`${siteContact.whatsappHref}?text=${encodeURIComponent(siteContact.whatsappPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-[rgb(var(--primary))]"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Socials */}
        <div>
          <h4 className="text-sm font-semibold text-[rgb(var(--primary))] uppercase tracking-wide">
            Connect with us
          </h4>
          <p className="mt-2 text-sm text-neutral-700">
            Follow our journey and get the latest updates about studying in the UK.
          </p>
          <div className="mt-4 flex gap-4">
            {[
              { icon: Facebook, href: siteContact.socials.facebook },
              { icon: Instagram, href: siteContact.socials.instagram },
              { icon: Music2, href: siteContact.socials.tiktok },
              {
                icon: MessageCircleMore,
                href: `${siteContact.whatsappHref}?text=${encodeURIComponent(siteContact.whatsappPrefill)}`,
              },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative group inline-flex h-10 w-10 items-center justify-center
                  rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]
                  transition-all duration-300 hover:scale-105 hover:text-white
                  hover:bg-gradient-to-br hover:from-[rgb(var(--primary))]
                  hover:via-fuchsia-400 hover:to-amber-300
                "
              >
                <Icon size={18} />
                {/* glow ring */}
                <span
                  className="
                    absolute inset-0 rounded-full opacity-0 group-hover:opacity-50
                    bg-gradient-to-r from-[rgb(var(--accent))]/20 via-fuchsia-400/20 to-amber-300/20
                    blur-md transition-opacity
                  "
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div
        className="
          border-t border-slate-200
          bg-white/70 backdrop-blur py-5
          text-center text-xs text-neutral-600
        "
      >
        <p>
          © {new Date().getFullYear()} <strong>Intellecta Education</strong> •
          All rights reserved — Study in the UK • Visa • Careers
        </p>
        <p className="mt-1 text-[11px] text-neutral-500">
          Designed for accessibility and mobile responsiveness • London, United Kingdom
        </p>
      </div>
    </footer>
  );
}
