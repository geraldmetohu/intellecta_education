"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = [
  "University Support",
  "Visa Guidance",
  "Post-Arrival Advice",
  "Career Coaching",
];

const IMAGES = [
"/images/hero3.jpg",
    "/images/hero2.jpg", 
    "/images/hero1.jpg",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=2000&auto=format&fit=crop",
];

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -80]);
  const [wordIndex, setWordIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((v) => (v + 1) % WORDS.length);
      setImageIndex((v) => (v + 1) % IMAGES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative w-full overflow-hidden">
      {/* ─── BACKGROUND SLIDESHOW ─── */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={imageIndex}
            style={{ y }}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <Image
              src={IMAGES[imageIndex]}
              alt="Hero background"
              fill
              priority
              className="object-cover"
            />
            {/* directional soft overlays for readability */}
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#0B132B]/70 via-[#1D3557]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B132B]/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative flex min-h-[95vh] w-full items-center">
        <div className="mx-6 sm:mx-10 lg:mx-16 max-w-3xl text-left space-y-6">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            className="
              text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight
              bg-gradient-to-r from-cyan-200 via-blue-400 to-violet-300 bg-clip-text text-transparent
            "
            style={{
              WebkitTextStroke: "0.6px rgba(0,0,0,0.35)",
              textShadow: "0 2px 14px rgba(0,0,0,0.4)",
            }}
          >
            Your UK Study Journey, Made Simple
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 120, damping: 18 }}
            className="
              text-lg sm:text-xl font-medium text-white/95 leading-relaxed
              bg-white/10 border border-white/20 rounded-2xl px-6 py-5
              shadow-[0_0_18px_rgba(59,130,246,0.25)]
              backdrop-saturate-[180%]
            "
            style={{
              textShadow: "0 1px 6px rgba(0,0,0,0.45)",
            }}
          >
            Intellecta Education guides international students through every stage — 
            from selecting the right university to securing a visa, settling in, and
            achieving success after graduation.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 120, damping: 16 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-500 px-8 py-3 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              Book a Free Consultation
            </a>
            <a
              target="_blank"
              href={`https://wa.me/?text=${encodeURIComponent(
                "Hi Intellecta Education, I’d like help applying to UK universities."
              )}`}
              className="rounded-xl bg-white/90 px-8 py-3 text-blue-700 font-semibold ring-1 ring-blue-300 hover:ring-violet-400 transition-all"
            >
              WhatsApp Us
            </a>
          </motion.div>

          {/* Rotating Tag */}
          <div className="pt-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 160, damping: 14 }}
                className="
                  inline-flex items-center rounded-full
                  bg-gradient-to-r from-white/85 to-white/60
                  px-5 py-2 text-sm font-medium text-blue-800 shadow-sm ring-1 ring-white/30
                "
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Right-side spacing for layout balance on large screens */}
        <div className="hidden lg:block flex-1" />
      </div>
    </section>
  );
}
