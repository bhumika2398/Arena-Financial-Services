"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { Block, LegalDoc, ListItem } from "@/lib/legal";
import { cn } from "@/lib/utils";

const EMAIL_RE = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

function linkify(text: string): ReactNode {
  return text.split(EMAIL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={`mailto:${part}`}
        className="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-600"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const LIST_STYLE = {
  alpha: "lower-alpha",
  roman: "lower-roman",
  bullet: "disc",
  number: "decimal",
} as const;

function List({
  style,
  items,
  nested,
}: {
  style: keyof typeof LIST_STYLE;
  items: ListItem[];
  nested?: boolean;
}) {
  const Tag = style === "bullet" ? "ul" : "ol";
  return (
    <Tag
      style={{ listStyleType: nested ? "circle" : LIST_STYLE[style] }}
      className={cn("flex flex-col gap-2 pl-6 marker:text-deep-400", nested && "mt-2")}
    >
      {items.map((it, i) => (
        <li key={i} className="pl-1">
          {linkify(it.text)}
          {it.children ? <List style="bullet" items={it.children} nested /> : null}
        </li>
      ))}
    </Tag>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.k) {
    case "clause":
      return (
        <p className="grid grid-cols-[3rem_1fr] gap-x-2 sm:grid-cols-[3.5rem_1fr]">
          <span className="font-display text-sm font-semibold tabular-nums text-primary-700">
            {b.num}
          </span>
          <span>{linkify(b.text)}</span>
        </p>
      );
    case "p":
      return <p>{linkify(b.text)}</p>;
    case "sub":
      return (
        <h3 className="mt-2 font-display text-lg font-bold text-deep-900">{b.text}</h3>
      );
    case "list":
      return (
        <div className={b.style === "alpha" || b.style === "roman" ? "sm:ml-[3.5rem]" : undefined}>
          <List style={b.style} items={b.items} />
        </div>
      );
    case "kv":
      return (
        <div className="flex flex-col gap-1 rounded-lg border border-deep-100 bg-mint/60 p-4 text-[0.95rem]">
          {b.lines.map((l, i) => (
            <p key={i}>{linkify(l)}</p>
          ))}
        </div>
      );
    case "table":
      return (
        <div
          className="overflow-x-auto rounded-lg border border-deep-100"
          tabIndex={0}
          role="region"
          aria-label="Cookies table"
        >
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead className="bg-deep-50 text-deep-900">
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2.5 font-display font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-deep-100 align-top">
                  {r.map((c, j) => (
                    <td key={j} className={cn("px-4 py-2.5", j === 0 && "font-medium text-deep-900")}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function LegalDocument({
  doc,
  other,
}: {
  doc: LegalDoc;
  other: { href: string; label: string };
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(doc.sections[0]?.id ?? "");
  const [tocOpen, setTocOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const els = doc.sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [doc.sections]);

  const jump = (id: string) => {
    setTocOpen(false);
    setActive(id);
  };

  const toc = (
    <ol className="flex flex-col gap-0.5 text-sm">
      {doc.sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={() => jump(s.id)}
            aria-current={active === s.id ? "true" : undefined}
            className={cn(
              "flex gap-2 rounded-md border-l-2 px-3 py-1.5 transition-colors",
              active === s.id
                ? "border-primary-500 bg-primary-50 font-semibold text-primary-800"
                : "border-transparent text-deep-500 hover:bg-deep-50 hover:text-deep-900",
            )}
          >
            <span className="w-6 shrink-0 tabular-nums">{s.num}.</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24 print:bg-white print:pb-4 print:pt-0">
        <Container className="flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400 print:text-deep-700">
            Legal
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl print:text-black">
            {doc.title}
          </h1>
          {doc.lastUpdated ? (
            <p className="text-sm text-deep-200 print:text-deep-700">
              Last updated: {doc.lastUpdated}
            </p>
          ) : null}
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container className="grid gap-8 lg:grid-cols-[16rem_minmax(0,46rem)] lg:justify-center lg:gap-12">
          {/* Mobile: collapsible table of contents */}
          <div className="lg:hidden print:hidden">
            <button
              type="button"
              onClick={() => setTocOpen((v) => !v)}
              aria-expanded={tocOpen}
              className="flex min-h-11 w-full items-center justify-between rounded-xl border border-deep-200 bg-white px-4 py-2.5 text-left font-semibold text-deep-900 shadow-sm"
            >
              Jump to section
              <ChevronDown
                className={cn("h-5 w-5 text-primary-600 transition-transform", tocOpen && "rotate-180")}
              />
            </button>
            {tocOpen ? (
              <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-deep-100 bg-white p-2">
                {toc}
              </div>
            ) : null}
          </div>

          {/* Desktop: sticky table of contents */}
          <aside className="hidden lg:block print:hidden">
            <nav
              aria-label="Table of contents"
              className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2"
            >
              <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-deep-400">
                Contents
              </p>
              {toc}
            </nav>
          </aside>

          <motion.article
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-w-0 text-[0.975rem] leading-7 text-deep-600"
          >
            {doc.sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t border-deep-100 py-6 first:border-t-0 first:pt-0"
              >
                <h2 className="mb-3 flex gap-3 font-display text-xl font-bold text-deep-900 sm:text-2xl">
                  <span className="text-primary-600">{s.num}.</span>
                  {s.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {s.blocks.map((b, i) => (
                    <BlockView key={i} b={b} />
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-deep-100 bg-mint/60 p-4 print:hidden">
              <span className="font-semibold text-deep-900">Also read:</span>
              <Link
                href={other.href}
                className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-600"
              >
                {other.label}
              </Link>
            </div>
          </motion.article>
        </Container>
      </section>

      <button
        type="button"
        aria-label="Back to top"
        style={{ bottom: "calc(1.25rem + var(--consent-h, 0px))" }}
        onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
        className={cn(
          "fixed right-5 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-deep-900 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-deep-800 print:hidden",
          showTop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
