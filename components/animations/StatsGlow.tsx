"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Pulsing gradient glow revealed behind the stats strip once it scrolls
 * into view. Pure transform/opacity so it stays cheap to animate.
 */
export function StatsGlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: prefersReducedMotion ? 0.35 : 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className={
          prefersReducedMotion
            ? "absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.35),transparent)] blur-3xl"
            : "absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.35),transparent)] blur-3xl animate-pulse-glow"
        }
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: prefersReducedMotion ? 0.25 : 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className={
          prefersReducedMotion
            ? "absolute right-[-10%] bottom-[-20%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.4),transparent)] blur-3xl"
            : "absolute right-[-10%] bottom-[-20%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.4),transparent)] blur-3xl animate-pulse-glow"
        }
      />
      {/* Soft light rays sweeping slowly behind the stats — kept static under reduced motion */}
      <div
        className={
          prefersReducedMotion
            ? "absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 opacity-[0.12] [background:repeating-linear-gradient(100deg,rgba(205,243,227,0.5)_0px,rgba(205,243,227,0.5)_2px,transparent_2px,transparent_120px)]"
            : "absolute left-1/2 top-0 h-full w-[140%] -translate-x-1/2 [background:repeating-linear-gradient(100deg,rgba(205,243,227,0.5)_0px,rgba(205,243,227,0.5)_2px,transparent_2px,transparent_120px)] animate-ray-sweep"
        }
      />
    </div>
  );
}
