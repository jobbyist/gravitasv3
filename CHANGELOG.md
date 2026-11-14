# Changelog

All notable changes to GRAVITAS.WTF. Dates are SAST.

## [Prompt 01] Rebrand, platform foundation and auth — 2026-11-14

### Added
- **Brand**: GRAVITAS.WTF identity on top of the existing v3 design system (Obsidian palette, signal gradient, Space Grotesk / Inter). Wordmark suffix changed from `v3` to `.WTF`; manifesto *Building things that probably shouldn’t exist. Until they do.* and tagline *Building what comes next. Now.*
- **Homepage**: hero, What We Do, Selected Work, The Gravitas Approach, Dispatch (live from the database), Building Gravitas podcast preview, Upcoming Ecosystem (Community and Origin, January 2027) and Work With Us.
- **Navigation**: Home, Studio, Portfolio, Dispatch, About, an Ecosystem menu (Community, Origin), Sign In and Client Portal; accessible mobile menu and skip link.
- **Routes**: `/studio`, `/portfolio` (filterable; Scoutr and The Mannuh Project hidden; Monogamy as Coming Soon), `/dispatch`, `/dispatch/$slug`, `/about`, `/contact`, `/partners`, `/community`, `/origin`, `/legal/{privacy,terms,cookies}`, `/sign-in`, `/auth/callback`, `/client-portal`, `/admin`, `/admin/funding`, `/sitemap.xml`.
- **Auth**: Supabase Auth with Google sign-in and passwordless email links (PKCE). `hey@gravitas.wtf` becomes `super_admin` automatically on first sign-in via the admin allowlist.
- **Database** (Supabase project GRAVITAS (v3)): `app_role` enum, `profiles`, `user_roles`, `admin_allowlist`, `audit_logs`, `notifications`, `site_settings`, `media_assets` + public `media` storage bucket, `funding_applications`, `funding_application_events`, `dispatch_articles`. RLS on every table; role helpers (`has_role`, `has_any_role`, `is_admin`, `is_staff`) callable by signed-in users only.
- **Dispatch**: five launch articles by Michael C. (29 Oct to 12 Nov 2026) with covers in the site design system.
- **Admin**: control-centre shell with Overview and a **Funding** tab: add, edit, delete and track applications; status pipeline with automatic timeline; notes; deadline alerts; requested and awarded totals by currency; audit logging.
- **SEO**: per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags, Organization, Article and Breadcrumb JSON-LD, dynamic sitemap, updated robots.txt, web app manifest.
- **Emails**: branded Supabase Auth, transactional and marketing templates (`emails/`).
- **Footer**: only Substack, Medium and WhatsApp; company registration details.
- **Tests**: route coverage, redirect safety, Markdown sanitisation, funding form validation, brand rules.

### Changed
- Contact routing: hey@ (general), partner@ (partners), legal@ (legal pages), billing@ (billing).
