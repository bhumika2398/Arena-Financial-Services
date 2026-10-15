"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { useId, useState } from "react";
import { Avatar } from "@/components/team/Avatar";
import { Container } from "@/components/ui/Container";
import type { TeamMember } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export type WithPhoto<T> = T & { photo: string | null };
type Consultant = { id: string; name: string; role: string };

function useEnter() {
  const reduced = useReducedMotion();
  return (i = 0) => ({
    initial: reduced ? false : ({ opacity: 0, y: 14 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, ease: EASE, delay: reduced ? 0 : i * 0.08 },
  });
}

function EmailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 underline-offset-2 hover:underline"
    >
      <Mail className="h-4 w-4" />
      {email}
    </a>
  );
}

function Row({ m, i }: { m: WithPhoto<TeamMember>; i: number }) {
  const enter = useEnter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const id = useId();
  const [first, ...rest] = m.bio;

  return (
    <motion.article
      {...enter(i)}
      className="grid gap-4 py-6 md:grid-cols-[19rem_minmax(0,1fr)] md:gap-8"
    >
      <div className="flex items-center gap-4 md:items-start">
        <Avatar name={m.name} photo={m.photo} className="h-14 w-14 text-lg" />
        <div>
          <h3 className="font-display text-xl font-bold leading-tight text-deep-900">{m.name}</h3>
          <p className="mt-1 text-sm font-semibold text-primary-700">{m.role}</p>
        </div>
      </div>
      <div className="max-w-[65ch] text-[0.95rem] leading-relaxed text-deep-600">
        <p>{first}</p>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={id}
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {rest.map((p, j) => (
                <p key={j} className="mt-3">
                  {p}
                </p>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {rest.length > 0 ? (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-deep-900 hover:text-primary-700"
            >
              {open ? "Read less" : "Read more"}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          ) : null}
          <EmailLink email={m.email} />
        </div>
      </div>
    </motion.article>
  );
}

export function TeamPage({
  founder,
  members,
  consultants,
}: {
  founder: WithPhoto<TeamMember>;
  members: WithPhoto<TeamMember>[];
  consultants: WithPhoto<Consultant>[];
}) {
  const enter = useEnter();

  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="max-w-5xl">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">Leadership</span>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Our Team</h1>
          <p className="mt-3 max-w-xl text-lg text-deep-200">
            The people who run Arena Financial Services and look after your application.
          </p>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container className="max-w-5xl">
          {/* Featured */}
          <motion.article
            {...enter()}
            className="grid gap-5 border-b border-deep-200 pb-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8"
          >
            <Avatar name={founder.name} photo={founder.photo} className="h-20 w-20 text-2xl md:h-28 md:w-28 md:text-3xl" />
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight text-deep-900 sm:text-4xl">{founder.name}</h2>
              <p className="mt-1 font-semibold text-primary-700">{founder.role}</p>
              <div className="mt-4 flex max-w-[65ch] flex-col gap-3 leading-relaxed text-deep-600">
                {founder.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-4">
                <EmailLink email={founder.email} />
              </div>
            </div>
          </motion.article>

          <div className="divide-y divide-deep-100">
            {members.map((m, i) => (
              <Row key={m.id} m={m} i={i} />
            ))}
          </div>

          {/* Consultants: quieter */}
          <motion.div {...enter()} className="mt-4 border-t border-deep-200 pt-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-deep-500">Financial Consultants</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {consultants.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <Avatar name={c.name} photo={c.photo} className="h-10 w-10 text-sm" />
                  <div>
                    <p className="font-semibold text-deep-900">{c.name}</p>
                    <p className="text-sm text-deep-500">{c.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
