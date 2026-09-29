"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/**
 * Wraps a service card icon with a one-time draw-in animation on scroll into
 * view, followed by a subtle looping wiggle. Falls back to a static icon
 * when reduced motion is preferred.
 */
export function ServiceIconAnimation({ icon: Icon }: { icon?: LucideIcon }) {
  const prefersReducedMotion = useReducedMotion();

  if (!Icon) return null;

  if (prefersReducedMotion) {
    return <Icon className="h-6 w-6" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      className="relative"
    >
      {/* Soft drifting gradient mesh blob behind the icon for a bit of depth */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.35),transparent)] blur-md"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ rotate: [0, -6, 6, -4, 0], scale: [1, 1.05, 1] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
    </motion.div>
  );
}
