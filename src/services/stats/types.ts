import { z } from "zod";

/**
 * GET /api/public/members-by-country — meta/docs/global-presence/00-PLAN.md.
 *
 * `code` is ISO 3166-1 alpha-2, exactly what the api stores; the site renders the
 * country name in the visitor's language, so the api never sends one.
 */
export const countryMembersSchema = z.object({
  code: z.string().regex(/^[A-Z]{2}$/),
  members: z.number().int().positive(),
});

export const membersByCountryResponseSchema = z.object({
  generated_at: z.iso.datetime({ offset: true }),
  total_members: z.number().int().nonnegative(),
  total_countries: z.number().int().nonnegative(),
  countries: z.array(countryMembersSchema),
});

export type CountryMembers = z.infer<typeof countryMembersSchema>;

export type MembersByCountryResponse = z.infer<typeof membersByCountryResponseSchema>;
