"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/lib/data";
import { useCountUp } from "@/lib/useCountUp";

function StatItem({
  value,
  label,
  suffix,
  prefix,
  active,
}: {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  active: boolean;
}) {
  const count = useCountUp(value, active);
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-deep-300">{prefix}</span>
      <span className="font-display text-4xl font-bold tabular-nums text-white sm:text-5xl">
        {count.toLocaleString("en-IN", { useGrouping: false })}
        {suffix}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-primary-400">{label}</span>
    </div>
  );
}

export function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-deep-900 py-8"
    >
      <Container className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4 lg:divide-x lg:divide-white/10 [&>*]:lg:pl-6 [&>*:first-child]:lg:pl-0">
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
              prefix={stat.prefix}
              active={inView}
            />
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
