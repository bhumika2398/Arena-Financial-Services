"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBanner() {
  return (
    <section className="bg-deep-900 py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-deep-800 px-6 py-10 sm:px-8 text-center"
        >
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="max-w-2xl text-balance font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to Take the Next Step Toward Your Financial Goals?
            </h2>
            <p className="max-w-xl text-balance text-deep-200">
              Speak with one of our advisors today and discover the right
              loan for you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/apply" size="lg">
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/contact" size="lg" variant="outlineLight">
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
