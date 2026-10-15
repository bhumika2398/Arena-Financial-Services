/**
 * Detailed copy for each service detail page (/services/[slug]).
 * Wording is as supplied by the business; the only edits are the company
 * name, a few typo/spacing fixes and the removal of duplicates noted in the
 * project summary.
 */

export const PHONES = [
  { label: "+91 9972908696", href: "tel:+919972908696" },
  { label: "+91 9972718696", href: "tel:+919972718696" },
] as const;

export const TERMS_NOTE =
  "This information is for customer knowledge and awareness. The final decision lies with the Banks and NBFCs with regards to approval of the loan application. Kindly contact +91 9972908696 / +91 9972718696 or please visit the office for any queries or advice.";

/** Standard "Why Arena Financial Services" bullets (Personal Loan, Home Loan). */
export const STANDARD_WHY: WhyItem[] = [
  { text: "Large chain of partners: Authorised Channel Partner with many Banks and NBFCs." },
  { text: "Reduced documentation allows quick and easy application for customers." },
  {
    text: "Better approvals due to our team's expert knowledge and extensive experience in all company policy and lending approach.",
  },
  {
    text: "Customized services to match your needs like multiple disbursements, partial disbursements, pre-payment at zero charges, etc.",
  },
  {
    text: "We make sure that our customers get the best possible deals from the market by matching customer needs and available products across different banks and channel partners more accurately.",
  },
  { text: "Privacy Policy is our topmost priority.", link: { word: "Privacy Policy", href: "/privacy-policy" } },
];

export interface WhyItem {
  title?: string;
  text: string;
  link?: { word: string; href: string };
}

export type Section =
  | { type: "text"; title?: string; paragraphs: string[] }
  | { type: "columns"; columns: { title: string; paragraphs: string[] }[] }
  | { type: "cards"; title?: string; items: { title: string; text: string }[] }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "numbered"; title: string; intro?: string; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "highlight"; value: string; label: string; text: string }
  | { type: "why"; title: string; style: "bullets" | "titled"; items: WhyItem[] };

export interface ServiceContent {
  slug: string;
  /** Value of the lead form's Loan Type dropdown to preselect. */
  loanType: string;
  /** First sentence of the intro, shown in the page header. */
  headline: string;
  /** Page <title> and meta description. */
  metaTitle: string;
  metaDescription: string;
  /** Key-facts chips — only facts stated in the source copy. */
  facts: string[];
  sections: Section[];
}

export const serviceContent: ServiceContent[] = [
  {
    slug: "personal-loan",
    loanType: "Personal Loans",
    headline:
      "Loans which do not need you to pledge any asset as security to the bank to avail them.",
    metaTitle: "Personal Loan",
    metaDescription:
      "Unsecured personal loans with a typical tenure of 1-5 years, assessed on your CIBIL score. Arena Financial Services matches you with the right bank or NBFC.",
    facts: ["Unsecured", "1-5 year tenure", "CIBIL-based assessment"],
    sections: [
      {
        type: "text",
        paragraphs: [
          "A personal loan is a quick and easy way to get funds for short-term financial needs. You are free to use the loan amount in any way you want. However, mostly the personal loan is availed for purposes such as renovating a house, buying a new phone, vacations and holiday trips, paying credit card and other bills, and for some miscellaneous business requirements like buying furniture for the office.",
        ],
      },
      {
        type: "columns",
        columns: [
          {
            title: "Eligibility",
            paragraphs: [
              "Personal loans are given to any individual after assessing his/her CIBIL (Credit Information Bureau Limited) score. This is a national credit rating system and recognized by all banks as authority to judge the creditworthiness of any person.",
            ],
          },
          {
            title: "Benefits",
            paragraphs: [
              "Unlike the other secured form of loans, the tenure period of the personal loan is very short, typically 1-5 years (depends on the requirement and amount eligibility). Thus, you will not have to feel the burden of paying the loan amount over many years.",
            ],
          },
        ],
      },
      { type: "why", title: "Why Arena Financial Services", style: "bullets", items: STANDARD_WHY },
    ],
  },
  {
    slug: "business-loan",
    loanType: "Business Loan - Unsecured",
    headline:
      "Business Loan / Unsecured loan (or Business installment loan) is a short-term unsecured loan of 1-5 years provided by banks and NBFCs without asking for any collateral, guarantor or hypothecation of any assets.",
    metaTitle: "Business Loan (Unsecured)",
    metaDescription:
      "Short-term unsecured business loans of 1-5 years from banks and NBFCs, with no collateral, guarantor or hypothecation. Eligibility and how Arena Financial Services helps.",
    facts: ["Unsecured", "1-5 years", "Age 21-65", "3 years in business"],
    sections: [
      {
        type: "text",
        paragraphs: [
          "The usage of a business loan is left to the discretion of the borrower and can be utilized for working capital purposes, meeting short-term cash flow requirements etc.",
        ],
      },
      {
        type: "text",
        title: "Eligibility",
        paragraphs: [
          "A self-employed individual/business owner in the age group of 21 to 65 years can apply for the business loan. The annual turnover required for eligibility will vary from bank to bank. The business needs to be in continuity for the last 3 years with positive trends in turnover and profit for the last 2 years.",
        ],
      },
      {
        type: "why",
        title: "Why Arena Financial Services",
        style: "titled",
        items: [
          {
            title: "Hassle-free disbursement",
            text: "Once all documents are approved, you can avail your money.",
          },
          {
            title: "Low-interest rates",
            text: "We at Arena Financial Services make sure that customer applications go to the best market partners, providing our customers the lowest interest rates on business loans.",
          },
          {
            title: "No collateral",
            text: "Get a commercial loan without any type of security or collateral.",
          },
          {
            title: "No hidden charges",
            text: "We do not charge any fee as per our policy during the whole process.",
          },
        ],
      },
    ],
  },
  {
    slug: "home-loan",
    loanType: "Home Loans",
    headline:
      "A home loan or housing loan is the money acquired by people for a fixed period of time from banks or other organizations to purchase, build, repair or revamp a residential property.",
    metaTitle: "Home Loan",
    metaDescription:
      "Home purchase, home improvement and home construction loans from banks and NBFCs, arranged through Arena Financial Services.",
    facts: [],
    sections: [
      {
        type: "text",
        paragraphs: [
          "Banks charge interest on the amount of money obtained, which must be paid by the borrower alongside the principal amount.",
        ],
      },
      {
        type: "cards",
        title: "Three types of home loan",
        items: [
          {
            title: "Home Purchase Loan",
            text: "This type of loan is a simple home loan that allows you to purchase a new residential property.",
          },
          {
            title: "Home Improvement Loan",
            text: "If you ever wanted to renovate your home with a new aesthetic look or just wanted to structurally enhance and strengthen it, this type of home loan is what you're looking for. It is basically concerned with the costs to renovate or repair your existing home.",
          },
          {
            title: "Home Construction Loan",
            text: "This type of loan is taken when the borrower wants to construct a new home on a given plot of land.",
          },
        ],
      },
      { type: "why", title: "Why Arena Financial Services", style: "bullets", items: STANDARD_WHY },
    ],
  },
  {
    slug: "loan-against-property",
    loanType: "Loan Against Property",
    headline:
      "Mortgage Loan or Loans Against Property (LAPs) are secured loans offered by banks and financial institutions using one or more properties owned by you as collateral.",
    metaTitle: "Loan Against Property (LAP)",
    metaDescription:
      "Secured loans against residential or commercial property from banks and financial institutions. Benefits, flexible tenure and how Arena Financial Services helps.",
    facts: ["Secured against property"],
    sections: [
      {
        type: "text",
        paragraphs: [
          "These are long-term loans and repayment periods can be anything from 10 years to 15 years. The rate of interest for the loan and the loan amount varies on a case by case basis depending on the type of property and other factors specified by the lender.",
        ],
      },
      {
        type: "callout",
        text: "It is important to remember that the property which you are putting up for your loan as security should be free of any encumbrance (i.e. it is not pledged as security for any purpose or any other loan).",
      },
      {
        type: "text",
        title: "Benefits",
        paragraphs: [
          "Loans against property is a highly preferred form of loan in India. Along with being cost-effective, these loans are easy to avail and repay due to the relatively low rate of interest and longer tenure.",
        ],
      },
      {
        type: "why",
        title: "Why Arena Financial Services",
        style: "titled",
        items: [
          {
            title: "Easily avail high-value loans",
            text: "We at Arena Financial Services make sure to provide you the maximum loan amount against your property.",
          },
          {
            title: "Hassle-free process",
            text: "The eligibility criterion for the loan against property is simple and quick. All you have to be is the owner of any residential or commercial property. The processing time is very short with minimal documentation requirement.",
          },
          {
            title: "Flexible tenure",
            text: "You can avail the loan amount for a very long period of time. The tenure period for the loan against property varies from 5-20 years with easy monthly EMIs.",
          },
          {
            title: "Easy repayments",
            text: "You can easily repay the loan amount in monthly installments. Just pay the minimal amount of interest only on the utilized amount of loan. You can also prepay or part-prepay your loan amount at minimal charges.",
          },
        ],
      },
    ],
  },
  {
    slug: "overdraft",
    loanType: "Overdraft",
    headline:
      "An overdraft is a facility provided by a lender such as a bank or non-banking financial company on deposit accounts of their customers.",
    metaTitle: "Overdraft",
    metaDescription:
      "How an overdraft facility works, secured and unsecured overdrafts, and its benefits over a standard loan. Arranged through Arena Financial Services.",
    facts: ["Fixed interest rate", "No prepayment charges"],
    sections: [
      {
        type: "text",
        paragraphs: [
          "It is a type of loan which you borrow up to the limit permitted through your account with the lender. It basically means that you can withdraw extra money from your bank account past the amount of deposit you have in it. You are charged interest on the amount you borrowed. Please note that the interest rate levied on the borrowed amount, in this case, is fixed and not floating.",
        ],
      },
      {
        type: "columns",
        columns: [
          {
            title: "How the overdraft facility works",
            paragraphs: [
              "Borrowing through overdraft is just like borrowing a loan from the bank. Some customers are pre-entitled to avail the overdraft facility by the lender (bank or NBFC) while some have to take approval. When the pre-entitled customers withdraw extra money from their account, their outstanding goes positive and the overdraft facility is activated automatically. The customers who require the lender's approval to avail the overdraft facility have to submit their request to their lender either in writing or through the internet banking portal. Overdraft taken against bank account is considered unsecured overdraft while the overdraft where collateral is pledged is considered secured overdraft.",
            ],
          },
          {
            title: "Benefits of the overdraft facility",
            paragraphs: [
              "Overdraft is a credit facility which you can use in a time of financial emergency. In a loan, a payment schedule is set and you have to pay as per that payment schedule. If you want to prepay a loan, usually a prepayment charge is levied. However, this is not the case with the overdraft facility. When you repay the amount borrowed through overdraft you do not pay prepayment charges. Also, you need not repay the overdraft in EMIs. You can repay the borrowed amount cumulatively. The interest is calculated for the time you had the borrowed amount. The overdraft facility is usually cheaper and more easily accessible than loans.",
            ],
          },
        ],
      },
      {
        type: "callout",
        text: "It is to be noted that the overdraft facility is just a revolving short-term credit facility. Avail it if you need funds in an emergency situation and return them asap so that your interest pay-out doesn't pile up.",
      },
    ],
  },
  {
    slug: "term-loan",
    loanType: "Term Loans",
    headline:
      "A Term loan is a loan from a bank for a specific amount that has a specified repayment schedule and a fixed or floating interest rate.",
    metaTitle: "Term Loan",
    metaDescription:
      "Term loans from banks with a specified repayment schedule, for equipment, real estate or working capital over one to 25 years.",
    facts: ["1-25 years", "Collateral required", "Fixed or variable rate"],
    sections: [
      {
        type: "text",
        paragraphs: [
          "For example, many banks have Term loan programs that can offer small businesses the cash they need to operate from month to month. Often, a small business uses the cash from a Term loan to purchase fixed assets such as equipment for its production process.",
          "A Term loan can be used for equipment, real estate or working capital paid off between one and 25 years. The loan carries a fixed or variable interest rate, monthly or quarterly repayment schedule and a set maturity date. The loan requires collateral and a rigorous approval process to reduce the risk of default. A Term loan is appropriate for an established small business with sound financial statements and a substantial down payment to minimize payment amounts and total loan cost.",
        ],
      },
    ],
  },
  {
    slug: "short-term-finance",
    loanType: "Short Term Finance",
    headline:
      "We, at Arena Financial Services, offer Short Term Credit/Finance from leading lenders for a 10 months duration.",
    metaTitle: "Short Term Finance",
    metaDescription:
      "Short term credit and finance from leading lenders for a 10 months duration, for urgent fund requirements.",
    facts: ["10 months duration"],
    sections: [
      {
        type: "highlight",
        value: "10 months",
        label: "Duration",
        text: "We are there to help you with our short-term finance products for your urgent fund requirements keeping time sensitivity as the topmost priority. The process is quick and we will make sure it completes your urgent requirements.",
      },
    ],
  },
  {
    slug: "project-funding",
    loanType: "Project Funding",
    headline:
      "Project Finance is the long-term financing of infrastructure and industrial projects based upon projected cash flows and contractual agreements.",
    metaTitle: "Project Funding",
    metaDescription:
      "Long-term financing of infrastructure and industrial projects based on projected cash flows, arranged through Arena Financial Services.",
    facts: ["Long-term financing"],
    sections: [
      {
        type: "text",
        paragraphs: [
          "Project Finance is a tool that enables the sponsor to finance a project based solely upon the strength of the project, without recourse to the sponsor company.",
          "We at Arena Financial Services are among the leading organizations in the industry, actively involved in presenting a beautiful collection of Project Funding Services for our valuable customers. Offered assortments of these services are rendered by highly experienced professionals as per the set industry norms. Offered services are highly demanded among the clients for their timely completion and budget-friendly prices.",
        ],
      },
    ],
  },
  {
    slug: "sme-loan",
    loanType: "SME Loan",
    headline:
      "Small and medium enterprises are critical for the country's economic and social development.",
    metaTitle: "SME Loan",
    metaDescription:
      "Finance for small and medium enterprises: facilities offered to SME units and eligibility criteria.",
    facts: [],
    sections: [
      {
        type: "text",
        paragraphs: [
          "SME is the biggest employment provider next to agriculture. Access to financial services is vital for the SME sector to survive in any economy. SME Loan is offered to fund small and medium-sized enterprises. There are various banks in India that work hard to provide SME finance to small and medium enterprises.",
        ],
      },
      {
        type: "checklist",
        title: "Facilities offered to SME units",
        items: [
          "Term loan or demand loan or deferred payment guarantee",
          "Working capital through cash credit, overdraft etc.",
          "Bill purchase or discounting",
          "Export credit facilities",
          "Foreign or inland letter of credit",
          "A standby letter of credit",
        ],
      },
      {
        type: "numbered",
        title: "Eligibility criteria",
        intro: "The following entities are eligible to avail SME loan",
        items: [
          "Sole proprietorship firms / Partnership firms / Private limited companies / Public limited companies",
          "Manufacturing, trading and service units",
          "The firms must have made profits in the last two years",
        ],
      },
    ],
  },
];

export const contentBySlug = Object.fromEntries(serviceContent.map((c) => [c.slug, c]));
