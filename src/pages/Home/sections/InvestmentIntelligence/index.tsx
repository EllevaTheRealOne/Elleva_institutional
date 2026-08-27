import React from 'react';
import {
  Percent,
  Sparkles,
  Ban,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';

interface InvestmentIntelligenceProps {
  isDark?: boolean;
}

export const InvestmentIntelligence: React.FC<InvestmentIntelligenceProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const probabilityDistribution = [
    { scenario: t('intelligence.scenarios.low'), prob: 15, color: '#8E9995' },
    { scenario: t('intelligence.scenarios.base'), prob: 65, color: '#189890' },
    { scenario: t('intelligence.scenarios.high'), prob: 20, color: '#0C5F5A' },
  ];

  return (
    <section
      id="investment-intelligence"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Headline */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('intelligence.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('intelligence.description')}
          </p>
        </div>

        {/* Believable Institutional Investment Case Interface */}
        <div
          id="investment-case"
          className={`rounded-2xl border overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.1)] shadow-xl'
              : 'bg-white border-[rgba(10,13,12,0.1)] shadow-sm'
          }`}
        >
          {/* Header Panel */}
          <div
            className={`px-6 sm:px-8 py-5 border-b flex flex-wrap items-center justify-between gap-4 ${
              isDark
                ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
                : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.06)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#189890]/15 text-[#189890]">
                CASE #IC-2026-8942
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg">
                {t('intelligence.caseTitle')}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#8E9995]">{t('intelligence.confidenceLabel')}</span>
              <span className="font-bold text-[#189890]">{t('intelligence.confidenceValue')}</span>
            </div>
          </div>

          {/* Core Fields Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Tese, Riscos, Invalidação */}
            <div className="lg:col-span-7 space-y-6">
              {/* Field 1: Tese */}
              <div
                id="investment-thesis"
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded bg-[#0C5F5A] text-[#189890]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h4 className="font-ui font-bold text-xs uppercase tracking-wider text-[#189890]">
                    {t('intelligence.thesis.label')}
                  </h4>
                </div>
                <div className="text-sm font-semibold mb-1">{t('intelligence.thesis.question')}</div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  {t('intelligence.thesis.content')}
                </p>
              </div>

              {/* Field 3: Risco */}
              <div
                id="investment-risk"
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded bg-black/5 dark:bg-white/5 text-[#8E9995]">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <h4 className={`font-ui font-bold text-xs uppercase tracking-wider ${isDark ? 'text-[#F5F7F6]' : 'text-[#0A0D0C]'}`}>
                    {t('intelligence.risk.label')}
                  </h4>
                </div>
                <div className="text-sm font-semibold mb-1">{t('intelligence.risk.question')}</div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  {t('intelligence.risk.content')}
                </p>
              </div>

              {/* Field 4: Gatilhos */}
              <div
                id="investment-triggers"
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded bg-[#189890]/10 text-[#189890]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-ui font-bold text-xs uppercase tracking-wider text-[#189890]">
                    {t('intelligence.triggers.label')}
                  </h4>
                </div>
                <div className="text-sm font-semibold mb-1">{t('intelligence.triggers.question')}</div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  {t('intelligence.triggers.content')}
                </p>
              </div>

              {/* Field 5: Invalidação */}
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded bg-neutral-500/10 text-neutral-400">
                    <Ban className="w-4 h-4" />
                  </div>
                  <h4 className="font-ui font-bold text-xs uppercase tracking-wider text-neutral-400">
                    {t('intelligence.invalidation.label')}
                  </h4>
                </div>
                <div className="text-sm font-semibold mb-1">{t('intelligence.invalidation.question')}</div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  {t('intelligence.invalidation.content')}
                </p>
              </div>
            </div>

            {/* Right Column: Probabilidade (Recharts) & Ação recomendada */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Field 2: Probabilidade with Recharts */}
              <div
                className={`p-5 rounded-xl border ${
                  isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-[#0C5F5A] text-[#189890]">
                      <Percent className="w-4 h-4" />
                    </div>
                    <h4 className="font-ui font-bold text-xs uppercase tracking-wider text-[#189890]">
                      {t('intelligence.probability.label')}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#8E9995]">{t('intelligence.probability.subtitle')}</span>
                </div>
                <div className="text-sm font-semibold mb-2">{t('intelligence.probability.question')}</div>

                {/* Probability Distribution Chart */}
                <div className="w-full h-44 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={probabilityDistribution}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: textColor, fontSize: 10 }} unit="%" />
                      <YAxis
                        dataKey="scenario"
                        type="category"
                        tick={{ fill: textColor, fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        formatter={(val: any) => [`${val}%`, t('intelligence.probability.occurrence')]}
                        contentStyle={{
                          backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: isDark ? '#F5F7F6' : '#0A0D0C',
                        }}
                      />
                      <Bar dataKey="prob" radius={[0, 3, 3, 0]}>
                        {probabilityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Field 6: Ação Recomendada */}
              <div
                id="investment-action"
                className={`p-6 rounded-xl border ${
                  isDark
                    ? 'bg-[#0E1214] border-[#189890]/40 accent-glow'
                    : 'bg-white border-[#189890] shadow-sm accent-glow'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-ui uppercase tracking-widest text-[#189890] font-bold">
                    {t('intelligence.action.badge')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#189890]/15 text-[#189890]">
                    {t('intelligence.action.status')}
                  </span>
                </div>
                <div className="text-base font-display font-bold mb-2">
                  {t('intelligence.action.headline')}
                </div>
                <div className="space-y-2 text-xs leading-relaxed mb-4">
                  <div className="flex justify-between border-b border-black/[0.06] dark:border-white/10 pb-1.5">
                    <span className={isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}>{t('intelligence.action.allocationLabel')}</span>
                    <span className="font-mono font-bold">{t('intelligence.action.allocationValue')}</span>
                  </div>
                  <div className="flex justify-between border-b border-black/[0.06] dark:border-white/10 pb-1.5">
                    <span className={isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}>{t('intelligence.action.horizonLabel')}</span>
                    <span className="font-mono font-bold">{t('intelligence.action.horizonValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}>{t('intelligence.action.routingLabel')}</span>
                    <span className="font-mono font-bold text-[#189890]">{t('intelligence.action.routingValue')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#189890] font-ui font-semibold">
                  <span>{t('intelligence.action.readyCta')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

