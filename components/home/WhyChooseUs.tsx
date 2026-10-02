"use client";

import { motion } from "framer-motion";
import { Award, Clock, HeartHandshake, Lock, Percent, Users } from "lucide-react";
import { NetworkGrowth } from "@/components/animations/NetworkGrowth";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Digital-first process gets you decisions in as little as 24 hours.",
  },
  {
    icon: Percent,
    title: "Competitive Rates",
    description: "Access to 25+ partners means we negotiate the best rate for you.",
  },
  {
    icon: Users,
    title: "Dedicated Advisors",
    description: "A named advisor guides you from application to disbursal.",
  },
  {
    icon: Lock,
    title: "Secure & Confidential",
    description: "Bank-grade data protection on every document you share.",
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "A track record of trust across loans, insurance and investments.",
  },
  {
    icon: HeartHandshake,
    title: "Client-First Approach",
    description: "No hidden fees, no pressure — just honest financial guidance.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-mint py-10">
      <NetworkGrowth />
      <Container className="relative z-10 flex flex-col gap-6">
        <SectionHeading
          eyebrow="Why Arena Finserv"
          title="A Partner You Can Rely On"
          subtitle="We combine deep industry relationships with a genuinely personal approach to financial advisory."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-50 text-sage-700">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-bold text-deep-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-deep-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
