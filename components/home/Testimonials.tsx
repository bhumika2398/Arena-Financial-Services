"use client";

import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useMemo, useState } from "react";
import { DriftingGlow } from "@/components/animations/DriftingGlow";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialFlipCard } from "@/components/testimonials/TestimonialFlipCard";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const CARDS_PER_SET = 3;

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [page, setPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const pageCount = Math.ceil(testimonials.length / CARDS_PER_SET);

  const sets = useMemo(() => {
    return Array.from({ length: pageCount }, (_, setIndex) =>
      Array.from({ length: CARDS_PER_SET }, (_, i) => {
        const idx = (setIndex * CARDS_PER_SET + i) % testimonials.length;
        return testimonials[idx];
      }),
    );
  }, [pageCount]);

  function handleDragEnd(_e: unknown, info: PanInfo) {
    const threshold = 60;
    if (info.offset.x < -threshold) {
      setMobileIndex((v) => (v + 1) % testimonials.length);
    } else if (info.offset.x > threshold) {
      setMobileIndex((v) => (v - 1 + testimonials.length) % testimonials.length);
    }
  }

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-mint py-10"
    >
      <DriftingGlow />
      <SecureGrid />
      <Container className="relative z-10 flex flex-col items-center gap-8">
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by Thousands of Clients"
          align="center"
        />

        {/* Desktop: 3-up grid of flip cards, staggered auto-flip */}
        <div className="hidden w-full grid-cols-3 gap-6 sm:grid">
          {sets[page].map((testimonial, i) => (
            <div key={`${testimonial.id}-${page}`} className="h-72">
              <TestimonialFlipCard
                testimonial={testimonial}
                autoFlipDelay={i * 1300}
                autoFlipInterval={4500}
              />
            </div>
          ))}
        </div>

        {/* Mobile: single swipeable card */}
        <div className="w-full max-w-md sm:hidden">
          <motion.div
            className="h-80"
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            <TestimonialFlipCard
              testimonial={testimonials[mobileIndex]}
              autoFlipDelay={0}
              autoFlipInterval={4500}
            />
          </motion.div>
        </div>

        {/* Desktop deck indicators (jump between sets) */}
        <div className="hidden items-center gap-3 sm:flex">
          {sets.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial set ${i + 1}`}
              onClick={() => setPage(i)}
              className={cn(
                "h-6 w-8 rounded-md border transition-all",
                i === page
                  ? "border-primary-600 bg-primary-600/20"
                  : "border-deep-200 bg-white hover:border-primary-400",
              )}
            />
          ))}
        </div>

        {/* Mobile deck indicators (jump between individual cards) */}
        <div className="flex items-center gap-2 sm:hidden">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setMobileIndex(i)}
              className={cn(
                "h-5 w-7 rounded-md border transition-all",
                i === mobileIndex
                  ? "border-primary-600 bg-primary-600/20"
                  : "border-deep-200 bg-white hover:border-primary-400",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Very subtle "secure banking" grid texture behind the flip cards. */
function SecureGrid() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="pointer-events-none absolute inset-0 opacity-[0.05] [background-size:42px_42px] [background-image:linear-gradient(to_right,rgba(1,63,74,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(1,63,74,0.5)_1px,transparent_1px)]"
    />
  );
}
