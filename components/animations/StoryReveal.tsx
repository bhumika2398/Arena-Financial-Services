"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Staggered vertical reveal line + glow used behind the About page's
 * milestone/story timeline. Distinct from Home's TimelinePath/NetworkGrowth.
 */
export function StoryReveal() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary-200/40" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary-400/60 via-sage-400/40 to-transparent"
        initial={{ height: "0%" }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.16),transparent)] blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
}
