import type { CountryPresence } from "@/services/stats/types";

export interface ListedCountry {
  code: string;
  /** The country's name in the visitor's language. */
  name: string;
}

export interface CountryList {
  /** Alphabetical by localized name — never by size, which presence mode does not know. */
  countries: ListedCountry[];
  totalCountries: number;
}

/**
 * Presence mode's sibling of rankCountries(): the countries with members, in
 * alphabetical order of the name the visitor reads, compared with the locale's
 * own collation (so "Áustria" comes before "Brasil" in Portuguese, and Chinese
 * and Japanese follow their own orders). Repeated codes are merged.
 */
export function listCountries(
  rows: readonly CountryPresence[],
  nameOf: (code: string) => string,
  locale: string,
): CountryList {
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  const codes = [...new Set(rows.map((r) => r.code))];
  const countries = codes
    .map((code) => ({ code, name: nameOf(code) }))
    .sort((a, b) => collator.compare(a.name, b.name) || (a.code < b.code ? -1 : 1));
  return { countries, totalCountries: countries.length };
}
