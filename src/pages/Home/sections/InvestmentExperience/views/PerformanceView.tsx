import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { PERFORMANCE_TRAJECTORY_DATA, BRINSON_ATTRIBUTION } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const PerformanceView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const attrKeyMap: Record<string, string> = {
    'Asset Allocation Effect': t('investmentExperience.performanceView.attribution.allocationEffect', 'Asset Allocation Effect'),
    'Security Selection Effect': t('investmentExperience.performanceView.attribution.selectionEffect', 'Security Selection Effect'),
    'Interaction / Execution Alpha': t('investmentExperience.performanceView.attribution.interactionAlpha', 'Interaction / Execution Alpha'),
    'Net Currency Hedge Effect': t('investmentExperience.performanceView.attribution.hedgeEffect', 'Net Currency Hedge Effect'),
    'Currency Hedge Net Effect': t('investmentExperience.performanceView.attribution.hedgeEffect', 'Net Currency Hedge Effect'),
  };

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
            {t('investmentExperience.performanceView.stats.informationRatio.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.performanceView.stats.informationRatio.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.performanceView.stats.informationRatio.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.performanceView.stats.trackingError.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.performanceView.stats.trackingError.value')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.performanceView.stats.trackingError.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.performanceView.stats.sharpeRatio.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.performanceView.stats.sharpeRatio.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.performanceView.stats.sharpeRatio.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.performanceView.stats.maxDrawdown.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.performanceView.stats.maxDrawdown.value')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.performanceView.stats.maxDrawdown.status')}
          </div>
        </div>
      </div>

      {/* Trajectory & Brinson Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cumulative Performance Trajectory */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="mb-4">
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.performanceView.chart.eyebrow')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.performanceView.chart.heading')}
              </h4>
            </div>

            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={PERFORMANCE_TRAJECTORY_DATA}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: textColor, fontSize: 10 }}
                    axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: textColor, fontSize: 10 }}
                    domain={[98, 116]}
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
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    name={t('investmentExperience.performanceView.chart.seriesPortfolio')}
                    stroke="#189890"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#189890' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    name={t('investmentExperience.performanceView.chart.seriesBenchmark')}
                    stroke={isDark ? '#8E9995' : '#4E5653'}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={{ r: 2, fill: isDark ? '#8E9995' : '#4E5653' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#189890]">
            * {t('investmentExperience.performanceView.chart.badge', 'DAILY AUDITED')}
          </div>
        </div>

        {/* Brinson-Fachler Attribution Breakdown */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.performanceView.attribution.eyebrow')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.performanceView.attribution.heading')}
            </h4>

            <div className="space-y-3">
              {BRINSON_ATTRIBUTION.map((attr) => (
                <div
                  key={attr.component}
                  className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                    isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                  }`}
                >
                  <span className="text-foreground font-medium">
                    {attrKeyMap[attr.component] || attr.component}
                  </span>
                  <span className="font-mono font-bold text-[#189890]">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.performanceView.footnote')}
          </div>
        </div>
      </div>
    </div>
  );
};
