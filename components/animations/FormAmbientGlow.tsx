"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Calm, subtle ambient glow behind form sections (Contact, Apply). Kept
 * quieter than DriftingGlow/PulseGlowCta since it sits behind content users
 * need to focus on reading and filling in.
 */
export function FormAmbientGlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4 }}
    >
      <div
        className={
          prefersReducedMotion
            ? "absolute left-[15%] top-[10%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.1),transparent)] blur-3xl"
            : "absolute left-[15%] top-[10%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.12),transparent)] blur-3xl animate-float-slow"
        }
      />
      <div
        className={
          prefersReducedMotion
            ? "absolute right-[10%] bottom-[5%] h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.08),transparent)] blur-3xl"
            : "absolute right-[10%] bottom-[5%] h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(86,149,120,0.1),transparent)] blur-3xl animate-float"
        }
      />
    </motion.div>
  );
}
