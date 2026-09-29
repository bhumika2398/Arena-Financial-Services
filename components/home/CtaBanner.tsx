"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PulseGlowCta } from "@/components/animations/PulseGlowCta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionVideoBackground } from "@/components/video/SectionVideoBackground";

export function CtaBanner() {
  return (
    <section className="bg-deep-900 py-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep-800 to-deep-alt2 px-8 py-12 text-center"
        >
          <SectionVideoBackground
            src="/videos/finance_video_3.mp4"
            overlayClassName="bg-gradient-to-br from-deep-950/80 via-deep-900/60 to-deep-950/85"
          />
          <PulseGlowCta />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-balance font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to Take the Next Step Toward Your Financial Goals?
            </h2>
            <p className="max-w-xl text-balance text-deep-200">
              Speak with one of our advisors today and discover the right
              loan, insurance or investment plan for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/apply" size="lg">
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/contact" size="lg" variant="flat">
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
