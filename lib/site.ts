/** Single source of truth for business details and feature flags. */

export const SITE = {
  name: "Arena Financial Services",
  // Set NEXT_PUBLIC_SITE_URL in Vercel. The fallback is an assumption based on the email domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.arenafinance.in").replace(/\/$/, ""),
  founded: 2021,
  email: "ceo@arenafinance.in",
  phones: [
    { label: "+91 99727 18696", href: "tel:+919972718696", e164: "+919972718696" },
    { label: "+91 98860 60438", href: "tel:+919886060438", e164: "+919886060438" },
  ],
  address: {
    full: "#103-104, Ground Floor, Oxford Chambers, Rustum Bagh, Old Airport Road, Kodihalli, Bengaluru 560017",
    street: "#103-104, Ground Floor, Oxford Chambers, Rustum Bagh, Old Airport Road, Kodihalli",
    locality: "Bengaluru",
    postalCode: "560017",
    region: "Karnataka",
    country: "IN",
  },
  hours: "Mon-Sat, 10 AM - 7 PM",
  hoursLong: "Monday to Saturday, 10:00 AM to 7:00 PM",
  partnerNote: "In association with Tiwari Financial Services, our Business Partner.",
} as const;

/** Flip to true once real, approved client reviews are added in lib/data.ts. */
export const SHOW_TESTIMONIALS = false;
