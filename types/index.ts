export interface Service {
  slug: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  loanType?: string;
}

export interface Partner {
  id: string;
  name: string;
  /** Path under /public, e.g. /images/partners/yes-bank.svg. Omit for text fallback. */
  logo?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string[];
  email: string;
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
