// ──────────────────────────────────────────────────────────────────────────────
// File: components/FAQs.tsx  (enhanced colourful version)
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { MotionSection } from "./MotionSection";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Do you guarantee admission?",
    a: "No. We maximise your chances with strong applications and transparent advice.",
  },
  {
    q: "Can you help with visas?",
    a: "Yes. We partner with an accredited UK immigration firm that provides formal visa guidance.",
  },
  {
    q: "Which intakes do you support?",
    a: "Mainly September and January, plus rolling courses where available.",
  },
  {
    q: "Is the consultation free?",
    a: "Your initial consultation is free. We’ll outline a plan and next steps.",
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="
        relative mt-24 py-24 overflow-hidden
        bg-gradient-to-b from-white via-sky-50 to-slate-50
      "
    >
      {/* gradient glow */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[conic-gradient(at_20%_10%,rgba(10,102,194,.15),transparent_40%),
              conic-gradient(at_80%_15%,rgba(43,177,255,.15),transparent_40%),
              conic-gradient(at_50%_90%,rgba(255,120,200,.10),transparent_50%)]
        "
      />

      <MotionSection>
        <div className="mx-auto w-full max-w-[100rem] px-4">
          {/* Title */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/10 px-3 py-1 text-xs font-semibold text-[rgb(var(--primary))]">
              Common Questions
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              FAQs
            </h2>
            <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-[rgb(var(--primary))] via-[rgb(var(--accent))] to-fuchsia-400" />
            <p className="mt-3 text-neutral-700">
              Everything you need to know before starting your journey with us.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {faqs.map((f, i) => (
              <MotionSection key={f.q} y={14}>
                <div
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="
                    group cursor-pointer rounded-2xl bg-white/90 p-6
                    ring-1 ring-black/5 shadow-sm transition-all duration-300
                    hover:-translate-y-1 hover:shadow-md hover:ring-[rgb(var(--accent))]/40
                  "
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          inline-flex h-8 w-8 items-center justify-center rounded-full
                          bg-gradient-to-br from-[rgb(var(--primary))]/20 via-[rgb(var(--accent))]/20 to-fuchsia-400/20
                        "
                      >
                        <HelpCircle size={16} className="text-[rgb(var(--primary))]" />
                      </span>
                      <p className="font-semibold text-neutral-900">{f.q}</p>
                    </div>

                    <div className="mt-1 text-[rgb(var(--primary))] transition-transform duration-300">
                      {openIndex === i ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      openIndex === i ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-neutral-700">{f.a}</p>
                  </div>

                  {/* Decorative underline */}
                  <div
                    className="
                      mt-4 h-[2px] w-full rounded-full
                      bg-gradient-to-r from-[rgb(var(--primary))]/40 via-[rgb(var(--accent))]/40 to-fuchsia-400/40
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    "
                  />
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
