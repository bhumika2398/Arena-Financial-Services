"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Handshake } from "lucide-react";

/**
 * Loan/banking-themed hero backdrop (replaces the old stock-footage video):
 * a house outline that draws itself (home loans), a handshake (business
 * loans / trust), and an "approved" document with a checkmark. Staggered,
 * looping, low-opacity so the headline stays legible. Pure SVG + Framer Motion.
 */

const LOOP = 9;

function useLoop(delay: number, reduced: boolean | null) {
  return reduced
    ? {}
    : {
        transition: {
          duration: LOOP,
          delay,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
}

export function HeroLoanScene() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* House outline being drawn — home loans */}
      <motion.div
        className="absolute left-[3%] top-[12%] hidden w-44 text-primary-300 md:block lg:left-[6%] lg:w-56"
        animate={reduced ? { opacity: 0.35 } : { opacity: [0, 0.5, 0.5, 0], y: [0, -14, -14, 0] }}
        {...useLoop(0, reduced)}
      >
        <svg viewBox="0 0 120 110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M10 55 L60 12 L110 55 M22 48 V98 H98 V48 M50 98 V70 H70 V98"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
            transition={reduced ? undefined : { duration: LOOP, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Handshake — business loans / trust */}
      <motion.div
        className="absolute right-[4%] top-[14%] hidden text-sage-300 md:block lg:right-[8%]"
        animate={reduced ? { opacity: 0.35 } : { opacity: [0, 0.5, 0.5, 0], scale: [0.85, 1, 1, 0.9], y: [0, -12, -12, 0] }}
        {...useLoop(3, reduced)}
      >
        <div className="rounded-full border border-sage-300/30 bg-sage-300/5 p-7 shadow-[0_0_60px_rgba(6,133,98,0.35)]">
          <Handshake className="h-20 w-20 lg:h-24 lg:w-24" strokeWidth={1.25} />
        </div>
      </motion.div>

      {/* Approved document with checkmark — loan sanction */}
      <motion.div
        className="absolute bottom-[12%] right-[6%] hidden w-40 text-primary-300 md:block lg:right-[12%] lg:w-48"
        animate={reduced ? { opacity: 0.35 } : { opacity: [0, 0.5, 0.5, 0], y: [0, -10, -10, 0] }}
        {...useLoop(6, reduced)}
      >
        <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="8" width="76" height="104" rx="8" className="fill-white/5" />
          <path d="M26 30 H74 M26 44 H74 M26 58 H52" opacity="0.6" />
          <circle cx="66" cy="88" r="16" className="fill-primary-500/20" />
          <motion.path
            d="M58 88 L64 94 L75 81"
            strokeWidth="3"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={reduced ? { pathLength: 1 } : { pathLength: [0, 0, 1, 1, 0] }}
            transition={reduced ? undefined : { duration: LOOP, delay: 6, repeat: Infinity, times: [0, 0.2, 0.4, 0.85, 1] }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
