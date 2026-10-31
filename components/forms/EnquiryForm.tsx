"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { NOT_SURE, enquirySchema, loanTypeFromSlug, loanTypeOptions, type EnquiryValues } from "@/lib/enquiry";
import { SITE } from "@/lib/site";

const inputClass =
  "w-full rounded-[6px] border border-deep-200 bg-white px-3.5 py-2.5 text-deep-900 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/30";

const linkClass = "font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-600";

export function EnquiryForm() {
  // /contact?service=<service-slug> preselects that loan type.
  const preset = loanTypeFromSlug(useSearchParams().get("service"));
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { loanType: preset ?? NOT_SURE },
  });

  async function onSubmit(data: EnquiryValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      reset();
      setSent(true);
    } catch {
      // Keep the form filled in and tell the visitor honestly it did not send.
      setSubmitError(
        `Sorry, we could not send your message. Please try again, or call ${SITE.phones[0].label} / ${SITE.phones[1].label}.`,
      );
    }
  }

  return (
    <div id="enquiry" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      {/* Details */}
      <div className="flex flex-col gap-5 rounded-[20px] bg-deep-900 p-5 text-white sm:p-8">
        <h2 className="font-display text-xl font-bold">Office &amp; contact</h2>
        <ul className="flex flex-col gap-4 text-deep-100">
          <li className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary-300" />
            <span>{SITE.address.full}</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary-300" />
            <span>
              <a href={SITE.phones[0].href} className="hover:text-white">
                {SITE.phones[0].label}
              </a>
              {" / "}
              <a href={SITE.phones[1].href} className="hover:text-white">
                {SITE.phones[1].label}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-primary-300" />
            <a href={`mailto:${SITE.email}`} className="hover:text-white">
              {SITE.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-primary-300" />
            <span>
              <span className="block font-semibold text-white">Office hours</span>
              {SITE.hoursLong}
            </span>
          </li>
        </ul>
      </div>

      {/* Form */}
      <div className="brutal rounded-[20px] bg-white p-5 sm:p-8">
        {sent ? (
          <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 text-center">
            <CheckCircle2 className="h-10 w-10 text-primary-600" />
            <h3 className="font-display text-xl font-bold text-deep-900">
              Thank you, we&apos;ll be in touch shortly.
            </h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name*" error={errors.name?.message}>
                <input type="text" autoComplete="name" {...register("name")} className={inputClass} />
              </Field>
              <Field label="Mobile number*" error={errors.mobile?.message}>
                <input type="tel" autoComplete="tel" {...register("mobile")} className={inputClass} />
              </Field>
            </div>

            <Field label="Email" error={errors.email?.message}>
              <input type="email" autoComplete="email" {...register("email")} className={inputClass} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name" error={errors.businessName?.message}>
                <input type="text" autoComplete="organization" {...register("businessName")} className={inputClass} />
              </Field>
              <Field label="City" error={errors.city?.message}>
                <input type="text" autoComplete="address-level2" {...register("city")} className={inputClass} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Loan type" error={errors.loanType?.message}>
                <select {...register("loanType")} className={inputClass}>
                  {loanTypeOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Amount required" error={errors.amount?.message}>
                <input type="text" inputMode="numeric" placeholder="e.g. 25,00,000" {...register("amount")} className={inputClass} />
              </Field>
            </div>

            <Field label="Message" error={errors.message?.message}>
              <textarea rows={3} {...register("message")} className={inputClass} />
            </Field>

            <label className="flex items-start gap-3 text-sm text-deep-600">
              <input
                type="checkbox"
                {...register("consentContact")}
                className="mt-0.5 h-5 w-5 shrink-0 rounded-[4px] border-deep-300 text-primary-600 focus:ring-primary-600"
              />
              <span>I authorise Arena Financial Services to contact me about my enquiry</span>
            </label>
            {errors.consentContact ? (
              <p className="-mt-2 text-sm text-red-700">{errors.consentContact.message}</p>
            ) : null}

            <label className="flex items-start gap-3 text-sm text-deep-600">
              <input
                type="checkbox"
                {...register("consentPolicy")}
                className="mt-0.5 h-5 w-5 shrink-0 rounded-[4px] border-deep-300 text-primary-600 focus:ring-primary-600"
              />
              <span>
                By accepting here you agree to Arena Financial Services&apos; Borrower Consent,{" "}
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-of-use" className={linkClass}>
                  Terms of Use
                </Link>
                .
              </span>
            </label>
            {errors.consentPolicy ? (
              <p className="-mt-2 text-sm text-red-700">{errors.consentPolicy.message}</p>
            ) : null}

            {/* Honeypot: hidden from people, filled in by simple bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...register("website")}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {submitError ? (
              <p role="alert" className="rounded-[6px] border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </p>
            ) : null}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-deep-800">
        <span className="mb-1.5 block">{label}</span>
        {children}
      </label>
      {error ? <p className="mt-1 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
