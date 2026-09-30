import { describe, expect, it } from "vitest";
import { presenceByCountryFixture } from "@/services/stats/fixtures/membersByCountry.fixture";
import { listCountries } from "./listCountries";

const namesIn = (locale: string) => {
  const regions = new Intl.DisplayNames([locale], { type: "region" });
  return (code: string) => regions.of(code) ?? code;
};

describe("listCountries", () => {
  it("orders by the localized name, not by code", () => {
    const rows = ["DE", "ES", "GB", "BR"].map((code) => ({ code }));
    expect(listCountries(rows, namesIn("en"), "en").countries.map((c) => c.name)).toEqual([
      "Brazil",
      "Germany",
      "Spain",
      "United Kingdom",
    ]);
    expect(listCountries(rows, namesIn("pt-BR"), "pt-BR").countries.map((c) => c.name)).toEqual([
      "Alemanha",
      "Brasil",
      "Espanha",
      "Reino Unido",
    ]);
  });

  it("uses the locale's collation, so accented names sort where readers expect", () => {
    const rows = [{ code: "BR" }, { code: "AT" }];
    // A plain string comparison would put "Áustria" after "Brasil".
    expect(listCountries(rows, namesIn("pt-BR"), "pt-BR").countries.map((c) => c.code)).toEqual(["AT", "BR"]);
  });

  it("lists every country of the presence fixture once, and counts them", () => {
    const list = listCountries(
      [...presenceByCountryFixture.countries, { code: "BR" }],
      namesIn("en"),
      "en",
    );
    expect(list.totalCountries).toBe(17);
    expect(list.countries).toHaveLength(17);
    expect(list.countries[0]).toEqual({ code: "AR", name: "Argentina" });
  });

  it("handles an empty answer", () => {
    expect(listCountries([], namesIn("en"), "en")).toEqual({ countries: [], totalCountries: 0 });
  });
});
