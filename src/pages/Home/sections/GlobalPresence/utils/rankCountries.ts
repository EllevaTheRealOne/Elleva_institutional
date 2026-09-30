import type { CountryMembers } from "@/services/stats/types";

export interface RankedCountry {
  code: string;
  members: number;
  /** Share of every member shown on the map, 0–1. */
  share: number;
  /** 1-based position in the ranking. */
  rank: number;
}

export interface CountryRanking {
  /** Every country, largest first; ties broken by code so the order is stable. */
  countries: RankedCountry[];
  /** The first `limit` countries — what the panel lists. */
  top: RankedCountry[];
  /** Everything after `top`, still reachable from the panel's "and N more". */
  rest: RankedCountry[];
  totalMembers: number;
  totalCountries: number;
  /** Smallest and largest count on the map; they bound the colour scale. */
  minMembers: number;
  maxMembers: number;
}

/**
 * Orders the api's rows and derives the figures the section shows.
 *
 * The totals are summed here from the rows rather than read from the api's
 * `total_members` / `total_countries`, so the headline figures can never
 * disagree with the map and the list drawn from the same rows. Rows are merged
 * by code and non-positive counts dropped — the api already guarantees both, but
 * a duplicated code would otherwise paint one country twice with different values.
 */
export function rankCountries(rows: readonly CountryMembers[], limit = 10): CountryRanking {
  const byCode = new Map<string, number>();
  for (const { code, members } of rows) {
    if (members > 0) byCode.set(code, (byCode.get(code) ?? 0) + members);
  }

  const totalMembers = [...byCode.values()].reduce((sum, n) => sum + n, 0);

  const countries = [...byCode.entries()]
    .sort(([codeA, a], [codeB, b]) => b - a || codeA.localeCompare(codeB))
    .map(([code, members], i) => ({
      code,
      members,
      share: totalMembers ? members / totalMembers : 0,
      rank: i + 1,
    }));

  return {
    countries,
    top: countries.slice(0, limit),
    rest: countries.slice(limit),
    totalMembers,
    totalCountries: countries.length,
    minMembers: countries.length ? countries[countries.length - 1].members : 0,
    maxMembers: countries.length ? countries[0].members : 0,
  };
}
