"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Handshake, Info, MessageSquareText, Scale } from "lucide-react";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    step: "01",
    title: "Understand",
    description:
      "Before anything else, you should know which financing routes could apply to what you are trying to do, and how each one actually works — secured against unsecured, a fixed schedule against a revolving limit, shorter tenure against longer.",
  },
  {
    step: "02",
    title: "Compare",
    description:
      "Two products can both fit and still lead to very different costs and commitments. We lay out the trade-offs so the choice is yours to make with the full picture, not a nudge toward whatever is easiest to place.",
  },
  {
    step: "03",
    title: "Prepare",
    description:
      "Most applications stall on missing paperwork, not on the merits. Knowing the document list and what a lender will scrutinise — before you apply — is usually what keeps things moving.",
  },
  {
    step: "04",
    title: "Proceed",
    description:
      "When you decide to go ahead, you share your details once. Arena takes the case to a lender that fits and stays your point of contact through assessment, sanction and disbursal.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Information first",
    description:
      "The calculators, the Finance Finder and the service pages are all usable without giving us your contact details. You decide when to get in touch.",
  },
  {
    icon: Scale,
    title: "Honest about what we are",
    description:
      "Arena helps you navigate financing. The lender is a bank or an NBFC, and the lender decides. We never present an estimate as an approval or imply a guarantee.",
  },
  {
    icon: MessageSquareText,
    title: "Plain language",
    description:
      "Financial terms explained the way a knowledgeable person would explain them to a friend — short sentences, concrete examples, no jargon for its own sake.",
  },
  {
    icon: Handshake,
    title: "One process, one contact",
    description:
      "From working out what fits, to assembling documents, to dealing with the lender, it is the same point of contact throughout.",
  },
];


const EASE = [0.22, 1, 0.36, 1] as const;

/** Calm, understated: one-time scroll entrances and light hover states only. */
export function WhyArena() {
  const reduced = useReducedMotion();
  const enter = (x: number, y: number, i: number) => ({
    initial: reduced ? false : { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: EASE, delay: reduced ? 0 : i * 0.1 },
  });

  return (
    <>
      {/* Four steps — connected vertical timeline */}
      <section className="bg-white py-10">
        <Container className="max-w-4xl">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary-600">
            Four things, in order
          </h2>
          <ol className="relative flex flex-col gap-4">
            <span
              aria-hidden
              className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-deep-200 sm:left-[2.1rem]"
            />
            {steps.map((s, i) => (
              <motion.li
                key={s.step}
                {...enter(-16, 0, i)}
                className="relative flex gap-4 sm:gap-6"
              >
                <span className="relative z-10 flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full border-2 border-primary-500/60 bg-white font-display text-lg font-bold text-primary-600 sm:h-[4.25rem] sm:w-[4.25rem] sm:text-2xl">
                  {s.step}
                </span>
                <div className="flex-1 rounded-xl border border-deep-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md sm:p-5">
                  <h3 className="mb-1 font-display text-lg font-bold text-deep-900">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-deep-500">
                    {s.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Four features — equal-height cards */}
      <section className="border-t border-deep-100 bg-mint py-10">
        <Container className="max-w-4xl">
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-primary-600">
            What makes the experience different
          </h2>
          <div className="grid items-stretch gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...enter(0, 16, i)}
                className="flex h-full flex-col gap-3 rounded-xl border border-deep-100 bg-white p-5 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-deep-900 text-primary-400">
                  <f.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-lg font-bold text-deep-900">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-deep-500">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing note */}
      <section className="border-t border-deep-100 bg-white py-10">
        <Container className="max-w-4xl">
          <motion.aside
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex gap-4 rounded-xl border border-primary-200 bg-primary-50/60 p-5 sm:p-6"
          >
            <Info className="mt-0.5 h-6 w-6 shrink-0 text-primary-600" strokeWidth={1.75} />
            <div>
              <h2 className="mb-2 font-display text-lg font-bold text-deep-900">
                On numbers we cannot yet verify
              </h2>
              <p className="text-sm leading-relaxed text-deep-500">
                You will not find customer counts, disbursal totals or success rates
                on this site until they are verified. Where a figure would normally
                sit, we have left it out rather than round something up. Trust
                should come from how clearly the process is explained and how
                straight the advice is — not from a statistic.
              </p>
            </div>
          </motion.aside>
        </Container>
      </section>
    </>
  );
}
