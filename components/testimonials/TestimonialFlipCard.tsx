"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CreditCard, ShieldCheck, Star } from "lucide-react";
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

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "flex h-full flex-col gap-5 rounded-2xl bg-white p-6 shadow-md sm:p-8",
          className,
        )}
      >
        <StarRow rating={testimonial.rating} />
        <p className="text-balance text-base text-deep-700 sm:text-lg">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-auto">
          <p className="font-display font-bold text-deep-900">{testimonial.name}</p>
          <p className="text-sm text-deep-500">
            {testimonial.loanType ?? testimonial.role}
          </p>
        </div>
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
      aria-label={`Testimonial from ${testimonial.name}, tap to flip`}
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
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-primary-700 to-deep-900 p-6 shadow-lg sm:p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(115deg,rgba(244,251,248,0.6)_0px,rgba(244,251,248,0.6)_1px,transparent_1px,transparent_18px)]"
          />
          <div className="flex items-start justify-between">
            <div className="flex h-9 w-12 items-center justify-center rounded-md bg-gradient-to-br from-yellow-200/90 to-yellow-500/80">
              <CreditCard className="h-5 w-5 text-deep-900/70" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              AFS
            </span>
          </div>
          <div className="relative z-10">
            <p className="font-display text-lg font-bold text-white sm:text-xl">
              {testimonial.name}
            </p>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-200">
              {testimonial.loanType ?? "Verified Borrower"}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/40 bg-white p-6 shadow-lg sm:p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-4 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border-2 border-primary-600/20 text-[9px] font-bold uppercase tracking-widest text-primary-600/25"
          >
            <ShieldCheck className="h-9 w-9" />
          </div>
          <div className="flex flex-col gap-3">
            <StarRow rating={testimonial.rating} />
            <p className="text-balance text-sm text-deep-700 sm:text-base">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </div>
          <div>
            <p className="font-display font-bold text-deep-900">{testimonial.name}</p>
            <p className="text-sm text-deep-500">
              {testimonial.loanType ?? testimonial.role}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-primary-500 text-primary-500" : "text-deep-200",
          )}
        />
      ))}
    </div>
  );
}
