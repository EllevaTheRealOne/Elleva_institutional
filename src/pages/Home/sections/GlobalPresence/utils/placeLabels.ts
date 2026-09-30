export interface LabelCandidate {
  code: string;
  /** Anchor (the marker's dot), in rendered pixels from the map's top-left. */
  x: number;
  y: number;
  text: string;
}

export interface PlacedLabel extends LabelCandidate {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PlaceOptions {
  /** Only the first `limit` candidates (the largest countries) are considered. */
  limit: number;
  /** The map's rendered size, so a label never leaves it. */
  width: number;
  height: number;
}

// The pill: 10px Roboto figures are ~5.6px wide; 6 leaves room for separators.
const CHAR_WIDTH = 6;
const PAD_X = 5;
const PILL_HEIGHT = 16;
// Space between the dot and the pill, and the clearance kept around every pill and dot.
const GAP = 7;
const CLEARANCE = 1.5;
// The 6px dot plus its 1.5px ring.
const DOT_RADIUS = 4.5;

type Box = { left: number; top: number; right: number; bottom: number };

const overlaps = (a: Box, b: Box) =>
  a.left < b.right + CLEARANCE &&
  b.left < a.right + CLEARANCE &&
  a.top < b.bottom + CLEARANCE &&
  b.top < a.bottom + CLEARANCE;

const dotBox = (c: LabelCandidate): Box => ({
  left: c.x - DOT_RADIUS,
  top: c.y - DOT_RADIUS,
  right: c.x + DOT_RADIUS,
  bottom: c.y + DOT_RADIUS,
});

export interface LabelLayout {
  /** Markers drawn: the largest countries, minus any whose dot would sit on a larger one's. */
  markers: LabelCandidate[];
  /** The count pills that fit; a marker without one still shows its dot. */
  pills: PlacedLabel[];
}

/**
 * Lays out the markers of the largest countries and their count pills.
 *
 * Two passes. First every candidate's dot is reserved, in rank order, dropping a
 * dot that would sit on a larger country's — so no pill can later cover a dot.
 * Then each pill is tried around its dot (above, below, right, left, then the
 * four diagonals) and kept at the first spot that stays inside the map and
 * touches no dot and no pill already placed. Labels are sparse on purpose — a
 * figure on every country goes unread — and a pill that fits nowhere is left
 * out rather than pushed away from its country; the dot stays, and the value is
 * in the tooltip and in the list.
 */
export function placeLabels(candidates: readonly LabelCandidate[], { limit, width, height }: PlaceOptions): LabelLayout {
  // Dots are round: two may sit as close as their diameters without touching,
  // which matters for neighbours such as Portugal and Spain (~10px apart at desktop width).
  const markers: LabelCandidate[] = [];
  for (const c of candidates.slice(0, limit)) {
    if (markers.some((k) => Math.hypot(k.x - c.x, k.y - c.y) < DOT_RADIUS * 2)) continue;
    markers.push(c);
  }
  const dots = markers.map(dotBox);

  const taken: Box[] = [];
  const pills: PlacedLabel[] = [];
  for (const c of markers) {
    const w = c.text.length * CHAR_WIDTH + PAD_X * 2;
    const above = c.y - GAP - PILL_HEIGHT;
    const below = c.y + GAP;
    const beside = c.y - PILL_HEIGHT / 2;
    const toRight = c.x + DOT_RADIUS - 1;
    const toLeft = c.x - DOT_RADIUS + 1 - w;
    const spots: [number, number][] = [
      [c.x - w / 2, above],
      [c.x - w / 2, below],
      [c.x + GAP, beside],
      [c.x - GAP - w, beside],
      [toRight, above],
      [toLeft, above],
      [toRight, below],
      [toLeft, below],
    ];
    const spot = spots
      .map(([left, top]) => ({ left, top, right: left + w, bottom: top + PILL_HEIGHT }))
      .find(
        (pill) =>
          pill.left >= 0 &&
          pill.top >= 0 &&
          pill.right <= width &&
          pill.bottom <= height &&
          !taken.some((b) => overlaps(b, pill)) &&
          !dots.some((b) => overlaps(b, pill)),
      );
    if (!spot) continue;
    taken.push(spot);
    pills.push({ ...c, left: spot.left, top: spot.top, width: w, height: PILL_HEIGHT });
  }

  return { markers, pills };
}
