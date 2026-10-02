"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroAnimation } from "@/components/hero/HeroAnimation";
import { HeroDashboardCard } from "@/components/hero/HeroDashboardCard";
import { HeroFloatingShape } from "@/components/hero/HeroFloatingShape";
import { HeroGlow } from "@/components/hero/HeroGlow";
import { HeroLoanScene } from "@/components/hero/HeroLoanScene";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-deep-alt2 pb-14 pt-32">
      {/* Loan/banking-themed motifs (house, handshake, approved document)
          replace the old stock-footage video, which read as trading/crypto. */}
      <div className="absolute inset-0 bg-deep-900" />
      <HeroLoanScene />
      <HeroGlow />
      <HeroAnimation showMesh={false} />
      <HeroFloatingShape />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Badge className="border border-white/15 bg-white/5 text-primary-300 backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4" />
            Trusted by 38,000+ clients across India
            <ArrowRight className="h-3.5 w-3.5" />
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl text-balance font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Financial Solutions Built Around{" "}
          <span className="text-primary-400">Your Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-2xl text-balance text-lg text-deep-100"
        >
          From personal and business loans to insurance and investment
          advisory — Arena Finserv connects you with the right financial
          partner, every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/apply" size="lg" className="uppercase tracking-wide">
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            href="/services"
            variant="outlineLight"
            size="lg"
            className="uppercase tracking-wide"
          >
            Explore Finance & Solutions
          </Button>
        </motion.div>

        <HeroDashboardCard />
      </Container>

      {/* Bottom gradient handoff into StatsStrip's bg-deep-alt1 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-deep-alt1" />
    </section>
  );
}
