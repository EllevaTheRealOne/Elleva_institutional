import { describe, expect, it } from "vitest";
import { placeLabels } from "./placeLabels";

const frame = { width: 800, height: 450 };
type Rect = { left: number; top: number; width: number; height: number };
const intersects = (a: Rect, b: Rect) =>
  a.left < b.left + b.width && b.left < a.left + a.width && a.top < b.top + b.height && b.top < a.top + a.height;
const dot = (x: number, y: number): Rect => ({ left: x - 4, top: y - 4, width: 8, height: 8 });

describe("placeLabels", () => {
  it("labels two close neighbours without a pill covering a pill or a dot", () => {
    const pt = { code: "PT", x: 300, y: 120, text: "96" };
    const es = { code: "ES", x: 312, y: 118, text: "58" };
    const placed = placeLabels([pt, es], { ...frame, limit: 12 }).pills;
    expect(placed.map((p) => p.code)).toEqual(["PT", "ES"]);
    const [a, b] = placed;
    expect(intersects(a, b)).toBe(false);
    for (const pill of placed) {
      expect(intersects(pill, dot(pt.x, pt.y))).toBe(false);
      expect(intersects(pill, dot(es.x, es.y))).toBe(false);
    }
  });

  it("keeps a marker whose pill fits nowhere, without the pill", () => {
    // Boxed in on every side by larger neighbours' dots.
    const ring = [
      [0, -12], [0, 12], [-14, 0], [14, 0], [-12, -12], [12, -12], [-12, 12], [12, 12],
    ].map(([dx, dy], i) => ({ code: `N${i}`, x: 400 + dx, y: 200 + dy, text: "100" }));
    const { markers, pills } = placeLabels([...ring, { code: "X", x: 400, y: 200, text: "1" }], { ...frame, limit: 12 });
    expect(markers.map((m) => m.code)).toContain("X");
    expect(pills.map((p) => p.code)).not.toContain("X");
  });

  it("drops a marker whose dot sits on one already placed", () => {
    const { markers, pills } = placeLabels(
      [
        { code: "A", x: 300, y: 120, text: "96" },
        { code: "B", x: 302, y: 121, text: "58" },
      ],
      { ...frame, limit: 12 },
    );
    expect(markers.map((m) => m.code)).toEqual(["A"]);
    expect(pills.map((p) => p.code)).toEqual(["A"]);
  });

  it("only considers the first `limit` candidates, even when others would fit", () => {
    const candidates = Array.from({ length: 20 }, (_, i) => ({
      code: `C${i}`,
      x: 40 + (i % 10) * 70,
      y: 60 + Math.floor(i / 10) * 120,
      text: "123",
    }));
    expect(placeLabels(candidates, { ...frame, limit: 12 }).pills.map((p) => p.code)).toEqual(
      candidates.slice(0, 12).map((c) => c.code),
    );
    expect(placeLabels(candidates, { ...frame, limit: 6 }).markers).toHaveLength(6);
  });

  it("opens below the dot at the top edge and stays inside the frame", () => {
    const [top] = placeLabels([{ code: "A", x: 400, y: 5, text: "1" }], { ...frame, limit: 1 }).pills;
    expect(top.top).toBeGreaterThan(5);
    const [edge] = placeLabels([{ code: "B", x: 2, y: 200, text: "12,345" }], { ...frame, limit: 1 }).pills;
    expect(edge.left).toBeGreaterThanOrEqual(0);
    expect(edge.left + edge.width).toBeLessThanOrEqual(800);
  });
});
