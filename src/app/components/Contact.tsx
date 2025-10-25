// ──────────────────────────────────────────────────────────────────────────────
// File: components/Contact.tsx  (enhanced UI + a11y, same mailto/WhatsApp flow)
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotionSection } from "./MotionSection";
import {
  Mail,
  Phone,
  MessageCircleMore,
  MapPin,
  ShieldAlert,
  Instagram,
  Facebook,
  Ticket,
} from "lucide-react";

// Schema
const Schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(6, "Phone or WhatsApp number looks too short."),
  studyLevel: z.string().min(2, "Please specify your level (e.g., Masters)."),
  intake: z.string().min(2, "Please add a target intake (e.g., Sep 2026)."),
  message: z.string().min(5, "Please add a short message."),
  // Honeypot (must be empty)
  company: z.string().optional(),
  // Optional consent
  consent: z.boolean().optional(),
});

type FormData = z.infer<typeof Schema>;

export function Contact() {
  const [sent, setSent] = useState<"idle" | "sending" | "done">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const emailId = useId();
  const phoneId = useId();

  function onSubmit(data: FormData) {
    // basic honeypot
    if (data.company && data.company.trim().length > 0) return;

    setSent("sending");

    const subject = encodeURIComponent("Free Consultation — Intellecta Education");
    const bodyRaw = `Name: ${data.name}
Email: ${data.email}
Phone/WhatsApp: ${data.phone}
Study level: ${data.studyLevel}
Target intake: ${data.intake}
Message: ${data.message}`;

    const body = encodeURIComponent(bodyRaw);

    // 1) Email client
    window.open(`mailto:info@intellecta.uk?subject=${subject}&body=${body}`, "_blank");

    // 2) WhatsApp deep-link (prefilled)
    const wa = `https://wa.me/?text=${encodeURIComponent(
      `Hello Intellecta Education, I’d like a consultation.\n\n${bodyRaw}`
    )}`;
    window.open(wa, "_blank");

    setSent("done");
    reset();
    // return to idle after a short delay so the CTA text resets
    setTimeout(() => setSent("idle"), 2500);
  }

  const submitting = isSubmitting || sent === "sending";

  return (
    <section
      id="contact"
      className="
        relative mt-28 mb-20 overflow-hidden
        bg-gradient-to-b from-white via-sky-50 to-slate-50
      "
    >
      {/* colourful background mesh */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[conic-gradient(at_25%_8%,rgba(10,102,194,.12),transparent_35%),
              conic-gradient(at_80%_15%,rgba(43,177,255,.14),transparent_40%),
              conic-gradient(at_50%_92%,rgba(255,120,200,.10),transparent_55%)]
        "
      />
      <div
        aria-hidden
        className="
          absolute -top-28 -left-24 -z-10 h-[30rem] w-[30rem]
          rounded-full bg-gradient-to-br from-sky-400/20 to-transparent blur-[120px]
        "
      />
      <div
        aria-hidden
        className="
          absolute -bottom-24 -right-20 -z-10 h-[28rem] w-[28rem]
          rounded-full bg-gradient-to-tr from-fuchsia-400/20 via-amber-300/20 to-transparent blur-[120px]
        "
      />

      <MotionSection>
        <div className="mx-auto w-full max-w-[120rem] px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/10 px-3 py-1 text-xs font-semibold text-[rgb(var(--primary))]">
              Get in touch
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              Book your free consultation
            </h2>
            <p className="mt-2 text-neutral-700">
              Email us or message on WhatsApp—whichever you prefer. We usually reply within 24–48h.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* FORM */}
            <MotionSection y={10}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                  relative rounded-3xl bg-white/90 p-6 sm:p-7
                  ring-1 ring-black/5 shadow-sm backdrop-blur
                "
                noValidate
              >
                {/* subtle top rainbow bar */}
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute inset-x-4 top-0 h-1 rounded-b-full
                    bg-gradient-to-r from-[rgb(var(--primary))] via-fuchsia-400 to-amber-300
                  "
                />

                {/* hidden honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                  {...register("company")}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold">Full name</label>
                    <input
                      {...register("name")}
                      placeholder="Jane Doe"
                      className="
                        input mt-1
                        w-full rounded-xl border border-black/10 bg-white/95
                        px-3.5 py-2.5 text-[15px]
                        focus:border-[rgb(var(--primary))]/50 focus:ring-4 focus:ring-[rgb(var(--primary))]/15
                      "
                      aria-invalid={!!errors.name || undefined}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold" htmlFor={emailId}>
                      Email
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      placeholder="you@email.com"
                      {...register("email")}
                      className="
                        input mt-1
                        w-full rounded-xl border border-black/10 bg-white/95
                        px-3.5 py-2.5 text-[15px]
                        focus:border-[rgb(var(--primary))]/50 focus:ring-4 focus:ring-[rgb(var(--primary))]/15
                      "
                      aria-invalid={!!errors.email || undefined}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold" htmlFor={phoneId}>
                      Phone / WhatsApp
                    </label>
                    <input
                      id={phoneId}
                      placeholder="+44 75…"
                      {...register("phone")}
                      className="
                        input mt-1
                        w-full rounded-xl border border-black/10 bg-white/95
                        px-3.5 py-2.5 text-[15px]
                        focus:border-[rgb(var(--primary))]/50 focus:ring-4 focus:ring-[rgb(var(--primary))]/15
                      "
                      aria-invalid={!!errors.phone || undefined}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Study level</label>
                    <input
                      placeholder="Foundation / Bachelors / Masters"
                      {...register("studyLevel")}
                      className="
                        input mt-1
                        w-full rounded-xl border border-black/10 bg-white/95
                        px-3.5 py-2.5 text-[15px]
                        focus:border-[rgb(var(--primary))]/50 focus:ring-4 focus:ring-[rgb(var(--primary))]/15
                      "
                      aria-invalid={!!errors.studyLevel || undefined}
                    />
                    {errors.studyLevel && <p className="mt-1 text-xs text-red-600">{errors.studyLevel.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Target intake</label>
                    <input
                      placeholder="Jan 2026 / Sep 2026"
                      {...register("intake")}
                      className="
                        input mt-1
                        w-full rounded-xl border border-black/10 bg-white/95
                        px-3.5 py-2.5 text-[15px]
                        focus:border-[rgb(var(--primary))]/50 focus:ring-4 focus:ring-[rgb(var(--primary))]/15
                      "
                      aria-invalid={!!errors.intake || undefined}
                    />
                    {errors.intake && <p className="mt-1 text-xs text-red-600">{errors.intake.message}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us a little about your background and goals…"
                      {...register("message")}
                      className="
                        textarea mt-1
                        w-full rounded-xl border border-black/10 bg-white/95
                        px-3.5 py-2.5 text-[15px]
                        focus:border-[rgb(var(--primary))]/50 focus:ring-4 focus:ring-[rgb(var(--primary))]/15
                      "
                      aria-invalid={!!errors.message || undefined}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
                  </div>
                </div>

                {/* Consent + actions */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-start gap-2 text-xs text-neutral-600">
                    <input type="checkbox" className="mt-0.5" {...register("consent")} />
                    I agree to be contacted about my enquiry. We’ll never share your details.
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      disabled={submitting}
                      className="
                        inline-flex items-center gap-2 rounded-xl
                        bg-[rgb(var(--primary))] px-5 py-2.5 text-white
                        hover:bg-[rgb(var(--primary))]/90
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                    >
                      {submitting ? (
                        <>
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Mail size={16} /> Send & Open WhatsApp
                        </>
                      )}
                    </button>

                    {/* Quick actions */}
                    <a
                      href="mailto:info@intellecta.uk"
                      className="btn btn-outline btn-sm rounded-xl px-4 py-2"
                    >
                      <Mail size={16} className="mr-1" />
                      Email us
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        "Hello Intellecta Education – I’d like a free consultation about studying in the UK."
                      )}`}
                      target="_blank"
                      className="btn btn-gradient btn-sm rounded-xl px-4 py-2"
                    >
                      <MessageCircleMore size={16} className="mr-1" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Status / privacy note */}
                <div className="mt-4 flex items-start gap-2 text-xs text-neutral-600">
                  <ShieldAlert className="mt-0.5 h-4 w-4 text-amber-500" />
                  <p>
                    We don’t guarantee admission, job sponsorships, or provide visa advice directly.
                    Visa guidance is provided via our accredited immigration firm partner.
                  </p>
                </div>
              </form>
            </MotionSection>

            {/* INFO CARD */}
            <MotionSection y={10}>
              <div
                className="
                  relative rounded-3xl bg-white/90 p-6 sm:p-7
                  ring-1 ring-black/5 shadow-sm backdrop-blur
                "
              >
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute inset-x-4 top-0 h-1 rounded-b-full
                    bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300
                  "
                />
                <h3 className="text-lg font-semibold text-neutral-900">Our details</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                  <li className="flex items-center gap-2">
                    <Mail size={16} className="text-[rgb(var(--primary))]" />
                    <span>
                      <strong>Email:</strong> info@intellecta.uk
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={16} className="text-[rgb(var(--primary))]" />
                    <span>
                      <strong>Phone/WhatsApp:</strong> +44 (0) 0000 000000
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5 text-[rgb(var(--primary))]" />
                    <span>
                      <strong>Location:</strong> North London Business Park, London, UK
                    </span>
                  </li>
                </ul>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <a
                    target="_blank"
                    href="https://instagram.com"
                    className="icon-btn hover:ring-1 hover:ring-[rgb(var(--primary))]/30"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    target="_blank"
                    href="https://tiktok.com"
                    className="icon-btn hover:ring-1 hover:ring-[rgb(var(--primary))]/30"
                    aria-label="TikTok"
                  >
                    <Ticket size={18} />
                  </a>
                  <a
                    target="_blank"
                    href="https://facebook.com"
                    className="icon-btn hover:ring-1 hover:ring-[rgb(var(--primary))]/30"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                </div>

                <div className="mt-5 rounded-2xl bg-[rgb(var(--primary))]/5 p-4 text-xs leading-relaxed ring-1 ring-[rgb(var(--primary))]/15">
                  We respect your privacy. By submitting this form you consent to be contacted about
                  your enquiry. You can opt out at any time.
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
