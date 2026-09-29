"use client";

import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = [
  { left: "12%", top: "20%", delay: 0 },
  { left: "80%", top: "15%", delay: 1.2 },
  { left: "25%", top: "75%", delay: 0.6 },
  { left: "68%", top: "80%", delay: 1.8 },
  { left: "45%", top: "10%", delay: 2.4 },
  { left: "90%", top: "60%", delay: 0.9 },
];

/**
 * Pulsing glow ring around the CTA button plus a few floating light
 * particles drifting behind the banner.
 */
export function PulseGlowCta() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
      <div
        className={
          prefersReducedMotion
            ? "absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.4),transparent)] blur-3xl"
            : "absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(6,133,98,0.4),transparent)] blur-3xl animate-pulse-glow"
        }
      />

      {!prefersReducedMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-sage-300/70"
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
