"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { partners } from "@/lib/data";

/** Text only, in oval pills: no logos, no marquee. */
export function BankingPartners() {
  const reduced = useReducedMotion();
  return (
    <section className="border-y-2 border-deep-900 bg-mint py-16">
      <Container className="max-w-6xl">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-6">
          <p className="font-display text-7xl font-bold leading-none text-primary-600 sm:text-8xl">35+</p>
          <h2 className="pb-1 font-display text-3xl font-bold text-deep-900 sm:text-4xl">
            Our Banking &amp; NBFC Partners
          </h2>
        </div>
        <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p, i) => (
            <motion.li
              key={p}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: reduced ? 0 : (i % 4) * 0.05 }}
              className="brutal-sm flex min-h-14 items-center justify-center rounded-full bg-white px-5 py-2 text-center font-semibold text-deep-900 hover:bg-deep-900 hover:text-white"
            >
              {p}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
