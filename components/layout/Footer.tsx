"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { businessServices } from "@/lib/data";
import { SITE } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/services/emi-calculator", label: "EMI Calculator" },
];

const link = "text-deep-200 transition-colors hover:text-white";
const heading = "mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-300";

export function Footer() {
  return (
    <footer className="bg-deep-950 text-deep-100">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1.2fr_1.3fr]">
        <div className="flex flex-col items-start gap-4">
          {/* The logo in its own colours, on a white plate (not the reversed version) */}
          <Link href="/" aria-label="Arena Financial Services, home" className="rounded-[10px] bg-white p-3">
            <Image
              src="/images/logo.png"
              alt="Arena Financial Services"
              width={1100}
              height={226}
              className="h-9 w-auto"
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-deep-200">
            Business finance made simple: clear advice, the right lender, one point of contact.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h3 className={heading}>Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h3 className={heading}>Services</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {businessServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={link}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={heading}>Contact</h3>
          <ul className="flex flex-col gap-3.5 text-sm text-deep-200">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
              Oxford Chambers, Rustum Bagh, Old Airport Road, Bengaluru 560017
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
              <span className="flex flex-col">
                <a href={SITE.phones[0].href} className="hover:text-white">
                  {SITE.phones[0].label}
                </a>
                <a href={SITE.phones[1].href} className="hover:text-white">
                  {SITE.phones[1].label}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary-300" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-primary-300" />
              {SITE.hours}
            </li>
          </ul>
        </div>
      </Container>

      {/* Bottom bar: legal links on one line, then copyright and credits */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm text-deep-300">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-semibold text-deep-100">
            <li>
              <Link href="/terms-of-use" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("arena:consent-open"))}
                className="font-semibold hover:text-white"
              >
                Cookie settings
              </button>
            </li>
          </ul>
          <div className="flex flex-col gap-1.5 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Arena Financial Services. All rights reserved.</p>
            <p>{SITE.partnerNote}</p>
            <p>
              Designed &amp; Developed by{" "}
              <a
                href="https://www.naazailabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline-offset-2 hover:underline"
              >
                Naaz AI Labs
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
