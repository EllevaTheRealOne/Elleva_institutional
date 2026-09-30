import { describe, expect, it } from "vitest";
import { membersByCountryFixture as fixture } from "@/services/stats/fixtures/membersByCountry.fixture";
import { rankCountries } from "./rankCountries";

describe("rankCountries", () => {
  const ranking = rankCountries(fixture.countries);

  it("orders by members, largest first, ties by code", () => {
    const counts = ranking.countries.map((c) => c.members);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
    // PY and UY both have 2, JP and SG both have 1.
    expect(ranking.countries.slice(-4).map((c) => c.code)).toEqual(["PY", "UY", "JP", "SG"]);
    expect(ranking.countries.map((c) => c.rank)).toEqual(ranking.countries.map((_, i) => i + 1));
  });

  it("derives the totals from the rows it was given", () => {
    expect(ranking.totalMembers).toBe(921);
    expect(ranking.totalCountries).toBe(17);
    expect(ranking.maxMembers).toBe(600);
    expect(ranking.minMembers).toBe(1);
    // Even when the payload's own totals are wrong, the section shows the sum of the rows.
    const skewed = rankCountries([{ code: "BR", members: 3 }]);
    expect(skewed.totalMembers).toBe(3);
  });

  it("computes shares of the members on the map", () => {
    expect(ranking.countries[0].share).toBeCloseTo(600 / 921, 10);
    const sum = ranking.countries.reduce((s, c) => s + c.share, 0);
    expect(sum).toBeCloseTo(1, 10);
  });

  it("splits the top N from the rest", () => {
    expect(ranking.top).toHaveLength(10);
    expect(ranking.rest).toHaveLength(7);
    expect(ranking.top[0].code).toBe("BR");
    expect(rankCountries(fixture.countries, 6).top).toHaveLength(6);
  });

  it("merges a repeated code and drops non-positive counts", () => {
    const r = rankCountries([
      { code: "BR", members: 5 },
      { code: "PT", members: 0 },
      { code: "BR", members: 2 },
    ]);
    expect(r.countries).toEqual([{ code: "BR", members: 7, share: 1, rank: 1 }]);
  });

  it("handles an empty answer", () => {
    const r = rankCountries([]);
    expect(r).toMatchObject({ totalMembers: 0, totalCountries: 0, minMembers: 0, maxMembers: 0 });
    expect(r.top).toEqual([]);
  });
});
