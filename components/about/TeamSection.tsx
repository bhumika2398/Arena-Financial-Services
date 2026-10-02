"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { financialConsultants, teamMembers } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function TeamSection() {
  const reduced = useReducedMotion();
  const enter = (i: number, y = 16) => ({
    initial: reduced ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, ease: EASE, delay: reduced ? 0 : (i % 2) * 0.1 },
  });

  return (
    <section className="bg-white py-10">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Leadership"
          title="Founders of Arena Financial Services"
        />

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          {teamMembers.map((member, i) => (
            <motion.article
              key={member.id}
              {...enter(i)}
              className="flex h-full flex-col gap-4 rounded-2xl border border-deep-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-center gap-4 border-b border-deep-100 pb-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-deep-800 font-display text-xl font-bold text-white shadow-[0_6px_14px_-4px_rgba(6,133,98,0.55),inset_0_1px_0_rgba(255,255,255,0.3)] ring-4 ring-primary-50">
                  {initials(member.name)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold leading-tight text-deep-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary-600">
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="flex max-w-prose flex-col gap-3 text-sm leading-relaxed text-deep-500">
                {member.bio.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
              <a
                href={`mailto:${member.email}`}
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-3.5 py-2 text-sm font-semibold text-primary-700 transition-all duration-200 hover:-translate-y-px hover:border-primary-400 hover:bg-primary-100 hover:shadow-sm"
              >
                <Mail className="h-4 w-4" />
                {member.email}
              </a>
            </motion.article>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-mint p-5 sm:p-6">
          <h3 className="text-center font-display text-xl font-bold text-deep-900">
            Financial Consultants
          </h3>
          <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
            {financialConsultants.map((person, i) => (
              <motion.div
                key={person.id}
                {...enter(i, 10)}
                className="flex items-center gap-3 rounded-xl border border-deep-100 bg-white px-4 py-3 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-deep-800 font-display text-sm font-bold text-white">
                  {initials(person.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-deep-900">{person.name}</p>
                  <p className="text-sm text-deep-500">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
