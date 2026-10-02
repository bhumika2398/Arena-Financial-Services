"use client";

import { motion } from "framer-motion";
import { TimelinePath } from "@/components/animations/TimelinePath";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

export function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden bg-white py-10">
      {/* Architectural blueprint grid-line texture, same technique as HeroGlow/StatsStrip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(1,63,74,0.6) 0px, rgba(1,63,74,0.6) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(1,63,74,0.6) 0px, rgba(1,63,74,0.6) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <Container className="relative z-10 flex flex-col gap-8">
        <SectionHeading
          eyebrow="How It Works"
          title="Four Simple Steps to Get Started"
          subtitle="A streamlined process designed to get you from application to funding as quickly as possible."
        />

        <div className="relative">
          {/* Connecting line: horizontal on desktop, vertical on mobile */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-deep-100 md:left-0 md:top-6 md:h-px md:w-full" />
          <TimelinePath steps={processSteps.length} />

          <div className="grid gap-6 md:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex gap-4 md:flex-col md:gap-6"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-deep-900 font-display text-lg font-bold text-primary-400">
                  {step.step}
                </div>
                <div>
                  <h3 className="mb-2 font-display text-lg font-bold text-deep-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-deep-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
