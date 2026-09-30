import { scaleQuantize } from "d3-scale";

/**
 * Opacity of the accent (#189890) for each member class, fewest → most. The map
 * card is dark, so more members read brighter; the fill is the accent at these
 * opacities over the card surface (#0A0D0F), which is the accent-opacity system
 * of COLOR_SYSTEM.md §11 rather than new teal hexes.
 *
 * Four classes, not five. The steps were validated with the dataviz skill's
 * ordinal checker (validate_palette.js --ordinal --mode dark --surface #0A0D0F)
 * on the blended colours #115350 #136A65 #16827B #189890: one hue, monotone
 * lightness, every adjacent gap ≥ 0.06 OKLCH L, and the faintest class at 2.2:1
 * against the surface — so a country with a single member still separates
 * clearly from the neutral #11161A of a country with none (ΔE 21). Between that
 * floor and the accent itself there is room for four distinguishable steps; a
 * fifth pushes the gaps under 0.06 or the faintest class under 2:1.
 */
export const MEMBER_CLASS_OPACITY = [0.5, 0.67, 0.84, 1] as const;

/**
 * Maps a member count to its class (an index into MEMBER_CLASS_OPACITY).
 *
 * Classes are equal intervals of log(members), between the smallest and the
 * largest count on the map. Member counts are heavy-tailed — one country holds
 * about two thirds of everyone — so equal intervals of the raw count would put
 * every country but the first in the faintest class, and the map would say
 * nothing about the tail. On a log scale 1, 10, 100 and 1,000 members are the
 * same visual distance apart. Exact figures live in the tooltip and the list;
 * the colour only has to show where members are and roughly how many.
 */
export function memberScale(minMembers: number, maxMembers: number): (members: number) => number {
  const top = MEMBER_CLASS_OPACITY.length - 1;
  // Every country has the same count (or there is one country): they are all
  // the maximum, so they all take the strongest class.
  if (!(maxMembers > minMembers) || minMembers < 1) return () => top;

  const classOf = scaleQuantize<number>()
    .domain([Math.log(minMembers), Math.log(maxMembers)])
    .range(MEMBER_CLASS_OPACITY.map((_, i) => i));

  return (members) => classOf(Math.log(Math.max(members, minMembers)));
}
