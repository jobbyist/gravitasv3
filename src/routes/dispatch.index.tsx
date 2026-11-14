import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHero, PageShell, Section } from "@/components/site/page-shell";
import { formatDate, listArticles } from "@/lib/dispatch";
import { breadcrumbJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/dispatch/")({
  loader: async () => ({ articles: await listArticles() }),
  head: () =>
    pageHead({
      title: "Dispatch",
      description:
        "Dispatch is the editorial publication of Gravitas: AI, emerging technology, venture building and the work behind our products.",
      path: "/dispatch",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Dispatch", path: "/dispatch" },
        ]),
      ],
    }),
  component: DispatchIndex,
});

function DispatchIndex() {
  const { articles } = Route.useLoaderData();
  const [lead, ...rest] = articles;

  return (
    <PageShell>
      <PageHero
        eyebrow="Dispatch"
        title="The signal from inside Gravitas."
        lede="Editorial from an operating venture studio: AI, emerging technology, entrepreneurship, product development and what we’re building next."
      />
      <Section>
        {!lead ? (
          <p className="text-sm text-muted-foreground">
            No articles yet. The first Dispatch pieces are on their way.
          </p>
        ) : (
          <>
            <Link
              to="/dispatch/$slug"
              params={{ slug: lead.slug }}
              className="group grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center"
            >
              {lead.cover_image ? (
                <img
                  src={lead.cover_image}
                  alt=""
                  width={1600}
                  height={900}
                  className="aspect-video w-full rounded-xl border border-border object-cover"
                />
              ) : null}
              <div>
                <p className="meta-label">
                  Latest · {lead.category} · {formatDate(lead.published_at)}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight group-hover:underline sm:text-4xl">
                  {lead.title}
                </h2>
                {lead.dek ? (
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead.dek}</p>
                ) : null}
                <p className="mt-5 text-xs text-muted-foreground">
                  {lead.author_name} · {lead.reading_minutes ?? 5} min read
                </p>
              </div>
            </Link>

            {rest.length ? (
              <div className="mt-16 grid gap-x-6 gap-y-12 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((a) => (
                  <Link
                    key={a.slug}
                    to="/dispatch/$slug"
                    params={{ slug: a.slug }}
                    className="group flex flex-col"
                  >
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
                    <p className="meta-label mt-4">
                      {a.category} · {formatDate(a.published_at)}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:underline">
                      {a.title}
                    </h3>
                    {a.dek ? (
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.dek}</p>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : null}
          </>
        )}
      </Section>
    </PageShell>
  );
}
