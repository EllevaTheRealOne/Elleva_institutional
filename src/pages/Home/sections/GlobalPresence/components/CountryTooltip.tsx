import React from "react";
import { useTranslation } from "react-i18next";
import type { RankedCountry } from "../utils/rankCountries";
import type { PresenceFormat } from "../hooks/usePresenceFormat";
import { CountryFlag } from "./CountryFlag";

const WIDTH = 188;
// Below this distance from the top of the map the tooltip opens underneath the pointer.
const FLIP_BELOW = 96;

interface CountryTooltipProps {
  country: RankedCountry;
  format: PresenceFormat;
  /** Where it points, in pixels from the map's top-left, and the map's width. */
  x: number;
  y: number;
  frameWidth: number;
}

/**
 * The hover/focus readout for one country. Values lead and labels follow, the
 * reader already knows which country they are pointing at. It repeats what the
 * country's aria-label says, so it is hidden from screen readers.
 */
export const CountryTooltip: React.FC<CountryTooltipProps> = ({ country, format, x, y, frameWidth }) => {
  const { t } = useTranslation(["home", "common"]);
  const below = y < FLIP_BELOW;
  const left = Math.min(Math.max(x - WIDTH / 2, 4), Math.max(frameWidth - WIDTH - 4, 4));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-20 rounded-lg border border-[rgba(245,247,246,0.1)] bg-[#050607]/95 px-3 py-2.5 shadow-xl"
      style={{
        width: WIDTH,
        left,
        top: below ? y + 16 : y - 14,
        transform: below ? undefined : "translateY(-100%)",
      }}
    >
      <div className="mb-2 flex items-center gap-2 font-ui text-[13px] font-semibold leading-tight text-[#F5F7F6]">
        <CountryFlag code={country.code} />
        <span className="min-w-0">{format.countryName(country.code)}</span>
      </div>
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
    </div>
  );
};
