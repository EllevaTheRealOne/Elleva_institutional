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
import { STRESS_TEST_SCENARIOS, RISK_BUDGET_METRICS } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const RiskView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const textColor = isDark ? '#8E9995' : '#4E5653';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  const scenarioKeyMap: Record<string, string> = {
    'Macro Stagflation Shock': t('investmentExperience.riskView.scenarios.stagflation', 'Macro Stagflation Shock'),
    'Geopolitical Volatility Surge': t('investmentExperience.riskView.scenarios.geopolitical', 'Geopolitical Volatility Surge'),
    'Geopolitical Volatility Jump': t('investmentExperience.riskView.scenarios.geopolitical', 'Geopolitical Volatility Surge'),
    'Yield Curve Spike (+150bps)': t('investmentExperience.riskView.scenarios.yieldSpike', 'Yield Curve Spike (+150bps)'),
    'Global Equity Drawdown (-20%)': t('investmentExperience.riskView.scenarios.equityDrawdown', 'Global Equity Drawdown (-20%)'),
  };

  const budgetKeyMap: Record<string, string> = {
    'VaR 99% Consumption': t('investmentExperience.riskView.budget.varConsumption', 'VaR 99% Consumption'),
    '99% VaR Budget Consumption': t('investmentExperience.riskView.budget.varConsumption', 'VaR 99% Consumption'),
    'Tracking Error Limit': t('investmentExperience.riskView.budget.trackingErrorLimit', 'Tracking Error Limit'),
    'Single Issuer Concentration': t('investmentExperience.riskView.budget.concentrationLimit', 'Single Issuer Concentration'),
    'Liquidity Stress Absorption': t('investmentExperience.riskView.budget.stressAbsorption', 'Liquidity Stress Absorption'),
  };

  const stressData = STRESS_TEST_SCENARIOS.map((item) => ({
    ...item,
    scenarioLabel: scenarioKeyMap[item.scenario] || item.scenario,
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
            {t('investmentExperience.riskView.stats.parametricVar.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.riskView.stats.parametricVar.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.riskView.stats.parametricVar.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.riskView.stats.expectedShortfall.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.riskView.stats.expectedShortfall.value')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.riskView.stats.expectedShortfall.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.riskView.stats.stressCoverage.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.riskView.stats.stressCoverage.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.riskView.stats.stressCoverage.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.riskView.stats.durationMismatch.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.riskView.stats.durationMismatch.value')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.riskView.stats.durationMismatch.status')}
          </div>
        </div>
      </div>

      {/* Stress Testing & Risk Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Shock Simulation Chart */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="mb-4">
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.riskView.chart.eyebrow')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.riskView.chart.heading')}
              </h4>
            </div>

            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stressData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[-10, 0]}
                    tick={{ fill: textColor, fontSize: 10 }}
                    axisLine={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="scenarioLabel"
                    tick={{ fill: textColor, fontSize: 10 }}
                    width={140}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, t('investmentExperience.riskView.chart.seriesImpact')]}
                    contentStyle={{
                      backgroundColor: isDark ? '#0A0D0F' : '#FFFFFF',
                      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: isDark ? '#F5F7F6' : '#0A0D0C',
                    }}
                  />
                  <ReferenceLine
                    x={-5}
                    stroke="#8E9995"
                    strokeDasharray="3 3"
                    label={{ value: t('investmentExperience.riskView.chart.mandateLimit'), fill: textColor, fontSize: 9 }}
                  />
                  <Bar
                    dataKey="impacto"
                    name={t('investmentExperience.riskView.chart.seriesImpact')}
                    fill="#189890"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#189890]">
            * {t('investmentExperience.riskView.chart.badge', '4 SEVERE SCENARIOS')}
          </div>
        </div>

        {/* Risk Budget Utilization */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.riskView.budget.eyebrow')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.riskView.budget.heading')}
            </h4>

            <div className="space-y-4">
              {RISK_BUDGET_METRICS.map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="text-foreground font-medium">
                      {budgetKeyMap[metric.label] || metric.label}
                    </span>
                    <span className="font-mono text-[10px] text-[#189890]">
                      {t('investmentExperience.riskView.budget.compliant')}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#189890] transition-all duration-500"
                      style={{ width: `${metric.used}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.riskView.footnote')}
          </div>
        </div>
      </div>
    </div>
  );
};
