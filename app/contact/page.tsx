import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Share your funding requirement and an Arena Financial Services advisor will call you back within one working day.",
};

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.address.full)}&z=15&output=embed`;

export default function ContactPage() {
  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="max-w-6xl">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-300">Contact</span>
          <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let&apos;s talk about your funding needs
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-deep-100">
            Share your requirement and an Arena advisor will call you back within one working day.
          </p>
        </Container>
      </section>

      <section className="bg-mint py-8 sm:py-10">
        <Container className="max-w-6xl">
          <Suspense fallback={null}>
            <EnquiryForm />
          </Suspense>
        </Container>
      </section>

      <section className="bg-white py-8">
        <Container className="max-w-6xl">
          <div className="overflow-hidden rounded-[10px] border border-deep-100">
            <iframe
              title="Arena Financial Services office on Google Maps"
              src={mapSrc}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-deep-100 bg-mint py-8">
        <Container className="max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-deep-900">Our Business Partner</h2>
          <p className="mt-2 max-w-[65ch] text-deep-600">
            Arena Financial Services works in association with Tiwari Financial Services, Bengaluru, which acts
            as our business partner.
          </p>
        </Container>
      </section>
    </>
  );
}
