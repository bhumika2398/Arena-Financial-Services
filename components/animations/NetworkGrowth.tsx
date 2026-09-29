"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated connecting lines/nodes drawing across the "Why Choose Us"
 * section as it scrolls into view — a subtle network-growth visual behind
 * the feature cards.
 */
const NODES = [
  { x: 8, y: 20 },
  { x: 30, y: 8 },
  { x: 55, y: 22 },
  { x: 78, y: 10 },
  { x: 92, y: 28 },
  { x: 18, y: 60 },
  { x: 45, y: 72 },
  { x: 70, y: 62 },
  { x: 90, y: 78 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [1, 6],
  [2, 6],
  [3, 7],
  [4, 8],
  [5, 6],
  [6, 7],
  [7, 8],
];

export function NetworkGrowth() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40" aria-hidden>
      {/* Subtle animated grain texture for a bit of tactile depth */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
        <filter id="networkGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#networkGrain)"
          className={prefersReducedMotion ? "" : "animate-grain"}
        />
      </svg>
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {LINKS.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#068562"
            strokeWidth="0.25"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 1, delay: i * 0.08, ease: "easeInOut" }
            }
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="1"
            fill="#569578"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 0.4, delay: 0.3 + i * 0.06 }
            }
          />
        ))}
      </svg>
    </div>
  );
}
