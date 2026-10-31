"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { alsoAvailable, businessServices, emiTool } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

type MenuItem = { href: string; label: string };
const serviceMenu: { heading?: string; items: MenuItem[] }[] = [
  { items: businessServices.map((s) => ({ href: `/services/${s.slug}`, label: s.title })) },
  { items: [{ href: `/services/${emiTool.slug}`, label: emiTool.title }] },
  { heading: "Also available", items: alsoAvailable.map((s) => ({ href: `/services/${s.slug}`, label: s.title })) },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  function openMenu() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServicesOpen(true);
  }
  function scheduleClose() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  }

  // Close the mobile drawer whenever the page changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const linkColour = (href: string) =>
    isActive(href) ? (scrolled ? "text-primary-600" : "text-primary-300") : scrolled ? "text-deep-700" : "text-white/90";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-deep-100 bg-white/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Arena Financial Services, home">
          <Image
            src={scrolled ? "/images/logo.png" : "/images/logo-light.png"}
            alt="Arena Financial Services"
            width={1100}
            height={226}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) =>
            link.href === "/services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
                onFocus={openMenu}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setServicesOpen(false);
                }}
              >
                <Link
                  href={link.href}
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  className={cn(
                    "flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary-600",
                    linkColour(link.href),
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
                </Link>

                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 rounded-[10px] border border-deep-100 bg-white/90 p-2 shadow-sm backdrop-blur-md"
                    >
                      {serviceMenu.map((group, gi) => (
                        <div key={gi} className={cn(gi > 0 && "mt-1 border-t border-deep-100 pt-1")}>
                          {group.heading ? (
                            <p className="px-3 pb-1 pt-1.5 text-[11px] font-bold uppercase tracking-widest text-deep-400">
                              {group.heading}
                            </p>
                          ) : null}
                          <ul role="menu">
                            {group.items.map((item) => (
                              <li key={item.href} role="none">
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  onClick={() => setServicesOpen(false)}
                                  className={cn(
                                    "block rounded-[6px] px-3 py-2 text-sm font-semibold transition-colors hover:bg-deep-50 hover:text-primary-600",
                                    pathname === item.href ? "text-primary-600" : "text-deep-700",
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary-600 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                  isActive(link.href) && "after:scale-x-100",
                  linkColour(link.href),
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact#enquiry" size="sm">
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className={cn("-mr-2 p-2 md:hidden", scrolled ? "text-deep-900" : "text-white")}
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
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-6 overflow-y-auto border-l border-deep-100 bg-white p-6 shadow-sm md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-deep-900">Menu</span>
                <button type="button" aria-label="Close menu" className="-m-2 p-2" onClick={() => setOpen(false)}>
                  <X className="h-6 w-6 text-deep-900" />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) =>
                  link.href === "/services" ? (
                    <div key={link.href} className="flex flex-col">
                      <div className="flex min-h-11 items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn("text-base font-semibold", isActive(link.href) ? "text-primary-600" : "text-deep-700")}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          aria-label="Toggle Services menu"
                          aria-expanded={mobileServicesOpen}
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className="flex h-11 w-11 items-center justify-center text-deep-700"
                        >
                          <ChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobileServicesOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            {serviceMenu.map((group, gi) => (
                              <div key={gi} className="pb-2">
                                {group.heading ? (
                                  <p className="pb-1 pt-2 text-[11px] font-bold uppercase tracking-widest text-deep-400">
                                    {group.heading}
                                  </p>
                                ) : null}
                                <ul className="flex flex-col">
                                  {group.items.map((item) => (
                                    <li key={item.href}>
                                      <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                          "flex min-h-10 items-center text-sm font-semibold",
                                          pathname === item.href ? "text-primary-600" : "text-deep-600",
                                        )}
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex min-h-11 items-center text-base font-semibold",
                        isActive(link.href) ? "text-primary-600" : "text-deep-700",
                      )}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
              <Button href="/contact#enquiry" className="mt-auto w-full" onClick={() => setOpen(false)}>
                Apply Now
              </Button>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
