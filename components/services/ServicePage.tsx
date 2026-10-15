"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Info, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { loanServices } from "@/lib/data";
import { iconMap } from "@/lib/icons";
import {
  PHONES,
  TERMS_NOTE,
  type Section,
  type ServiceContent,
  type WhyItem,
} from "@/lib/service-content";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-3 font-display text-xl font-bold text-deep-900 sm:text-2xl">{children}</h2>
);

function WhyText({ item }: { item: WhyItem }) {
  if (!item.link) return <>{item.text}</>;
  const [before, after] = item.text.split(item.link.word);
  return (
    <>
      {before}
      <Link
        href={item.link.href}
        className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-600"
      >
        {item.link.word}
      </Link>
      {after}
    </>
  );
}

function SectionView({ s }: { s: Section }) {
  switch (s.type) {
    case "text":
      return (
        <Reveal>
          {s.title ? <H2>{s.title}</H2> : null}
          <div className="flex flex-col gap-3 leading-relaxed text-deep-600">
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      );
    case "columns":
      return (
        <Reveal className="grid items-stretch gap-4 md:grid-cols-2">
          {s.columns.map((c) => (
            <div key={c.title} className="flex h-full flex-col gap-3 rounded-2xl border border-deep-100 bg-white p-5 shadow-sm">
              <h2 className="font-display text-xl font-bold text-deep-900">{c.title}</h2>
              {c.paragraphs.map((p, i) => (
                <p key={i} className="text-[0.95rem] leading-relaxed text-deep-600">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </Reveal>
      );
    case "cards":
      return (
        <Reveal>
          {s.title ? <H2>{s.title}</H2> : null}
          <div className="grid items-stretch gap-4 md:grid-cols-3">
            {s.items.map((c, i) => (
              <div
                key={c.title}
                className="flex h-full flex-col gap-2 rounded-2xl border border-deep-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-deep-900 font-display text-sm font-bold text-primary-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-bold text-deep-900">{c.title}</h3>
                <p className="text-sm leading-relaxed text-deep-600">{c.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      );
    case "checklist":
      return (
        <Reveal>
          <H2>{s.title}</H2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {s.items.map((it) => (
              <li key={it} className="flex items-start gap-3 rounded-xl border border-deep-100 bg-white p-4 shadow-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                <span className="text-deep-700">{it}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "numbered":
      return (
        <Reveal>
          <H2>{s.title}</H2>
          {s.intro ? <p className="mb-4 text-deep-600">{s.intro}</p> : null}
          <ol className="flex flex-col gap-3">
            {s.items.map((it, i) => (
              <li key={it} className="flex items-start gap-4 rounded-xl border border-deep-100 bg-white p-4 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary-500/60 font-display text-sm font-bold text-primary-600">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-deep-700">{it}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      );
    case "callout":
      return (
        <Reveal>
          <aside className="flex gap-3 rounded-xl border border-primary-200 bg-primary-50/60 p-4 sm:p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
            <div>
              {s.title ? <p className="mb-1 font-display font-bold text-deep-900">{s.title}</p> : null}
              <p className="text-[0.95rem] leading-relaxed text-deep-700">{s.text}</p>
            </div>
          </aside>
        </Reveal>
      );
    case "highlight":
      return (
        <Reveal>
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-deep-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <div className="flex shrink-0 flex-col rounded-xl bg-deep-900 px-6 py-4 text-center">
              <span className="font-display text-3xl font-bold text-primary-400">{s.value}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-deep-200">{s.label}</span>
            </div>
            <p className="leading-relaxed text-deep-600">{s.text}</p>
          </div>
        </Reveal>
      );
    case "why":
      return (
        <Reveal>
          <H2>{s.title}</H2>
          {s.style === "titled" ? (
            <div className="grid items-stretch gap-4 sm:grid-cols-2">
              {s.items.map((it) => (
                <div key={it.title} className="flex h-full flex-col gap-1.5 rounded-2xl border border-deep-100 bg-white p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-deep-900">
                    <Check className="h-5 w-5 shrink-0 text-primary-500" />
                    {it.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-deep-600">{it.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {s.items.map((it, i) => (
                <li key={i} className="flex items-start gap-3 text-deep-700">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary-500" />
                  <span>
                    <WhyText item={it} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      );
  }
}

function Phones({ className }: { className?: string }) {
  return (
    <div className={className}>
      {PHONES.map((p) => (
        <a key={p.href} href={p.href} className="flex items-center gap-2 font-semibold text-deep-900 hover:text-primary-600">
          <Phone className="h-4 w-4 text-primary-600" />
          {p.label}
        </a>
      ))}
    </div>
  );
}

export function ServicePage({ content }: { content: ServiceContent }) {
  const idx = loanServices.findIndex((s) => s.slug === content.slug);
  const service = loanServices[idx];
  const prev = loanServices[(idx - 1 + loanServices.length) % loanServices.length];
  const next = loanServices[(idx + 1) % loanServices.length];
  const Icon = iconMap[service.icon];
  const applyHref = `/apply?loan=${content.slug}`;

  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="flex flex-col items-center gap-4 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Business Finance &amp; Solutions
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="max-w-3xl text-balance text-lg text-deep-200">{content.headline}</p>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex min-w-0 flex-col gap-8">
            {content.facts.length > 0 ? (
              <ul className="flex flex-wrap gap-2 lg:hidden" aria-label="Key facts">
                {content.facts.map((f) => (
                  <li key={f} className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-800">
                    {f}
                  </li>
                ))}
              </ul>
            ) : null}

            {content.sections.map((s, i) => (
              <SectionView key={i} s={s} />
            ))}

            <Reveal>
              <aside className="rounded-xl border border-deep-200 bg-deep-50/50 p-4 text-sm leading-relaxed text-deep-600">
                {TERMS_NOTE}
              </aside>
            </Reveal>

            <Reveal>
              <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-deep-900 p-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="mb-2 font-display text-xl font-bold text-white">
                    Talk to us about your {service.title}
                  </h2>
                  <div className="flex flex-col gap-1 text-deep-100 sm:flex-row sm:gap-5">
                    {PHONES.map((p) => (
                      <a key={p.href} href={p.href} className="font-semibold hover:text-primary-400">
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>
                <Button href={applyHref}>
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </Reveal>

            <nav aria-label="More services" className="grid gap-3 border-t border-deep-100 pt-6 sm:grid-cols-2">
              <Link
                href={`/services/${prev.slug}`}
                className="flex items-center gap-3 rounded-xl border border-deep-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <ArrowLeft className="h-5 w-5 shrink-0 text-primary-600" />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-widest text-deep-400">Previous</span>
                  <span className="font-display font-bold text-deep-900">{prev.title}</span>
                </span>
              </Link>
              <Link
                href={`/services/${next.slug}`}
                className="flex items-center justify-end gap-3 rounded-xl border border-deep-100 bg-white p-4 text-right shadow-sm transition-shadow hover:shadow-md"
              >
                <span>
                  <span className="block text-xs font-bold uppercase tracking-widest text-deep-400">Next</span>
                  <span className="font-display font-bold text-deep-900">{next.title}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary-600" />
              </Link>
            </nav>
            <Link href="/services" className="text-center text-sm font-semibold text-deep-600 hover:text-primary-600">
              &larr; Back to all finance &amp; solutions
            </Link>
          </div>

          {/* Desktop: sticky summary card */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-4 rounded-2xl border border-deep-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-deep-900 text-primary-400">
                  {Icon ? <Icon className="h-6 w-6" /> : null}
                </span>
                <span className="font-display text-lg font-bold text-deep-900">{service.title}</span>
              </div>
              {content.facts.length > 0 ? (
                <ul className="flex flex-col gap-2 border-t border-deep-100 pt-4" aria-label="Key facts">
                  {content.facts.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-semibold text-deep-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              ) : null}
              <Phones className="flex flex-col gap-2 border-t border-deep-100 pt-4 text-sm" />
              <Button href={applyHref} className="w-full">
                Apply Now
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {/* Mobile: sticky Call / Apply bar. It is the last block of the page
          content, so it pins to the viewport bottom while reading but never
          overlaps the footer. */}
      <div className="sticky bottom-[var(--consent-h,0px)] z-30 border-t border-deep-100 bg-white p-3 shadow-[0_-6px_16px_-8px_rgba(0,0,0,0.2)] lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href={PHONES[0].href}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-deep-900 font-semibold text-deep-900"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <Button href={applyHref} className="min-h-11 flex-1">
            Apply Now
          </Button>
        </div>
      </div>
    </>
  );
}
