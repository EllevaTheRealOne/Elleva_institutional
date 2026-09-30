import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { hasFigures } from "@/services/stats/types";
import { useGetMembersByCountry } from "../../queries/getMembersByCountry/useGetMembersByCountry";
import { PresenceMap } from "./components/PresenceMap";
import { PresencePanel } from "./components/PresencePanel";
import { usePresenceFormat } from "./hooks/usePresenceFormat";
import { rankCountries } from "./utils/rankCountries";

interface GlobalPresenceProps {
  isDark?: boolean;
}

// How many countries the panel lists before "and N more".
const LIST_SIZE = 10;

/**
 * Where Elleva's members are: a choropleth of members per country beside the
 * headline figures and the ranked list, from GET /api/public/members-by-country
 * (meta/docs/global-presence/00-PLAN.md).
 *
 * If the api fails or reports no countries the section renders nothing at all —
 * an empty block of social proof reads worse than no block. The SectionBackdrop
 * around it then has no content and no height, so it leaves no band.
 */
export const GlobalPresence: React.FC<GlobalPresenceProps> = ({ isDark = true }) => {
  const { t } = useTranslation(["home", "common"]);
  const format = usePresenceFormat();
  const { data, isPending, isError } = useGetMembersByCountry();
  const ranking = useMemo(() => (data && hasFigures(data) ? rankCountries(data.countries, LIST_SIZE) : null), [data]);
  // The country under the pointer or keyboard focus, on the map or in the list.
  const [activeCode, setActiveCode] = useState<string | null>(null);

  // A payload without counts (presence mode) is not drawn yet: hide rather than guess.
  if (isError || (data && !hasFigures(data)) || (ranking && ranking.totalCountries === 0)) return null;

  return (
    <section
      id="global-presence"
      aria-busy={isPending}
      className={`border-t py-20 transition-colors duration-300 sm:py-28 ${
        isDark ? "border-white/5 bg-[#050607] text-[#F5F7F6]" : "border-black/[0.04] bg-[#F7F8F6] text-[#0A0D0C]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-14 max-w-3xl">
          <h2 className="type-section-title mb-4">{t("globalPresence.title")}</h2>
          <p className={`type-body ${isDark ? "text-[#8E9995]" : "text-[#4E5653]"}`}>
            {t("globalPresence.description")}
          </p>
        </div>

        {/* The instrument itself is a dark product module on either ground; its
            colour ramp was validated against this surface. */}
        <div className="overflow-hidden rounded-2xl border border-[rgba(245,247,246,0.1)] bg-[#0A0D0F] text-[#F5F7F6] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-center p-3 sm:p-6 lg:col-span-8">
              <PresenceMap
                ranking={ranking}
                generatedAt={data?.generated_at}
                activeCode={activeCode}
                onActiveChange={setActiveCode}
                format={format}
              />
            </div>
            <div className="border-t border-[rgba(245,247,246,0.08)] bg-[#0E1214] p-6 sm:p-7 lg:col-span-4 lg:border-l lg:border-t-0">
              <PresencePanel
                ranking={ranking}
                activeCode={activeCode}
                onActiveChange={setActiveCode}
                format={format}
              />
            </div>
          </div>
        </div>

        {isPending && (
          <p className="sr-only" role="status">
            {t("globalPresence.state.loading")}
          </p>
        )}
      </div>
    </section>
  );
};
