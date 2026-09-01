import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface MarketOpportunityProps {
  isDark?: boolean;
}

// Supplied anchor points:
// 2025: US$ 147T Global AUM | US$ 3.1T Family Offices AUM
// 2030: US$ 200T Global AUM | US$ 5.4T Family Offices AUM
// Intermediate years (2026-2029) are geometric interpolations for visual continuity.
const AUM_PROJECTION_DATA = [
  { year: '2025', globalAum: 147.0, familyOfficeAum: 3.1, type: 'Ancoragem 2025' },
  { year: '2026', globalAum: 156.5, familyOfficeAum: 3.5, type: 'Interpolação' },
  { year: '2027', globalAum: 166.7, familyOfficeAum: 3.9, type: 'Interpolação' },
  { year: '2028', globalAum: 177.3, familyOfficeAum: 4.4, type: 'Interpolação' },
  { year: '2029', globalAum: 188.4, familyOfficeAum: 4.9, type: 'Interpolação' },
  { year: '2030', globalAum: 200.0, familyOfficeAum: 5.4, type: 'Projeção 2030' },
];

export const MarketOpportunity: React.FC<MarketOpportunityProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <section
      id="market-opportunity"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('marketOpportunity.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('marketOpportunity.description')}
          </p>
        </div>

        {/* 4 Anchor Stat Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="type-section-eyebrow text-[#8E9995]">
                {t('marketOpportunity.cards.globalAum2025.label')}
              </span>
            </div>
            <div className="type-metric">US$ 147 T</div>
            <div className={`type-body-sm mt-1 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('marketOpportunity.cards.globalAum2025.desc')}
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[#189890]/40 accent-glow' : 'bg-white border-[#189890] shadow-sm accent-glow'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="type-section-eyebrow text-[#189890]">
                {t('marketOpportunity.cards.globalProjection2030.label')}
              </span>
            </div>
            <div className="type-metric text-[#189890]">US$ 200 T</div>
            <div className="type-body-sm mt-1 text-[#189890]">
              {t('marketOpportunity.cards.globalProjection2030.desc')}
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="type-section-eyebrow text-[#8E9995]">
                {t('marketOpportunity.cards.familyOfficesToday.label')}
              </span>
            </div>
            <div className="type-metric">US$ 3.1 T</div>
            <div className={`type-body-sm mt-1 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('marketOpportunity.cards.familyOfficesToday.desc')}
            </div>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="type-section-eyebrow text-[#8E9995]">
                {t('marketOpportunity.cards.familyOffices2030.label')}
              </span>
            </div>
            <div className="type-metric">US$ 5.4 T</div>
            <div className={`type-body-sm mt-1 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('marketOpportunity.cards.familyOffices2030.desc')}
            </div>
          </div>
        </div>

        {/* Chart Container (Recharts) */}
        <div
          className={`p-6 sm:p-8 rounded-xl border ${
            isDark
              ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
              : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('marketOpportunity.chart.eyebrow')}
              </div>
              <h3 className="font-display font-bold text-lg">
                {t('marketOpportunity.chart.heading')}
              </h3>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[11px] font-mono text-[#8E9995]">
                {t('marketOpportunity.chart.scale')}
              </span>
              <span className="px-2.5 py-1 rounded text-[10px] font-ui font-semibold bg-[#189890]/15 text-[#189890]">
                US$ 147T (2025) → US$ 200T (2030)
              </span>
            </div>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={AUM_PROJECTION_DATA}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorGlobalAum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#189890" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#189890" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: textColor, fontSize: 11 }}
                  axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: textColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[120, 220]}
                  unit="T"
                />
                <Tooltip
                  formatter={(value: any) => [`US$ ${value} T`, t('marketOpportunity.chart.tooltipAum')]}
                  labelFormatter={(label) => `${t('common.year')} ${label}`}
                  contentStyle={{
                    backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: isDark ? '#F5F7F6' : '#0A0D0C',
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
                />
                <Area
                  type="monotone"
                  name={t('marketOpportunity.chart.seriesGlobalAum')}
                  dataKey="globalAum"
                  stroke="#189890"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGlobalAum)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className={`text-[11px] font-body mt-4 leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('marketOpportunity.chart.footnote')}
          </div>
        </div>
      </div>
    </section>
  );
};

