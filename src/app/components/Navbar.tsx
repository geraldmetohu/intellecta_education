// ──────────────────────────────────────────────────────────────────────────────
// File: components/Navbar.tsx
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import {
  Menu,
  X,
  Phone,
  Instagram,
  Facebook,
  MessageCircleMore,
  Ticket,
} from "lucide-react";
import { useEffect, useId, useState } from "react";

function useLockBody(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  useLockBody(open);

  // shadow on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        "border-b border-black/5",
        scrolled ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      <nav
        className="
          mx-auto w-full max-w-[120rem]
          px-3 sm:px-4 lg:px-6
          h-16 flex items-center justify-between gap-3
        "
        aria-label="Primary"
      >
        {/* Brand */}
        <a
          href="/"
          className="group inline-flex items-center gap-2 font-extrabold tracking-tight text-[rgb(var(--primary))]"
        >
          <span className="inline-block h-8 w-8 rounded-xl bg-[rgb(var(--primary))] ring-2 ring-[rgb(var(--primary))]/20" />
          <span className="text-neutral-900 group-hover:text-[rgb(var(--primary))] transition-colors">
            Intellecta Education
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {[
            { href: "#services", label: "Services" },
            { href: "#why", label: "Why Us" },
            { href: "#process", label: "Process" },
            { href: "#faqs", label: "FAQs" },
            { href: "#contact", label: "Contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="
                relative px-2 py-1 text-sm font-semibold text-neutral-700
                hover:text-neutral-900 focus:text-neutral-900
                transition-colors
              "
            >
              {l.label}
              <span
                aria-hidden
                className="
                  pointer-events-none absolute inset-x-2 -bottom-0.5 h-0.5
                  bg-gradient-to-r from-[rgb(var(--primary))] via-[rgb(var(--accent))] to-[rgb(var(--primary))]
                  origin-left scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300
                  rounded-full
                "
              />
            </a>
          ))}
        </div>

        {/* Desktop socials + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            aria-label="Instagram"
            href="https://instagram.com"
            target="_blank"
            className="icon-btn hover:ring-1 hover:ring-[rgb(var(--primary))]/30"
          >
            <Instagram size={18} />
          </a>
          <a
            aria-label="Facebook"
            href="https://facebook.com"
            target="_blank"
            className="icon-btn hover:ring-1 hover:ring-[rgb(var(--primary))]/30"
          >
            <Facebook size={18} />
          </a>
          <a
            aria-label="TikTok"
            href="https://tiktok.com"
            target="_blank"
            className="icon-btn hover:ring-1 hover:ring-[rgb(var(--primary))]/30"
          >
            <Ticket size={18} />
          </a>
          <a
            aria-label="WhatsApp"
            href={`https://wa.me/?text=${encodeURIComponent(
              "Hello Intellecta Education – I’d like a free consultation about studying in the UK."
            )}`}
            target="_blank"
            className="icon-btn hover:ring-1 hover:ring-[rgb(var(--primary))]/30"
          >
            <MessageCircleMore size={18} />
          </a>

          <a
            href="#contact"
            className="
              btn btn-primary btn-sm ml-1
              inline-flex items-center gap-2
            "
          >
            <Phone size={16} />
            Book Consultation
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden icon-btn"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={dialogId}
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[60] transition",
          open ? "visible" : "invisible",
        ].join(" ")}
      >
        {/* overlay */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        {/* panel */}
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          className={[
            "absolute right-0 top-0 h-full w-[82%] max-w-xs",
            "bg-white shadow-xl border-l border-black/5",
            "transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
            "flex flex-col",
          ].join(" ")}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-black/5">
            <span className="font-extrabold text-neutral-900">Menu</span>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>

          <nav className="px-4 py-3 grid gap-1 text-sm">
            {[
              { href: "#services", label: "Services" },
              { href: "#why", label: "Why Us" },
              { href: "#process", label: "Process" },
              { href: "#faqs", label: "FAQs" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="
                  rounded-lg px-3 py-2 font-semibold text-neutral-800
                  hover:bg-neutral-50 active:bg-neutral-100
                "
              >
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 font-bold text-white"
            >
              <Phone size={16} />
              Book Consultation
            </a>

            <div className="mt-3 flex gap-2">
              <a aria-label="Instagram" href="https://instagram.com" target="_blank" className="icon-btn">
                <Instagram size={18} />
              </a>
              <a aria-label="Facebook" href="https://facebook.com" target="_blank" className="icon-btn">
                <Facebook size={18} />
              </a>
              <a aria-label="TikTok" href="https://tiktok.com" target="_blank" className="icon-btn">
                <Ticket size={18} />
              </a>
              <a
                aria-label="WhatsApp"
                href={`https://wa.me/?text=${encodeURIComponent(
                  "Hello Intellecta Education – I’d like a free consultation."
                )}`}
                target="_blank"
                className="icon-btn"
              >
                <MessageCircleMore size={18} />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
