import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Calculator } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { emiTool, loanServices } from "@/lib/data";
import { iconMap } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Business Finance & Solutions",
  description:
    "Explore Arena Financial Services' range of finance: personal, business, home and SME loans, loan against property, overdraft, term loans, short term finance and project funding.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="max-w-5xl">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Business Finance &amp; Solutions
          </span>
          <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Financial Products for Every Stage of Life
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-deep-200">
            Pick a product for full details, eligibility and how we help.
          </p>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container className="max-w-5xl">
          <ul className="divide-y divide-deep-100 border-y border-deep-100">
            {loanServices.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 transition-colors hover:bg-mint/60 sm:gap-6 sm:px-3"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-deep-900 text-primary-400">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold text-deep-900">{s.title}</span>
                      <span className="block text-sm text-deep-500">{s.description}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-deep-300 transition-all group-hover:translate-x-0.5 group-hover:text-primary-600" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={`/services/${emiTool.slug}`}
            className="mt-6 flex flex-col items-start gap-3 rounded-xl border border-primary-200 bg-primary-50/60 p-4 transition-colors hover:bg-primary-50 sm:flex-row sm:items-center"
          >
            <Calculator className="h-6 w-6 shrink-0 text-primary-700" />
            <span className="flex-1">
              <span className="block font-display font-bold text-deep-900">{emiTool.title}</span>
              <span className="block text-sm text-deep-600">Estimate your monthly repayment before you apply.</span>
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
              Open calculator
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </Container>
      </section>
    </>
  );
}
