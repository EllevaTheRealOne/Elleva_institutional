import i18next from "i18next";
import { describe, expect, it } from "vitest";
import { allLangs } from "@/i18n/langs";

/**
 * The `globalPresence` block of home.json must have the same keys in all eight
 * locales (INTERNATIONALIZATION.md §7). Plural keys are the exception by nature
 * — Russian needs one/few/many, Chinese only other — so they are compared
 * without their suffix, and each locale is then checked for every plural form
 * its language actually selects for a whole number. A missing form is not a
 * cosmetic fallback: i18next prints the raw key (checked below).
 */
const PLURAL = /_(zero|one|two|few|many|other)$/;
type Tree = { [key: string]: string | Tree };

const homeFiles = import.meta.glob<{ globalPresence: Tree }>(
  "../../../../../public/internationalization/*/home.json",
  { eager: true, import: "default" },
);

const read = (lng: string): Tree =>
  homeFiles[`../../../../../public/internationalization/${lng}/home.json`]?.globalPresence;

const leaves = (tree: Tree, prefix = ""): string[] =>
  Object.entries(tree).flatMap(([k, v]) => (typeof v === "string" ? [prefix + k] : leaves(v, `${prefix}${k}.`)));

// Every category Intl selects for integers 0–1000 and for exact millions (es/pt "many").
const integerCategories = (lng: string) => {
  const rules = new Intl.PluralRules(lng);
  const samples = [...Array.from({ length: 1001 }, (_, i) => i), 1_000_000, 2_000_000];
  return new Set(samples.map((n) => rules.select(n)));
};

const locales = allLangs.map((l) => l.value);
const blocks = Object.fromEntries(locales.map((l) => [l, read(l)]));

describe("home.json › globalPresence", () => {
  it("exists in every supported locale", () => {
    expect(locales).toHaveLength(8);
    locales.forEach((l) => expect(blocks[l], l).toBeTypeOf("object"));
  });

  it("has the same keys everywhere, plural suffixes aside", () => {
    const base = new Set(leaves(blocks.en).map((k) => k.replace(PLURAL, "")));
    for (const l of locales) {
      expect(new Set(leaves(blocks[l]).map((k) => k.replace(PLURAL, ""))), l).toEqual(base);
    }
  });

  it("carries every plural form each language uses", () => {
    for (const l of locales) {
      const keys = leaves(blocks[l]);
      const pluralBases = new Set(keys.filter((k) => PLURAL.test(k)).map((k) => k.replace(PLURAL, "")));
      for (const base of pluralBases) {
        for (const category of integerCategories(l)) {
          expect(keys, `${l}: ${base}_${category}`).toContain(`${base}_${category}`);
        }
      }
    }
  });

  it("resolves with the real i18next for awkward counts", async () => {
    const i18n = i18next.createInstance();
    await i18n.init({
      resources: Object.fromEntries(locales.map((l) => [l, { home: { globalPresence: blocks[l] } }])),
      ns: ["home"],
      defaultNS: "home",
      interpolation: { escapeValue: false },
    });
    for (const l of locales) {
      const t = i18n.getFixedT(l, "home");
      for (const count of [1, 2, 5, 21, 1_000_000]) {
        const out = t("globalPresence.list.more", { count });
        expect(out, `${l} ${count}`).not.toContain("globalPresence");
        expect(out, `${l} ${count}`).toContain(String(count));
      }
    }
  });

  describe("presence mode (no quantities)", () => {
    // Every key the presence view reads, plus the shared ones it reuses.
    const PRESENCE_KEYS = [
      "presence.description",
      "presence.legend.present",
      "presence.legend.none",
      "presence.list.title",
      "presence.aria.map",
      "kpi.countries",
      "footer.updated",
    ];

    it("has every key the presence view reads, in every locale", () => {
      for (const l of locales) {
        const keys = new Set(leaves(blocks[l]).map((k) => k.replace(PLURAL, "")));
        for (const key of PRESENCE_KEYS) expect(keys.has(key), `${l}: ${key}`).toBe(true);
      }
    });

    it("never interpolates or states a quantity", () => {
      for (const l of locales) {
        const presence = blocks[l].presence as Tree;
        for (const key of leaves(presence)) {
          const value = key.split(".").reduce<string | Tree>((node, part) => (node as Tree)[part], presence) as string;
          expect(value, `${l}: presence.${key}`).not.toMatch(/\{\{|\d/);
        }
      }
    });
  });
});
