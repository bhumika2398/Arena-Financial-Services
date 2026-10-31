import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { Preloader } from "@/components/preloader/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#0B2447",
};

const description =
  "Arena Financial Services helps MSMEs and growing businesses find the right loan from 35+ banks and NBFCs, with clear advice and one point of contact from application to disbursal.";
const ogImage = `${SITE.url}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Arena Financial Services | Business Loans for MSMEs",
    template: "%s | Arena Financial Services",
  },
  description,
  openGraph: {
    title: "Arena Financial Services",
    description,
    siteName: "Arena Financial Services",
    type: "website",
    url: SITE.url,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Arena Financial Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena Financial Services",
    description,
    images: [ogImage],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/images/logo.png`,
  foundingDate: String(SITE.founded),
  email: SITE.email,
  telephone: SITE.phones.map((p) => p.e164),
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Preloader />
        <ScrollToHash />
        <ScrollProgress />
        <ConsentBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
