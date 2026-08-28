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
} from 'recharts';
import { LIQUIDITY_LADDER_DATA, LIQUIDITY_INSTRUMENTS } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const LiquidityView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const horizonKeyMap: Record<string, string> = {
    'T+0 Intraday': t('investmentExperience.liquidityView.horizons.t0', 'T+0 Intraday'),
    'T+1 Next Day': t('investmentExperience.liquidityView.horizons.t1', 'T+1 Next Day'),
    'T+2 / T+3 Market': t('investmentExperience.liquidityView.horizons.t2t3', 'T+2 / T+3 Market'),
    'T+5 Global Core': t('investmentExperience.liquidityView.horizons.t5', 'T+5 Global Core'),
    'T+0 (Intraday)': t('investmentExperience.liquidityView.horizons.t0', 'T+0 Intraday'),
    'T+1 (Next Day)': t('investmentExperience.liquidityView.horizons.t1', 'T+1 Next Day'),
    'T+2 / T+3': t('investmentExperience.liquidityView.horizons.t2t3', 'T+2 / T+3 Market'),
    'T+5 (Core)': t('investmentExperience.liquidityView.horizons.t5', 'T+5 Global Core'),
  };

  const instrumentKeyMap: Record<string, { name: string; tier: string }> = {
    'Overnight Fed Reverse Repo / SOFR Cash': {
      name: t('investmentExperience.liquidityView.instruments.repo', 'Overnight Fed Reverse Repo / SOFR Cash'),
      tier: t('investmentExperience.liquidityView.instruments.tier1Cash', 'Tier-1 Cash'),
    },
    'US Treasury Bills (< 90 days)': {
      name: t('investmentExperience.liquidityView.instruments.tbills', 'US Treasury Bills (< 90 days)'),
      tier: t('investmentExperience.liquidityView.instruments.tier1Sovereign', 'Tier-1 Sovereign'),
    },
    'US Treasury Bills (< 90 Days)': {
      name: t('investmentExperience.liquidityView.instruments.tbills', 'US Treasury Bills (< 90 days)'),
      tier: t('investmentExperience.liquidityView.instruments.tier1Sovereign', 'Tier-1 Sovereign'),
    },
    'US Benchmark Notes (Liquid G10)': {
      name: t('investmentExperience.liquidityView.instruments.benchmarkNotes', 'US Benchmark Notes (Liquid G10)'),
      tier: t('investmentExperience.liquidityView.instruments.tier1HighLiquid', 'Tier-1 High Liquid'),
    },
    'Liquid Large-Cap Equities (DVP)': {
      name: t('investmentExperience.liquidityView.instruments.largeCapEq', 'Liquid Large-Cap Equities (DVP)'),
      tier: t('investmentExperience.liquidityView.instruments.liquidEquities', 'Liquid Equities'),
    },
    'G7 Government Sovereign Bonds': {
      name: t('investmentExperience.liquidityView.instruments.benchmarkNotes', 'G7 Government Sovereign Bonds'),
      tier: t('investmentExperience.liquidityView.instruments.tier1HighLiquid', 'Tier-1 Sovereign'),
    },
  };

  const ladderData = LIQUIDITY_LADDER_DATA.map((item) => ({
    ...item,
    horizonLabel: horizonKeyMap[item.horizon] || item.horizon,
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
            {t('investmentExperience.liquidityView.stats.cashT0.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.liquidityView.stats.cashT0.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.liquidityView.stats.cashT0.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.liquidityView.stats.convertibleT1.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.liquidityView.stats.convertibleT1.value')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.liquidityView.stats.convertibleT1.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.liquidityView.stats.lcr.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.liquidityView.stats.lcr.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.liquidityView.stats.lcr.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.liquidityView.stats.settlementFail.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.liquidityView.stats.settlementFail.value')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.liquidityView.stats.settlementFail.status')}
          </div>
        </div>
      </div>

      {/* Liquidity Ladder & Instruments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Liquidity Ladder Chart */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.liquidityView.chart.eyebrow')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.liquidityView.chart.heading')}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#189890] font-bold">
              {t('investmentExperience.liquidityView.chart.badge')}
            </span>
          </div>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ladderData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="horizonLabel"
                  tick={{ fill: textColor, fontSize: 10 }}
                  axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: textColor, fontSize: 10 }}
                  domain={[0, 250]}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any) => [`US$ ${val}M`, t('investmentExperience.liquidityView.chart.seriesLiquidity')]}
                  contentStyle={{
                    backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: isDark ? '#F5F7F6' : '#0A0D0C',
                  }}
                />
                <Bar
                  dataKey="amount"
                  name={t('investmentExperience.liquidityView.chart.seriesLiquidity')}
                  fill="#189890"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Primary Liquidity Buffer Instruments */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.liquidityView.buffers.eyebrow')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.liquidityView.buffers.heading')}
            </h4>

            <div className="space-y-3">
              {LIQUIDITY_INSTRUMENTS.map((inst) => {
                const localized = instrumentKeyMap[inst.name];
                return (
                  <div
                    key={inst.name}
                    className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                      isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="text-foreground font-medium truncate">
                        {localized?.name || inst.name}
                      </div>
                      <div className="text-[10px] text-[#8E9995]">
                        {localized?.tier || inst.tier}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#189890] shrink-0">{inst.share}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.liquidityView.footnote')}
          </div>
        </div>
      </div>
    </div>
  );
};
