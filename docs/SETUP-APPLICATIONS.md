# Receiving website enquiries

The enquiry form on /contact posts to `/api/enquiry`. Each enquiry is sent to three places:

| Channel | Goes to | Needs |
|---|---|---|
| Email | arenafinserv@gmail.com | Gmail App Password |
| Google Sheet | a sheet you own | Apps Script web app |
| WhatsApp | +91 99727 18696 | WhatsApp Business Cloud API |

Fields collected: name, mobile number, email, business name, city, loan type, amount required, message.

An enquiry counts as received if the email **or** the sheet succeeds. WhatsApp is an extra
notification. If neither email nor sheet is configured or both fail, the visitor sees an error
(and the phone numbers) instead of a false "Thank you".

Set the variables from `.env.example` in `.env.local` (local) and in
Vercel > Project > Settings > Environment Variables (production), then redeploy.
`ENQUIRY_EMAIL_TO` replaces the older `APPLY_EMAIL_TO` (the old name still works).

## 1. Email (Gmail)
1. Sign in to arenafinserv@gmail.com > Google Account > Security > turn on 2-Step Verification.
2. Go to https://myaccount.google.com/apppasswords, create an app password named "Website".
3. Set `SMTP_USER=arenafinserv@gmail.com` and `SMTP_PASS=<the 16-character password>`.

## 2. Google Sheet
1. Create a Google Sheet (e.g. "Arena enquiries"). Extensions > Apps Script.
2. Paste `docs/google-sheets-apps-script.gs`, and change `SECRET` to a long random string.
3. Deploy > New deployment > type **Web app** > Execute as **Me** > Who has access **Anyone** > Deploy.
4. Copy the web app URL into `GOOGLE_SHEETS_WEBHOOK_URL` and the same secret into `GOOGLE_SHEETS_SECRET`.

The script writes to a tab named **Enquiries v2** and creates it (with a header row) the first time.
**The columns changed in the 28 Oct 2026 revision. Earlier tabs ("Applications", "Enquiries") have different
columns: leave them as an archive, or clear their header row. The new fields go to the new tab, so nothing
is mixed up.**
After changing the script, re-deploy it (Deploy > Manage deployments > edit > New version).

## 3. WhatsApp
Automatic WhatsApp messages need the **WhatsApp Business Cloud API** (Meta). A normal WhatsApp
number cannot be messaged by a website directly.
1. Create a Meta Business account and a WhatsApp app at https://developers.facebook.com
   (WhatsApp > API setup). Add a sending phone number and note its **Phone number ID**.
2. Create a permanent access token (System User) with `whatsapp_business_messaging`.
3. Create a message template named `new_enquiry` (category Utility, language English) with body:

   `New Arena enquiry from {{1}}, mobile {{2}}. Interested in: {{3}}`

   ({{1}} = name, {{2}} = mobile, {{3}} = loan type, amount, city, business name and the start of the message.)
   If you already created `new_enquiry` with the old wording, edit it to this and wait for re-approval.
4. Set `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and `WHATSAPP_TO=919972718696`.

Business-initiated messages must use an approved template, which is why the message is a fixed
sentence with three fill-ins. The sending number must be different from the one that receives
(or the receiving number must have messaged the sender in the last 24 hours).
Meta may charge a small per-message fee.

## Testing
After deploying, send one enquiry and check the inbox, the sheet and WhatsApp. Failures are
logged in Vercel > Logs as `[enquiry] <channel> failed`.
