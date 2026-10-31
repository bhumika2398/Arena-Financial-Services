/**
 * Copy for each service page (/services/[slug]). Every page has the same four
 * parts: What it is, Who it suits, Key features (4) and Documents needed.
 *
 * Text for Business Loan, Working Capital (overdraft part), Short Term Finance,
 * Loan Against Property, Term Loan, Project Funding, Home Loan and Personal
 * Loan is condensed from the client's earlier service text.
 * Entries with `draft` were written for this brief and need client review.
 */

export const STANDARD_NOTE = "The final decision lies with the banks and NBFCs.";

export const BUSINESS_DOCUMENTS = [
  "KYC",
  "Business registration",
  "GST returns",
  "ITRs",
  "Bank statements",
  "Financial statements",
];
export const DOCUMENTS_NOTE = "We share the exact list for your case.";

export interface ServiceContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** 2-3 lines. */
  what: string;
  suits: string;
  /** Exactly four. */
  features: string[];
  documents: string[];
  /** DRAFT - client to review. Lists which parts were newly written. */
  draft?: string;
}

export const serviceContent: ServiceContent[] = [
  {
    slug: "business-loan",
    metaTitle: "Business Loan (Unsecured)",
    metaDescription:
      "Short-term unsecured business loans of 1 to 5 years from banks and NBFCs, with no collateral, guarantor or hypothecation.",
    what: "A short-term unsecured loan of 1 to 5 years from banks and NBFCs, with no collateral, guarantor or hypothecation of assets. How the money is used is left to the borrower, for example working capital or short-term cash flow needs.",
    suits:
      "Self-employed individuals and business owners aged 21 to 65, including proprietorships, partnerships and private or public limited companies in manufacturing, trading and services. The business should have run continuously for the last 3 years, with positive turnover and profit trends over the last 2 years. Turnover requirements vary by lender.",
    features: [
      "Unsecured: no collateral, guarantor or hypothecation",
      "Tenure of 1 to 5 years",
      "Use of funds is at the borrower's discretion",
      "SME facilities such as bill discounting, export credit and letters of credit can be discussed with your advisor",
    ],
    documents: BUSINESS_DOCUMENTS,
  },
  {
    slug: "working-capital",
    metaTitle: "Working Capital (OD / CC)",
    metaDescription:
      "Overdraft and cash credit limits to manage day-to-day cash flow, arranged through Arena Financial Services.",
    what: "An overdraft lets you withdraw more than the balance in your account, up to a limit set by the lender, and you pay interest on the amount you borrowed. Cash credit (CC) works as a similar revolving limit for running a business.",
    suits:
      "Businesses that need short-term funds for an emergency or to smooth uneven cash flow. The limit is revolving, so repay it quickly to stop interest piling up.",
    features: [
      "Secured overdraft (with collateral) or unsecured overdraft (against a bank account)",
      "Fixed interest rate on the amount borrowed",
      "No prepayment charges and no EMIs: repay the amount cumulatively",
      "Interest is calculated only for the time you hold the borrowed amount",
    ],
    documents: BUSINESS_DOCUMENTS,
    draft: "DRAFT - client to review: Cash credit sentence and the documents list are newly written.",
  },
  {
    slug: "short-term-finance",
    metaTitle: "Short Term Finance",
    metaDescription:
      "Short term credit from leading lenders for a 10 months duration, for urgent fund requirements.",
    what: "Short term credit and finance from leading lenders for a duration of 10 months. It is meant for urgent fund requirements, with time sensitivity as the top priority.",
    suits: "Businesses with an urgent fund requirement that need funds for a short period.",
    features: [
      "Duration of 10 months",
      "Credit from leading lenders",
      "Built for urgent fund requirements",
      "Time sensitivity is our top priority",
    ],
    documents: BUSINESS_DOCUMENTS,
  },
  {
    slug: "loan-against-property",
    metaTitle: "Loan Against Property",
    metaDescription:
      "Secured loans against residential or commercial property from banks and financial institutions.",
    what: "A secured loan from a bank or financial institution using one or more properties you own as collateral. These are long-term loans, and the rate and loan amount vary case by case with the type of property and other lender factors.",
    suits:
      "Owners of residential or commercial property. The property offered as security must be free of any encumbrance, which means it is not pledged for any purpose or any other loan.",
    features: [
      "Secured by property you own",
      "Long-term repayment with easy monthly EMIs",
      "Interest only on the amount of loan utilised",
      "Prepay or part-prepay (charges depend on the lender)",
    ],
    documents: BUSINESS_DOCUMENTS,
  },
  {
    slug: "term-loan-machinery-finance",
    metaTitle: "Term Loan & Machinery Finance",
    metaDescription:
      "Term loans with a fixed repayment schedule for equipment, expansion and working capital.",
    what: "A loan from a bank for a specific amount with a specified repayment schedule. Businesses often use it to buy fixed assets such as equipment and machinery for production, or to expand.",
    suits:
      "Established small businesses with sound financial statements and a substantial down payment, which keeps the payments and the total cost of the loan lower.",
    features: [
      "Specified repayment schedule and set maturity date",
      "Fixed or variable interest rate",
      "For equipment, real estate or working capital, repaid over one to 25 years",
      "Collateral and a thorough approval process apply",
    ],
    documents: BUSINESS_DOCUMENTS,
  },
  {
    slug: "project-funding",
    metaTitle: "Project Funding",
    metaDescription:
      "Long-term financing of infrastructure and industrial projects based on projected cash flows.",
    what: "Project finance is the long-term financing of infrastructure and industrial projects, based on projected cash flows and contractual agreements. It lets the sponsor finance a project on the strength of the project alone, without recourse to the sponsor company.",
    suits: "Sponsors of new and expansion infrastructure and industrial projects.",
    features: [
      "Long-term financing",
      "Based on projected cash flows and contractual agreements",
      "Without recourse to the sponsor company",
      "Assessed on the strength of the project",
    ],
    documents: BUSINESS_DOCUMENTS,
  },
  {
    slug: "cgtmse-loans",
    metaTitle: "CGTMSE Collateral-free Loans",
    metaDescription:
      "Collateral-free business loans backed by a government credit guarantee for eligible MSMEs.",
    what: "CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises) gives lenders a government-backed guarantee on eligible loans to micro and small businesses. This lets a lender offer a loan without asking for collateral.",
    suits: "Eligible micro and small enterprises that cannot offer collateral.",
    features: [
      "No collateral for eligible loans",
      "Backed by a credit guarantee given to the lender",
      "Offered through participating lenders",
      "Eligibility and limits are set by the scheme and the lender",
    ],
    documents: BUSINESS_DOCUMENTS,
    draft: "DRAFT - client to review: Whole page newly written.",
  },
  {
    slug: "bill-invoice-discounting",
    metaTitle: "Bill / Invoice Discounting",
    metaDescription:
      "Turn unpaid invoices into working capital through bill and invoice discounting.",
    what: "With bill or invoice discounting, a lender advances you money against your unpaid invoices instead of you waiting for your customer to pay. It turns money tied up in receivables into working capital.",
    suits: "Businesses that sell on credit and wait for customers to pay their invoices.",
    features: [
      "Turns unpaid invoices into working capital",
      "Funding is linked to your sales invoices",
      "Repaid when your customer pays the invoice",
      "Helps when cash is tied up in receivables",
    ],
    documents: [...BUSINESS_DOCUMENTS, "Sales invoices"],
    draft: "DRAFT - client to review: Whole page newly written.",
  },
  {
    slug: "bank-guarantee-letter-of-credit",
    metaTitle: "Bank Guarantee & Letter of Credit",
    metaDescription:
      "Bank guarantees and letters of credit to support tenders, contracts and trade.",
    what: "A bank guarantee is a lender's promise to pay a third party if your business does not meet a contractual obligation. A letter of credit assures a seller that they will be paid once the agreed conditions are met.",
    suits: "Businesses bidding for tenders, carrying out contracts or trading with suppliers and buyers.",
    features: [
      "Supports tenders, contracts and trade",
      "Issued by the lender on your behalf",
      "Terms depend on the lender and your profile",
      "Gives buyers and suppliers added assurance",
    ],
    documents: BUSINESS_DOCUMENTS,
    draft: "DRAFT - client to review: Whole page newly written.",
  },
  {
    slug: "home-loan",
    metaTitle: "Home Loan",
    metaDescription: "Home purchase, home improvement and home construction loans from banks and other lenders.",
    what: "Money borrowed from a bank or other organisation for a fixed period to purchase, build, repair or revamp a residential property. Interest is charged on the amount borrowed and paid alongside the principal.",
    suits: "Individuals who want to buy a home, renovate or repair one, or build on a plot of land.",
    features: [
      "Home purchase loan for a new residential property",
      "Home improvement loan to renovate or repair your home",
      "Home construction loan to build on a plot of land",
      "Repaid over a fixed period with interest",
    ],
    documents: ["KYC", "Income documents", "Bank statements"],
    draft: "DRAFT - client to review: Documents list newly written.",
  },
  {
    slug: "personal-loan",
    metaTitle: "Personal Loan",
    metaDescription: "Unsecured personal loans with a typical tenure of 1 to 5 years, assessed on your CIBIL score.",
    what: "A loan that does not need you to pledge any asset as security. You are free to use the money as you like, for example to renovate a house, pay bills or cover other personal needs.",
    suits: "Individuals who need funds for personal needs. Lenders assess your CIBIL score to judge creditworthiness.",
    features: [
      "Unsecured: no asset to pledge",
      "Typical tenure of 1 to 5 years",
      "Assessed on your CIBIL score",
      "Free to use for any purpose",
    ],
    documents: ["KYC", "Income documents", "Bank statements"],
    draft: "DRAFT - client to review: Documents list newly written.",
  },
];

export const contentBySlug = Object.fromEntries(serviceContent.map((c) => [c.slug, c]));
