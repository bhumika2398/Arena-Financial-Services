import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Arena Financial Services' terms of use.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <section className="bg-deep-900 pb-14 pt-28">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Legal
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Terms of Use
          </h1>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container className="mx-auto max-w-3xl">
          <p className="text-deep-600">
            This is placeholder content. Arena Financial Services&apos; full
            terms of use, covering the borrower consent and conditions of
            using this website and our services, will be published here.
          </p>
        </Container>
      </section>
    </>
  );
}
