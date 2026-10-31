import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
import { appendToSheet, sendEmail, sendWhatsApp, type Enquiry } from "@/lib/notify";

export const runtime = "nodejs";

// Light in-memory rate limit (per server instance): 5 submissions / 10 minutes / IP.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });

  const text = await req.text();
  if (text.length > 20_000) return NextResponse.json({ ok: false, error: "Too large" }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid details" }, { status: 400 });

  // Honeypot: a filled-in hidden field means a bot. Pretend success, send nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { website, consentContact, consentPolicy, ...fields } = parsed.data;
  void website; void consentContact; void consentPolicy;
  const page = typeof (json as { page?: unknown }).page === "string" ? (json as { page: string }).page.slice(0, 100) : undefined;
  const enquiry: Enquiry = { ...fields, page, receivedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST" };

  const results = await Promise.all([sendEmail(enquiry), appendToSheet(enquiry), sendWhatsApp(enquiry)]);
  for (const r of results) {
    if (r.status === "failed") console.error(`[enquiry] ${r.channel} failed:`, r.error);
  }

  // The enquiry counts as received only if it reached a record we keep:
  // the inbox or the sheet. WhatsApp is a notification on top of that.
  const stored = results.some((r) => (r.channel === "email" || r.channel === "sheet") && r.status === "ok");
  if (!stored) {
    console.error("[enquiry] NOT delivered to email or sheet", results);
    return NextResponse.json({ ok: false, error: "Could not deliver" }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
