import { z } from "zod";
import { services } from "@/lib/data";

export const NOT_SURE = "Not sure yet";

/** Loan type dropdown: every service in lib/data.ts, plus "Not sure yet". */
export const loanTypeOptions = [...services.map((s) => s.title), NOT_SURE];

/** Maps a /contact?service=<slug> value to its dropdown option. */
export function loanTypeFromSlug(slug: string | null | undefined) {
  return services.find((s) => s.slug === slug)?.title;
}

const indianMobileRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  mobile: z
    .string()
    .min(1, "Please enter your mobile number")
    .refine((val) => indianMobileRegex.test(val.replace(/\s/g, "")), {
      message: "Please enter a valid Indian mobile number",
    }),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Please enter a valid email address",
    }),
  businessName: z.string().max(120).optional(),
  city: z.string().max(80).optional(),
  loanType: z
    .string()
    .optional()
    .refine((val) => !val || loanTypeOptions.includes(val), { message: "Please choose a loan type" }),
  amount: z.string().max(40).optional(),
  message: z.string().max(1000, "Please keep your message under 1000 characters").optional(),
  // Honeypot: real visitors never see or fill this.
  website: z.string().max(0).optional(),
  consentContact: z.literal(true, { message: "Please authorise us to contact you" }),
  consentPolicy: z.literal(true, { message: "Please accept the policy terms" }),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
