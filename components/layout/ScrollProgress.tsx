"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin reading-progress line at the very top of the page. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  if (reduced) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-primary-600 print:hidden"
    />
  );
}
