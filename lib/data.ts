import type { FaqItem, Person, ProcessStep, Service, Testimonial } from "@/types";

export const services: Service[] = [
  {
    slug: "business-loan",
    title: "Business Loan (Unsecured)",
    description: "Collateral-free funding for 1 to 5 years.",
    group: "business",
  },
  {
    slug: "working-capital",
    title: "Working Capital (OD / CC)",
    description: "Flexible limits to manage day-to-day cash flow.",
    group: "business",
  },
  {
    slug: "short-term-finance",
    title: "Short Term Finance",
    description: "Quick, short-duration funding to bridge working capital gaps.",
    group: "business",
  },
  {
    slug: "loan-against-property",
    title: "Loan Against Property",
    description: "Secured funding against residential or commercial property.",
    group: "business",
  },
  {
    slug: "term-loan-machinery-finance",
    title: "Term Loan & Machinery Finance",
    description: "Fixed-tenure funding for expansion and equipment.",
    group: "business",
  },
  {
    slug: "project-funding",
    title: "Project Funding",
    description: "Long-term finance for new and expansion projects.",
    group: "business",
  },
  {
    slug: "cgtmse-loans",
    title: "CGTMSE Collateral-free Loans",
    description: "Government-backed credit guarantee loans for MSMEs.",
    group: "business",
  },
  {
    slug: "bill-invoice-discounting",
    title: "Bill / Invoice Discounting",
    description: "Turn unpaid invoices into working capital.",
    group: "business",
  },
  {
    slug: "bank-guarantee-letter-of-credit",
    title: "Bank Guarantee & Letter of Credit",
    description: "Support for tenders, contracts and trade.",
    group: "business",
  },
  {
    slug: "home-loan",
    title: "Home Loan",
    description: "Long-tenure finance to buy or build your home.",
    group: "also",
  },
  {
    slug: "personal-loan",
    title: "Personal Loan",
    description: "Collateral-free funds for personal needs.",
    group: "also",
  },
];

export const businessServices = services.filter((s) => s.group === "business");
export const alsoAvailable = services.filter((s) => s.group === "also");

export const emiTool = {
  slug: "emi-calculator",
  title: "EMI Calculator",
  description: "Estimate your monthly repayment before you borrow.",
};

/** Names only: no logos or partner artwork are shown on the site. */
export const partners: string[] = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Kotak Mahindra Bank",
  "Yes Bank",
  "IDFC FIRST Bank",
  "IndusInd Bank",
  "Standard Chartered",
  "Deutsche Bank",
  "Bajaj Finserv",
  "Tata Capital",
  "Poonawalla Fincorp",
  "SMFG India Credit",
  "Capital Float",
  "Arohan",
  "ITI Capital",
];

/**
 * Client reviews. Intentionally empty: add real, approved reviews here and set
 * SHOW_TESTIMONIALS = true in lib/site.ts to bring the section back.
 */
export const testimonials: Testimonial[] = [];

/** Leadership profiles on /about. Add more people to this list. */
export const leadership: Person[] = [
  {
    id: "p1",
    slug: "sanjay-tiwari",
    name: "Sanjay Tiwari",
    role: "Founder & Managing Director",
    bio: "Sanjay Tiwari founded Arena Financial Services in 2021 to give MSMEs and growing businesses a single, straightforward route to bank and NBFC credit. He brings over a decade of experience in MSME lending, credit appraisal and business development, with a working knowledge of RBI guidelines, CGTMSE and SIDBI schemes, and GST- and ITR-based financial assessment. He began his career as a Software Engineer at Infosys and holds a Master's degree from Visvesvaraya Technological University (VTU), Belagavi. At Arena he leads credit appraisal, lender relationships, technology and the advisory team.",
    linkedin: "https://www.linkedin.com/in/sanjay-tiwari-a1750820",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "Do you charge any fees?",
    answer: "No. We do not charge any fees for arranging your loan.",
  },
  {
    id: "f2",
    question: "Who gives the loan?",
    answer:
      "Loans are given by our partner banks and NBFCs. For unsecured short-term debt, we also work with private investors. Arena Financial Services helps you choose the right lender and manages the process; the lender makes the final decision.",
  },
  {
    id: "f3",
    question: "What documents are usually needed?",
    answer:
      "Typically KYC, business registration, GST returns, ITRs, bank statements and financial statements. We share the exact list for your case.",
  },
  {
    id: "f4",
    question: "How long does it take?",
    answer:
      "It depends on the product and the lender. Unsecured loans are usually faster than secured loans; we give you a realistic timeline at the start.",
  },
  {
    id: "f5",
    question: "Is my information kept confidential?",
    answer: "Yes. Your documents are shared only with the lenders you agree to apply with.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "s1",
    step: "01",
    title: "Share your requirement",
    description: "Tell us what you need and send basic business documents.",
  },
  {
    id: "s2",
    step: "02",
    title: "Get matched",
    description: "We assess your profile and shortlist the lenders that fit.",
  },
  {
    id: "s3",
    step: "03",
    title: "Sanction",
    description: "We coordinate with the lender through assessment and approval.",
  },
  {
    id: "s4",
    step: "04",
    title: "Disbursal",
    description: "Funds are released to your account. We stay your contact throughout.",
  },
];

export const whyArena = [
  {
    title: "Honest advice",
    text: "We explain the options and the costs. The lender makes the final decision, and we never present an estimate as an approval.",
  },
  {
    title: "Plain language",
    text: "Financial terms explained simply, without jargon.",
  },
  {
    title: "Paperwork guidance",
    text: "We tell you upfront what each lender will look for, so your file does not get stuck.",
  },
  {
    title: "One point of contact",
    text: "The same advisor from first call to disbursal.",
  },
];
