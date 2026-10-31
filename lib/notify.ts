import nodemailer from "nodemailer";
import type { EnquiryValues } from "@/lib/enquiry";

/**
 * Delivery channels for a website enquiry. Each one is configured through
 * environment variables (see .env.example) and quietly reports "skipped"
 * when it is not configured, so a missing channel never breaks the others.
 */

export type ChannelResult = { channel: string; status: "ok" | "skipped" | "failed"; error?: string };

export type Enquiry = Omit<EnquiryValues, "website" | "consentContact" | "consentPolicy"> & {
  page?: string;
  receivedAt: string;
};

const FIELDS: [keyof Enquiry, string][] = [
  ["receivedAt", "Received"],
  ["name", "Name"],
  ["mobile", "Mobile"],
  ["email", "Email"],
  ["businessName", "Business name"],
  ["city", "City"],
  ["loanType", "Loan type"],
  ["amount", "Amount required"],
  ["message", "Message"],
  ["page", "Submitted from"],
];

const val = (a: Enquiry, k: keyof Enquiry) => String(a[k] ?? "").trim();
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendEmail(a: Enquiry): Promise<ChannelResult> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return { channel: "email", status: "skipped" };
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: (process.env.SMTP_PORT ?? "465") === "465",
      auth: { user, pass },
    });
    const rows = FIELDS.map(([k, label]) => [label, val(a, k)] as const).filter(([, v]) => v);
    await transport.sendMail({
      from: `"Arena Financial Services website" <${user}>`,
      to: process.env.ENQUIRY_EMAIL_TO ?? process.env.APPLY_EMAIL_TO ?? "arenafinserv@gmail.com",
      replyTo: val(a, "email") || undefined,
      subject: `New enquiry: ${val(a, "loanType") || "General"} — ${val(a, "name")}`,
      text: rows.map(([l, v]) => `${l}: ${v}`).join("\n"),
      html:
        `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
        rows
          .map(([l, v]) => `<tr><td style="color:#555;border-bottom:1px solid #eee">${esc(l)}</td><td style="border-bottom:1px solid #eee"><b>${esc(v)}</b></td></tr>`)
          .join("") +
        `</table>`,
    });
    return { channel: "email", status: "ok" };
  } catch (e) {
    return { channel: "email", status: "failed", error: (e as Error).message };
  }
}

export async function appendToSheet(a: Enquiry): Promise<ChannelResult> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return { channel: "sheet", status: "skipped" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.GOOGLE_SHEETS_SECRET ?? "",
        row: FIELDS.map(([k]) => val(a, k)),
        headers: FIELDS.map(([, l]) => l),
      }),
      redirect: "follow",
    });
    const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !body?.ok) throw new Error(body?.error ?? `HTTP ${res.status}`);
    return { channel: "sheet", status: "ok" };
  } catch (e) {
    return { channel: "sheet", status: "failed", error: (e as Error).message };
  }
}

/** WhatsApp Business Cloud API, using an approved template (see docs/SETUP-APPLICATIONS.md). */
export async function sendWhatsApp(a: Enquiry): Promise<ChannelResult> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) return { channel: "whatsapp", status: "skipped" };
  // WhatsApp template parameters cannot contain newlines/tabs or long runs of spaces.
  const clean = (s: string) => s.replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").trim() || "-";
  const summary = [val(a, "loanType"), val(a, "amount") && `amount ${val(a, "amount")}`, val(a, "city"), val(a, "businessName"), val(a, "message").slice(0, 120)]
    .filter(Boolean)
    .join(", ");
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: process.env.WHATSAPP_TO ?? "919972718696",
        type: "template",
        template: {
          name: process.env.WHATSAPP_TEMPLATE ?? "new_enquiry",
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG ?? "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: clean(val(a, "name")) },
                { type: "text", text: clean(val(a, "mobile")) },
                { type: "text", text: clean(summary) },
              ],
            },
          ],
        },
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
    return { channel: "whatsapp", status: "ok" };
  } catch (e) {
    return { channel: "whatsapp", status: "failed", error: (e as Error).message };
  }
}
