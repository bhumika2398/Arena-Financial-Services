import type { Metadata } from "next";
import Link from "next/link";
import { EmiCalculator } from "@/components/services/EmiCalculator";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description:
    "Calculate your monthly EMI, total interest, and total repayment for any loan amount, interest rate and tenure with Arena Financial Services.",
};

export default function EmiCalculatorPage() {
  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="max-w-6xl">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-300">
            EMI Calculator
          </span>
          <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Plan Your Repayment Before You Borrow
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-deep-200">
            Adjust the loan amount, interest rate, and tenure to instantly see
            your estimated monthly EMI and total repayment.
          </p>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container className="max-w-4xl">
          <EmiCalculator />
        </Container>
      </section>

      <section className="bg-mint py-10">
        <Container className="max-w-4xl">
          <Link
            href="/services"
            className="text-sm font-semibold text-deep-600 hover:text-primary-600"
          >
            &larr; Back to all services
          </Link>
        </Container>
      </section>
    </>
  );
}
