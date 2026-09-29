"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { StatsGlow } from "@/components/animations/StatsGlow";
import { Container } from "@/components/ui/Container";
import { stats } from "@/lib/data";
import { useCountUp } from "@/lib/useCountUp";

function StatItem({
  value,
  label,
  suffix,
  active,
}: {
  value: number;
  label: string;
  suffix?: string;
  active: boolean;
}) {
  const count = useCountUp(value, active);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="font-display text-6xl font-bold tracking-tighter text-white sm:text-7xl">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm font-medium text-deep-200">{label}</span>
    </div>
  );
}

export function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y-4 border-primary-500/70 bg-deep-alt1 py-12"
    >
      <StatsGlow />
      {/* Architectural grid-line texture, same repeating-linear-gradient technique as HeroGlow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <Container className="relative z-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <StatItem
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              active={inView}
            />
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
