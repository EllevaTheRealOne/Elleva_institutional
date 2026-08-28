import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { ALLOCATION_COMPARISON_DATA, GEOGRAPHIC_EXPOSURE } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const AllocationView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const assetClassKeyMap: Record<string, string> = {
    'Sovereign Fixed Income': t('investmentExperience.allocationView.assetClasses.sovereignFixedIncome', 'Sovereign Fixed Income'),
    'Global Equities Core': t('investmentExperience.allocationView.assetClasses.globalEquitiesCore', 'Global Equities Core'),
    'Real Assets & Infra': t('investmentExperience.allocationView.assetClasses.realAssetsInfra', 'Real Assets & Infra'),
    'Strategic Cash & SOFR': t('investmentExperience.allocationView.assetClasses.strategicCashSofr', 'Strategic Cash & SOFR'),
    // Fallback aliases if any
    'Sovereign FI': t('investmentExperience.allocationView.assetClasses.sovereignFixedIncome', 'Sovereign Fixed Income'),
    'Global Eq': t('investmentExperience.allocationView.assetClasses.globalEquitiesCore', 'Global Equities Core'),
    'Real Assets': t('investmentExperience.allocationView.assetClasses.realAssetsInfra', 'Real Assets & Infra'),
    'Cash & SOFR': t('investmentExperience.allocationView.assetClasses.strategicCashSofr', 'Strategic Cash & SOFR'),
  };

  const regionKeyMap: Record<string, string> = {
    'North America (US/CA)': t('investmentExperience.allocationView.regions.northAmerica', 'North America (US/CA)'),
    'North America': t('investmentExperience.allocationView.regions.northAmerica', 'North America'),
    'Developed Europe': t('investmentExperience.allocationView.regions.developedEurope', 'Developed Europe'),
    'Asia-Pacific Core': t('investmentExperience.allocationView.regions.developedAsia', 'Asia-Pacific Core'),
    'Developed Asia (APAC)': t('investmentExperience.allocationView.regions.developedAsia', 'Asia-Pacific Core'),
    'Global Sovereign Supranational': t('investmentExperience.allocationView.regions.globalSupranational', t('investmentExperience.allocationView.regions.globalEmerging', 'Global Sovereign Supranational')),
    'Global Emerging': t('investmentExperience.allocationView.regions.globalSupranational', t('investmentExperience.allocationView.regions.globalEmerging', 'Global Sovereign Supranational')),
  };

  const chartData = ALLOCATION_COMPARISON_DATA.map((item) => ({
    ...item,
    assetClassLabel: assetClassKeyMap[item.assetClass] || item.assetClass,
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.allocationView.stats.drift.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.allocationView.stats.drift.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.allocationView.stats.drift.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.allocationView.stats.duration.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.allocationView.stats.duration.value')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.allocationView.stats.duration.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.allocationView.stats.beta.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.allocationView.stats.beta.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.allocationView.stats.beta.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.allocationView.stats.rebalancing.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.allocationView.stats.rebalancing.value')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.allocationView.stats.rebalancing.status')}
          </div>
        </div>
      </div>

      {/* Comparison Chart & Geographic Diversity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Actual vs Target Chart */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.allocationView.chart.eyebrow')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.allocationView.chart.heading')}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#189890] font-bold">
              {t('investmentExperience.allocationView.chart.badge')}
            </span>
          </div>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="assetClassLabel"
                  tick={{ fill: textColor, fontSize: 10 }}
                  axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: textColor, fontSize: 10 }}
                  domain={[0, 60]}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: isDark ? '#F5F7F6' : '#0A0D0C',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                />
                <Bar
                  dataKey="atual"
                  name={t('investmentExperience.allocationView.chart.seriesActual')}
                  fill="#189890"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="alvo"
                  name={t('investmentExperience.allocationView.chart.seriesTarget')}
                  fill={isDark ? '#4E5653' : '#8E9995'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Diversity List */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.allocationView.geography.eyebrow')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.allocationView.geography.heading')}
            </h4>

            <div className="space-y-4">
              {GEOGRAPHIC_EXPOSURE.map((geo) => (
                <div key={geo.region} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-foreground font-medium">
                      {regionKeyMap[geo.region] || geo.region}
                    </span>
                    <span className="font-mono font-bold">{geo.weight}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${geo.weight}%`, backgroundColor: geo.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.allocationView.footnote')}
          </div>
        </div>
      </div>
    </div>
  );
};
