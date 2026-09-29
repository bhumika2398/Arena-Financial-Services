"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Slow-moving flowing gradient background layer for the services detail
 * sections. Transform/opacity-only, revealed via whileInView.
 */
export function FlowingGradient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      <div
        className={
          prefersReducedMotion
            ? "absolute -left-1/4 top-0 h-full w-3/4 bg-[linear-gradient(120deg,rgba(6,133,98,0.08),rgba(86,149,120,0.05),transparent)]"
            : "absolute -left-1/4 top-0 h-full w-3/4 bg-[linear-gradient(120deg,rgba(6,133,98,0.1),rgba(86,149,120,0.06),transparent)] animate-float-slow"
        }
      />
      <div
        className={
          prefersReducedMotion
            ? "absolute -right-1/4 bottom-0 h-full w-3/4 bg-[linear-gradient(300deg,rgba(1,63,74,0.06),transparent)]"
            : "absolute -right-1/4 bottom-0 h-full w-3/4 bg-[linear-gradient(300deg,rgba(1,63,74,0.08),transparent)] animate-float"
        }
      />
    </motion.div>
  );
}
