import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Arena Financial Services' privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Legal
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
        </Container>
      </section>

      <section className="bg-white py-10">
        <Container className="mx-auto max-w-3xl">
          <p className="text-deep-600">
            This is placeholder content. Arena Financial Services&apos; full
            privacy policy, describing how we collect, use, and protect your
            personal information, will be published here.
          </p>
        </Container>
      </section>
    </>
  );
}
