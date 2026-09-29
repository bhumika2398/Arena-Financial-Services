import type {
  FaqItem,
  Partner,
  ProcessStep,
  Service,
  Stat,
  TeamMember,
  Testimonial,
} from "@/types";

export const services: Service[] = [
  {
    slug: "personal-loan",
    icon: "Wallet",
    title: "Personal Loan",
    description:
      "Quick, collateral-free personal loans to cover life's big and small moments.",
    details: [
      "Loan amounts from ₹50,000 up to ₹25,00,000",
      "Flexible tenure from 12 to 60 months",
      "Minimal documentation, fast digital approval",
      "Competitive interest rates starting at 10.5% p.a.",
    ],
  },
  {
    slug: "business-loan",
    icon: "Briefcase",
    title: "Business Loan",
    description:
      "Fuel your growth with working capital and expansion financing tailored to your business.",
    details: [
      "Unsecured and secured options available",
      "Loan amounts up to ₹2 crore",
      "Custom repayment schedules",
      "Support for MSMEs, startups and enterprises",
    ],
  },
  {
    slug: "home-loan",
    icon: "Home",
    title: "Home Loan",
    description:
      "Turn your dream home into reality with affordable, long-tenure home financing.",
    details: [
      "Loan-to-value up to 90%",
      "Tenure up to 30 years",
      "Balance transfer & top-up options",
      "Assistance with legal and technical checks",
    ],
  },
  {
    slug: "loan-against-property",
    icon: "Landmark",
    title: "Loan Against Property",
    description:
      "Unlock the value of your residential or commercial property with a secured loan at attractive rates.",
    details: [
      "Loan amounts based on property valuation",
      "Tenure up to 15 years",
      "Lower interest rates than unsecured loans",
      "Use funds for business, education, or personal needs",
    ],
  },
  {
    slug: "overdraft",
    icon: "CreditCard",
    title: "Overdraft",
    description:
      "Flexible overdraft facilities against your assets or deposits, so funds are ready whenever you need them.",
    details: [
      "Interest charged only on the amount utilized",
      "Overdraft against property, deposits, or securities",
      "Revolving credit line — withdraw and repay as needed",
      "Quick renewal and top-up options",
    ],
  },
  {
    slug: "term-loan",
    icon: "CalendarClock",
    title: "Term Loan",
    description:
      "Structured, fixed-tenure financing for planned capital expenditure and long-term business needs.",
    details: [
      "Fixed or floating interest rate options",
      "Repayment tenure aligned to project cash flows",
      "Suited for equipment, expansion, and capex financing",
      "Dedicated relationship manager support",
    ],
  },
  {
    slug: "short-term-finance",
    icon: "Zap",
    title: "Short Term Finance",
    description:
      "Fast, short-duration funding to bridge working capital gaps and seize immediate opportunities.",
    details: [
      "Tenure typically from 3 to 12 months",
      "Rapid processing and disbursal",
      "Ideal for bridging cash flow mismatches",
      "Flexible repayment structures",
    ],
  },
  {
    slug: "sme-loan",
    icon: "Factory",
    title: "SME Loan",
    description:
      "Tailored financing solutions to help small and medium enterprises grow, hire, and scale operations.",
    details: [
      "Collateral-free options for eligible businesses",
      "Loan amounts suited to SME working capital cycles",
      "Support with GST, MSME, and Udyam-linked schemes",
      "Guidance through documentation and compliance",
    ],
  },
  {
    slug: "emi-calculator",
    icon: "Calculator",
    title: "EMI Calculator",
    description:
      "Instantly estimate your monthly EMI, total interest, and total repayment for any loan amount and tenure.",
    details: [
      "Works for personal, home, business, and SME loans",
      "Adjust loan amount, interest rate, and tenure in real time",
      "See a visual breakdown of principal vs. interest",
      "Use the estimate to plan your application with our advisors",
    ],
  },
];

export const stats: Stat[] = [
  { label: "Years in Business", value: 15, suffix: "+" },
  { label: "Loans Disbursed", value: 2400, suffix: "Cr+" },
  { label: "Happy Clients", value: 38000, suffix: "+" },
  { label: "Banking Partners", value: 25, suffix: "+" },
];

// [PLACEHOLDER — replace with real customer testimonials later]
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Sharma",
    role: "Small Business Owner",
    quote:
      "Arena Finserv made getting my business loan effortless. The team guided me through every step and I had funds disbursed within a week.",
    rating: 5,
    loanType: "Business Loan Customer",
  },
  {
    id: "t2",
    name: "Rohan Mehta",
    role: "Homeowner",
    quote:
      "Their home loan advisory saved me lakhs in interest by comparing lenders I hadn't even considered. Truly professional service.",
    rating: 5,
    loanType: "Home Loan Customer",
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "IT Professional",
    quote:
      "I started my SIP journey with their investment team and the portfolio has consistently outperformed my expectations.",
    rating: 4,
    loanType: "Personal Loan Customer",
  },
  {
    id: "t4",
    name: "Vikram Desai",
    role: "Retail Entrepreneur",
    quote:
      "The insurance plan they recommended for my family gives me real peace of mind. Claims support was seamless too.",
    rating: 5,
    loanType: "SME Loan Customer",
  },
  {
    id: "t5",
    name: "Sneha Iyer",
    role: "Freelance Consultant",
    quote:
      "Transparent process, no hidden charges, and a team that actually explains the fine print. Highly recommend.",
    rating: 5,
    loanType: "Personal Loan Customer",
  },
];

export const partners: Partner[] = [
  { id: "p1", name: "Yes Bank" },
  { id: "p2", name: "Standard Chartered" },
  { id: "p3", name: "Deutsche Bank" },
  { id: "p4", name: "Capital Float" },
  { id: "p5", name: "Arohan" },
  { id: "p6", name: "ITI Capital Ltd" },
  { id: "p7", name: "IDFC Bank" },
  { id: "p8", name: "Magma" },
  { id: "p9", name: "Indiabulls IVL Finance" },
  { id: "p10", name: "IndusInd Bank" },
  { id: "p11", name: "Fullerton India" },
  { id: "p12", name: "Bajaj Finserv" },
  { id: "p13", name: "Reliance Home Finance" },
  { id: "p14", name: "Capital First" },
  { id: "p15", name: "Tata Capital" },
];

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Rajesh Malhotra",
    role: "Founder & Managing Director",
    bio: "With over 20 years in financial services, Rajesh founded Arena Financial Services to make trustworthy financial advice accessible to every household.",
  },
  {
    id: "m2",
    name: "Meera Kulkarni",
    role: "Head of Lending",
    bio: "Meera leads our loans division, having structured financing solutions for over 10,000 clients across personal and business segments.",
  },
  {
    id: "m3",
    name: "Arjun Malhotra",
    role: "Head of Investments",
    bio: "A certified financial planner, Arjun designs goal-based investment strategies focused on long-term, sustainable wealth creation.",
  },
  {
    id: "m4",
    name: "Kavita Rao",
    role: "Head of Insurance Advisory",
    bio: "Kavita ensures every client finds the right protection plan, with a client-first approach to claims and policy servicing.",
  },
  {
    id: "m5",
    name: "Sandeep Verma",
    role: "Head of Customer Success",
    bio: "Sandeep and his team manage the end-to-end client experience, from onboarding through to post-disbursal support.",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "How long does loan approval typically take?",
    answer:
      "Most personal loans are approved within 24-48 hours of document submission, while business and home loans may take 5-10 working days depending on the lender's process.",
  },
  {
    id: "f2",
    question: "What documents are required to apply?",
    answer:
      "Typically you'll need identity proof, address proof, income statements (salary slips or ITR), and bank statements for the last 6 months. Our team will guide you on exact requirements for your product.",
  },
  {
    id: "f3",
    question: "Do you charge any fee for consultation?",
    answer:
      "Initial consultations are completely free. Any processing fees are charged only by the lending or insurance partner, and are always disclosed upfront.",
  },
  {
    id: "f4",
    question: "Can I prepay or foreclose my loan early?",
    answer:
      "Yes, most of our partner lenders allow prepayment and foreclosure, though terms vary. We help you understand any applicable charges before you commit.",
  },
  {
    id: "f5",
    question: "How many banking partners do you work with?",
    answer:
      "We work with over 25 banks and NBFCs, allowing us to compare offers and match you with the most suitable rates and terms.",
  },
  {
    id: "f6",
    question: "Is my personal information kept confidential?",
    answer:
      "Absolutely. We follow strict data protection protocols and only share your information with lenders you've explicitly chosen to apply through.",
  },
  {
    id: "f7",
    question: "Do you help with investment planning for beginners?",
    answer:
      "Yes, our investment advisors specialize in building simple, goal-based plans for first-time investors as well as seasoned portfolios.",
  },
  {
    id: "f8",
    question: "What if my loan application gets rejected?",
    answer:
      "Our team reviews your profile before submission to minimize rejection risk, and if it happens, we help identify alternate lenders or improve your eligibility.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "s1",
    step: "01",
    title: "Apply",
    description:
      "Fill out a simple online application with your basic details and financial requirement.",
  },
  {
    id: "s2",
    step: "02",
    title: "Get Matched",
    description:
      "Our advisors match you with the best-fit lender or plan from our network of 25+ partners.",
  },
  {
    id: "s3",
    step: "03",
    title: "Approval",
    description:
      "Submit minimal documentation and receive approval, often within 24-48 hours.",
  },
  {
    id: "s4",
    step: "04",
    title: "Disbursal",
    description:
      "Funds are disbursed directly to your account, or your policy is issued and activated.",
  },
];
