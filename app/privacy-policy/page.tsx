import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Arena Financial Services collects, uses, shares and protects your personal data, and the rights you have over it.",
};

export default function Page() {
  return <LegalDocument doc={loadLegal("privacy-policy")} other={{ href: "/terms-of-use", label: "Terms of Use" }} />;
}
