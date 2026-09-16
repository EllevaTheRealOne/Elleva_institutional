import { allLangs, defaultLang } from "./langs";

/**
 * Prefixes an app path with the language segment the router expects.
 *
 * The default language lives at the bare path ("/business-plan"); every other
 * language is prefixed ("/pt-BR/business-plan"). A hash or query on the path
 * is preserved. Paths that already carry a language prefix are left alone.
 */
export function localizePath(path: string, language: string): string {
  if (!path.startsWith("/")) return path;

  const [pathname, ...rest] = path.split(/(?=[?#])/);
  const suffix = rest.join("");
  const segments = pathname.split("/").filter(Boolean);

  const hasLang = allLangs.some(
    (l) => l.value.toLowerCase() === segments[0]?.toLowerCase(),
  );
  const pure = hasLang ? segments.slice(1) : segments;
  const subPath = pure.length > 0 ? `/${pure.join("/")}` : "";

  const localized =
    language === defaultLang.value ? subPath || "/" : `/${language}${subPath}`;

  return `${localized}${suffix}`;
}

/** Strips the language prefix, returning the app path ("/" for the root). */
export function stripLanguagePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const hasLang = allLangs.some(
    (l) => l.value.toLowerCase() === segments[0]?.toLowerCase(),
  );
  const pure = hasLang ? segments.slice(1) : segments;
  return pure.length > 0 ? `/${pure.join("/")}` : "/";
}
