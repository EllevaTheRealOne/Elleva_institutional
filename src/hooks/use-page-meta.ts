import { useEffect } from "react";

const SITE_URL = "https://elleva.me";

export interface PageMeta {
  title: string;
  description: string;
  /** App path without language prefix, e.g. "/business-plan". */
  path: string;
}

function setMeta(selector: string, attribute: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attribute, value);
}

/**
 * Route-level metadata: title, description, canonical and social tags.
 *
 * `index.html` ships the home page's metadata so crawlers see it without
 * JavaScript; this hook keeps the same tags in step with the route the visitor
 * is actually on. There is one set of tags and one place that writes them.
 */
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = url;
  }, [title, description, path]);
}
