import React from 'react';
import { Server, Activity, DollarSign } from 'lucide-react';
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

interface BusinessModelProps {
  isDark?: boolean;
}

// Conceptual Operating Leverage comparison curve (Normalized conceptual index)
const LEVERAGE_CURVE = [
  { scale: '1x AUM', traditionalCost: 20, ellevaLeverage: 80 },
  { scale: '2x AUM', traditionalCost: 40, ellevaLeverage: 88 },
  { scale: '5x AUM', traditionalCost: 85, ellevaLeverage: 94 },
  { scale: '10x AUM', traditionalCost: 170, ellevaLeverage: 97 },
  { scale: '25x AUM', traditionalCost: 420, ellevaLeverage: 99 },
];

export const BusinessModel: React.FC<BusinessModelProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const revenueStreams = [
    {
      title: t('businessModel.streams.platform.title'),
      description: t('businessModel.streams.platform.desc'),
      subtext: t('businessModel.streams.platform.subtext'),
      icon: <Server className="w-4 h-4" />,
    },
    {
      title: t('businessModel.streams.usage.title'),
      description: t('businessModel.streams.usage.desc'),
      subtext: t('businessModel.streams.usage.subtext'),
      icon: <Activity className="w-4 h-4" />,
    },
    {
      title: t('businessModel.streams.value.title'),
      description: t('businessModel.streams.value.desc'),
      subtext: t('businessModel.streams.value.subtext'),
      icon: <DollarSign className="w-4 h-4" />,
    },
  ];

  return (
    <section
      id="business-model"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('businessModel.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('businessModel.description')}
          </p>
        </div>

        {/* 3 Revenue Stream Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {revenueStreams.map((stream) => (
            <div
              key={stream.title}
              className={`p-6 sm:p-8 rounded-xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                  : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded-sm bg-[#0C5F5A] text-[#189890]">
                    {stream.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg">{stream.title}</h3>
                </div>
                <div className="text-sm font-semibold text-[#189890] mb-2">
                  “{stream.description}”
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  {stream.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Operating Leverage Recharts Visualizer */}
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
                {t('businessModel.chart.eyebrow')}
              </div>
              <h4 className="font-display font-bold text-lg">
                {t('businessModel.chart.heading')}
              </h4>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#8E9995]">{t('businessModel.chart.legendTraditionalShort')}</span>
              <span className="text-[#189890] font-bold">{t('businessModel.chart.legendEllevaShort')}</span>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LEVERAGE_CURVE} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#189890" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#189890" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="scale"
                  tick={{ fill: textColor, fontSize: 11 }}
                  axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any, name: string) => [
                    `${val} pts`,
                    name.includes('Elleva')
                      ? t('businessModel.chart.tooltipElleva')
                      : t('businessModel.chart.tooltipTraditional'),
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
                <Area
                  type="monotone"
                  name={t('businessModel.chart.seriesElleva')}
                  dataKey="ellevaLeverage"
                  stroke="#189890"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLeverage)"
                />
                <Area
                  type="monotone"
                  name={t('businessModel.chart.seriesTraditional')}
                  dataKey="traditionalCost"
                  stroke={isDark ? '#8E9995' : '#4E5653'}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

