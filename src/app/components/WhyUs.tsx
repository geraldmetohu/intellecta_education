// ──────────────────────────────────────────────────────────────────────────────
// File: components/WhyUs.tsx
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import { MotionSection } from "./MotionSection";
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  GraduationCap,
  FileCheck2,
  Briefcase,
} from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    icon: GraduationCap,
    title: "Tailored Course Matching",
    desc: "We shortlist courses and universities that fit your profile and goals.",
  },
  {
    icon: FileCheck2,
    title: "Offer & CAS Support",
    desc: "Guidance through conditional offers, CAS, and document readiness.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Visa Guidance",
    desc: "Applications handled via our accredited immigration firm partnership.",
  },
  {
    icon: CheckCircle2,
    title: "Scholarship Advice",
    desc: "We help you spot funding options and strengthen your case.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    desc: "Clear timelines and proactive updates at every step.",
  },
  {
    icon: Briefcase,
    title: "Arrival & Career Pathway",
    desc: "Settle in smoothly and plan your graduate route with confidence.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="mt-20">
      <MotionSection>
        {/* Section wrapper with colourful, soft background */}
        <div className="relative mx-auto w-full max-w-[120rem] px-4">
          <div
            className="
              relative overflow-hidden rounded-3xl
              bg-white/90 ring-1 ring-black/5 shadow-sm
              backdrop-blur
            "
          >
            {/* Decorative gradients */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgb(var(--primary))]/15 blur-3xl" />
              <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-[rgb(var(--accent))]/20 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[rgb(var(--primary))]/10 via-transparent to-[rgb(var(--accent))]/10 blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative px-6 py-10 sm:px-10">
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/10 px-3 py-1 text-xs font-semibold text-[rgb(var(--primary))]">
                  Why Intellecta
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                  Guidance that’s ethical, fast, and personalised
                </h2>
                <p className="mx-auto mt-2 max-w-3xl text-sm sm:text-base text-neutral-600">
                  Expert support for every step — from shortlisting courses to CAS, visa, and arrival.
                </p>
              </div>

              {/* Feature grid */}
              <div className="mx-auto mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map(({ icon: Icon, title, desc }) => (
                  <MotionSection key={title} y={12}>
                    <article
                      className="
                        group h-full rounded-2xl bg-white/90 p-5
                        ring-1 ring-black/5 shadow-sm transition-all duration-300
                        hover:-translate-y-1 hover:shadow-md
                        hover:ring-[rgb(var(--primary))]/30
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="
                            inline-flex h-11 w-11 items-center justify-center rounded-xl
                            bg-gradient-to-br from-[rgb(var(--primary))]/15 via-white to-[rgb(var(--accent))]/15
                            ring-1 ring-[rgb(var(--primary))]/20
                          "
                        >
                          <Icon className="text-[rgb(var(--primary))]" size={18} />
                        </span>
                        <h3 className="font-semibold text-neutral-900">{title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{desc}</p>

                      {/* Colourful underline on hover */}
                      <div
                        className="
                          mt-4 h-0.5 w-full origin-left scale-x-0 rounded-full
                          bg-gradient-to-r from-[rgb(var(--primary))] via-[rgb(var(--accent))] to-[rgb(var(--primary))]
                          transition-transform duration-300 group-hover:scale-x-100
                        "
                      />
                    </article>
                  </MotionSection>
                ))}
              </div>

              {/* Trust strip (colourful chips) */}
              <div className="mx-auto mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { k: "98%", v: "Student Satisfaction" },
                  { k: "24–48h", v: "Typical Response Time" },
                  { k: "End-to-End", v: "Application to Arrival" },
                ].map((s) => (
                  <MotionSection key={s.k} y={8}>
                    <div
                      className="
                        rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))]/8 to-[rgb(var(--accent))]/10
                        px-4 py-3 text-center ring-1 ring-[rgb(var(--primary))]/20
                      "
                    >
                      <div className="text-base font-extrabold text-neutral-900">
                        {s.k}
                      </div>
                      <div className="text-xs font-medium text-neutral-700">{s.v}</div>
                    </div>
                  </MotionSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
