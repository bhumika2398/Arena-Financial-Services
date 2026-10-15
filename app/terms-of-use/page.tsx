import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for the Arena Financial Services platform: use of the site, intellectual property, liability, cookies and grievance redressal.",
};

export default function Page() {
  return <LegalDocument doc={loadLegal("terms-of-use")} other={{ href: "/privacy-policy", label: "Privacy Policy" }} />;
}
