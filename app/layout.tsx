import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/preloader/Preloader";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tiwarifinserv.com"),
  title: {
    default: "Arena Financial Services | Loans, Insurance & Investment Advisory",
    template: "%s | Arena Financial Services",
  },
  description:
    "Arena Financial Services helps individuals and businesses secure loans, insurance and investment plans through a trusted network of 25+ banking partners.",
  openGraph: {
    title: "Arena Financial Services",
    description:
      "Loans, insurance and investment advisory you can trust — personal, transparent, and fast.",
    siteName: "Arena Financial Services",
    type: "website",
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
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
