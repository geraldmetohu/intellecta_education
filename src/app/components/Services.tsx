"use client";

import Image from "next/image";
import { MotionSection } from "./MotionSection";
import { ShieldCheck, GraduationCap, Plane, Briefcase } from "lucide-react";

const items = [
  {
    icon: GraduationCap,
    title: "University Support",
    desc: "Course selection, personal statements, references, and full UCAS application guidance.",
    img: "/images/university.jpg",
  },
  {
    icon: ShieldCheck,
    title: "Visa Support",
    desc: "Expert visa preparation through our accredited immigration partners for smooth approvals.",
    img: "/images/visas_support.jpg",
  },
  {
    icon: Plane,
    title: "Post-Arrival Advice",
    desc: "Accommodation, registration, banking, and settling-in guidance to ease your transition.",
    img: "/images/post_arrival.jpg",
  },
  {
    icon: Briefcase,
    title: "Post-Study Employment",
    desc: "CV optimisation, interview preparation, graduate visa support, and career strategy.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
  },
];

export function Services() {
  return (
    <section id="services" className="mt-24">
      <MotionSection>
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-md">
          Our Services
        </h2>

        <p className="mt-4 max-w-2xl text-center mx-auto text-emerald-700/80 text-lg leading-relaxed">
          Comprehensive guidance from your first enquiry to post-graduation success.
        </p>

        <div
          className="
            mt-14 grid gap-8
            grid-cols-1 sm:grid-cols-2
            lg:grid-cols-2 xl:grid-cols-2
          "
        >
          {items.map(({ icon: Icon, title, desc, img }) => (
            <MotionSection key={title} y={22}>
              <article
                className="
                  group relative overflow-hidden rounded-3xl
                  bg-[#0B132B]/60 border border-white/10 ring-1 ring-white/10
                  hover:ring-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]
                  transition-all duration-500
                "
              >
                {/* Image Section */}
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* icon bubble */}
                  <div className="absolute left-4 top-4 inline-flex items-center justify-center rounded-xl bg-white/90 p-3 ring-1 ring-black/10 shadow-sm">
                    <Icon className="text-blue-600" size={22} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-8 text-left relative z-10">
                  <h3
                    className="
                      text-xl font-bold mb-3
                      bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400
                      bg-clip-text text-transparent
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                    "
                  >
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* hover highlight border */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-400/40 transition-all" />
              </article>
            </MotionSection>
          ))}
        </div>
      </MotionSection>
    </section>
  );
}
