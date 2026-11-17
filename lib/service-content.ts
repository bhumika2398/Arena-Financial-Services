/**
 * Copy for each service page (/services/[slug]). Every page has the same four
 * parts: What it is, Who it suits, Key features and Documents needed.
 *
 * Updated from the client's "Product Page Changes" brief (17 November 2026).
 * Entries with `draft` were written for an earlier brief and need client review.
 */

export const STANDARD_NOTE = "Final approval, loan amount and interest rate are decided by the lender.";
/** Used by Home Loan and Personal Loan, which keep their earlier disclaimer. */
export const SECONDARY_NOTE = "The final decision lies with the banks and NBFCs.";

/** Base document list shared by the core loan pages. */
const BASE_LIST = [
  "KYC of the business and promoters",
  "Business registration / Udyam certificate",
  "Last 12 months GST returns",
  "Last 2 years ITR with computation",
  "Last 2 years audited financials",
  "Last 12 months bank statements",
];
export const CATCH_ALL_DOCUMENT = "Few other documents as per the Banks/NBFCs";
/** "Base list plus ...": the base list, the page's extra items, then the catch-all line last. */
const baseList = (...extra: string[]) => [...BASE_LIST, ...extra, CATCH_ALL_DOCUMENT];
export const BUSINESS_DOCUMENTS = baseList();
export const DOCUMENTS_NOTE = "We share the exact list for your case.";

export interface ServiceContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** 2-3 lines. */
  what: string;
  suits: string;
  features: string[];
  documents: string[];
  /** Line shown under the document list, before the standard note. */
  documentsExtra?: string;
  /** "At a glance" boxes. Only boxes with a value from the client are listed. */
  glance?: { label: string; value: string }[];
  /** Overrides the disclaimer shown at the bottom of the page. */
  note?: string;
  /** DRAFT - client to review. Lists which parts were newly written. */
  draft?: string;
}

export const serviceContent: ServiceContent[] = [
  {
    slug: "business-loan",
    metaTitle: "Business Loan (Unsecured)",
    metaDescription:
      "Unsecured business loans of 1 to 4 years from banks and NBFCs, with no collateral, guarantor or hypothecation.",
    what: "An unsecured business term loan from banks and NBFCs, repaid in monthly EMIs over 1 to 4 years. No property, guarantor or asset hypothecation is needed, and you decide how to use the funds: working capital, stock, expansion or repaying costlier debt.",
    suits:
      "Self-employed individuals and business owners aged 21 to 65, including proprietorships, partnerships and private or public limited companies in manufacturing, trading and services. The business should have run continuously for the last 3 years, with positive turnover and profit trends over the last 2 years. Turnover requirements vary by lender. A healthy CIBIL score and regular banking through the business account help get better offers.",
    features: [
      "Unsecured: no collateral, guarantor or hypothecation",
      "Tenure of 1 to 4 years, repaid in EMIs",
      "Use of funds is at the borrower's discretion",
      "Offers compared across multiple banks and NBFCs",
      "Eligibility assessed on GST, ITR and banking",
    ],
    glance: [
      { label: "Tenure", value: "1 to 4 years" },
      { label: "Security", value: "None: no property, guarantor or hypothecation" },
    ],
    documents: baseList("Existing loan sanction letters and loan statements (if any)"),
  },
  {
    slug: "working-capital",
    metaTitle: "Working Capital (OD / CC)",
    metaDescription:
      "Overdraft and cash credit limits to manage day-to-day cash flow, arranged through Arena Financial Services.",
    what: "A revolving limit for day-to-day business needs. With an overdraft (OD) you draw and repay any time within the sanctioned limit. Cash credit (CC) is a similar limit secured by your stock and receivables. In both, interest is charged only on the amount you use, for the days you use it.",
    suits:
      "Businesses with an ongoing need to fund stock, receivables, salaries and supplier payments, especially those with seasonal or uneven cash flow.",
    features: [
      "Secured OD/CC against property, stock or receivables",
      "Unsecured OD based on your banking and GST turnover, from select banks and NBFCs",
      "Interest rate linked to the lender's benchmark (usually floating), charged only on the amount used",
      "No fixed EMIs: repay and redraw any time within the limit",
      "Limits are usually renewed every 12 months",
    ],
    glance: [
      { label: "Security", value: "Secured (property, stock, receivables) or unsecured OD" },
    ],
    documents: baseList(
      "Stock and debtors statement",
      "Projected turnover / CMA data (for larger limits)",
      "Existing OD/CC sanction letter (for takeover or enhancement)",
    ),
    draft: "DRAFT - client to review: Cash credit sentence and the documents list are newly written.",
  },
  {
    slug: "short-term-finance",
    metaTitle: "Short Term Finance",
    metaDescription:
      "Quick, unsecured funding for up to 10 months to bridge an urgent cash gap.",
    what: "Quick, unsecured funding for up to 10 months to bridge an urgent cash gap: a large order, a tax or supplier payment, or the wait for a bank loan to be disbursed. Arranged through Arena's network of Investors",
    suits: "Businesses with an urgent fund requirement that need funds for a short period.",
    features: [
      "Up to 10 months",
      "Credit from leading lenders",
      "Built for urgent fund requirements",
      "Time sensitivity is our top priority",
    ],
    glance: [
      { label: "Tenure", value: "Up to 10 months" },
      { label: "Security", value: "Unsecured" },
    ],
    documents: BUSINESS_DOCUMENTS,
    note: "Final approval, loan amount and cost are decided by the lender or financier.",
  },
  {
    slug: "loan-against-property",
    metaTitle: "Loan Against Property",
    metaDescription:
      "Secured loans against residential or commercial property from banks and financial institutions.",
    what: "A secured loan from a bank or financial institution using one or more properties you own as collateral. You can borrow a share of the property's market value as assessed by the lender, usually at lower rates and for longer tenures than an unsecured loan. The loan amount depends on the type of property and other lender factors.",
    suits:
      "Business owners and self-employed professionals who own residential, commercial or industrial property with a clear title, free of any existing loan or charge.",
    features: [
      "Secured by property you own",
      "Long-term repayment in monthly EMIs",
      "Also available as an overdraft (dropline OD), where interest is charged only on the amount used",
      "No prepayment charges on floating-rate loans to individuals and micro and small enterprises sanctioned from 1 January 2026, as per RBI rules. Other cases as per the lender.",
    ],
    glance: [
      { label: "Security", value: "Property you own" },
    ],
    documents: baseList(
      "Title deed and chain documents",
      "Approved building plan",
      "Latest property tax receipt",
      "Encumbrance certificate",
    ),
  },
  {
    slug: "term-loan-machinery-finance",
    metaTitle: "Term Loan & Machinery Finance",
    metaDescription:
      "Term loans with a fixed repayment schedule for machinery and expansion.",
    what: "A loan from a bank or NBFC for a fixed amount and tenure, repaid in EMIs. It is used to buy new or used machinery and equipment, or to expand capacity. The machinery bought is usually the security.",
    suits:
      "Manufacturing and service businesses buying machinery or expanding, that can bring in their own share (margin) of the cost.",
    features: [
      "Fixed amount and set repayment schedule",
      "Fixed or floating interest rate",
      "Repaid over 1 to 7 years for machinery (longer for expansion term loans)",
      "Machinery loans may qualify for CGTMSE cover, so no extra collateral may be needed",
    ],
    glance: [
      { label: "Tenure", value: "1 to 7 years for machinery" },
      { label: "Security", value: "The machinery bought, usually" },
    ],
    documents: baseList(
      "Quotation or proforma invoice of the machinery",
      "Project report (for expansion loans)",
    ),
  },
  {
    slug: "project-funding",
    metaTitle: "Project Funding",
    metaDescription:
      "Long-term financing of infrastructure and industrial projects based on projected cash flows.",
    what: "Long-term funding to set up a new unit or expand an existing one, based on a detailed project report. Repayment usually starts after a moratorium, once the project begins earning.",
    suits:
      "Promoters and businesses setting up a new manufacturing or service unit, or expanding capacity, who can bring in their own contribution.",
    features: [
      "Funding for land development, building, machinery and initial working capital",
      "Moratorium during construction",
      "Repayment matched to projected cash flows",
      "Help preparing the project report and CMA data",
    ],
    documents: baseList(
      "Detailed project report (DPR)",
      "CMA data / projections",
      "Quotations for machinery and civil work",
      "Land or lease documents",
      "Approvals and licences",
      "Proof of promoter contribution",
    ),
  },
  {
    slug: "cgtmse-loans",
    metaTitle: "CGTMSE Collateral-free Loans",
    metaDescription:
      "Collateral-free business loans backed by a government credit guarantee for eligible MSMEs.",
    what: "CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises) gives lenders a government-backed guarantee on eligible loans to micro and small businesses. This lets a lender offer a loan without asking for collateral. Loans of up to Rs 10 crore can be covered, for both term loans and working capital.",
    suits:
      "New and existing micro and small enterprises in manufacturing, services and retail trade, registered on Udyam, that cannot or do not want to offer collateral.",
    features: [
      "No collateral for eligible loans",
      "Backed by a credit guarantee given to the lender",
      "Offered through participating lenders",
      "Eligibility and limits are set by the scheme and the lender",
      "An annual guaranteed fee is charged on the guaranteed amount; your advisor will explain it upfront.",
    ],
    documents: BUSINESS_DOCUMENTS,
    documentsExtra: "Udyam registration certificate is required for this scheme.",
    glance: [
      { label: "Loan amount", value: "Up to Rs 10 crore" },
      { label: "Tenure", value: "As per lender" },
      { label: "Security", value: "No collateral (government-backed guarantee)" },
    ],
    draft: "DRAFT - client to review: Whole page newly written.",
  },
  {
    slug: "bill-invoice-discounting",
    metaTitle: "Bill / Invoice Discounting",
    metaDescription:
      "Turn unpaid invoices into working capital through bill and invoice discounting.",
    what: "With bill or invoice discounting, a lender advances you money against your unpaid invoices instead of you waiting for your customer to pay. It turns money tied up in receivables into working capital. You usually receive a large share of the invoice value upfront. For invoices raised on large companies and PSUs, this can also be done through RBI-regulated TReDS platforms.",
    suits: "MSMEs that supply to larger companies, PSUs or government departments on 30 to 180 day credit terms.",
    features: [
      "Turns unpaid invoices into working capital",
      "Funding is linked to your sales invoices",
      "Repaid when your customer pays the invoice",
      "Helps when cash is tied up in receivables",
    ],
    documents: baseList("Sales invoices", "Purchase orders", "Buyer details", "Debtors ageing list"),
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
      "Bid (EMD), performance and advance payment guarantees",
      "Inland and import letters of credit",
      "Issued against a cash margin or fixed deposit, or within your working capital limit",
      "Commission charged as per the lender",
    ],
    documents: baseList(
      "Tender document, work order or purchase order",
      "Beneficiary's BG format (if any)",
    ),
    draft: "DRAFT - client to review: Whole page newly written.",
  },
  {
    slug: "home-loan",
    metaTitle: "Home Loan",
    metaDescription: "Home purchase, improvement, construction, balance transfer and top-up loans from banks and other lenders.",
    what: "Money borrowed from a bank or other organisation for a fixed period to purchase, build, repair or revamp a residential property. Interest is charged on the amount borrowed and paid alongside the principal.",
    suits: "Individuals who want to buy a home, renovate or repair one, or build on a plot of land.",
    features: [
      "Home purchase loan for a new residential property",
      "Home improvement loan to renovate or repair your home",
      "Home construction loan to build on a plot of land",
      "Repaid over a fixed period with interest",
      "Balance transfer and top-up on your existing home loan",
      "For salaried and self-employed borrowers",
    ],
    documents: ["KYC", "Income proof (salary slips / ITR)", "Last 6 months bank statements", "Property documents"],
    note: SECONDARY_NOTE,
    draft: "DRAFT - client to review: Documents list newly written.",
  },
  {
    slug: "personal-loan",
    metaTitle: "Personal Loan",
    metaDescription: "Unsecured personal loans with a typical tenure of 1 to 5 years, assessed on your income and CIBIL score.",
    what: "A loan that does not need you to pledge any asset as security. You are free to use the money as you like, for example a wedding, travel, medical costs or other personal needs.",
    suits: "Salaried and self-employed individuals with a steady income. Lenders look at your income and your CIBIL score.",
    features: [
      "Unsecured: no asset to pledge",
      "Typical tenure of 1 to 5 years",
      "Assessed on your income and CIBIL score",
      "Free to use for any purpose",
    ],
    documents: ["KYC", "Income documents", "Bank statements"],
    note: SECONDARY_NOTE,
    draft: "DRAFT - client to review: Documents list newly written.",
  },
];

export const contentBySlug = Object.fromEntries(serviceContent.map((c) => [c.slug, c]));
