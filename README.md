# Arena Financial Services website

Next.js (App Router) site for Arena Financial Services.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

- Business details and feature flags: `lib/site.ts`
- Services: `lib/data.ts` and `lib/service-content.ts`
- Legal text: `content/legal/*.txt`
- Enquiry form delivery (email, Google Sheet, WhatsApp): `docs/SETUP-APPLICATIONS.md`
- Copy `.env.example` to `.env.local`; set `NEXT_PUBLIC_SITE_URL` in production.
