// ──────────────────────────────────────────────────────────────────────────────
// File: components/MotionSection.tsx
// ──────────────────────────────────────────────────────────────────────────────
"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

type Props = PropsWithChildren<{
  className?: string;
  /** Offset distance for enter/exit in px */
  y?: number;
  /** Portion of element that must be visible (0–1) or array for multi thresholds */
  threshold?: number | number[];
  /** Stop observing after first reveal */
  once?: boolean;
  /** Extra delay per section (seconds) */
  delay?: number;
  /** Root margin for IntersectionObserver (e.g., "-10% 0px") */
  rootMargin?: string;
}>;

export function MotionSection({
  children,
  className = "",
  y = 28,
  threshold = 0.25,
  once = false,
  delay = 0,
  rootMargin = "-10% 0px",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setHasShown(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  const variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" as const },
    show: { opacity: 1, y: 0, filter: "blur(0px)" as const },
  };

  const transition: Transition = reduce
    ? { duration: 0 }
    : {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.6,
        delay,
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
      variants={variants}
      initial="hidden"
      animate={visible || hasShown ? "show" : "hidden"}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
