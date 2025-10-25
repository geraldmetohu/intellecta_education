// ──────────────────────────────────────────────────────────────────────────────
// File: components/Process.tsx
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import { MotionSection } from "./MotionSection";
import { UserPlus, ClipboardList, FileCheck, Briefcase } from "lucide-react";

type Step = { k: string; v: string; icon: React.ElementType };

const STEPS: Step[] = [
  { k: "Inquiry", v: "Tell us your background, goals, and preferred intakes.", icon: UserPlus },
  { k: "Shortlist", v: "We propose courses and universities that match your profile.", icon: ClipboardList },
  { k: "Apply & Visa", v: "We manage applications, documents, and visa guidance.", icon: FileCheck },
  { k: "Welcome & Career", v: "Arrival support, settling-in, and post-study career planning.", icon: Briefcase },
];

const PALETTE = [
  {
    name: "primary",
    grad: "from-[rgb(var(--primary))] via-sky-400 to-[rgb(var(--accent))]",
    ring: "ring-[rgb(var(--primary))]/40",
    chip: "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30",
  },
  {
    name: "accent",
    grad: "from-[rgb(var(--accent))] via-cyan-400 to-blue-500",
    ring: "ring-[rgb(var(--accent))]/40",
    chip: "bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))] border-[rgb(var(--accent))]/30",
  },
  {
    name: "emerald",
    grad: "from-emerald-400 via-lime-300 to-emerald-500",
    ring: "ring-emerald-400/40",
    chip: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  },
  {
    name: "fuchsia",
    grad: "from-fuchsia-400 via-pink-400 to-rose-400",
    ring: "ring-fuchsia-400/40",
    chip: "bg-fuchsia-400/10 text-fuchsia-600 border-fuchsia-400/30",
  },
  {
    name: "amber",
    grad: "from-amber-400 via-orange-400 to-yellow-400",
    ring: "ring-amber-400/40",
    chip: "bg-amber-400/10 text-amber-600 border-amber-400/30",
  },
];

export function Process({ imageSrc = "/images/process.jpg" }: { imageSrc?: string }) {
  return (
    <section
      id="process"
      className="
        relative mt-28 py-28 md:py-32 overflow-hidden
        bg-gradient-to-b from-white via-sky-200 to-slate-50
      "
    >
      {/* Background glows */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[conic-gradient(at_20%_10%,rgba(10,102,194,.15),transparent_30%),
              conic-gradient(at_80%_10%,rgba(43,177,255,.12),transparent_35%),
              conic-gradient(at_40%_90%,rgba(255,120,200,.08),transparent_50%)]
        "
      />
      <div
        aria-hidden
        className="
          absolute inset-0 -z-10 opacity-20 mix-blend-multiply
          bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1.5px)]
          [background-size:20px_20px]
        "
      />

      <MotionSection>
        <div className="mx-auto w-full max-w-[120rem] px-4">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/10 px-3 py-1 text-xs font-semibold text-[rgb(var(--primary))]">
              Your Pathway to the UK
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              How It Works
            </h2>
            <p className="mt-2 text-neutral-700">
              Follow our vibrant four-step roadmap to your new academic and professional life in the UK.
            </p>
          </div>

          {/* CONTENT GRID */}
          <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_auto_1fr]">
            {/* LEFT — TIMELINE LIST */}
            <div className="relative lg:col-span-3">
              {/* Central rail (desktop only) */}
              <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-3rem)] w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-300/40 via-fuchsia-300/40 to-amber-300/40 lg:block" />

              <ol className="relative grid gap-10">
                {STEPS.map(({ k, v, icon: Icon }, idx) => {
                  const c = PALETTE[idx % PALETTE.length];
                  const isRight = idx % 2 === 1;

                  return (
                    <MotionSection key={k} y={18}>
                      {/* Use a 3-col grid at lg; single-col on mobile.
                          We render THE CARD ONCE and place it left/right by column start. */}
                      <li
                        className="
                          relative grid gap-4
                          lg:[grid-template-columns:1fr_auto_1fr]
                          lg:items-center
                        "
                      >
                        {/* Node (desktop only) */}
                        <div className="hidden lg:flex items-center justify-center lg:col-start-2">
                          <div className="relative h-14 w-14">
                            <span className={`absolute inset-0 rounded-full bg-white ring-2 ${c.ring}`} />
                            <span className={`absolute inset-1 rounded-full bg-gradient-to-br ${c.grad}`} />
                          </div>
                        </div>

                        {/* Single StepCard — positioned left OR right on lg; full-width on mobile */}
                        <div
                          className={[
                            "lg:col-start-1", // default left
                            isRight ? "lg:col-start-3" : "lg:col-start-1",
                          ].join(" ")}
                        >
                          <StepCard
                            title={k}
                            desc={v}
                            Icon={Icon}
                            palette={c}
                            align={isRight ? "left" : "right"}
                            index={idx}
                          />
                        </div>
                      </li>
                    </MotionSection>
                  );
                })}
              </ol>
            </div>

            {/* RIGHT — IMAGE / ILLUSTRATION */}
            <MotionSection y={16} >
              <div
                className="
                  relative overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-md
                  bg-white/70 backdrop-blur
                "
              >
                <div className=" w-full">
                  <img
                    src={imageSrc}
                    alt="Study in the UK Process"
                    className="h-full w-full object-cover rounded-3xl"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-x-6 -bottom-3 h-1 rounded-full bg-gradient-to-r from-[rgb(var(--primary))] via-fuchsia-400 to-amber-300" />
              </div>

              
            </MotionSection>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   SUBCOMPONENTS
─────────────────────────────────────────────────────────────────────────────*/
function StepCard({
  title,
  desc,
  Icon,
  palette,
  align,
  index,
}: {
  title: string;
  desc: string;
  Icon: React.ElementType;
  palette: (typeof PALETTE)[number];
  align: "left" | "right";
  index: number;
}) {
  return (
    <article
      className={[
        "group relative rounded-2xl bg-white/90 ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        align === "left" ? "lg:ml-8" : "lg:mr-8",
      ].join(" ")}
    >
      {/* colourful top border */}
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-2xl",
          `bg-gradient-to-r ${palette.grad}`,
        ].join(" ")}
      />

      <div className="p-5">
        <div className="flex items-center gap-3">
          <span className={["inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1", palette.ring].join(" ")}>
            <Icon className="text-neutral-800" size={20} />
          </span>

          <span className={["ml-auto hidden md:inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide", palette.chip].join(" ")}>
            Step {index + 1}
          </span>
        </div>

        <h3 className="mt-3 text-base font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-neutral-700">{desc}</p>

        <div className={["mt-4 h-0.5 w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100", `bg-gradient-to-r ${palette.grad}`].join(" ")} />
      </div>
    </article>
  );
}
