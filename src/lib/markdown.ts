import { Marked } from "marked";

/**
 * Markdown to HTML for editorial content. Raw HTML in the source is dropped, so
 * an article body can never inject markup or scripts. External links open in a
 * new tab with rel="noopener".
 */
const marked = new Marked({
  gfm: true,
  renderer: {
    html() {
      return "";
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const safeHref = /^(https?:|mailto:|\/|#)/i.test(href) ? href : "#";
      const external = /^https?:/i.test(safeHref) && !safeHref.startsWith("https://gravitas.wtf");
      const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
      const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeAttr(safeHref)}"${titleAttr}${target}>${text}</a>`;
    },
  },
});

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false });
}
