"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data";
import { scrollToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // The actual bug: a plain <Link href="/#section"> click, while already on
  // "/", is treated by the App Router as a hash-only change to the CURRENT
  // route — it doesn't scroll to the target element itself, and Link's
  // default scroll-restoration behavior can instead reset scroll to the
  // top of the page (which read as "redirecting back to the homepage").
  // So for any in-page "/#id" link we intercept the click ourselves: if
  // already on "/", scroll directly via scrollIntoView; otherwise let the
  // Link navigate normally to "/#id" and let ScrollToHash (mounted on the
  // Home page) handle the scroll once that page has actually loaded.
  function handleSectionLinkClick(e: React.MouseEvent, href: string) {
    console.log(
      "[NavClick]",
      href,
      "current pathname:",
      pathname,
      "scrollY before:",
      window.scrollY,
    );
    if (!href.startsWith("/#")) {
      console.log("[NavClick] not a hash link, ignoring:", href);
      return;
    }
    if (pathname !== "/") {
      console.log("[NavClick] not on Home yet — letting Link navigate normally to", href);
      return;
    }
    e.preventDefault();
    console.log("[NavClick] preventDefault() called, invoking scrollToSection for id:", href.slice(2));
    scrollToSection(href.slice(2), Boolean(prefersReducedMotion));
    // Log again shortly after to see if something ELSE moved scrollY back.
    setTimeout(() => {
      console.log("[NavClick] scrollY 400ms after scrollToSection call:", window.scrollY);
    }, 400);
  }

  function openServicesMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServicesOpen(true);
  }

  function scheduleCloseServicesMenu() {
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/20 bg-white/80 shadow-md backdrop-blur-sm sm:backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center rounded-xl bg-white/95 px-2.5 py-1.5 shadow-sm">
          <Image
            src="/images/logo.png"
            alt="Arena Financial Services"
            width={230}
            height={64}
            priority
            className="h-8 w-auto sm:h-9 md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.href === "/services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={openServicesMenu}
                onMouseLeave={scheduleCloseServicesMenu}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary-600",
                    pathname.startsWith("/services")
                      ? "text-primary-600"
                      : scrolled
                        ? "text-deep-700"
                        : "text-white/90",
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-white/40 bg-white/80 p-3 shadow-xl backdrop-blur-md"
                    >
                      <ul className="grid grid-cols-1 gap-1">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-widest text-deep-700 transition-colors hover:bg-deep-50 hover:text-primary-600"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleSectionLinkClick(e, link.href)}
                // For hash links, Next's own default scroll-to-top-on-navigate
                // behavior would otherwise race against our own scrollIntoView
                // in ScrollToHash — disabling it here removes that race
                // entirely rather than hoping our timing wins.
                scroll={!link.href.startsWith("/#")}
                className={cn(
                  "text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary-600",
                  pathname === link.href
                    ? "text-primary-600"
                    : scrolled
                      ? "text-deep-700"
                      : "text-white/90",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" size="sm">
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className={cn(
            "md:hidden",
            scrolled ? "text-deep-900" : "text-white",
          )}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-7 w-7" />
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-deep-950/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-8 border-l border-white/30 bg-white/85 p-8 shadow-2xl backdrop-blur-sm sm:backdrop-blur-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-deep-900">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6 text-deep-900" />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) =>
                  link.href === "/services" ? (
                    <div key={link.href} className="flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="flex items-center justify-between text-base font-semibold text-deep-700 hover:text-primary-600"
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            mobileServicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileServicesOpen ? (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-3 overflow-hidden pl-4"
                          >
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="text-sm font-bold uppercase tracking-widest text-deep-500 hover:text-primary-600"
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        setOpen(false);
                        handleSectionLinkClick(e, link.href);
                      }}
                      scroll={!link.href.startsWith("/#")}
                      className="text-base font-semibold text-deep-700 hover:text-primary-600"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
              <Button href="/contact" className="mt-auto w-full">
                Apply Now
              </Button>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
