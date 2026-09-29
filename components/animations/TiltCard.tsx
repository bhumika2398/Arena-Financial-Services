"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type ReactNode } from "react";

/**
 * Wraps children in a perspective/tilt effect that follows the cursor,
 * like a physical card pivoting in your hand. Pure Framer Motion 3D
 * transforms (no three.js) — cheap enough to use on every grid card.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 10,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  maxTilt?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]) as MotionValue<number>;
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]) as MotionValue<number>;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      className={className}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
