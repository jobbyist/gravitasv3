# Implementation checklist

Status key: ✅ done · 🟡 partial · ⬜ not started · 👤 needs Michael

## Prompt 01 — Rebrand, foundation, domain
- ✅ gravitas.wtf canonical URLs, Open Graph, sitemap, robots, manifest
- ✅ Brand identity, homepage architecture (8 sections), navigation, footer (3 socials only)
- ✅ Core routes respond: Home, Studio, Portfolio, Dispatch, About, Community, Origin, Contact, Partners, Legal
- ✅ Auth: Google + passwordless email; role model; hey@gravitas.wtf super admin
- ✅ Foundations: profiles, roles, notifications, audit log, site settings, media table + bucket
- ✅ Admin shell + Funding tab (requested by Michael)
- ✅ Email templates drafted
- 👤 Add env vars in Vercel (the Vercel connector can’t see the gravitasv3 project; see docs/SETUP.md)
- 👤 Enable Google provider in Supabase (Google Cloud OAuth client ID + secret)
- 👤 Supabase Auth URL configuration and email templates (emails/README.md)
- 👤 Resend: verify gravitas.wtf, API key in Vercel, Supabase SMTP
- 👤 Legal pages: review by a South African legal professional (POPIA, terms, cookies)
- 🟡 Domain redirects from the previous domain: confirm the old domain is attached in Vercel with a 308 to gravitas.wtf
- 👤 Confirm LOUDMOUF™ is presented as a client project, and approved URLs for LOUDMOUF™ and Cannaplug

## Prompt 02 — Studio
- 🟡 Studio overview with seven service categories
- ⬜ Individual service pages, multi-step enquiry, consultation booking, lead admin

## Prompt 03 — Portfolio
- 🟡 Filterable portfolio with approved projects, hidden projects excluded, Monogamy coming soon
- ⬜ Database-driven projects, detail pages, embeds, admin

## Prompt 04 — Dispatch
- 🟡 Article store, listing and article pages, five launch articles
- ⬜ Categories/tags pages, editor, scheduling, podcast, RSS, automated newsroom

## Prompt 05 — Gemini assistant & Origin
- 🟡 Origin coming-soon page and feature flag
- ⬜ Assistant

## Prompt 06 — Admin control centre
- 🟡 Shell, overview metrics, Funding module
- ⬜ Remaining modules

## Prompt 07 — Client portal & payments
- 🟡 Signed-in portal placeholder
- ⬜ Projects, documents, invoices, PayFast

## Prompt 08 — Funding readiness & launch audit
- ⬜
