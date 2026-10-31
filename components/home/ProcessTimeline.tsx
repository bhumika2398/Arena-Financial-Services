"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { processSteps } from "@/lib/data";

/** Heading left, steps right on a rail that fills as you scroll. */
export function ProcessTimeline() {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section className="bg-white py-14">
      <Container className="grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">Four steps</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-deep-900 sm:text-4xl">How it works</h2>
        </div>

        <ol ref={listRef} className="relative flex flex-col gap-7 pl-14">
          <span aria-hidden className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-deep-100" />
          <motion.span
            aria-hidden
            className="absolute bottom-3 left-[1.15rem] top-3 w-px origin-top bg-primary-600"
            style={{ scaleY: reduced ? 1 : fill }}
          />
          {processSteps.map((step, i) => (
            <motion.li
              key={step.id}
              initial={reduced ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : i * 0.05 }}
              className="relative"
            >
              <span className="brutal-sm absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white font-display text-sm font-bold tabular-nums text-primary-600">
                {step.step}
              </span>
              <h3 className="font-display text-xl font-bold text-deep-900">{step.title}</h3>
              <p className="mt-1 max-w-[52ch] text-deep-600">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
