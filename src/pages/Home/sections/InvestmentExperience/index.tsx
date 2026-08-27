import React, { useState } from 'react';
import {
  Eye,
  Layers,
  PieChart,
  TrendingUp,
  ShieldAlert,
  Droplets,
  Brain,
  Activity,
  Bell,
  CheckCircle2,
} from 'lucide-react';
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

interface InvestmentExperienceProps {
  isDark?: boolean;
}

// Illustrative execution index & mandate alignment tracking (avoiding speculative return/alpha claims)
const FIDUCIARY_TRACKING_DATA = [
  { month: 'Jan', executado: 100.0, politicaAlvo: 100.0 },
  { month: 'Fev', executado: 100.2, politicaAlvo: 100.0 },
  { month: 'Mar', executado: 100.1, politicaAlvo: 100.0 },
  { month: 'Abr', executado: 99.9, politicaAlvo: 100.0 },
  { month: 'Mai', executado: 100.3, politicaAlvo: 100.0 },
  { month: 'Jun', executado: 100.1, politicaAlvo: 100.0 },
  { month: 'Jul', executado: 100.0, politicaAlvo: 100.0 },
];

export const InvestmentExperience: React.FC<InvestmentExperienceProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);
  const [selectedArea, setSelectedArea] = useState<string>('portfolio-overview');
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const allocationData = [
    { name: t('investmentExperience.allocation.fixedIncome'), value: 42, color: '#0C5F5A' },
    { name: t('investmentExperience.allocation.globalEquities'), value: 28, color: '#189890' },
    { name: t('investmentExperience.allocation.realAssets'), value: 18, color: '#8E9995' },
    { name: t('investmentExperience.allocation.strategicCash'), value: 12, color: '#4E5653' },
  ];

  const areas = [
    { id: 'portfolio-overview', label: t('investmentExperience.tabs.overview'), icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'portfolio-positions', label: t('investmentExperience.tabs.positions'), icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'portfolio-allocation', label: t('investmentExperience.tabs.allocation'), icon: <PieChart className="w-3.5 h-3.5" /> },
    { id: 'portfolio-performance', label: t('investmentExperience.tabs.performance'), icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'portfolio-risk', label: t('investmentExperience.tabs.risk'), icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'portfolio-liquidity', label: t('investmentExperience.tabs.liquidity'), icon: <Droplets className="w-3.5 h-3.5" /> },
    { id: 'portfolio-market-intelligence', label: t('investmentExperience.tabs.marketIntelligence'), icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'portfolio-attribution', label: t('investmentExperience.tabs.attribution'), icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'portfolio-alerts', label: t('investmentExperience.tabs.alerts'), icon: <Bell className="w-3.5 h-3.5" /> },
    { id: 'portfolio-compliance', label: t('investmentExperience.tabs.compliance'), icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <section
      id="investment-experience"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('investmentExperience.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('investmentExperience.description')}
          </p>
        </div>

        {/* Institutional Experience Workspace */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.1)] shadow-xl'
              : 'bg-white border-[rgba(10,13,12,0.1)] shadow-sm'
          }`}
        >
          {/* Top Bar with Interface Areas */}
          <div
            className={`p-3 border-b flex items-center overflow-x-auto scrollbar-none gap-1.5 ${
              isDark
                ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
                : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.06)]'
            }`}
          >
            {areas.map((area) => {
              const active = selectedArea === area.id;
              return (
                <button
                  key={area.id}
                  id={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-ui font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    active
                      ? isDark
                        ? 'bg-[#189890] text-white'
                        : 'bg-[#0C5F5A] text-white shadow-xs'
                      : isDark
                      ? 'text-[#8E9995] hover:text-[#F5F7F6] hover:bg-white/5'
                      : 'text-[#4E5653] hover:text-[#0A0D0C] hover:bg-black/5'
                  }`}
                >
                  {area.icon}
                  <span>{area.label}</span>
                </button>
              );
            })}
          </div>

          {/* Institutional Dashboard Interior */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Top Stat Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
                  {t('investmentExperience.stats.monitoredAum.label')}
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold mt-1">US$ 482.5M</div>
                <div className="text-[11px] text-[#189890] mt-0.5">
                  {t('investmentExperience.stats.monitoredAum.status')}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
                  {t('investmentExperience.stats.adherence.label')}
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
                  99,8%
                </div>
                <div className="text-[11px] text-[#8E9995] mt-0.5">
                  {t('investmentExperience.stats.adherence.deviation')}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
                  {t('investmentExperience.stats.var.label')}
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold mt-1">1.24%</div>
                <div className="text-[11px] text-[#8E9995] mt-0.5">
                  {t('investmentExperience.stats.var.policyLimit')}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
                  {t('investmentExperience.stats.custody.label')}
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
                  <span>{t('investmentExperience.stats.custody.status')}</span>
                </div>
                <div className="text-[11px] text-[#8E9995] mt-0.5">
                  {t('investmentExperience.stats.custody.subtext')}
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
                      {t('investmentExperience.chart.eyebrow')}
                    </div>
                    <h4 className="font-display font-bold text-sm">
                      {t('investmentExperience.chart.heading')}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#189890] font-bold">
                    {t('investmentExperience.chart.badge')}
                  </span>
                </div>

                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={FIDUCIARY_TRACKING_DATA}
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
                        dataKey="month"
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
                        name={t('investmentExperience.chart.seriesExecution')}
                        dataKey="executado"
                        stroke="#189890"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorFiduciary)"
                      />
                      <Area
                        type="monotone"
                        name={t('investmentExperience.chart.seriesTarget')}
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
                    {t('investmentExperience.allocation.eyebrow')}
                  </div>
                  <h4 className="font-display font-bold text-sm mb-3">
                    {t('investmentExperience.allocation.heading')}
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
                          formatter={(val: any) => [`${val}%`, t('investmentExperience.allocation.tooltipLabel')]}
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
        </div>
      </div>
    </section>
  );
};

