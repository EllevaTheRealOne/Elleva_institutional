import { describe, expect, it } from "vitest";
import countries110m from "world-atlas/countries-110m.json";
import { COUNTRY_NUMERIC_BY_ALPHA2 } from "@/constants/geo/countryNumericByAlpha2";
import { membersByCountryFixture as fixture } from "@/services/stats/fixtures/membersByCountry.fixture";
import { MEMBER_CLASS_OPACITY, memberScale } from "./memberScale";

describe("memberScale", () => {
  const classOf = memberScale(1, 600);

  it("puts the extremes in the faintest and the strongest class", () => {
    expect(classOf(1)).toBe(0);
    expect(classOf(600)).toBe(MEMBER_CLASS_OPACITY.length - 1);
  });

  it("bins on log(members), so the tail is spread across classes", () => {
    // ln(600) / 4 ≈ 1.6 per class: boundaries near 5, 25 and 121 members.
    expect([4, 5, 24, 25, 121, 122].map(classOf)).toEqual([0, 1, 1, 2, 2, 3]);
    const byCode = Object.fromEntries(fixture.countries.map((c) => [c.code, classOf(c.members)]));
    expect(byCode).toMatchObject({ BR: 3, PT: 2, CO: 2, CL: 1, FR: 1, GB: 0, SG: 0 });
  });

  it("never lets more members read fainter", () => {
    const classes = Array.from({ length: 600 }, (_, i) => classOf(i + 1));
    classes.forEach((c, i) => i && expect(c).toBeGreaterThanOrEqual(classes[i - 1]));
  });

  it("gives every country the strongest class when all counts are equal", () => {
    expect(memberScale(3, 3)(3)).toBe(MEMBER_CLASS_OPACITY.length - 1);
    expect(memberScale(0, 0)(0)).toBe(MEMBER_CLASS_OPACITY.length - 1);
  });

  it("uses increasing opacities", () => {
    expect([...MEMBER_CLASS_OPACITY]).toEqual([...MEMBER_CLASS_OPACITY].sort((a, b) => a - b));
  });
});

describe("COUNTRY_NUMERIC_BY_ALPHA2", () => {
  const atlasIds = (countries110m as { objects: { countries: { geometries: { id?: string }[] } } })
    .objects.countries.geometries.map((g) => g.id)
    .filter((id): id is string => Boolean(id));

  it("joins the api's codes to world-atlas ids", () => {
    expect(COUNTRY_NUMERIC_BY_ALPHA2.BR).toBe("076");
    expect(COUNTRY_NUMERIC_BY_ALPHA2.PT).toBe("620");
  });

  it("covers every country the 110m atlas draws", () => {
    const known = new Set(Object.values(COUNTRY_NUMERIC_BY_ALPHA2));
    expect(atlasIds.filter((id) => !known.has(id))).toEqual([]);
    expect(atlasIds).toHaveLength(174);
  });

  it("knows which fixture countries have no polygon", () => {
    const drawn = new Set(atlasIds);
    const missing = fixture.countries.map((c) => c.code).filter((a) => !drawn.has(COUNTRY_NUMERIC_BY_ALPHA2[a]));
    expect(missing).toEqual(["SG"]);
  });
});
