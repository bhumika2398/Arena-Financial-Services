"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calculator } from "lucide-react";
import Link from "next/link";
import { ServiceIconAnimation } from "@/components/animations/ServiceIconAnimation";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { emiTool, loanServices } from "@/lib/data";
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
          {loanServices.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={service.slug} variants={itemVariants} className="h-full">
                  <Link href={`/services/${service.slug}`} className="block h-full">
                    <Card className="group flex h-full flex-col border-deep-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-deep-900 text-primary-400">
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* The EMI Calculator is a tool, not one of the nine services */}
        <Link
          href={`/services/${emiTool.slug}`}
          className="flex flex-col items-start gap-4 rounded-2xl border border-primary-200 bg-primary-50/60 p-5 transition-shadow duration-300 hover:shadow-md sm:flex-row sm:items-center"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-deep-900 text-primary-400">
            <Calculator className="h-6 w-6" />
          </span>
          <span className="flex-1">
            <span className="block text-xs font-bold uppercase tracking-widest text-primary-700">Free tool</span>
            <span className="block font-display text-lg font-bold text-deep-900">{emiTool.title}</span>
            <span className="block text-sm text-deep-600">{emiTool.description}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
            Open calculator
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </Container>
    </section>
  );
}
