import { supabase } from "@/integrations/supabase/client";
import type { DispatchArticleRow } from "@/integrations/supabase/types";

export type ArticleSummary = Pick<
  DispatchArticleRow,
  | "slug"
  | "title"
  | "dek"
  | "category"
  | "tags"
  | "author_name"
  | "cover_image"
  | "reading_minutes"
  | "published_at"
  | "featured"
>;

const SUMMARY_COLUMNS =
  "slug, title, dek, category, tags, author_name, cover_image, reading_minutes, published_at, featured";

/** Published articles, newest first. RLS hides drafts and future-dated posts. */
export async function listArticles(limit = 50): Promise<ArticleSummary[]> {
  const { data, error } = await supabase
    .from("dispatch_articles")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("Dispatch: could not load articles", error.message);
    return [];
  }
  return (data ?? []) as ArticleSummary[];
}

export async function getArticle(slug: string): Promise<DispatchArticleRow | null> {
  const { data, error } = await supabase
    .from("dispatch_articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error("Dispatch: could not load article", error.message);
    return null;
  }
  return data;
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  }).format(new Date(value));
}
