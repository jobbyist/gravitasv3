import { createFileRoute, notFound } from "@tanstack/react-router";

import { PageShell } from "@/components/site/page-shell";
import { legalDocs, type LegalDoc } from "@/content/legal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    const doc = legalDocs[params.doc as LegalDoc["slug"]];
    if (!doc) throw notFound();
    return doc;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          title: loaderData.title,
          description: loaderData.description,
          path: `/legal/${loaderData.slug}`,
        })
      : {},
  component: LegalPage,
});

function LegalPage() {
  const doc = Route.useLoaderData();
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 lg:py-24">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {doc.updated}</p>
        <div className="prose-gravitas mt-10">
          {doc.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
