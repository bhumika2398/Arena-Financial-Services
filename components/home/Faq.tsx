"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden bg-mint py-10"
    >
      {/* Subtle animated grain texture for a bit of tactile depth */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]" aria-hidden>
        <filter id="faqGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#faqGrain)"
          className={prefersReducedMotion ? "" : "animate-grain"}
        />
      </svg>
      <Container className="relative z-10 flex flex-col gap-8">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Have Questions? We Have Answers"
          subtitle="Everything you need to know before getting started with Arena Finserv."
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  "overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md",
                  isOpen
                    ? "border-white/40 bg-white/50 backdrop-blur-sm sm:backdrop-blur-md"
                    : "border-deep-100 bg-white hover:border-white/40 hover:bg-white/50 hover:backdrop-blur-sm",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-deep-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-primary-600 transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-deep-500">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
