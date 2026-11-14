# Setup

## Stack
TanStack Start (React 19, file-based routes in `src/routes`), Tailwind v4, Supabase (Postgres, Auth, Storage), deployed on Vercel at https://gravitas.wtf. Synced with Lovable: never force-push.

## Environment variables (Vercel → gravitasv3 → Settings → Environment Variables)

| Key | Value | Environments |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `https://klspzhpjungzenghwocl.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_Xq5Ll3Or3vmhp0sME0S0Tg_New-r2wu` | Production, Preview, Development |
| `VITE_SITE_URL` | `https://gravitas.wtf` | Production |

The client falls back to these same public values if the variables are missing, so builds work either way. Server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, AI keys) must never use the `VITE_` prefix.

## Supabase Auth
1. **Providers → Google**: enable; paste the OAuth client ID and secret from Google Cloud Console (OAuth consent screen + Web client). Authorised redirect URI in Google: `https://klspzhpjungzenghwocl.supabase.co/auth/v1/callback`.
2. **Providers → Email**: enabled; magic links on. Leave “Confirm email” on.
3. **URL Configuration**: Site URL `https://gravitas.wtf`; Redirect URLs `https://gravitas.wtf/auth/callback`, `https://*-michael-chigbus-projects*.vercel.app/auth/callback` (or your preview pattern), `http://localhost:5173/auth/callback`.
4. **Email templates + SMTP**: see `emails/README.md`.

## Roles
`super_admin`, `admin`, `editor`, `client_manager`, `finance_manager`, `client`, `member`. Everyone gets `member`. Emails in `public.admin_allowlist` receive their role on first sign-in (`hey@gravitas.wtf` → `super_admin`). Funding is visible to `super_admin`, `admin`, `finance_manager`.

To grant a role later (SQL editor):
```sql
insert into public.user_roles (user_id, role)
select id, 'editor' from auth.users where email = 'person@example.com';
```

## Database
Migrations live in `supabase/migrations/` and were applied to the GRAVITAS (v3) project via the Supabase MCP; file versions match the remote history.

## Local development
```sh
bun install
bun run dev        # http://localhost:5173
bun run lint && bunx tsc --noEmit && bun run test && bun run build
```
