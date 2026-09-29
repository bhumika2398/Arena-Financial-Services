"use client";

import { Globe, Mail, MapPin, MessageCircle, Phone, Rss, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "Social" },
  { icon: Send, href: "#", label: "Messenger" },
  { icon: Rss, href: "#", label: "Updates" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder submit only — no backend wired up.
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-deep-950 text-deep-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(6,133,98,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(86,149,120,0.16),transparent_45%)] bg-[length:200%_200%] motion-safe:animate-drift"
      />
      {/* Soft light rays for a bit of extra depth behind the footer content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(105deg,rgba(205,243,227,0.5)_0px,rgba(205,243,227,0.5)_2px,transparent_2px,transparent_130px)] motion-safe:animate-ray-sweep"
      />
      <Container className="relative z-10 grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-xl bg-white/95 px-2.5 py-1.5 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Arena Financial Services"
              width={230}
              height={64}
              className="h-9 w-auto"
            />
          </span>
          <p className="text-sm text-deep-300">
            Trusted financial guidance for loans, insurance and investments —
            personal, transparent, and built around your goals.
          </p>
          <div className="flex gap-3 pt-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-800 text-deep-200 transition-all duration-300 hover:bg-sage-500 hover:text-deep-900 hover:shadow-[0_0_16px_rgba(86,149,120,0.6)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-base font-bold text-white">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-deep-300 hover:text-primary-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-base font-bold text-white">
            Services
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-deep-300 hover:text-primary-400"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-base font-bold text-white">Stay Updated</h3>
          <p className="text-sm text-deep-300">
            Subscribe for financial tips and product updates.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-deep-700 bg-deep-900 px-4 py-2 text-sm text-white placeholder:text-deep-400 focus:border-primary-500 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-deep-900 hover:bg-primary-400"
            >
              Join
            </button>
          </form>
          {submitted ? (
            <p className="text-sm text-primary-400">Thanks for subscribing!</p>
          ) : null}

          <div className="flex flex-col gap-2 pt-2 text-sm text-deep-300">
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
              #103,104 Ground Floor, Oxford Chambers, Rustam Bhag, Bengaluru
              560017
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary-500" />
              <a href="tel:+919972908696" className="hover:text-primary-400">
                +91 9972908696
              </a>
              {" / "}
              <a href="tel:+919972718696" className="hover:text-primary-400">
                +91 9972718696
              </a>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary-500" />
              <a
                href="mailto:vinod@tiwarifinserv.com"
                className="hover:text-primary-400"
              >
                vinod@tiwarifinserv.com
              </a>
            </span>
          </div>
        </div>
      </Container>

      <div className="border-t border-deep-800 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-deep-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Arena Financial Services. All rights reserved.</span>
          <span>Placeholder content for demonstration purposes only.</span>
        </Container>
      </div>
    </footer>
  );
}
