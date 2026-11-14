-- GRAVITAS.WTF platform foundation (Prompt 01)
-- Roles, profiles, admin allowlist, audit log, notifications, site settings,
-- media library, funding applications and the Dispatch article store.
-- Every table has Row Level Security enabled.

create extension if not exists citext with schema extensions;

-- ---------------------------------------------------------------- roles ---

create type public.app_role as enum (
  'super_admin',
  'admin',
  'editor',
  'client_manager',
  'finance_manager',
  'client',
  'member'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email extensions.citext,
  full_name text,
  avatar_url text,
  company text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_role not null,
  granted_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create index user_roles_user_id_idx on public.user_roles (user_id);

-- Emails listed here receive their role automatically the first time they sign in.
create table public.admin_allowlist (
  email extensions.citext primary key,
  role public.app_role not null,
  created_at timestamptz not null default now()
);

insert into public.admin_allowlist (email, role) values ('hey@gravitas.wtf', 'super_admin');

-- Role checks run as SECURITY DEFINER so RLS policies can call them without recursion.
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  );
$$;

create or replace function public.has_any_role(_user_id uuid, _roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = any (_roles)
  );
$$;

create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_any_role(_user_id, array['super_admin', 'admin']::public.app_role[]);
$$;

create or replace function public.is_staff(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_any_role(
    _user_id,
    array['super_admin', 'admin', 'editor', 'client_manager', 'finance_manager']::public.app_role[]
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- New sign-ups get a profile, the member role, and any allowlisted role.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  allow_role public.app_role;
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'member')
  on conflict do nothing;

  select role into allow_role from public.admin_allowlist where email = new.email;
  if allow_role is not null then
    insert into public.user_roles (user_id, role)
    values (new.id, allow_role)
    on conflict do nothing;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.admin_allowlist enable row level security;

create policy "Users read their own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or public.is_staff((select auth.uid())));
create policy "Users update their own profile" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "Admins manage profiles" on public.profiles
  for all to authenticated using (public.is_admin((select auth.uid()))) with check (public.is_admin((select auth.uid())));

create policy "Users read their own roles" on public.user_roles
  for select to authenticated using (user_id = (select auth.uid()) or public.is_admin((select auth.uid())));
create policy "Super admins manage roles" on public.user_roles
  for all to authenticated
  using (public.has_role((select auth.uid()), 'super_admin'))
  with check (public.has_role((select auth.uid()), 'super_admin'));

create policy "Super admins manage the allowlist" on public.admin_allowlist
  for all to authenticated
  using (public.has_role((select auth.uid()), 'super_admin'))
  with check (public.has_role((select auth.uid()), 'super_admin'));

-- ------------------------------------------------------------ audit log ---

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index audit_logs_created_at_idx on public.audit_logs (created_at desc);
create index audit_logs_actor_id_idx on public.audit_logs (actor_id);

alter table public.audit_logs enable row level security;

create policy "Admins read the audit log" on public.audit_logs
  for select to authenticated using (public.is_admin((select auth.uid())));
create policy "Staff write their own audit entries" on public.audit_logs
  for insert to authenticated
  with check (actor_id = (select auth.uid()) and public.is_staff((select auth.uid())));

-- -------------------------------------------------------- notifications ---

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_id_idx on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

create policy "Users read their own notifications" on public.notifications
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users mark their own notifications read" on public.notifications
  for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "Staff create notifications" on public.notifications
  for insert to authenticated with check (public.is_staff((select auth.uid())));

-- -------------------------------------------------------- site settings ---

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  is_public boolean not null default false,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

create policy "Anyone reads public settings" on public.site_settings
  for select to anon, authenticated using (is_public or public.is_staff((select auth.uid())));
create policy "Admins manage settings" on public.site_settings
  for all to authenticated using (public.is_admin((select auth.uid()))) with check (public.is_admin((select auth.uid())));

insert into public.site_settings (key, value, is_public) values
  ('contact', '{"general": "hey@gravitas.wtf", "legal": "legal@gravitas.wtf", "partners": "partner@gravitas.wtf", "billing": "billing@gravitas.wtf", "whatsapp": "+27680200749"}', true),
  ('company', '{"legal_name": "Gravitas Industries (Pty) Ltd", "registration_number": "2024/596436/07", "country": "South Africa", "founder": "Michael E. Chigbu"}', true),
  ('feature_flags', '{"community": false, "origin": false, "client_portal": false, "ai_assistant": false, "automated_publishing": false}', true);

-- --------------------------------------------------------- media library ---

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,
  alt text,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

alter table public.media_assets enable row level security;

create policy "Staff manage media" on public.media_assets
  for all to authenticated using (public.is_staff((select auth.uid()))) with check (public.is_staff((select auth.uid())));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif', 'audio/mpeg', 'audio/mp4', 'application/pdf']
)
on conflict (id) do nothing;

create policy "Staff upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_staff((select auth.uid())));
create policy "Staff update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_staff((select auth.uid())));
create policy "Staff delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_staff((select auth.uid())));

-- ---------------------------------------------------- funding applications ---

create table public.funding_applications (
  id uuid primary key default gen_random_uuid(),
  programme text not null,
  funder text not null,
  kind text not null default 'grant'
    check (kind in ('grant', 'accelerator', 'equity', 'debt', 'competition', 'credits', 'partnership', 'other')),
  status text not null default 'researching'
    check (status in ('researching', 'drafting', 'submitted', 'under_review', 'shortlisted', 'interview', 'awarded', 'rejected', 'withdrawn')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  venture text,
  amount_requested numeric(14, 2),
  amount_awarded numeric(14, 2),
  currency text not null default 'ZAR',
  deadline date,
  submitted_on date,
  decision_expected date,
  next_action text,
  next_action_due date,
  url text,
  contact_name text,
  contact_email text,
  notes text,
  owner_id uuid references auth.users (id) on delete set null,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index funding_applications_status_idx on public.funding_applications (status);
create index funding_applications_deadline_idx on public.funding_applications (deadline);

create trigger funding_applications_set_updated_at
before update on public.funding_applications
for each row execute function public.set_updated_at();

create table public.funding_application_events (
  id bigint generated always as identity primary key,
  application_id uuid not null references public.funding_applications (id) on delete cascade,
  kind text not null default 'note' check (kind in ('note', 'status_change', 'created')),
  body text,
  from_status text,
  to_status text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index funding_application_events_app_idx on public.funding_application_events (application_id, created_at desc);

alter table public.funding_applications enable row level security;
alter table public.funding_application_events enable row level security;

create policy "Funding team manages applications" on public.funding_applications
  for all to authenticated
  using (public.has_any_role((select auth.uid()), array['super_admin', 'admin', 'finance_manager']::public.app_role[]))
  with check (public.has_any_role((select auth.uid()), array['super_admin', 'admin', 'finance_manager']::public.app_role[]));

create policy "Funding team manages application events" on public.funding_application_events
  for all to authenticated
  using (public.has_any_role((select auth.uid()), array['super_admin', 'admin', 'finance_manager']::public.app_role[]))
  with check (public.has_any_role((select auth.uid()), array['super_admin', 'admin', 'finance_manager']::public.app_role[]));

-- Status changes are logged to the application's timeline automatically.
create or replace function public.log_funding_status_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.funding_application_events (application_id, kind, to_status, created_by)
    values (new.id, 'created', new.status, (select auth.uid()));
  elsif new.status is distinct from old.status then
    insert into public.funding_application_events (application_id, kind, from_status, to_status, created_by)
    values (new.id, 'status_change', old.status, new.status, (select auth.uid()));
  end if;
  return new;
end;
$$;

create trigger funding_applications_log_status
after insert or update of status on public.funding_applications
for each row execute function public.log_funding_status_change();

-- ------------------------------------------------------ Dispatch articles ---

create table public.dispatch_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  dek text,
  body_md text not null default '',
  category text,
  tags text[] not null default '{}',
  author_name text not null default 'Michael C.',
  cover_image text,
  og_image text,
  reading_minutes integer,
  meta_description text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  published_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index dispatch_articles_published_idx on public.dispatch_articles (status, published_at desc);

create trigger dispatch_articles_set_updated_at
before update on public.dispatch_articles
for each row execute function public.set_updated_at();

alter table public.dispatch_articles enable row level security;

create policy "Anyone reads published articles" on public.dispatch_articles
  for select to anon, authenticated
  using (status = 'published' and published_at <= now());
create policy "Editors read all articles" on public.dispatch_articles
  for select to authenticated using (public.is_staff((select auth.uid())));
create policy "Editors manage articles" on public.dispatch_articles
  for all to authenticated
  using (public.has_any_role((select auth.uid()), array['super_admin', 'admin', 'editor']::public.app_role[]))
  with check (public.has_any_role((select auth.uid()), array['super_admin', 'admin', 'editor']::public.app_role[]));
