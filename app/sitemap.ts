import type { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/about",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/services/emi-calculator",
    "/contact",
    "/terms-of-use",
    "/privacy-policy",
  ];
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contact" || path === "/services" ? 0.8 : 0.6,
  }));
}
