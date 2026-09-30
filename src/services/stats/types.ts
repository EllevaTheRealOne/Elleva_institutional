// zod/mini, not the classic API: same validation, but tree-shakeable — the
// classic build added 86 kB to the bundle for this one schema.
import * as z from "zod/mini";

/**
 * GET /api/public/members-by-country — meta/docs/global-presence/00-PLAN.md and
 * S1b-api-presence-only.md.
 *
 * `code` is ISO 3166-1 alpha-2, exactly what the api stores; the site renders the
 * country name in the visitor's language, so the api never sends one.
 *
 * Two shapes, chosen by the api (`PUBLIC_STATS_PUBLISH_COUNTS`):
 * - figures: `members` on every row and `total_members` at the root;
 * - presence (the api's default since 2026-09-30): no count anywhere, rows sorted by code.
 */
export const countryRowSchema = z.object({
  code: z.string().check(z.regex(/^[A-Z]{2}$/)),
  members: z.optional(z.int().check(z.positive())),
});

/**
 * One shape or the other, never a mix: counts on some rows and not others, or a
 * total that disagrees with the rows, is a half-applied api change, and the
 * section would have to guess which mode it is in.
 */
const consistentShape = (r: { total_members?: number; countries: { members?: number }[] }) => {
  const counted = r.countries.filter((c) => c.members !== undefined).length;
  if (counted !== 0 && counted !== r.countries.length) return false;
  if (r.countries.length === 0) return true;
  return (counted > 0) === (r.total_members !== undefined);
};

export const membersByCountryResponseSchema = z
  .object({
    generated_at: z.iso.datetime({ offset: true }),
    total_members: z.optional(z.int().check(z.nonnegative())),
    total_countries: z.int().check(z.nonnegative()),
    countries: z.array(countryRowSchema),
  })
  .check(z.refine(consistentShape, { message: "members must be on every row or on none, with total_members to match" }));

export type MembersByCountryResponse = z.infer<typeof membersByCountryResponseSchema>;

/** A row of the figures shape. */
export type CountryMembers = { code: string; members: number };

/** A row of the presence shape. */
export type CountryPresence = { code: string };

export type FiguresPayload = MembersByCountryResponse & { total_members: number; countries: CountryMembers[] };

/**
 * The payload decides the mode: counts on the rows → figures, no counts → presence.
 * The schema already guarantees the rows agree, so the first row is enough.
 */
export const hasFigures = (r: MembersByCountryResponse): r is FiguresPayload =>
  r.countries.length > 0 && r.countries[0].members !== undefined;
