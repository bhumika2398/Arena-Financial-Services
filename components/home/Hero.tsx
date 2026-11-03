"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroArcs } from "@/components/home/HeroArcs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

const WORDS = ["Funding", "that", "helps", "your", "business", "grow"];

const FACTS = [
  { lead: "Founded", strong: String(SITE.founded), tail: "" },
  { lead: "", strong: "35+", tail: "Banks & NBFCs" },
  { lead: "", strong: "Business-loan", tail: "specialists" },
  { lead: "", strong: "Bengaluru", tail: "based" },
];

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative flex min-h-[46rem] flex-col justify-between overflow-hidden bg-deep-950 pb-10 pt-28 sm:pt-36 lg:min-h-[52rem]">
      {/* Image: layered blue arches rising from the bottom */}
      <HeroArcs className="absolute inset-0" />
      {/* Keeps the top dark so the text stays crisp over the arches */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-deep-950 via-deep-950/75 to-transparent" style={{ height: "68%" }} />

      <Container className="relative max-w-6xl">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <motion.p {...rise(0.05)} className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-300">
            <span aria-hidden className="h-px w-8 bg-primary-300" />
            Business finance, made simple
          </motion.p>

          <h1 className="max-w-2xl text-balance font-display text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
            {WORDS.map((w, i) => (
              <span key={w} className={"relative inline-block align-bottom " + (w === "business" ? "mr-[0.45em]" : "mr-[0.25em]")}>
                <span className="inline-block overflow-hidden pb-[0.1em] leading-[1.08]">
                  <motion.span
                    className={"inline-block " + (w === "grow" ? "text-primary-300" : "")}
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: reduced ? 0 : 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
                {w === "grow" ? (
                  <svg aria-hidden viewBox="0 0 220 90" className="pointer-events-none absolute -inset-x-5 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2.5rem)]" fill="none">
                    <motion.ellipse
                      cx="110"
                      cy="46"
                      rx="104"
                      ry="36"
                      stroke="#93B4F7"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      transform="rotate(-3 110 46)"
                      initial={reduced ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1, delay: reduced ? 0 : 1.1, ease: "easeInOut" }}
                    />
                  </svg>
                ) : null}
              </span>
            ))}
          </h1>

          <motion.p
            {...rise(0.6)}
            className="max-w-2xl border-l-4 border-primary-400 pl-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl"
          >
            Business finance made simple: <span className="text-primary-300">clear advice, the right lender, one point of contact</span>
          </motion.p>

          <motion.p {...rise(0.7)} className="max-w-xl text-lg leading-relaxed text-deep-100">
            Arena Financial Services helps MSMEs and growing businesses find the right loan from 35+
            banks and NBFCs, with clear advice and one point of contact from application to disbursal.
          </motion.p>

          <motion.div {...rise(0.85)} className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact#enquiry" size="lg">
              Apply Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/services" size="lg" variant="outlineLight">
              View Services
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* The four fixed facts, in a glass bar over the arches */}
      <Container className="relative mt-16 max-w-6xl">
        <motion.ul {...rise(1)} className="glass grid grid-cols-2 overflow-hidden rounded-[18px] bg-deep-950/55 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <li
              key={i}
              className={
                "px-5 py-5 font-display text-lg font-bold text-white sm:text-xl " +
                (i % 2 === 1 ? "border-l border-white/15 " : "") +
                (i > 1 ? "border-t border-white/15 lg:border-t-0 " : "") +
                (i > 0 ? "lg:border-l lg:border-white/15" : "")
              }
            >
              {f.lead} <span className="text-primary-300">{f.strong}</span> {f.tail}
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
