/**
 * Database types for the GRAVITAS (v3) Supabase project.
 *
 * Mirrors `supabase gen types typescript` output for the tables the app reads and
 * writes. Regenerate when the schema changes (Supabase MCP or CLI) and replace
 * this file.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole =
  "super_admin" | "admin" | "editor" | "client_manager" | "finance_manager" | "client" | "member";

export const APP_ROLES: readonly AppRole[] = [
  "super_admin",
  "admin",
  "editor",
  "client_manager",
  "finance_manager",
  "client",
  "member",
];

type Table<Row, Required extends keyof Row> = {
  Row: Row;
  Insert: Partial<Row> & Pick<Row, Required>;
  Update: Partial<Row>;
  Relationships: [];
};

export type DispatchArticleRow = {
  id: string;
  slug: string;
  title: string;
  dek: string | null;
  body_md: string;
  category: string | null;
  tags: string[];
  author_name: string;
  cover_image: string | null;
  og_image: string | null;
  reading_minutes: number | null;
  meta_description: string | null;
  featured: boolean;
  status: string;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type FundingApplicationRow = {
  id: string;
  programme: string;
  funder: string;
  kind: string;
  status: string;
  priority: string;
  venture: string | null;
  amount_requested: number | null;
  amount_awarded: number | null;
  currency: string;
  deadline: string | null;
  submitted_on: string | null;
  decision_expected: string | null;
  next_action: string | null;
  next_action_due: string | null;
  url: string | null;
  contact_name: string | null;
  contact_email: string | null;
  notes: string | null;
  owner_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type FundingApplicationEventRow = {
  id: number;
  application_id: string;
  kind: string;
  body: string | null;
  from_status: string | null;
  to_status: string | null;
  created_by: string | null;
  created_at: string;
};

export type UserRoleRow = {
  id: string;
  user_id: string;
  role: AppRole;
  granted_by: string | null;
  created_at: string;
};

export type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  company: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteSettingRow = {
  key: string;
  value: Json;
  is_public: boolean;
  updated_by: string | null;
  updated_at: string;
};

export type AuditLogRow = {
  id: number;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Json;
  created_at: string;
};

export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.18" };
  public: {
    Tables: {
      dispatch_articles: Table<DispatchArticleRow, "slug" | "title">;
      funding_applications: Table<FundingApplicationRow, "programme" | "funder">;
      funding_application_events: Table<FundingApplicationEventRow, "application_id">;
      user_roles: Table<UserRoleRow, "user_id" | "role">;
      profiles: Table<ProfileRow, "id">;
      site_settings: Table<SiteSettingRow, "key" | "value">;
      audit_logs: Table<AuditLogRow, "action" | "entity_type">;
    };
    Views: { [_ in never]: never };
    Functions: {
      has_role: { Args: { _user_id: string; _role: AppRole }; Returns: boolean };
      has_any_role: { Args: { _user_id: string; _roles: AppRole[] }; Returns: boolean };
      is_admin: { Args: { _user_id: string }; Returns: boolean };
      is_staff: { Args: { _user_id: string }; Returns: boolean };
    };
    Enums: { app_role: AppRole };
    CompositeTypes: { [_ in never]: never };
  };
};
