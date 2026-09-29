import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { FormAmbientGlow } from "@/components/animations/FormAmbientGlow";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { LoanApplicationForm } from "@/components/forms/LoanApplicationForm";
import { Container } from "@/components/ui/Container";
import { SectionVideoBackground } from "@/components/video/SectionVideoBackground";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Arena Finserv team for loans, insurance, or investment advisory. Reach us by phone, email, or the contact form.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-14 pt-28">
        <SectionVideoBackground src="/videos/finance_video_2.mp4" />
        <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Get in Touch
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            We&apos;re Here to Help
          </h1>
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            Reach out to our team for a free consultation on loans, insurance,
            or investment planning.
          </p>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-mint py-16">
        <FormAmbientGlow />
        <Container className="relative z-10">
          <LoanApplicationForm />
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container className="flex flex-col gap-6">
          <div className="flex items-start gap-4 rounded-2xl bg-mint p-5 shadow-sm">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary-500" />
            <div>
              <p className="font-display font-bold text-deep-900">Office Address</p>
              <p className="text-sm text-deep-500">
                #103,104 Ground Floor, Oxford Chambers, Rustam Bhag, Bengaluru
                560017
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <iframe
              title="Office location map"
              src="https://maps.google.com/maps?q=Oxford+Chambers,+Rustam+Bhag,+Bengaluru+560017&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <PartnerMarquee />
    </>
  );
}
