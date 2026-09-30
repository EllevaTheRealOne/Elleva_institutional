import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography, type PreparedFeature } from "@vnedyalk0v/react19-simple-maps";
import countries110m from "world-atlas/countries-110m.json";
import { useIsMobile } from "@/hooks/use-mobile";
import { countriesIn, totalCountriesIn, type PresenceView } from "../globalPresence.types";
import type { PresenceFormat } from "../hooks/usePresenceFormat";
import type { ListedCountry } from "../utils/listCountries";
import type { CountryRanking, RankedCountry } from "../utils/rankCountries";
import { MAP_HEIGHT, MAP_WIDTH, anchorOf, atlasIdOf, presenceProjection } from "../utils/geo";
import { MEMBER_CLASS_OPACITY, memberScale } from "../utils/memberScale";
import { placeLabels } from "../utils/placeLabels";
import { CountryTooltip } from "./CountryTooltip";

const ACCENT = "#189890";
// Section 09's land and borders, so a country without members looks exactly like
// every country on the Global Markets map.
const LAND = "#11161A";
const BORDER = "#1C252B";
const INK = "#F5F7F6";

// One object for every Geography: a new style object per render would defeat
// the library's memo and redraw all 177 countries on each pointer move.
const NO_OUTLINE = {
  default: { outline: "none" },
  hover: { outline: "none" },
  pressed: { outline: "none" },
  focused: { outline: "none" },
};

// Presence mode paints every country with members in one tone — the strongest
// class — because any gradation would still show who is bigger.
const PRESENCE_OPACITY = MEMBER_CLASS_OPACITY[MEMBER_CLASS_OPACITY.length - 1];

const LABELS_DESKTOP = 12;
const LABELS_PHONE = 6;

type Point = { x: number; y: number };

interface PresenceMapProps {
  /** null while loading: the map is drawn neutral and nothing on it is interactive. */
  view: PresenceView | null;
  generatedAt?: string;
  activeCode: string | null;
  onActiveChange: (code: string | null) => void;
  format: PresenceFormat;
}

const codeAt = (target: EventTarget | null): string | null =>
  target instanceof Element ? (target.closest("[data-code]")?.getAttribute("data-code") ?? null) : null;

/**
 * Figures mode — the choropleth: countries with members filled from the accent
 * ramp, the rest left as section 09's neutral land. Count pills sit over the
 * largest countries that fit; every other figure is one hover, tap or Tab away,
 * and all of them are in the panel's list.
 *
 * Presence mode — the api sent no counts: every country with members in one
 * tone, no markers, no pills, and a tooltip and aria-label that carry the name
 * only. Nothing on the map can be read as a size.
 *
 * Pills, dots and the tooltip are HTML laid over the SVG rather than SVG text,
 * so they keep their pixel size at every width — SVG text scales with the map
 * and is unreadable on a phone. Both layers use the same projection instance.
 */
export const PresenceMap: React.FC<PresenceMapProps> = ({ view, generatedAt, activeCode, onActiveChange, format }) => {
  const { t } = useTranslation(["home", "common"]);
  // Only figures mode has a ranking; everything that draws a number reads it.
  const ranking = view?.mode === "figures" ? view.ranking : null;
  const isMobile = useIsMobile();
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  // Where the tooltip points. Null when the active country came from the list,
  // which highlights the map without opening a tooltip over it.
  const [pointer, setPointer] = useState<Point | null>(null);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    setFrameWidth(el.clientWidth);
    const observer = new ResizeObserver(([entry]) => setFrameWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pxPerUnit = frameWidth / MAP_WIDTH;
  const frameHeight = MAP_HEIGHT * pxPerUnit;

  const byAtlasId = useMemo(() => {
    const map = new Map<string, RankedCountry | ListedCountry>();
    (view ? countriesIn(view) : []).forEach((c) => {
      const id = atlasIdOf(c.code);
      if (id) map.set(id, c);
    });
    return map;
  }, [view]);

  const byCode = useMemo(
    () => new Map<string, RankedCountry | ListedCountry>((view ? countriesIn(view) : []).map((c) => [c.code, c] as const)),
    [view],
  );

  const classOf = useMemo(
    () => (ranking ? memberScale(ranking.minMembers, ranking.maxMembers) : () => 0),
    [ranking],
  );

  const layout = useMemo(() => {
    if (!ranking || !frameWidth) return { markers: [], pills: [] };
    const limit = isMobile ? LABELS_PHONE : LABELS_DESKTOP;
    // The largest countries by rank, not whichever small ones happen to have room.
    const candidates = ranking.countries.slice(0, limit).flatMap((c) => {
      const anchor = anchorOf(c.code);
      return anchor ? [{ code: c.code, x: anchor[0] * pxPerUnit, y: anchor[1] * pxPerUnit, text: format.number(c.members) }] : [];
    });
    return placeLabels(candidates, {
      limit,
      width: frameWidth,
      height: frameHeight,
    });
  }, [ranking, frameWidth, frameHeight, pxPerUnit, isMobile, format]);

  // A tap opens a tooltip that no pointer-leave will close: a tap anywhere
  // outside the map does.
  const tooltipOpen = pointer !== null;
  useEffect(() => {
    if (!tooltipOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (frameRef.current?.contains(e.target as Node)) return;
      setPointer(null);
      onActiveChange(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [tooltipOpen, onActiveChange]);

  const toLocal = (clientX: number, clientY: number): Point => {
    const box = frameRef.current!.getBoundingClientRect();
    return { x: clientX - box.left, y: clientY - box.top };
  };

  const show = (code: string | null, at: Point | null) => {
    if (code !== activeCode) onActiveChange(code);
    setPointer(code ? at : null);
  };

  // Pointer handling is delegated to the frame: countries and markers both carry
  // data-code, and one handler covers them without a closure per country.
  const interactive = view !== null;
  const frameHandlers = interactive
    ? {
        onPointerMove: (e: React.PointerEvent) => {
          if (e.pointerType === "mouse") show(codeAt(e.target), toLocal(e.clientX, e.clientY));
        },
        onPointerLeave: (e: React.PointerEvent) => {
          if (e.pointerType === "mouse") show(null, null);
        },
        onClick: (e: React.MouseEvent) => show(codeAt(e.target), toLocal(e.clientX, e.clientY)),
        onFocus: (e: React.FocusEvent) => {
          const code = codeAt(e.target);
          if (!code) return;
          const anchor = anchorOf(code);
          const box = (e.target as Element).getBoundingClientRect();
          show(
            code,
            anchor
              ? { x: anchor[0] * pxPerUnit, y: anchor[1] * pxPerUnit }
              : toLocal(box.left + box.width / 2, box.top + box.height / 2),
          );
        },
        onBlur: () => show(null, null),
      }
    : {};

  const activeAtlasId = activeCode ? atlasIdOf(activeCode) : undefined;
  const activeAnchor = activeCode ? anchorOf(activeCode) : null;
  const tooltipCountry = pointer && activeCode ? byCode.get(activeCode) : undefined;

  return (
    <>
      <div ref={frameRef} className="relative aspect-[16/9] w-full select-none" {...frameHandlers}>
        <ComposableMap
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          projection={presenceProjection}
          className="absolute inset-0 h-full w-full"
          role="group"
          aria-label={t(ranking ? "globalPresence.aria.map" : "globalPresence.presence.aria.map")}
        >
          <Geographies geography={countries110m}>
            {({ geographies }) => {
              const features = geographies as PreparedFeature[];
              const activeFeature = activeAtlasId ? features.find((g) => String(g.id) === activeAtlasId) : undefined;
              return (
                <>
                  {features.map((geo) => {
                    const country = geo.id !== undefined ? byAtlasId.get(String(geo.id)) : undefined;
                    if (!country) {
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={LAND}
                          stroke={BORDER}
                          strokeWidth={0.4}
                          tabIndex={-1}
                          aria-hidden="true"
                          className="pointer-events-none"
                          style={NO_OUTLINE}
                        />
                      );
                    }
                    if (!("members" in country)) {
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          data-code={country.code}
                          fill={ACCENT}
                          fillOpacity={PRESENCE_OPACITY}
                          stroke={BORDER}
                          strokeWidth={0.4}
                          role="img"
                          aria-label={country.name}
                          className="cursor-pointer"
                          style={NO_OUTLINE}
                        />
                      );
                    }
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        data-code={country.code}
                        fill={ACCENT}
                        fillOpacity={MEMBER_CLASS_OPACITY[classOf(country.members)]}
                        stroke={BORDER}
                        strokeWidth={0.4}
                        role="img"
                        aria-label={t("globalPresence.aria.country", {
                          count: country.members,
                          name: format.countryName(country.code),
                          members: format.number(country.members),
                          share: format.share(country.share),
                        })}
                        className="cursor-pointer"
                        style={NO_OUTLINE}
                      />
                    );
                  })}
                  {activeFeature && (
                    <path
                      d={activeFeature.svgPath}
                      fill="none"
                      stroke={INK}
                      strokeWidth={0.9}
                      strokeLinejoin="round"
                      pointerEvents="none"
                    />
                  )}
                </>
              );
            }}
          </Geographies>
        </ComposableMap>

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {activeAnchor && (
            <span
              className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#189890] opacity-70 motion-safe:animate-ping"
              style={{ left: activeAnchor[0] * pxPerUnit, top: activeAnchor[1] * pxPerUnit }}
            />
          )}
          {/* A hairline from each pill to its dot, so a pill set diagonally still
              reads as its own country's and not its neighbour's. */}
          <svg className="absolute inset-0 h-full w-full overflow-visible">
            {layout.pills.map((pill) => {
              const toX = Math.min(Math.max(pill.x, pill.left), pill.left + pill.width);
              const toY = Math.min(Math.max(pill.y, pill.top), pill.top + pill.height);
              return (
                <line
                  key={pill.code}
                  x1={pill.x}
                  y1={pill.y}
                  x2={toX}
                  y2={toY}
                  stroke="rgba(245,247,246,0.5)"
                  strokeWidth={1}
                />
              );
            })}
          </svg>
          {layout.markers.map((marker) => (
            // 24px hit area around a 6px dot: nobody lands on a dot dead-centre.
            <span
              key={marker.code}
              data-code={marker.code}
              className="pointer-events-auto absolute size-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: marker.x, top: marker.y }}
            >
              <span
                className={`absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-[1.5px] ring-[#0A0D0F] ${
                  marker.code === activeCode ? "bg-[#189890]" : "bg-[#F5F7F6]"
                }`}
              />
            </span>
          ))}
          {layout.pills.map((pill) => (
            <span
              key={pill.code}
              data-code={pill.code}
              className={`pointer-events-auto absolute cursor-pointer rounded-sm border bg-[#050607]/80 text-center font-mono text-[10px] leading-[14px] tabular-nums text-[#F5F7F6] ${
                pill.code === activeCode ? "border-[#189890]" : "border-[rgba(245,247,246,0.1)]"
              }`}
              style={{ left: pill.left, top: pill.top, width: pill.width, height: pill.height }}
            >
              {pill.text}
            </span>
          ))}
        </div>

        {tooltipCountry && pointer && (
          <CountryTooltip country={tooltipCountry} format={format} x={pointer.x} y={pointer.y} frameWidth={frameWidth} />
        )}
      </div>

      <div className="mt-4 flex min-h-4 flex-wrap items-center justify-between gap-x-6 gap-y-2 px-1 font-mono text-[10px] text-[#8E9995]">
        {view && generatedAt ? (
          <>
            <span>
              {t("globalPresence.footer.updated", {
                count: totalCountriesIn(view),
                countries: format.number(totalCountriesIn(view)),
                date: format.dateTime(generatedAt),
              })}
            </span>
            {ranking ? (
              <MapLegend ranking={ranking} format={format} title={t("globalPresence.legend.title")} />
            ) : (
              <PresenceLegend
                present={t("globalPresence.presence.legend.present")}
                none={t("globalPresence.presence.legend.none")}
              />
            )}
          </>
        ) : (
          <span className="h-2.5 w-48 rounded-sm bg-[rgba(245,247,246,0.06)] motion-safe:animate-pulse" />
        )}
      </div>
    </>
  );
};

interface MapLegendProps {
  ranking: CountryRanking;
  format: PresenceFormat;
  title: string;
}

/**
 * The scale, fewest → most, drawn with the same fills as the map on the same
 * surface. The neutral swatch is "no members", so a grey country is read as
 * none rather than as missing data.
 */
const MapLegend: React.FC<MapLegendProps> = ({ ranking, format, title }) => {
  const single = ranking.minMembers === ranking.maxMembers;
  const classes = single ? MEMBER_CLASS_OPACITY.slice(-1) : MEMBER_CLASS_OPACITY;
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-ui">{title}</span>
      <span className="flex items-center gap-1 tabular-nums">
        <span className="h-2 w-4 rounded-[2px]" style={{ backgroundColor: LAND, boxShadow: `inset 0 0 0 1px ${BORDER}` }} />
        {format.number(0)}
      </span>
      {!single && <span className="ml-1 tabular-nums">{format.number(ranking.minMembers)}</span>}
      <span className="flex gap-[2px]">
        {classes.map((opacity) => (
          <span
            key={opacity}
            className="h-2 w-5 first:rounded-l-[2px] last:rounded-r-[2px]"
            style={{ backgroundColor: ACCENT, opacity }}
          />
        ))}
      </span>
      <span className="tabular-nums">{format.number(ranking.maxMembers)}</span>
    </div>
  );
};

interface PresenceLegendProps {
  present: string;
  none: string;
}

/**
 * Presence mode's key: the one tone, and the neutral land. The second swatch is
 * kept on purpose — without it a grey country reads as "no data" rather than as
 * "no members yet", and grey is also how section 09 draws every country.
 */
const PresenceLegend: React.FC<PresenceLegendProps> = ({ present, none }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-ui">
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-5 rounded-[2px]" style={{ backgroundColor: ACCENT, opacity: PRESENCE_OPACITY }} />
      {present}
    </span>
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-5 rounded-[2px]" style={{ backgroundColor: LAND, boxShadow: `inset 0 0 0 1px ${BORDER}` }} />
      {none}
    </span>
  </div>
);
