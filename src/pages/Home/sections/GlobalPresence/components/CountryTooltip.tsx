import React, { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ListedCountry } from "../utils/listCountries";
import type { RankedCountry } from "../utils/rankCountries";
import type { PresenceFormat } from "../hooks/usePresenceFormat";
import { CountryFlag } from "./CountryFlag";

// Figures mode has two rows of numbers and a fixed width; presence mode is the
// flag and the name only, and hugs them.
const WIDTH = 188;
const MAX_WIDTH_PRESENCE = 220;
// Below this distance from the top of the map the tooltip opens underneath the pointer.
const FLIP_BELOW = 96;

interface CountryTooltipProps {
  /** A ranked country in figures mode, a listed one (no numbers) in presence mode. */
  country: RankedCountry | ListedCountry;
  format: PresenceFormat;
  /** Where it points, in pixels from the map's top-left, and the map's width. */
  x: number;
  y: number;
  frameWidth: number;
}

/**
 * The hover/focus readout for one country. In figures mode values lead and
 * labels follow, the reader already knows which country they are pointing at; in
 * presence mode it is the flag and the name, nothing else. It repeats what the
 * country's aria-label says, so it is hidden from screen readers.
 */
export const CountryTooltip: React.FC<CountryTooltipProps> = ({ country, format, x, y, frameWidth }) => {
  const { t } = useTranslation(["home", "common"]);
  const figures = "members" in country;
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(WIDTH);
  useLayoutEffect(() => {
    const measured = ref.current?.offsetWidth;
    if (measured && measured !== width) setWidth(measured);
  });

  const below = y < FLIP_BELOW;
  const left = Math.min(Math.max(x - width / 2, 4), Math.max(frameWidth - width - 4, 4));

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute z-20 rounded-lg border border-[rgba(245,247,246,0.1)] bg-[#050607]/95 px-3 py-2.5 shadow-xl"
      style={{
        ...(figures ? { width: WIDTH } : { width: "max-content", maxWidth: MAX_WIDTH_PRESENCE }),
        left,
        top: below ? y + 16 : y - 14,
        transform: below ? undefined : "translateY(-100%)",
      }}
    >
      <div
        className={`flex items-center gap-2 font-ui text-[13px] font-semibold leading-tight text-[#F5F7F6] ${figures ? "mb-2" : ""}`}
      >
        <CountryFlag code={country.code} />
        <span className="min-w-0">{format.countryName(country.code)}</span>
      </div>
      {figures && (
        <dl className="space-y-1 font-ui text-[11px]">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-[#8E9995]">{t("globalPresence.tooltip.members")}</dt>
            <dd className="text-[13px] font-semibold tabular-nums text-[#F5F7F6]">{format.number(country.members)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-[#8E9995]">{t("globalPresence.tooltip.share")}</dt>
            <dd className="font-semibold tabular-nums text-[#F5F7F6]">{format.share(country.share)}</dd>
          </div>
        </dl>
      )}
    </div>
  );
};
