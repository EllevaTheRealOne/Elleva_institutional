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
  ReferenceLine,
} from 'recharts';
import { FACTOR_EXPOSURES } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const AttributionView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const factorKeyMap: Record<string, string> = {
    'Value Factor': t('investmentExperience.attributionView.factors.value', 'Value Factor'),
    'Momentum Factor': t('investmentExperience.attributionView.factors.momentum', 'Momentum Factor'),
    'Quality / Profitability': t('investmentExperience.attributionView.factors.quality', 'Quality / Profitability'),
    'Low Volatility': t('investmentExperience.attributionView.factors.lowVol', 'Low Volatility'),
    'Size Factor (Large Cap)': t('investmentExperience.attributionView.factors.size', 'Size Factor (Large Cap)'),
    'Yield / Carry': t('investmentExperience.attributionView.factors.yield', 'Yield / Carry'),
    'Liquidity Factor': t('investmentExperience.attributionView.factors.liquidity', 'Liquidity Factor'),
    // Fallback shorthand aliases
    Quality: t('investmentExperience.attributionView.factors.quality', 'Quality'),
    Momentum: t('investmentExperience.attributionView.factors.momentum', 'Momentum'),
    'Low Vol': t('investmentExperience.attributionView.factors.lowVol', 'Low Vol'),
    Carry: t('investmentExperience.attributionView.factors.yield', 'Carry'),
    Liquidity: t('investmentExperience.attributionView.factors.liquidity', 'Liquidity'),
  };

  const chartData = FACTOR_EXPOSURES.map((item) => ({
    ...item,
    factorLabel: factorKeyMap[item.factor] || item.factor,
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
            {t('investmentExperience.attributionView.stats.systematic.label', 'Systematic Factor Exposure')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.attributionView.stats.systematic.value', '92.4%')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.attributionView.stats.systematic.status', 'Pure Institutional Factors')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.attributionView.stats.residual.label', 'Specific Residual Risk')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.attributionView.stats.residual.value', '7.6%')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.attributionView.stats.residual.status', 'Controlled Idiosyncratic')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.attributionView.stats.activeShare.label', 'Effective Active Share')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.attributionView.stats.activeShare.value', '68.4%')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.attributionView.stats.activeShare.status', 'Controlled Differentiation')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.attributionView.stats.rSquared.label', 'Multi-Factor R²')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.attributionView.stats.rSquared.value', '0.96')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.attributionView.stats.rSquared.status', 'Robust Statistical Fit')}
          </div>
        </div>
      </div>

      {/* Factor Decomposition & Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Barra / MSCI Factor Decomposition Chart */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.attributionView.chart.eyebrow', 'BARRA / MSCI FACTOR DECOMPOSITION')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.attributionView.chart.heading', 'Style Factor Exposures')}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#189890] font-bold">
              {t('investmentExperience.attributionView.chart.badge', '7-FACTOR MODEL')}
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="factorLabel"
                  tick={{ fill: textColor, fontSize: 10 }}
                  axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: textColor, fontSize: 10 }}
                  domain={[0, 1.6]}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: any) => [`+${val} σ`, t('investmentExperience.attributionView.chart.seriesExposure', 'Factor Exposure Z-Score')]}
                  contentStyle={{
                    backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: isDark ? '#F5F7F6' : '#0A0D0C',
                  }}
                />
                <ReferenceLine y={0} stroke={isDark ? '#8E9995' : '#4E5653'} />
                <Bar
                  dataKey="zScore"
                  name={t('investmentExperience.attributionView.chart.seriesExposure', 'Factor Exposure Z-Score')}
                  fill="#189890"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attribution Factor Sources */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.attributionView.sources.eyebrow', 'RETURN SOURCES')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.attributionView.sources.heading', 'Net Factor Decomposition')}
            </h4>

            <div className="space-y-3 text-xs">
              <div
                className={`p-3 rounded-lg border flex justify-between items-center ${
                  isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                }`}
              >
                <div>
                  <div className="font-medium text-foreground">
                    {t('investmentExperience.attributionView.sources.qualityTitle', t('investmentExperience.attributionView.sourcesItems.qualityEngine', 'Quality & Profitability Factor'))}
                  </div>
                  <div className="text-[10px] text-[#8E9995]">
                    {t('investmentExperience.attributionView.sources.qualitySubtitle', t('investmentExperience.attributionView.sourcesItems.qualityEngineDesc', 'Primary Return Engine'))}
                  </div>
                </div>
                <span className="font-mono font-bold text-[#189890] shrink-0">+1.15 σ</span>
              </div>

              <div
                className={`p-3 rounded-lg border flex justify-between items-center ${
                  isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                }`}
              >
                <div>
                  <div className="font-medium text-foreground">
                    {t('investmentExperience.attributionView.sources.liquidityTitle', t('investmentExperience.attributionView.sourcesItems.liquidityPremium', 'Liquidity Premium Factor'))}
                  </div>
                  <div className="text-[10px] text-[#8E9995]">
                    {t('investmentExperience.attributionView.sources.liquiditySubtitle', t('investmentExperience.attributionView.sourcesItems.liquidityPremiumDesc', 'Tier-1 Sovereign Premium'))}
                  </div>
                </div>
                <span className="font-mono font-bold text-[#189890] shrink-0">+1.28 σ</span>
              </div>

              <div
                className={`p-3 rounded-lg border flex justify-between items-center ${
                  isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                }`}
              >
                <div>
                  <div className="font-medium text-foreground">
                    {t('investmentExperience.attributionView.sources.lowVolTitle', t('investmentExperience.attributionView.sourcesItems.lowVolShield', 'Low Volatility Bias'))}
                  </div>
                  <div className="text-[10px] text-[#8E9995]">
                    {t('investmentExperience.attributionView.sources.lowVolSubtitle', t('investmentExperience.attributionView.sourcesItems.lowVolShieldDesc', 'Defensive Downside Shield'))}
                  </div>
                </div>
                <span className="font-mono font-bold text-[#189890] shrink-0">+0.74 σ</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.attributionView.footnote', '100% factor alignment verified against Barra Global Equity & Fixed Income models.')}
          </div>
        </div>
      </div>
    </div>
  );
};

