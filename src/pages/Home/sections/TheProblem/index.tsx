import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

interface TheProblemProps {
  isDark?: boolean;
}

export const TheProblem: React.FC<TheProblemProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const comparisonData = [
    { metric: t('problem.metrics.assetsFollowed'), tradicional: 1.0, elleva: 2.8, display: '2.8x' },
    { metric: t('problem.metrics.responseTime'), tradicional: 1.0, elleva: 3.6, display: '3.6x' },
    { metric: t('problem.metrics.costPerAnalysis'), tradicional: 1.0, elleva: 0.38, display: '-62%' },
    { metric: t('problem.metrics.capacityPerAnalyst'), tradicional: 1.0, elleva: 2.4, display: '2.4x' },
  ];

  const traditionalPoints = [
    t('problem.traditional.point1'),
    t('problem.traditional.point2'),
    t('problem.traditional.point3'),
    t('problem.traditional.point4'),
    t('problem.traditional.point5'),
  ];

  const ellevaPoints = [
    t('problem.elleva.point1'),
    t('problem.elleva.point2'),
    t('problem.elleva.point3'),
    t('problem.elleva.point4'),
    t('problem.elleva.point5'),
  ];

  return (
    <section
      id="problem"
      className={`py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title">
            {t('problem.title')}
          </h2>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Traditional Model Card */}
          <div
            className={`p-6 sm:p-8 rounded-xl border transition-all ${
              isDark
                ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/[0.06] dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-sm bg-black/5 dark:bg-white/5 text-[#8E9995]">
                  <XCircle className="w-4 h-4" />
                </div>
                <h3 className="type-card-title">{t('problem.traditional.title')}</h3>
              </div>
              <span className="type-micro text-[#8E9995]">
                {t('problem.traditional.badge')}
              </span>
            </div>

            <ul className="space-y-3.5">
              {traditionalPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-3 type-body-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E9995] shrink-0" />
                  <span className={isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elleva Model Card */}
          <div
            className={`p-6 sm:p-8 rounded-xl border transition-all ${
              isDark
                ? 'bg-[#0A0D0F] border-[#189890]/40 accent-glow'
                : 'bg-white border-[#189890] shadow-sm accent-glow'
            }`}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/[0.06] dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-sm bg-[#0C5F5A] text-[#189890]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="type-card-title text-[#189890]">{t('problem.elleva.title')}</h3>
              </div>
              <span className="type-micro text-[#189890] font-semibold">
                {t('problem.elleva.badge')}
              </span>
            </div>

            <ul className="space-y-3.5">
              {ellevaPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-3 type-body-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#189890] shrink-0" />
                  <span className={isDark ? 'text-[#F5F7F6]' : 'text-[#0A0D0C]'}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div
            className={`p-5 rounded-xl border ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric text-[#189890] mb-1">
              2.8x
            </div>
            <div className="type-ui font-semibold">{t('problem.metrics.assetsFollowed')}</div>
            <div className={`type-micro mt-0.5 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('problem.metrics.assetsFollowedSub')}
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric text-[#189890] mb-1">
              3.6x
            </div>
            <div className="type-ui font-semibold">{t('problem.metrics.responseTime')}</div>
            <div className={`type-micro mt-0.5 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('problem.metrics.responseTimeSub')}
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric text-[#189890] mb-1">
              -62%
            </div>
            <div className="type-ui font-semibold">{t('problem.metrics.costPerAnalysis')}</div>
            <div className={`type-micro mt-0.5 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('problem.metrics.costPerAnalysisSub')}
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border ${
              isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
            }`}
          >
            <div className="type-metric text-[#189890] mb-1">
              2.4x
            </div>
            <div className="type-ui font-semibold">{t('problem.metrics.capacityPerAnalyst')}</div>
            <div className={`type-micro mt-0.5 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('problem.metrics.capacityPerAnalystSub')}
            </div>
          </div>
        </div>

        {/* Quantitative Comparison Chart (Recharts) */}
        <div
          className={`p-6 sm:p-8 rounded-xl border mb-10 ${
            isDark
              ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
              : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="type-section-eyebrow text-[#8E9995] mb-1">
                {t('problem.chart.eyebrow')}
              </div>
              <h4 className="type-card-title text-base sm:text-lg">
                {t('problem.chart.title')}
              </h4>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="metric"
                  tick={{ fill: textColor, fontSize: 11 }}
                  axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: textColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 4]}
                />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    `${val}x`,
                    name === 'tradicional'
                      ? t('problem.chart.traditional')
                      : t('problem.chart.elleva'),
                  ]}
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
                <Bar
                  name={t('problem.chart.traditionalNormalized')}
                  dataKey="tradicional"
                  fill={isDark ? '#8E9995' : '#4E5653'}
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  name={t('problem.chart.ellevaAutonomous')}
                  dataKey="elleva"
                  fill="#189890"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Closing Statement Callout */}
        <div
          className={`p-6 sm:p-8 rounded-xl border text-center transition-all ${
            isDark
              ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
              : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.06)]'
          }`}
        >
          <p className="font-display text-lg sm:text-xl font-semibold tracking-tight max-w-3xl mx-auto leading-relaxed">
            “{t('problem.quote')}”
          </p>
        </div>
      </div>
    </section>
  );
};

