import React, { useId } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { PresenceFormat } from "../hooks/usePresenceFormat";
import type { CountryList } from "../utils/listCountries";
import { CountryFlag } from "./CountryFlag";
import { CountUp } from "./CountUp";
import { Figure } from "./Figure";

interface PresenceListPanelProps {
  list: CountryList;
  activeCode: string | null;
  onActiveChange: (code: string | null) => void;
  format: PresenceFormat;
}

/**
 * Presence mode's panel: how many countries, then every one of them, in
 * alphabetical order of the visitor's language. No count, no share and no order
 * by size anywhere — a ranking would say who is bigger, which is what this mode
 * does not publish. The whole list is shown: cutting an alphabetical list at N
 * hides whichever countries happen to come late in the alphabet. Two columns
 * read down, like an index, and keep 40 countries at twenty short rows.
 */
export const PresenceListPanel: React.FC<PresenceListPanelProps> = ({ list, activeCode, onActiveChange, format }) => {
  const { t } = useTranslation(["home", "common"]);
  const titleId = useId();

  return (
    <div className="flex flex-col gap-6">
      <dl>
        <Figure label={t("globalPresence.kpi.countries")}>
          <CountUp value={list.totalCountries} format={format.number} />
        </Figure>
      </dl>

      <div>
        <h3 id={titleId} className="mb-2 px-2 font-ui text-[10px] font-semibold uppercase tracking-widest text-[#8E9995]">
          {t("globalPresence.presence.list.title")}
        </h3>
        <ul aria-labelledby={titleId} className="columns-2 gap-x-2">
          {list.countries.map((country) => (
            <li
              key={country.code}
              tabIndex={0}
              onMouseEnter={() => onActiveChange(country.code)}
              onMouseLeave={() => onActiveChange(null)}
              onFocus={() => onActiveChange(country.code)}
              onBlur={() => onActiveChange(null)}
              className={cn(
                "flex break-inside-avoid items-center gap-2.5 rounded-md px-2 py-1 font-ui text-[13px] leading-snug text-[#F5F7F6] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#189890]",
                country.code === activeCode && "bg-[rgba(245,247,246,0.04)]",
              )}
            >
              <CountryFlag code={country.code} />
              <span className="min-w-0">{country.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
