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
  { id: "p1", name: "Yes Bank", logo: "/images/partners/yes-bank.png" },
  { id: "p2", name: "Standard Chartered", logo: "/images/partners/standard-chartered.png" },
  { id: "p3", name: "Deutsche Bank", logo: "/images/partners/deutsche-bank.png" },
  { id: "p4", name: "Capital Float", logo: "/images/partners/capital-float.png" },
  { id: "p5", name: "Arohan", logo: "/images/partners/arohan.jpg" },
  { id: "p6", name: "ITI Capital Ltd", logo: "/images/partners/iti-capital.png" },
  { id: "p7", name: "IDFC Bank", logo: "/images/partners/idfc-bank.png" },
  { id: "p8", name: "Magma (now Poonawalla Fincorp)", logo: "/images/partners/poonawalla.svg" },
  { id: "p9", name: "Indiabulls IVL Finance", logo: "/images/partners/indiabulls.png" },
  { id: "p10", name: "IndusInd Bank", logo: "/images/partners/indusind-bank.png" },
  { id: "p11", name: "Fullerton India (now SMFG India Credit)", logo: "/images/partners/smfg-india-credit.svg" },
  { id: "p12", name: "Bajaj Finserv", logo: "/images/partners/bajaj-finserv.png" },
  { id: "p13", name: "Reliance Home Finance" },
  { id: "p14", name: "Capital First", logo: "/images/partners/capital-first.png" },
  { id: "p15", name: "Tata Capital", logo: "/images/partners/tata-capital.jpg" },
];

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Vinod Kumar Tiwari",
    role: "Managing Director, Arena Financial Services",
    email: "vinod@tiwarifinserv.com",
    bio: [
      "Mr. Vinod Kumar Tiwari founded the organization in the year 2008 after being associated with various financial institutions and gaining rich experience in finance and Sales. His entrepreneurial abilities in accomplishing business growth on a consistent basis in a structured and unstructured environment have helped Arena Financial Services to reach unforeseen heights and exceed forecasted projections of profit and growth. With his continuous involvement, the company has shown exponential growth through strong corporate relationship and customer satisfaction.",
      "He has adopted the integrity pledge and committed to upholding the highest standards of honesty & integrity. He is a man of exemplary vision & strong professional commitment having inherent qualities of converting challenges into blessings with his determination & involvement of team.",
    ],
  },
  {
    id: "m2",
    name: "Pramod Kumar Tiwari",
    role: "Sales and Marketing Head, Arena Financial Services",
    email: "pramod.afz@gmail.com",
    bio: [
      "Mr. Pramod Kumar Tiwari is a graduate from Saket University and is associated with Arena Financial Services since 2011. He is a proactive leader and planner with expertise in Sales and Marketing across urban and rural markets, customer lifecycle management, market execution, leading large Cross Functional transformational Projects, Cost engineering and mentoring young talent.",
      "He has vast knowledge and experience in handling all kinds of loans like Business Loan, Personal Loan, Home Loan & Loan Against Property. Mr. Pramod maintains very good professional relations with all MNCs/Private Banks and NBFCs. With his motto to achieve long-term customer satisfaction, he is catering to the needs of customers across different fields and has involved the entire team to achieve the desired results.",
    ],
  },
  {
    id: "m3",
    name: "Sanjay Tiwari",
    role: "Business and IT Head, Arena Financial Services",
    email: "ceo@tiwarifinserv.com",
    bio: [
      "Mr. Sanjay Tiwari is a post-graduate from VTU Belgavi Karnataka and is associated with Arena Financial Services since 2016. He is a proactive leader with expertise in Marketing and mentoring young talent.",
      "He has vast knowledge with experience of conducting and handling the technical training on various platforms for aspirants in networking. He has helped to orchestrate the restructuring and reorganization of locations. His strong work ethic, technical knowledge, and leadership have helped Arena Financial Services to grow.",
    ],
  },
  {
    id: "m4",
    name: "Ghata Shah",
    role: "Co-founder, Secured Loans",
    email: "ghatashah@tiwarifinserv.com",
    bio: [
      "Ms. Ghata Shah is basically from Gujarat and settled in Bangalore for more than a decade. She has completed her Master's in Commerce from Gujarat University and associated with Arena Financial Services since 2019 for the Secured vertical. She has also availed a Law degree and is currently pursuing her Final Chartered Accountancy course.",
      "She has worked in various industries including credit/lending industry. She has rich experience in the entire gamut of accounting & finance operations which supports clients to improve their financial costs. She is a results-oriented, versatile, and creative leader with over twenty years of accounting as well as Banking experience which helps Arena Financial Services to grow.",
    ],
  },
];

export const financialConsultants: { id: string; name: string; role: string }[] = [
  { id: "c1", name: "Vivek Tiwari", role: "Team Lead, Sales and Marketing" },
  { id: "c2", name: "Suraj Tiwari", role: "Team Lead, Sales and Marketing" },
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
