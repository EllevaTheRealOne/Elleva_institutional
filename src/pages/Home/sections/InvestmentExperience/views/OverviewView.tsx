import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { FIDUCIARY_TRACKING_DATA } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const OverviewView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const monthMap: Record<string, string> = {
    Jan: t('investmentExperience.months.jan', 'Jan'),
    Fev: t('investmentExperience.months.feb', 'Feb'),
    Feb: t('investmentExperience.months.feb', 'Feb'),
    Mar: t('investmentExperience.months.mar', 'Mar'),
    Abr: t('investmentExperience.months.apr', 'Apr'),
    Apr: t('investmentExperience.months.apr', 'Apr'),
    Mai: t('investmentExperience.months.may', 'May'),
    May: t('investmentExperience.months.may', 'May'),
    Jun: t('investmentExperience.months.jun', 'Jun'),
    Jul: t('investmentExperience.months.jul', 'Jul'),
  };

  const chartData = FIDUCIARY_TRACKING_DATA.map((item) => ({
    ...item,
    monthLabel: monthMap[item.month] || item.month,
  }));

  const allocationData = [
    { name: t('investmentExperience.overview.allocation.fixedIncome', t('investmentExperience.allocation.fixedIncome', 'Fixed Income')), value: 42, color: '#0C5F5A' },
    { name: t('investmentExperience.overview.allocation.globalEquities', t('investmentExperience.allocation.globalEquities', 'Global Equities')), value: 28, color: '#189890' },
    { name: t('investmentExperience.overview.allocation.realAssets', t('investmentExperience.allocation.realAssets', 'Real Assets & Infra')), value: 18, color: '#8E9995' },
    { name: t('investmentExperience.overview.allocation.strategicCash', t('investmentExperience.allocation.strategicCash', 'Strategic Cash & Reserves')), value: 12, color: '#4E5653' },
  ];

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
            {t('investmentExperience.overview.stats.monitoredAum.label', t('investmentExperience.stats.monitoredAum.label'))}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.overview.stats.monitoredAum.value', 'US$ 482.5M')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.overview.stats.monitoredAum.status', t('investmentExperience.stats.monitoredAum.status'))}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.overview.stats.adherence.label', t('investmentExperience.stats.adherence.label'))}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.overview.stats.adherence.value', '99.8%')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.overview.stats.adherence.deviation', t('investmentExperience.stats.adherence.deviation'))}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.overview.stats.var.label', t('investmentExperience.stats.var.label'))}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.overview.stats.var.value', '1.24%')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.overview.stats.var.policyLimit', t('investmentExperience.stats.var.policyLimit'))}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.overview.stats.custody.label', t('investmentExperience.stats.custody.label'))}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.overview.stats.custody.status', t('investmentExperience.stats.custody.status'))}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.overview.stats.custody.subtext', t('investmentExperience.stats.custody.subtext'))}
          </div>
        </div>
      </div>

      {/* Tracking & Allocation Visualizer (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mandate Adherence Chart */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.overview.chart.eyebrow', t('investmentExperience.chart.eyebrow'))}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.overview.chart.heading', t('investmentExperience.chart.heading'))}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#189890] font-bold">
              {t('investmentExperience.overview.chart.badge', t('investmentExperience.chart.badge'))}
            </span>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorFiduciary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#189890" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#189890" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="monthLabel"
                  tick={{ fill: textColor, fontSize: 10 }}
                  axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: textColor, fontSize: 10 }}
                  domain={[98, 102]}
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
                <Area
                  type="monotone"
                  name={t('investmentExperience.overview.chart.seriesExecution', t('investmentExperience.chart.seriesExecution'))}
                  dataKey="executado"
                  stroke="#189890"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFiduciary)"
                />
                <Area
                  type="monotone"
                  name={t('investmentExperience.overview.chart.seriesTarget', t('investmentExperience.chart.seriesTarget'))}
                  dataKey="politicaAlvo"
                  stroke={isDark ? '#8E9995' : '#4E5653'}
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation Breakdown */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.overview.allocation.eyebrow', t('investmentExperience.allocation.eyebrow'))}
            </div>
            <h4 className="font-display font-bold text-sm mb-3">
              {t('investmentExperience.overview.allocation.heading', t('investmentExperience.allocation.heading'))}
            </h4>

            <div className="w-full h-36">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={allocationData}
                    innerRadius={38}
                    outerRadius={58}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, t('investmentExperience.overview.allocation.tooltipLabel', t('investmentExperience.allocation.tooltipLabel'))]}
                    contentStyle={{
                      backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: isDark ? '#F5F7F6' : '#0A0D0C',
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 mt-2">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className={`truncate ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                    {item.name}
                  </span>
                </div>
                <span className="font-mono font-bold ml-2">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
