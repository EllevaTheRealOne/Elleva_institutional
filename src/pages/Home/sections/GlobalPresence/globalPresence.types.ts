import type { CountryList, ListedCountry } from "./utils/listCountries";
import type { CountryRanking, RankedCountry } from "./utils/rankCountries";

/**
 * What the section draws, decided by the payload (hasFigures): with counts, the
 * figures view — ramp, pills, ranked list; without, the presence view — one tone,
 * no figure anywhere, an alphabetical list.
 */
export type PresenceView =
  | { mode: "figures"; ranking: CountryRanking }
  | { mode: "presence"; list: CountryList };

export const countriesIn = (view: PresenceView): (RankedCountry | ListedCountry)[] =>
  view.mode === "figures" ? view.ranking.countries : view.list.countries;

export const totalCountriesIn = (view: PresenceView): number =>
  view.mode === "figures" ? view.ranking.totalCountries : view.list.totalCountries;
