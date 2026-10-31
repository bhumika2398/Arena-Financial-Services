import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  agentRules: false,
  async redirects() {
    // Pages removed in the 28 Oct 2026 content revision (permanent, 308).
    const moved = [
      ["/team", "/about#leadership"],
      ["/why-arena", "/#why-arena"],
      ["/apply", "/contact#enquiry"],
      ["/faq", "/#faq"],
      ["/testimonials", "/"],
      ["/services/sme-loan", "/services/business-loan"],
      ["/services/overdraft", "/services/working-capital"],
      ["/services/term-loan", "/services/term-loan-machinery-finance"],
    ] as const;
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
