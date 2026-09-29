import type { Metadata } from "next";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { Container } from "@/components/ui/Container";
import { SectionVideoBackground } from "@/components/video/SectionVideoBackground";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Arena Financial Services' full range of financial products — personal, business, home, and SME loans, loan against property, overdraft, term loans, and more.",
};

// EMI Calculator is an interactive tool with its own dedicated page/route,
// so it's shown as a CTA banner here rather than a generic detail section.
const loanServices = services.filter((s) => s.slug !== "emi-calculator");

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-14 pt-28">
        <SectionVideoBackground src="/videos/finance_video_4.mp4" />
        <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Our Services
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Financial Products for Every Stage of Life
          </h1>
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            Jump to any product below for full details, eligibility, and how
            our advisors can help.
          </p>
        </Container>
      </section>

      {loanServices.map((service, i) => (
        <ServiceDetailSection
          key={service.slug}
          service={service}
          reverse={i % 2 !== 0}
        />
      ))}

      <section className="bg-deep-900 py-12">
        <Container className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
            <Calculator className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Not Sure What You Can Afford?
          </h2>
          <p className="max-w-xl text-balance text-deep-200">
            Use our EMI Calculator to estimate your monthly repayment before
            you apply.
          </p>
          <Link
            href="/services/emi-calculator"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-deep-900 transition-colors hover:bg-primary-400"
          >
            Try the EMI Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}
