import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TransparencySection } from "@/components/about/TransparencySection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PHONES } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Arena Financial Services: founded in 2008, our approach to transparency, and how the team has grown.",
};

// Dates come only from the founders' bios on the Team page.
const journey = [
  { year: "2008", text: "Arena Financial Services founded by Vinod Kumar Tiwari." },
  { year: "2011", text: "Pramod Kumar Tiwari joins." },
  { year: "2016", text: "Sanjay Tiwari joins." },
  { year: "2019", text: "Ghata Shah joins, for the Secured vertical." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="max-w-5xl">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">About</span>
          <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built on Trust, Driven by Your Financial Success
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-deep-200">
            Founded in 2008, Arena Financial Services helps you find the right bank or NBFC for your financing.
          </p>
        </Container>
      </section>

      <TransparencySection />

      <section className="border-t border-deep-100 bg-white py-8 sm:py-10">
        <Container className="max-w-5xl">
          <h2 className="mb-6 font-display text-3xl font-bold text-deep-900">Our journey</h2>
          <ol className="ml-2 border-l-2 border-deep-200">
            {journey.map((j) => (
              <li key={j.year} className="relative flex flex-col gap-0.5 pb-6 pl-6 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6">
                <span aria-hidden className="absolute -left-[0.4rem] top-2 h-3 w-3 rounded-full border-2 border-primary-500 bg-white sm:top-3" />
                <span className="w-16 shrink-0 font-display text-2xl font-bold tabular-nums text-primary-600">{j.year}</span>
                <span className="text-deep-700">{j.text}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-deep-100 bg-mint py-8">
        <Container className="flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="font-display text-2xl font-bold text-deep-900">Meet the people behind Arena</h2>
          <Link
            href="/team"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-deep-900 px-5 font-semibold text-deep-900 transition-colors hover:bg-deep-900 hover:text-white"
          >
            Our Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container className="max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-deep-900 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-2 font-display text-xl font-bold text-white">Talk to us about your financing</h2>
              <div className="flex flex-col gap-1 text-deep-100 sm:flex-row sm:gap-5">
                {PHONES.map((p) => (
                  <a key={p.href} href={p.href} className="font-semibold hover:text-primary-400">
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
            <Button href="/apply">
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
