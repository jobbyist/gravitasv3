import { createFileRoute } from "@tanstack/react-router";

import { listArticles } from "@/lib/dispatch";
import { absoluteUrl } from "@/lib/site";

const STATIC_PATHS = [
  "/",
  "/studio",
  "/portfolio",
  "/dispatch",
  "/about",
  "/contact",
  "/partners",
  "/community",
  "/origin",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
];

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const articles = await listArticles(500);
        const urls = [
          ...STATIC_PATHS.map((path) => ({
            loc: absoluteUrl(path),
            lastmod: undefined as string | undefined,
          })),
          ...articles.map((a) => ({
            loc: absoluteUrl(`/dispatch/${a.slug}`),
            lastmod: a.published_at ? a.published_at.slice(0, 10) : undefined,
          })),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
