import type { CountryMembers, MembersByCountryResponse } from "../types";

/**
 * A plausible answer from GET /api/public/members-by-country, for developing the
 * Global Presence section without an api and for its unit tests. Not real data.
 *
 * Shaped like the real distribution: Brazil holds about two thirds, a Latin and
 * Iberian middle, then a tail of countries with one to three members. SG is there
 * on purpose — it is too small for the 110m atlas, so it exercises "listed, not on
 * the map". No blocked country (US, AE, UA… see `blocked_countries` in the api).
 */
const countries: CountryMembers[] = [
  { code: "BR", members: 600 },
  { code: "PT", members: 96 },
  { code: "ES", members: 58 },
  { code: "MX", members: 41 },
  { code: "AR", members: 33 },
  { code: "CO", members: 27 },
  { code: "CL", members: 19 },
  { code: "PE", members: 14 },
  { code: "IT", members: 9 },
  { code: "DE", members: 6 },
  { code: "FR", members: 5 },
  { code: "GB", members: 4 },
  { code: "CH", members: 3 },
  { code: "PY", members: 2 },
  { code: "UY", members: 2 },
  { code: "JP", members: 1 },
  { code: "SG", members: 1 },
];

export const membersByCountryFixture: MembersByCountryResponse = {
  generated_at: "2026-09-29T14:00:00Z",
  total_members: countries.reduce((sum, c) => sum + c.members, 0),
  total_countries: countries.length,
  countries,
};
