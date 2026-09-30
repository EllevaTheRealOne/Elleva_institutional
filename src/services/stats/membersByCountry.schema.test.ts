import { describe, expect, it } from "vitest";
import { membersByCountryFixture, presenceByCountryFixture } from "./fixtures/membersByCountry.fixture";
import { hasFigures, membersByCountryResponseSchema as schema } from "./types";

const at = "2026-09-30T12:00:00Z";
const keysDeep = (v: unknown): string[] =>
  v && typeof v === "object" ? Object.entries(v).flatMap(([k, x]) => [k, ...keysDeep(x)]) : [];

describe("members-by-country contract", () => {
  it("accepts the figures shape and reads it as figures", () => {
    const parsed = schema.parse(membersByCountryFixture);
    expect(hasFigures(parsed)).toBe(true);
  });

  it("accepts the presence shape (the api's default) and reads it as presence", () => {
    // Exactly the example in S1b-api-presence-only.md.
    const parsed = schema.parse({ generated_at: at, total_countries: 2, countries: [{ code: "AL" }, { code: "BR" }] });
    expect(hasFigures(parsed)).toBe(false);
    expect(hasFigures(schema.parse(presenceByCountryFixture))).toBe(false);
  });

  it("refuses a payload that mixes the two shapes", () => {
    const mixedRows = { generated_at: at, total_members: 3, total_countries: 2, countries: [{ code: "BR", members: 3 }, { code: "PT" }] };
    const totalWithoutCounts = { generated_at: at, total_members: 3, total_countries: 1, countries: [{ code: "BR" }] };
    const countsWithoutTotal = { generated_at: at, total_countries: 1, countries: [{ code: "BR", members: 3 }] };
    for (const body of [mixedRows, totalWithoutCounts, countsWithoutTotal]) {
      expect(schema.safeParse(body).success, JSON.stringify(body)).toBe(false);
    }
  });

  it("still refuses what it refused before", () => {
    const base = { generated_at: at, total_countries: 1 };
    expect(schema.safeParse({ ...base, countries: [{ code: "br" }] }).success).toBe(false);
    expect(schema.safeParse({ ...base, total_members: 0, countries: [{ code: "BR", members: 0 }] }).success).toBe(false);
    expect(schema.safeParse({ ...base, total_members: 1, countries: [{ code: "BR", members: 1.5 }] }).success).toBe(false);
    // This api's throttle reply: 200 with a status flag instead of a 429.
    expect(schema.safeParse({ status: false, message_key: "transfer_rate_limit" }).success).toBe(false);
  });

  it("keeps the presence fixture free of any count, sorted by code like the api", () => {
    expect(keysDeep(presenceByCountryFixture)).not.toContain("members");
    expect(keysDeep(presenceByCountryFixture)).not.toContain("total_members");
    const codes = presenceByCountryFixture.countries.map((c) => c.code);
    expect(codes).toEqual([...codes].sort());
    expect(new Set(codes)).toEqual(new Set(membersByCountryFixture.countries.map((c) => c.code)));
  });
});
