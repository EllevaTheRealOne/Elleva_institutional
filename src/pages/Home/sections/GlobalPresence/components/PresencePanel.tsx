import React, { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PresenceFormat } from "../hooks/usePresenceFormat";
import type { CountryRanking, RankedCountry } from "../utils/rankCountries";
import { CountryFlag } from "./CountryFlag";
import { CountUp } from "./CountUp";
import { Figure } from "./Figure";

interface PresencePanelProps {
  /** null while loading. */
  ranking: CountryRanking | null;
  activeCode: string | null;
  onActiveChange: (code: string | null) => void;
  format: PresenceFormat;
}

/**
 * The inspector beside the map: three headline figures, then the ranked list.
 * The list is the map's table view — every country and every figure is here,
 * so nothing on the map is reachable only by hovering it.
 */
export const PresencePanel: React.FC<PresencePanelProps> = ({ ranking, activeCode, onActiveChange, format }) => {
  const { t } = useTranslation(["home", "common"]);
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  if (!ranking) return <PanelSkeleton />;

  const largest = ranking.countries[0];
  const rows = expanded ? ranking.countries : ranking.top;

  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 gap-2">
        <Figure label={t("globalPresence.kpi.members")}>
          <CountUp value={ranking.totalMembers} format={format.number} />
        </Figure>
        <Figure label={t("globalPresence.kpi.countries")}>
          <CountUp value={ranking.totalCountries} format={format.number} />
        </Figure>
        <Figure
          className="col-span-2"
          label={t("globalPresence.kpi.topCountry")}
          aside={
            <span className="flex items-center gap-2 font-ui text-[13px] text-[#F5F7F6]">
              <CountryFlag code={largest.code} />
              {format.countryName(largest.code)}
            </span>
          }
        >
          <CountUp value={largest.share} format={format.share} integer={false} />
        </Figure>
      </dl>

      <div>
        <h3 id={`${listId}-title`} className="mb-2 px-2 font-ui text-[10px] font-semibold uppercase tracking-widest text-[#8E9995]">
          {t("globalPresence.list.title")}
        </h3>
        <ol
          id={listId}
          aria-labelledby={`${listId}-title`}
          className={cn(expanded && "max-h-[24rem] overflow-y-auto pr-1")}
        >
          {rows.map((country) => (
            <CountryRow
              key={country.code}
              country={country}
              format={format}
              active={country.code === activeCode}
              onActiveChange={onActiveChange}
            />
          ))}
        </ol>
        {ranking.rest.length > 0 && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-ui text-[11px] text-[#8E9995] transition-colors hover:text-[#F5F7F6] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#189890]"
          >
            {expanded ? t("globalPresence.list.less") : t("globalPresence.list.more", { count: ranking.rest.length })}
            <ChevronDown className={cn("h-3 w-3 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

interface CountryRowProps {
  country: RankedCountry;
  format: PresenceFormat;
  active: boolean;
  onActiveChange: (code: string | null) => void;
}

/** One country. Hovering or focusing it highlights the country on the map. */
const CountryRow: React.FC<CountryRowProps> = ({ country, format, active, onActiveChange }) => (
  <li
    tabIndex={0}
    onMouseEnter={() => onActiveChange(country.code)}
    onMouseLeave={() => onActiveChange(null)}
    onFocus={() => onActiveChange(country.code)}
    onBlur={() => onActiveChange(null)}
    className={cn(
      "rounded-md px-2 py-1 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#189890]",
      active && "bg-[rgba(245,247,246,0.04)]",
    )}
  >
    <div className="flex items-center gap-2.5 font-ui text-[13px]">
      <CountryFlag code={country.code} />
      <span className="min-w-0 flex-1 leading-snug text-[#F5F7F6]">{format.countryName(country.code)}</span>
      <span className="font-semibold tabular-nums text-[#F5F7F6]">{format.number(country.members)}</span>
      <span className="w-12 text-right font-mono text-[11px] tabular-nums text-[#8E9995]">{format.share(country.share)}</span>
    </div>
    {/* Share of all members, on a track of the same accent: the meter reads across its whole length. */}
    <div className="ml-[26px] mt-1 h-[3px] overflow-hidden rounded-full bg-[rgba(24,152,144,0.12)]">
      <div className="h-full rounded-r-full bg-[#189890]" style={{ width: `${Math.max(country.share * 100, 0.6)}%` }} />
    </div>
  </li>
);

const PanelSkeleton: React.FC = () => (
  <div className="flex flex-col gap-7" aria-hidden="true">
    <div className="grid grid-cols-2 gap-2">
      {["a", "b", "c"].map((k, i) => (
        <div
          key={k}
          className={cn("h-[4.75rem] rounded-lg border border-[rgba(245,247,246,0.06)] bg-[#0A0D0F] p-4", i === 2 && "col-span-2")}
        >
          <div className="h-2.5 w-16 rounded-sm bg-[rgba(245,247,246,0.06)] motion-safe:animate-pulse" />
          <div className="mt-3 h-6 w-20 rounded-sm bg-[rgba(245,247,246,0.06)] motion-safe:animate-pulse" />
        </div>
      ))}
    </div>
    <div className="space-y-3 px-2">
      {[92, 70, 64, 58, 52, 46].map((w) => (
        <div key={w} className="h-3 rounded-sm bg-[rgba(245,247,246,0.05)] motion-safe:animate-pulse" style={{ width: `${w}%` }} />
      ))}
    </div>
  </div>
);
