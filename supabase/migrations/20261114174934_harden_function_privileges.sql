-- Trigger functions are never called over the API; role checks are for signed-in users only.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.log_funding_status_change() from public, anon, authenticated;

revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.has_any_role(uuid, public.app_role[]) from public, anon;
revoke execute on function public.is_admin(uuid) from public, anon;
revoke execute on function public.is_staff(uuid) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.has_any_role(uuid, public.app_role[]) to authenticated;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_staff(uuid) to authenticated;

-- Anonymous visitors read public settings without touching role functions.
drop policy "Anyone reads public settings" on public.site_settings;
create policy "Visitors read public settings" on public.site_settings
  for select to anon using (is_public);
create policy "Signed-in users read public settings" on public.site_settings
  for select to authenticated using (is_public or public.is_staff((select auth.uid())));

-- Cover foreign keys with indexes.
create index dispatch_articles_created_by_idx on public.dispatch_articles (created_by);
create index funding_application_events_created_by_idx on public.funding_application_events (created_by);
create index funding_applications_created_by_idx on public.funding_applications (created_by);
create index funding_applications_owner_id_idx on public.funding_applications (owner_id);
create index media_assets_uploaded_by_idx on public.media_assets (uploaded_by);
create index site_settings_updated_by_idx on public.site_settings (updated_by);
create index user_roles_granted_by_idx on public.user_roles (granted_by);
