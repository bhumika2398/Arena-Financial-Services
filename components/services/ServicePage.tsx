"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data";
import { DOCUMENTS_NOTE, STANDARD_NOTE, type ServiceContent } from "@/lib/service-content";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** One framed card with a numbered label, used for all four parts. */
function Block({
  n,
  title,
  children,
  className,
  i,
}: {
  n: string;
  title: string;
  children: ReactNode;
  className?: string;
  i: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : i * 0.06 }}
      className={cn("flex flex-col rounded-[18px] border border-deep-900/80 bg-white p-6 sm:p-7", className)}
    >
      <div className="mb-4 flex items-center gap-3 border-b border-deep-100 pb-3">
        <span className="font-display text-sm font-bold tabular-nums text-primary-600">{n}</span>
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-deep-900">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

export function ServicePage({ content }: { content: ServiceContent }) {
  const service = services.find((s) => s.slug === content.slug)!;
  const applyHref = `/contact?service=${content.slug}#enquiry`;
  const secondary = service.group === "also";

  return (
    <>
      <section className="relative overflow-hidden bg-deep-950 pb-12 pt-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(50%_80%_at_85%_0%,rgba(29,78,216,0.4),transparent_70%)]"
        />
        <Container className="relative max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-deep-200">
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-white">{service.title}</span>
          </nav>
          {secondary ? (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-300">Also available</p>
          ) : null}
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-deep-100">{service.description}</p>
        </Container>
      </section>

      <section className="bg-mint py-10 sm:py-14">
        <Container className="grid max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="flex min-w-0 flex-col gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Block n="01" title="What it is" i={0}>
                <p className="leading-relaxed text-deep-700">{content.what}</p>
              </Block>
              <Block n="02" title="Who it suits" i={1}>
                <p className="leading-relaxed text-deep-700">{content.suits}</p>
              </Block>
            </div>

            <Block n="03" title="Key features" i={2}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-[12px] border border-deep-100 bg-mint p-4 text-deep-800">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block n="04" title="Documents needed" i={3}>
              <ul className="flex flex-wrap gap-2">
                {content.documents.map((d) => (
                  <li key={d} className="rounded-full border border-deep-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-deep-800">
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-deep-600">{DOCUMENTS_NOTE}</p>
            </Block>

            <p className="rounded-[12px] border border-deep-200 bg-white px-5 py-4 text-sm text-deep-600">{STANDARD_NOTE}</p>
          </div>

          {/* Desktop: sticky summary */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-4 rounded-[18px] border border-deep-900/80 bg-white p-6">
              <p className="font-display text-lg font-bold leading-snug text-deep-900">{service.title}</p>
              <div className="flex flex-col gap-2.5 border-t border-deep-100 pt-4 text-sm">
                {SITE.phones.map((p) => (
                  <a key={p.href} href={p.href} className="flex items-center gap-2 font-semibold text-deep-900 hover:text-primary-700">
                    <Phone className="h-4 w-4 text-primary-600" />
                    {p.label}
                  </a>
                ))}
              </div>
              <Button href={applyHref} className="w-full">
                Apply Now
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {/* Mobile: sticky Apply / Call bar. It is the last block of the page
          content, so it pins to the viewport bottom while reading but never
          overlaps the footer; --consent-h lifts it above the consent banner. */}
      <div className="sticky bottom-[var(--consent-h,0px)] z-30 border-t border-deep-100 bg-white p-3 shadow-sm lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href={SITE.phones[0].href}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[8px] border-2 border-deep-900 font-semibold text-deep-900"
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
