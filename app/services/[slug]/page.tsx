import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/ServicePage";
import { contentBySlug, serviceContent } from "@/lib/service-content";

// "emi-calculator" is served by its own dedicated interactive page
// (app/services/emi-calculator/page.tsx), which Next.js resolves ahead of
// this dynamic route.
interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceContent.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = contentBySlug[slug];
  if (!content) return { title: "Service Not Found" };
  return { title: content.metaTitle, description: content.metaDescription };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const content = contentBySlug[slug];
  if (!content) notFound();
  return <ServicePage content={content} />;
}
