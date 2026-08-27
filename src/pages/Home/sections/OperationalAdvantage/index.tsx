import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface OperationalAdvantageProps {
  isDark?: boolean;
}

export const OperationalAdvantage: React.FC<OperationalAdvantageProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const benchmarkData = [
    { metric: t('operational.metrics.monitoredAssets.name'), tradicional: 1.0, elleva: 2.8, display: '2.8x' },
    { metric: t('operational.metrics.responseSpeed.name'), tradicional: 1.0, elleva: 3.6, display: '3.6x' },
    { metric: t('operational.metrics.costPerAnalysis.name'), tradicional: 1.0, elleva: 0.38, display: '-62%' },
    { metric: t('operational.metrics.analystCapacity.name'), tradicional: 1.0, elleva: 2.4, display: '2.4x' },
  ];

  return (
    <section
      id="operational-advantage"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('operational.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('operational.description')}
          </p>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric font-bold text-[#189890] mb-2 tracking-tight">
              2.8x
            </div>
            <div className="text-xs font-ui font-semibold mb-1">
              {t('operational.cards.monitoredAssets.title')}
            </div>
            <p className={`text-[11px] font-body leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('operational.cards.monitoredAssets.desc')}
            </p>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric font-bold text-[#189890] mb-2 tracking-tight">
              3.6x
            </div>
            <div className="text-xs font-ui font-semibold mb-1">
              {t('operational.cards.responseSpeed.title')}
            </div>
            <p className={`text-[11px] font-body leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('operational.cards.responseSpeed.desc')}
            </p>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric font-bold text-[#189890] mb-2 tracking-tight">
              -62%
            </div>
            <div className="text-xs font-ui font-semibold mb-1">
              {t('operational.cards.costPerAnalysis.title')}
            </div>
            <p className={`text-[11px] font-body leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('operational.cards.costPerAnalysis.desc')}
            </p>
          </div>

          <div
            className={`p-6 rounded-xl border transition-all ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric font-bold text-[#189890] mb-2 tracking-tight">
              2.4x
            </div>
            <div className="text-xs font-ui font-semibold mb-1">
              {t('operational.cards.analystCapacity.title')}
            </div>
            <p className={`text-[11px] font-body leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('operational.cards.analystCapacity.desc')}
            </p>
          </div>
        </div>

        {/* Operational Advantage Recharts Visualizer */}
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
                {t('operational.chart.eyebrow')}
              </div>
              <h4 className="font-display font-bold text-lg">
                {t('operational.chart.heading')}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#189890] font-bold">
              {t('operational.chart.badge')}
            </span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="metric" tick={{ fill: textColor, fontSize: 11 }} axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 4]} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    `${val}x`,
                    name === 'tradicional'
                      ? t('operational.chart.legendTraditional')
                      : t('operational.chart.legendElleva'),
                  ]}
                  contentStyle={{
                    backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: isDark ? '#F5F7F6' : '#0A0D0C',
                  }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }} />
                <Bar name={t('operational.chart.legendTraditionalBase')} dataKey="tradicional" fill={isDark ? '#8E9995' : '#4E5653'} radius={[3, 3, 0, 0]} />
                <Bar name={t('operational.chart.legendElleva')} dataKey="elleva" fill="#189890" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={`text-[11px] font-body mt-4 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('operational.chart.footnote')}
          </div>
        </div>
      </div>
    </section>
  );
};

