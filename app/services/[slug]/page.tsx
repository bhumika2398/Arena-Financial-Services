import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data";

// "emi-calculator" is served by its own dedicated interactive page
// (app/services/emi-calculator/page.tsx), which Next.js resolves ahead of
// this dynamic route, so it is excluded from the static params here.
const detailServices = services.filter((s) => s.slug !== "emi-calculator");

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return detailServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = detailServices.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = detailServices.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="bg-deep-900 pb-10 pt-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary-400">
            Business Finance & Solutions
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="max-w-2xl text-balance text-lg text-deep-200">
            {service.description}
          </p>
        </Container>
      </section>

      <ServiceDetailSection service={service} bare />

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
