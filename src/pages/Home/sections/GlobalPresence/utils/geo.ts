import { geoArea, geoCentroid, geoEqualEarth } from "d3-geo";
import type { Feature, Geometry, MultiPolygon, Polygon } from "geojson";
import { feature } from "topojson-client";
import countries110m from "world-atlas/countries-110m.json";
import { COUNTRY_NUMERIC_BY_ALPHA2 } from "@/constants/geo/countryNumericByAlpha2";

/** The map's frame, in SVG units. 16:9, so the SVG fills its box with no letterboxing. */
export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 450;

/**
 * Section 09's projection — geoEqualEarth at scale 170, centred on 15°E 10°N — so
 * the two maps on the Home read as one system. Built here rather than by name so
 * the SVG and the HTML labels laid over it share one projection instance.
 */
export const presenceProjection = geoEqualEarth()
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
  .center([15, 10])
  .scale(170);

type CountryFeature = Feature<Geometry, { name: string }> & { id?: string };

const atlasFeatures: CountryFeature[] = feature(
  countries110m,
  countries110m.objects.countries,
).features;

const featureByNumeric = new Map(
  atlasFeatures.filter((f) => f.id).map((f) => [f.id as string, f]),
);

/** The atlas numeric id for an alpha-2 code, or undefined when the atlas has no polygon for it. */
export function atlasIdOf(alpha2: string): string | undefined {
  const id = COUNTRY_NUMERIC_BY_ALPHA2[alpha2];
  return id && featureByNumeric.has(id) ? id : undefined;
}

/**
 * The centroid of a country's largest polygon. The centroid of the whole feature
 * lands in the sea for countries with distant territories — France's is pulled
 * towards French Guiana, Norway's towards Svalbard.
 */
function mainlandCentroid(geometry: Geometry): [number, number] {
  if (geometry.type !== "MultiPolygon") return geoCentroid(geometry);
  let largest: Polygon | undefined;
  let largestArea = -1;
  for (const coordinates of (geometry as MultiPolygon).coordinates) {
    const polygon: Polygon = { type: "Polygon", coordinates };
    const area = geoArea(polygon);
    if (area > largestArea) {
      largestArea = area;
      largest = polygon;
    }
  }
  return geoCentroid(largest ?? geometry);
}

const anchorCache = new Map<string, [number, number] | null>();

/**
 * Where a country's marker sits, in SVG units (0–MAP_WIDTH, 0–MAP_HEIGHT), or
 * null when the country has no polygon in the 110m atlas or falls outside the frame.
 */
export function anchorOf(alpha2: string): [number, number] | null {
  const id = atlasIdOf(alpha2);
  if (!id) return null;
  if (!anchorCache.has(id)) {
    const point = presenceProjection(mainlandCentroid(featureByNumeric.get(id)!.geometry));
    const inside =
      point && point[0] >= 0 && point[0] <= MAP_WIDTH && point[1] >= 0 && point[1] <= MAP_HEIGHT;
    anchorCache.set(id, inside ? [point[0], point[1]] : null);
  }
  return anchorCache.get(id)!;
}
