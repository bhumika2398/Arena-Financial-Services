import type { Metadata } from "next";
import { FormAmbientGlow } from "@/components/animations/FormAmbientGlow";
import { LoanApplicationForm } from "@/components/forms/LoanApplicationForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Apply for a business, personal, home, or property loan with Arena Financial Services. Zero hassle, zero fee, 30+ banking partners.",
};

export default function ApplyPage() {
  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Apply Now
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get Matched With the Right Lender, Fast
          </h1>
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            Share a few details and one of our advisors will get back to you
            with the best-fit loan options — zero hassle, zero fee.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-mint py-10">
        <FormAmbientGlow />
        <Container className="relative z-10">
          <LoanApplicationForm />
        </Container>
      </section>
    </>
  );
}
