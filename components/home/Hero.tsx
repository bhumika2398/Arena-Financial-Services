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
import { SectionVideoBackground } from "@/components/video/SectionVideoBackground";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-deep-alt2 pb-20 pt-32">
      {/* Background video — HeroGlow's wash + vignette (stacked on top)
          handle text legibility, so the video itself stays at a clearly
          visible opacity with NO blend-mode override: mix-blend-screen
          against a dark backdrop mathematically suppresses dark/mid-tone
          footage (screen blend of a near-black layer barely lightens
          anything), which was the main reason the video read as almost
          invisible before. */}
      <SectionVideoBackground
        src="/videos/finance_video_2.mp4"
        videoClassName="opacity-65"
        overlayClassName="bg-transparent"
        posterClassName="bg-transparent"
      />
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
            variant="outline"
            size="lg"
            className="border-white/40 uppercase tracking-wide text-white hover:bg-white hover:text-deep-900"
          >
            Explore Services
          </Button>
        </motion.div>

        <HeroDashboardCard />
      </Container>

      {/* Bottom gradient handoff into StatsStrip's bg-deep-alt1 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-deep-alt1" />
    </section>
  );
}
