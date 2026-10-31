"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

export interface TestimonialFlipCardProps {
  testimonial: Testimonial;
  /** Delay (ms) before this card's auto-flip loop starts, so a row of cards feels staggered. */
  autoFlipDelay?: number;
  /** Interval (ms) between auto-flips. */
  autoFlipInterval?: number;
  className?: string;
}

export function TestimonialFlipCard({
  testimonial,
  autoFlipDelay = 0,
  autoFlipInterval = 4500,
  className,
}: TestimonialFlipCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const interactingRef = useRef(false);

  useEffect(() => {
    interactingRef.current = interacting;
  }, [interacting]);

  // Auto-flip loop: pauses while the user is hovering/has manually toggled the card,
  // and resumes on its own schedule once they stop interacting.
  useEffect(() => {
    if (prefersReducedMotion) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (!interactingRef.current) {
          setFlipped((v) => !v);
        }
      }, autoFlipInterval);
    }, autoFlipDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoFlipDelay, autoFlipInterval, prefersReducedMotion]);

  const attribution = (
    <div>
      <p className="font-display font-bold text-deep-900">{testimonial.name}</p>
      <p className="text-sm text-deep-500">
        {testimonial.role} · {testimonial.service}
      </p>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "flex h-full flex-col gap-4 rounded-[10px] border border-deep-100 bg-white p-6 shadow-sm",
          className,
        )}
      >
        <p className="text-balance text-base text-deep-700">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="mt-auto">{attribution}</div>
      </div>
    );
  }

  function toggleManual() {
    setInteracting(true);
    setFlipped((v) => !v);
  }

  return (
    <div
      className={cn("h-full", className)}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => {
        setInteracting(true);
        setFlipped(true);
      }}
      onMouseLeave={() => {
        setInteracting(false);
        setFlipped(false);
      }}
      onClick={toggleManual}
      role="button"
      tabIndex={0}
      aria-label={`${testimonial.service} client review, tap to flip`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleManual();
        }
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* FRONT: the service this client used */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-[10px] bg-deep-900 p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-deep-300">Client review</span>
          <p className="font-display text-2xl font-bold text-white">{testimonial.service} client</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-[10px] border border-deep-100 bg-white p-6 shadow-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-balance text-sm leading-relaxed text-deep-700 sm:text-base">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          {attribution}
        </div>
      </motion.div>
    </div>
  );
}
