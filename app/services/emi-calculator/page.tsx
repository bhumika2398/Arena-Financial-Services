import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorPulse } from "@/components/animations/CalculatorPulse";
import { EmiCalculator } from "@/components/services/EmiCalculator";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description:
    "Calculate your monthly EMI, total interest, and total repayment for personal, home, business, or SME loans with Arena Financial Services.",
};

export default function EmiCalculatorPage() {
  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            EMI Calculator
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Plan Your Loan Before You Apply
          </h1>
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            Adjust the loan amount, interest rate, and tenure to instantly see
            your estimated monthly EMI and total repayment.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-10">
        <CalculatorPulse />
        <Container className="relative z-10 mx-auto max-w-4xl">
          <EmiCalculator />
        </Container>
      </section>

      <section className="bg-mint py-10">
        <Container className="text-center">
          <Link
            href="/services"
            className="text-sm font-semibold text-deep-600 hover:text-primary-600"
          >
            &larr; Back to all finance & solutions
          </Link>
        </Container>
      </section>
    </>
  );
}
