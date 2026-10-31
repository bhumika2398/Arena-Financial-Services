import type { Metadata } from "next";
import { ServiceTiles } from "@/components/services/ServiceTiles";
import { Container } from "@/components/ui/Container";
import { VideoBackground } from "@/components/video/VideoBackground";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business loans, working capital, short term finance, loan against property, term loans, project funding, CGTMSE loans, invoice discounting and bank guarantees, arranged through Arena Financial Services.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-900 pb-10 pt-24">
        <VideoBackground src="/videos/finance_video_1.mp4" poster="/videos/posters/finance_video_1.jpg" overlay={0.74} />
        <Container className="relative max-w-6xl">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-300">Services</span>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Finance for your business
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-deep-100">
            Pick a service for what it is, who it suits, its key features and the documents needed.
          </p>
        </Container>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <Container className="max-w-6xl">
          <ServiceTiles />
        </Container>
      </section>
    </>
  );
}
