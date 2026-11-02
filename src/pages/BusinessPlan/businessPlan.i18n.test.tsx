import React from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { allLangs } from "@/i18n/langs";
import { navLinks } from "@/layout/constants/nav-links";
import { ROUTE_KEY } from "@/constants/routes/routes.constants";
import { BusinessPlanView } from "./view";

/**
 * The Business Plan page reads everything from business-plan.json and its
 * in-page menu from nav.json. i18next prints the raw key when one is missing
 * and `returnObjects` lists silently render nothing, so parity is checked here
 * rather than by eye (INTERNATIONALIZATION.md §7–8): same keys in all eight
 * locales, every accent fragment present in the text it lights up, and the
 * page rendered in every locale without a raw key and in menu order.
 */
type Tree = { [key: string]: string | Tree | Tree[] | string[] };

const planFiles = import.meta.glob<Tree>("../../../public/internationalization/*/business-plan.json", {
  eager: true,
  import: "default",
});
const navFiles = import.meta.glob<Tree>("../../../public/internationalization/*/nav.json", {
  eager: true,
  import: "default",
});

const plan = (lng: string) => planFiles[`../../../public/internationalization/${lng}/business-plan.json`];
const nav = (lng: string) => navFiles[`../../../public/internationalization/${lng}/nav.json`];

/** Every leaf path, array positions included ("problem.cards.0.title"). */
const leaves = (node: unknown, prefix = ""): string[] => {
  if (node === null || typeof node !== "object") return [prefix.slice(0, -1)];
  return Object.entries(node as Record<string, unknown>).flatMap(([k, v]) => leaves(v, `${prefix}${k}.`));
};

const get = (tree: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], tree);

const locales = allLangs.map((l) => l.value);

const menu = navLinks[ROUTE_KEY.businessPlan].find((item) => item.key === "categories.businessPlan.label")?.items ?? [];

// The pairs drawn by <Accent>: the fragment must occur in the text or the
// highlight silently disappears in that language.
const ACCENTS: [text: string, fragment: string][] = [
  ["problem.title", "problem.titleAccent"],
  ["market.title", "market.titleAccent"],
  ["market.callout", "market.calloutAccent"],
  ["market.chart.source", "market.chart.sourceLabel"],
  ["participation.title", "participation.titleAccent"],
  ["participation.subline", "participation.term"],
];

describe("business-plan.json", () => {
  it("exists in every supported locale", () => {
    expect(locales).toHaveLength(8);
    locales.forEach((l) => expect(plan(l), l).toBeTypeOf("object"));
  });

  it("has the same keys everywhere", () => {
    const base = new Set(leaves(plan("en")));
    for (const l of locales) expect(new Set(leaves(plan(l))), l).toEqual(base);
  });

  it("has no empty strings", () => {
    for (const l of locales) {
      for (const key of leaves(plan(l))) expect(String(get(plan(l), key)).trim(), `${l}: ${key}`).not.toBe("");
    }
  });

  it("finds every accent fragment in its text", () => {
    for (const l of locales) {
      for (const [text, fragment] of ACCENTS) {
        expect(get(plan(l), text), `${l}: ${text}`).toContain(get(plan(l), fragment) as string);
      }
    }
  });

  it("carries the v1.1 figures as the deck writes them", () => {
    for (const l of locales) {
      expect(get(plan(l), "hero.eyebrow"), l).toContain("1.1");
      expect(get(plan(l), "participation.objective.value"), l).toBe("4.0x");
      expect(get(plan(l), "participation.term"), l).toBe("Revenue-Based Financing");
      expect(get(plan(l), "market.chart.value"), l).toBe("US$ {{value}}");
      expect(get(plan(l), "market.chart.source"), l).toContain("PwC — Global Asset & Wealth Management Report 2025");
    }
  });
});

describe("nav.json › businessPlan", () => {
  it("has the same items everywhere", () => {
    const base = Object.keys(get(nav("en"), "categories.businessPlan.items") as Tree);
    for (const l of locales) expect(Object.keys(get(nav(l), "categories.businessPlan.items") as Tree), l).toEqual(base);
  });

  it("has a label for every entry of the in-page menu", () => {
    expect(menu.map((item) => item.href)).toContain("#participation");
    for (const l of locales) {
      for (const item of menu) expect(get(nav(l), item.key as string), `${l}: ${item.key}`).toBeTypeOf("string");
    }
  });
});

describe("/business-plan rendered", () => {
  const render = async (lng: string) => {
    const i18n = i18next.createInstance();
    await i18n.init({
      lng,
      resources: { [lng]: { "business-plan": plan(lng) } },
      ns: ["business-plan"],
      interpolation: { escapeValue: false },
    });
    return renderToStaticMarkup(
      <I18nextProvider i18n={i18n}>
        <BusinessPlanView />
      </I18nextProvider>,
    );
  };

  // A raw key looks like "participation.objective.label".
  const rawKey = new RegExp(`\\b(${Object.keys(plan("en")).join("|")})\\.[a-zA-Z]`);

  it("shows no raw key in any locale", async () => {
    for (const l of locales) {
      const html = (await render(l)).replace(/(src|href)="[^"]*"/g, "");
      expect(html.match(rawKey)?.[0], l).toBeUndefined();
    }
  });

  it("lays the sections out in menu order, participation between brokers and back office", async () => {
    const html = await render("pt-BR");
    const ids = [...html.matchAll(/<section id="([^"]+)"/g)].map((m) => m[1]);
    const menuIds = menu.map((item) => item.href.replace("#", ""));
    expect(ids.filter((id) => menuIds.includes(id))).toEqual(menuIds);
    expect(ids.slice(ids.indexOf("brokers"), ids.indexOf("brokers") + 3)).toEqual([
      "brokers",
      "participation",
      "back-office",
    ]);
  });

  it("draws the AUM columns with both values and the source", async () => {
    const html = await render("pt-BR");
    for (const text of ["US$ 139", "US$ 200", "trilhões", "(projeção)", "2024", "2030", "Fonte:"]) {
      expect(html, text).toContain(text);
    }
  });
});
