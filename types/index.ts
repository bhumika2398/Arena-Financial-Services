export interface Service {
  slug: string;
  title: string;
  /** One line, shown on cards. */
  description: string;
  /** "business" services form the main grid; "also" are shown as a quieter row. */
  group: "business" | "also";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** Service the client used, e.g. "Working Capital". Shown on the card front. */
  service: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  /** Photo is /public/images/team/<slug>.jpg when that file exists. */
  slug: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}
