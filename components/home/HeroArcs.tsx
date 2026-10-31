"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * Layered blue arches rising from the bottom of the hero: a calm, abstract
 * backdrop in deep navy and blue. Each layer drifts a few pixels on its own
 * slow cycle. Static for reduced motion; paused while off-screen.
 */

const CX = 800;
const CY = 1260;

// Largest (back) to smallest (front). Colours step from near-black navy to bright blue.
const LAYERS = [
  { r: 1180, dx: -150, from: "#040E22", to: "#081D44", dur: 14 },
  { r: 1030, dx: -90, from: "#05122B", to: "#0A2556", dur: 12 },
  { r: 890, dx: -30, from: "#071A3C", to: "#0D2E68", dur: 13 },
  { r: 750, dx: 30, from: "#091F49", to: "#103576", dur: 11 },
  { r: 610, dx: 90, from: "#0B2657", to: "#134092", dur: 12.5 },
  { r: 470, dx: 150, from: "#0E2F6B", to: "#1747B0", dur: 10 },
  { r: 330, dx: 210, from: "#123A85", to: "#2358D0", dur: 11.5 },
];

export function HeroArcs({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const run = inView && !reduced;

  return (
    <div ref={ref} aria-hidden className={className}>
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          {LAYERS.map((l, i) => (
            <linearGradient key={i} id={`arc-${i}`} x1="0.15" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor={l.to} />
              <stop offset="100%" stopColor={l.from} />
            </linearGradient>
          ))}
        </defs>
        {LAYERS.map((l, i) => (
          <motion.circle
            key={i}
            cx={CX + l.dx}
            cy={CY}
            r={l.r}
            fill={`url(#arc-${i})`}
            stroke="rgba(2, 10, 28, 0.55)"
            strokeWidth="5"
            animate={run ? { y: [0, -7, 0], scale: [1, 1.006, 1] } : undefined}
            transition={{ duration: l.dur, ease: "easeInOut", repeat: Infinity, delay: i * 0.6 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}
