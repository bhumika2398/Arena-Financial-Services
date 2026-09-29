"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle pulsing backdrop for the EMI calculator card. Kept understated so
 * it doesn't distract from reading calculator inputs/outputs.
 */
export function CalculatorPulse() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1 }}
    >
      <div
        className={
          prefersReducedMotion
            ? "absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.07),transparent)] blur-3xl"
            : "absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.09),transparent)] blur-3xl animate-pulse-glow"
        }
      />
      {/* Second, slower-drifting gradient blob for a touch of mesh-like depth */}
      <div
        className={
          prefersReducedMotion
            ? "absolute right-[6%] bottom-[-10%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.08),transparent)] blur-3xl"
            : "absolute right-[6%] bottom-[-10%] h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.1),transparent)] blur-3xl animate-drift"
        }
      />
    </motion.div>
  );
}
