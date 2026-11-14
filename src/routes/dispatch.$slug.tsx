import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { PageShell, buttonStyles } from "@/components/site/page-shell";
import { formatDate, getArticle, listArticles } from "@/lib/dispatch";
import { renderMarkdown } from "@/lib/markdown";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/dispatch/$slug")({
  loader: async ({ params }) => {
    const article = await getArticle(params.slug);
    if (!article) throw notFound();
    const related = (await listArticles(4)).filter((a) => a.slug !== article.slug).slice(0, 3);
    return { article, html: renderMarkdown(article.body_md), related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { article } = loaderData;
    const path = `/dispatch/${article.slug}`;
    return pageHead({
      title: article.title,
      description: article.meta_description ?? article.dek ?? article.title,
      path,
      image: article.og_image ?? article.cover_image,
      type: "article",
      publishedTime: article.published_at,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.meta_description ?? article.dek ?? undefined,
          image: article.og_image ? absoluteUrl(article.og_image) : undefined,
          datePublished: article.published_at,
          dateModified: article.updated_at,
          author: { "@type": "Person", name: article.author_name },
          publisher: { "@type": "Organization", name: "Gravitas", url: absoluteUrl("/") },
          mainEntityOfPage: absoluteUrl(path),
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Dispatch", path: "/dispatch" },
          { name: article.title, path },
        ]),
      ],
    });
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Article not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          It may have moved, or it hasn’t been published yet.
        </p>
        <Link to="/dispatch" className={`${buttonStyles.secondary} mt-8`}>
          Back to Dispatch
        </Link>
      </div>
    </PageShell>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article, html, related } = Route.useLoaderData();

  return (
    <PageShell>
      <article>
        <header className="mx-auto max-w-3xl px-5 pb-10 pt-14 md:px-8 lg:pt-20">
          <nav aria-label="Breadcrumb" className="meta-label">
            <Link to="/dispatch" className="hover:text-foreground">
              Dispatch
            </Link>
            {article.category ? <> / {article.category}</> : null}
          </nav>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            {article.title}
          </h1>
          {article.dek ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.dek}</p>
          ) : null}
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-foreground">{article.author_name}</span> ·{" "}
            <time dateTime={article.published_at ?? undefined}>
              {formatDate(article.published_at)}
            </time>{" "}
            · {article.reading_minutes ?? 5} min read
          </p>
        </header>

        {article.cover_image ? (
          <div className="mx-auto max-w-5xl px-5 md:px-8">
            <img
              src={article.cover_image}
              alt=""
              width={1600}
              height={900}
              className="aspect-video w-full rounded-xl border border-border object-cover"
            />
          </div>
        ) : null}

        <div
          className="prose-gravitas mx-auto max-w-3xl px-5 pb-16 pt-12 md:px-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {article.tags.length ? (
          <div className="mx-auto flex max-w-3xl flex-wrap gap-2 px-5 md:px-8">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </article>

      {related.length ? (
        <section className="mx-auto mt-20 max-w-7xl border-t border-border px-5 pt-12 md:px-8">
          <p className="eyebrow">More from Dispatch</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} to="/dispatch/$slug" params={{ slug: a.slug }} className="group">
                {a.cover_image ? (
                  <img
                    src={a.cover_image}
                    alt=""
                    width={1600}
                    height={900}
                    loading="lazy"
                    className="aspect-video w-full rounded-lg border border-border object-cover"
                  />
                ) : null}
                <h3 className="mt-3 font-display text-lg font-semibold group-hover:underline">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
