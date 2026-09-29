"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Slow drifting gradient glow behind the testimonials carousel. Uses only
 * transform/opacity so the loop is cheap to animate continuously.
 */
export function DriftingGlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={
          prefersReducedMotion
            ? "absolute left-[10%] top-[10%] h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.28),transparent)] blur-3xl"
            : "absolute left-[10%] top-[10%] h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.28),transparent)] blur-3xl animate-drift"
        }
      />
      <div
        className={
          prefersReducedMotion
            ? "absolute right-[8%] bottom-[5%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.24),transparent)] blur-3xl"
            : "absolute right-[8%] bottom-[5%] h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.24),transparent)] blur-3xl animate-drift [animation-delay:4s]"
        }
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(1,63,74,0.35)_100%)]"
      />
      {/* Thin light rays sweeping slowly behind the testimonials */}
      <div
        className={
          prefersReducedMotion
            ? "absolute left-1/2 top-1/2 h-[160%] w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] [background:repeating-linear-gradient(115deg,rgba(244,251,248,0.4)_0px,rgba(244,251,248,0.4)_2px,transparent_2px,transparent_140px)]"
            : "absolute left-1/2 top-1/2 h-[160%] w-[60%] -translate-x-1/2 -translate-y-1/2 [background:repeating-linear-gradient(115deg,rgba(244,251,248,0.4)_0px,rgba(244,251,248,0.4)_2px,transparent_2px,transparent_140px)] animate-ray-sweep"
        }
      />
    </div>
  );
}
