"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ServiceIconAnimation } from "@/components/animations/ServiceIconAnimation";
import { TiltCard } from "@/components/animations/TiltCard";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";
import { iconMap } from "@/lib/icons";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesGrid() {
  return (
    <section className="bg-white py-10">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          eyebrow="Business Finance & Solutions"
          title="Financial Products Tailored to You"
          subtitle="What we offer: nine core solutions designed to cover every stage of your financial journey."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={service.slug} variants={itemVariants} className="h-full">
                <TiltCard maxTilt={8} className="h-full">
                  <Link href={`/services/${service.slug}`} className="block h-full">
                    <Card className="group flex h-full flex-col rounded-none border-2 border-deep-900 bg-white shadow-none transition-shadow duration-300 hover:shadow-xl">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-deep-900 text-primary-400 transition-all duration-300 group-hover:bg-sage-500 group-hover:text-deep-900 group-hover:shadow-[0_0_20px_rgba(86,149,120,0.55)]">
                        <ServiceIconAnimation icon={Icon} />
                      </div>
                      <h3 className="mb-2 font-display text-xl font-bold text-deep-900">
                        {service.title}
                      </h3>
                      <p className="mb-4 text-sm text-deep-500">
                        {service.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                        Learn more
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Card>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
