# Email templates

Branded HTML emails for GRAVITAS.WTF, built from `build.py` into `dist/`:

```sh
python3 emails/build.py
```

| Folder | Used by | Placeholders |
| --- | --- | --- |
| `dist/supabase/` | Supabase → Authentication → Email Templates | Go templates: `{{ .ConfirmationURL }}`, `{{ .Email }}`, `{{ .NewEmail }}`, `{{ .Token }}` |
| `dist/transactional/` | Resend (enquiries, consultations, invoices, receipts, internal lead alerts) | `{{first_name}}`, `{{invoice_number}}`, … |
| `dist/marketing/` | Resend broadcasts (Dispatch digest, welcome) | `{{lead_title}}`, `{{unsubscribe_url}}`, … |

Each file starts with a `<!-- Subject: … -->` comment holding the suggested subject line.

The emblem loads from `https://gravitas.wtf/email/emblem-96.png` (in `public/email/`), so it only appears once this branch is deployed to production.

## Supabase Auth setup

1. Authentication → URL Configuration: Site URL `https://gravitas.wtf`; redirect URLs `https://gravitas.wtf/auth/callback`, `https://*.vercel.app/auth/callback`, `http://localhost:5173/auth/callback`.
2. Authentication → Email Templates: paste each `dist/supabase/*.html` file (Magic Link, Confirm signup, Invite user, Change email address, Reset password, Reauthentication) and set the subject from the file's first line.
3. Authentication → SMTP: host `smtp.resend.com`, port 465, user `resend`, password = Resend API key, sender `hey@gravitas.wtf` (domain verified in Resend). Until this is set, Supabase's built-in sender is rate-limited to a few emails per hour.
