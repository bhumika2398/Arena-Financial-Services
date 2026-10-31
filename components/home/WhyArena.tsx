"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { whyArena } from "@/lib/data";

export function WhyArena() {
  const reduced = useReducedMotion();
  return (
    <section id="why-arena" className="relative scroll-mt-24 overflow-hidden bg-deep-950 py-16 text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(40%_60%_at_15%_20%,rgba(29,78,216,0.35),transparent_70%),radial-gradient(40%_60%_at_90%_90%,rgba(29,78,216,0.25),transparent_70%)]"
      />
      <Container className="relative max-w-6xl">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-300">Why Arena</span>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          Clear advice, no unnecessary complexity
        </h2>
        <dl className="mt-10 grid gap-5 sm:grid-cols-2">
          {whyArena.map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : (i % 2) * 0.08 }}
              className="glass group rounded-[20px] p-7 transition-colors duration-300 hover:bg-white/[0.14]"
            >
              <span className="font-display text-sm font-bold tabular-nums text-primary-300">0{i + 1}</span>
              <dt className="mt-2 font-display text-xl font-bold">{p.title}</dt>
              <dd className="mt-2 max-w-[46ch] leading-relaxed text-deep-100">{p.text}</dd>
            </motion.div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
