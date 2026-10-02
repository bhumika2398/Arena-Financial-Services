"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const companyTypes = [
  "One person company",
  "HUF",
  "Partnership",
  "LLP",
  "Pvt Limited",
  "Public Limited",
] as const;

const loanTypes = [
  "Business Loan - Secured",
  "Business Loan - Unsecured",
  "Overdraft",
  "Cash Credit",
  "Working Capital Demand Loan",
  "Bank Guarantees",
  "Letter of Credit",
  "Export loans",
  "Packing credit",
  "Export bill discounting",
  "Term Loans",
  "Project Loans for new business",
  "Project Loans for expansion",
  "Home Loans",
  "Loan Against Property",
  "Professional Loans",
  "Personal Loans",
  "Foreign Currency loans",
  "Education loans",
  "Audit and Assurance",
  "Project reports and Cash flow",
  "Private Equity",
] as const;

const indianMobileRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

const loanApplicationSchema = z.object({
  firstName: z.string().min(2, "Please enter your first name"),
  lastName: z.string().min(2, "Please enter your last name"),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Please enter a valid email address",
    }),
  mobile: z
    .string()
    .min(1, "Please enter your mobile number")
    .refine((val) => indianMobileRegex.test(val.replace(/\s/g, "")), {
      message: "Please enter a valid Indian mobile number",
    }),
  businessName: z.string().optional(),
  companyType: z.enum(companyTypes),
  loanType: z.enum(loanTypes),
  loanAmount: z.string().optional(),
  location: z.string().optional(),
  businessAge: z.string().optional(),
  turnover: z.string().optional(),
  consentContact: z.literal(true, {
    message: "Please authorise us to contact you",
  }),
  consentPolicy: z.literal(true, {
    message: "Please accept the policy terms",
  }),
});

type LoanApplicationValues = z.infer<typeof loanApplicationSchema>;

const officeHours = [
  { day: "Mon", hours: "10am – 09pm" },
  { day: "Tue", hours: "10am – 09pm" },
  { day: "Wed", hours: "10am – 09pm" },
  { day: "Thu", hours: "10am – 09pm" },
  { day: "Fri", hours: "10am – 09pm" },
  { day: "Sat", hours: "10am – 09pm" },
  { day: "Sun", hours: "10am – 06pm" },
];

export function LoanApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<LoanApplicationValues>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: {
      companyType: "One person company",
      loanType: "Business Loan - Secured",
    },
  });

  async function onSubmit(data: LoanApplicationValues) {
    // No backend wired up — simulate a network call for the demo.
    console.log("Loan application submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-balance text-center font-display text-2xl font-bold text-deep-900 sm:text-3xl">
        Partner with 30+ Banks and Financial Institutions. Zero Hassle – Zero
        Fee.
      </h2>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* Left column: contact info */}
        <div className="flex flex-col gap-6 rounded-2xl bg-deep-900 p-5 text-white sm:p-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-deep-200">
              We are Open at
            </p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {officeHours.map((entry, i) => (
                <div
                  key={entry.day}
                  className={
                    "flex flex-col items-center gap-1 rounded-lg px-1.5 py-2 text-center " +
                    (i % 2 === 0 ? "bg-primary-600/90" : "bg-sage-600/90")
                  }
                >
                  <span className="text-xs font-bold uppercase text-white">
                    {entry.day}
                  </span>
                  <span className="text-[10px] leading-tight text-white/90">
                    {entry.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-deep-200">
              Reach us directly
            </p>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" />
              <p className="text-sm text-deep-200">
                #103,104 Ground Floor, Oxford Chambers, Rustam Bhag, Bengaluru
                560017
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" />
              <p className="text-sm text-deep-200">
                <a href="tel:+919972908696" className="hover:text-primary-300">
                  +91 9972908696
                </a>{" "}
                /{" "}
                <a href="tel:+919972718696" className="hover:text-primary-300">
                  +91 9972718696
                </a>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" />
              <p className="text-sm text-deep-200">
                <a
                  href="mailto:vinod@tiwarifinserv.com"
                  className="hover:text-primary-300"
                >
                  vinod@tiwarifinserv.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right column: form */}
        <div className="rounded-2xl border border-white/40 bg-white/70 p-5 shadow-sm sm:p-8 backdrop-blur-sm sm:backdrop-blur-md">
          {isSubmitSuccessful ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col items-center justify-center gap-4 text-center"
            >
              <CheckCircle2 className="h-12 w-12 text-primary-500" />
              <h3 className="font-display text-xl font-bold text-deep-900">
                Thank you, we&apos;ll be in touch shortly.
              </h3>
            </motion.div>
          ) : (
            <>
              <h3 className="font-display text-xl font-bold text-deep-900">
                Fill in your details
              </h3>
              <p className="mb-6 text-sm text-deep-500">
                These details will help us fast track your loan application
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First Name*" error={errors.firstName?.message}>
                    <input
                      type="text"
                      {...register("firstName")}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Last Name*" error={errors.lastName?.message}>
                    <input
                      type="text"
                      {...register("lastName")}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      type="email"
                      {...register("email")}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Mobile Number*" error={errors.mobile?.message}>
                    <input
                      type="tel"
                      {...register("mobile")}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Business Name" error={errors.businessName?.message}>
                  <input
                    type="text"
                    {...register("businessName")}
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Company Type" error={errors.companyType?.message}>
                    <select {...register("companyType")} className={selectClass}>
                      {companyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Loan Type" error={errors.loanType?.message}>
                    <select {...register("loanType")} className={selectClass}>
                      {loanTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Loan Amount" error={errors.loanAmount?.message}>
                    <input
                      type="number"
                      {...register("loanAmount")}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Location" error={errors.location?.message}>
                    <input
                      type="text"
                      {...register("location")}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="How old is your business"
                    error={errors.businessAge?.message}
                  >
                    <input
                      type="text"
                      placeholder="e.g. 3 years"
                      {...register("businessAge")}
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    label="Last 12 months turnover"
                    error={errors.turnover?.message}
                  >
                    <input
                      type="text"
                      placeholder="e.g. 50,00,000"
                      {...register("turnover")}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <label className="flex items-start gap-3 text-sm text-deep-600">
                  <input
                    type="checkbox"
                    {...register("consentContact")}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-deep-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>I authorise Arena Finserv to contact me for future Conversations</span>
                </label>
                {errors.consentContact ? (
                  <p className="-mt-3 text-sm text-red-600">
                    {errors.consentContact.message}
                  </p>
                ) : null}

                <label className="flex items-start gap-3 text-sm text-deep-600">
                  <input
                    type="checkbox"
                    {...register("consentPolicy")}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-deep-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>
                    By accepting here you agree to Arena Finserv&apos;s Borrower Consent,{" "}
                    <Link href="/privacy-policy" className="font-semibold text-primary-600 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms-of-use" className="font-semibold text-primary-600 hover:underline">
                      Terms of Use
                    </Link>
                    .
                  </span>
                </label>
                {errors.consentPolicy ? (
                  <p className="-mt-3 text-sm text-red-600">
                    {errors.consentPolicy.message}
                  </p>
                ) : null}

                <p className="text-xs text-deep-400">
                  Refer our{" "}
                  <Link href="/privacy-policy" className="font-semibold text-primary-600 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms-of-use" className="font-semibold text-primary-600 hover:underline">
                    Terms of Use
                  </Link>
                </p>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-deep-200 bg-mint px-4 py-2.5 text-deep-900 transition-all duration-200 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400/40";

// Native <select> elements: the closed/trigger box can be glass-styled, but
// the browser renders the open <option> popup itself — that native popup
// cannot be cross-browser backdrop-blurred, so only the trigger gets the
// frosted treatment here.
const selectClass =
  "w-full rounded-lg border border-white/50 bg-white/60 px-4 py-2.5 text-deep-900 backdrop-blur-sm transition-all duration-200 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-400/40";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-deep-800">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
