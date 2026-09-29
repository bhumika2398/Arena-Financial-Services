"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Progress line for the process timeline that "lights up" step by step as
 * the section scrolls into view, staggered per step count rather than
 * scroll-scrubbed.
 */
export function TimelinePath({ steps }: { steps: number }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <>
        <div className="absolute left-0 top-6 hidden h-px w-full bg-primary-500 md:block" />
        <div className="absolute left-6 top-0 h-full w-px bg-primary-500 md:hidden" />
      </>
    );
  }

  return (
    <>
      {/* Subtle animated grain texture layered under the timeline */}
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.04]" aria-hidden>
        <filter id="timelineGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#timelineGrain)" className="animate-grain" />
      </svg>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
        className="absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-primary-600 via-primary-400 to-sage-400 md:block"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary-600 via-primary-400 to-sage-400 md:hidden"
      />
      {Array.from({ length: steps }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: [0, 1, 0.6], scale: [0.4, 1.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
          className="absolute top-6 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-sage-400 shadow-[0_0_10px_rgba(86,149,120,0.8)] md:block"
          style={{ left: `calc(${(i / Math.max(steps - 1, 1)) * 100}% - 6px)` }}
        />
      ))}
    </>
  );
}
