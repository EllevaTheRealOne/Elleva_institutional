import React from 'react';
import { useTranslation } from 'react-i18next';
import { MACRO_REGIME_SIGNALS, AUTONOMOUS_THESES } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const MarketIntelligenceView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);

  const indicatorKeyMap: Record<string, { indicator: string; status: string; signal: string }> = {
    'Macro Growth Impulse': {
      indicator: t('investmentExperience.marketIntelligenceView.signals.growthImpulse', 'Macro Growth Impulse'),
      status: t('investmentExperience.marketIntelligenceView.signals.moderateExpansion', t('investmentExperience.marketIntelligenceView.signals.expansion', 'Moderate Expansion')),
      signal: t('investmentExperience.marketIntelligenceView.signals.constructive', 'Constructive'),
    },
    'Fiduciary Inflation Drift': {
      indicator: t('investmentExperience.marketIntelligenceView.signals.inflationDrift', 'Fiduciary Inflation Drift'),
      status: t('investmentExperience.marketIntelligenceView.signals.disinflating', 'Disinflating / Neutral'),
      signal: t('investmentExperience.marketIntelligenceView.signals.controlled', 'Controlled'),
    },
    'Sovereign Curve Term Premia': {
      indicator: t('investmentExperience.marketIntelligenceView.signals.termPremia', 'Sovereign Curve Term Premia'),
      status: t('investmentExperience.marketIntelligenceView.signals.normalizedSlope', 'Normalized Slope'),
      signal: t('investmentExperience.marketIntelligenceView.signals.neutralDuration', 'Neutral Duration'),
    },
    'Credit Risk Premia (IG/HY)': {
      indicator: t('investmentExperience.marketIntelligenceView.signals.creditRiskPremia', 'Credit Risk Premia (IG/HY)'),
      status: t('investmentExperience.marketIntelligenceView.signals.tightSpreads', 'Tight Spreads / Stable'),
      signal: t('investmentExperience.marketIntelligenceView.signals.noTailStress', 'No Tail Stress'),
    },
  };

  const thesisKeyMap: Record<string, { title: string; hypothesis: string; status: string }> = {
    'Sovereign Duration Immunization': {
      title: t('investmentExperience.marketIntelligenceView.thesesItems.durationTitle', 'Sovereign Duration Immunization'),
      hypothesis: t('investmentExperience.marketIntelligenceView.thesesItems.durationHypothesis', 'Maintain effective duration within ±0.05y of benchmark mandate to neutralize rates volatility.'),
      status: t('investmentExperience.marketIntelligenceView.thesesItems.activeExecution', 'ACTIVE EXECUTION'),
    },
    'Systematic Factor Quality Overweight': {
      title: t('investmentExperience.marketIntelligenceView.thesesItems.qualityTitle', 'Systematic Factor Quality Overweight'),
      hypothesis: t('investmentExperience.marketIntelligenceView.thesesItems.qualityHypothesis', 'Maintain positive exposure to institutional profitability and balance-sheet resilience factors.'),
      status: t('investmentExperience.marketIntelligenceView.thesesItems.activeExecution', 'ACTIVE EXECUTION'),
    },
    'Intraday Custody Segregation Auditing': {
      title: t('investmentExperience.marketIntelligenceView.thesesItems.custodyTitle', 'Intraday Custody Segregation Auditing'),
      hypothesis: t('investmentExperience.marketIntelligenceView.thesesItems.custodyHypothesis', 'Enforce real-time cryptographic asset reconciliation across all 4 Tier-1 custodial vaults.'),
      status: t('investmentExperience.marketIntelligenceView.thesesItems.verifiedContinuous', 'VERIFIED CONTINUOUS'),
    },
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
            {t('investmentExperience.marketIntelligenceView.stats.telemetryFeeds.label', 'Global Telemetry Feeds')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.marketIntelligenceView.stats.telemetryFeeds.value', '4,820/sec')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.marketIntelligenceView.stats.telemetryFeeds.status', 'Real-time Ingestion')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.marketIntelligenceView.stats.regimeConfidence.label', 'Macro Regime Confidence')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.marketIntelligenceView.stats.regimeConfidence.value', '94.2%')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.marketIntelligenceView.stats.regimeConfidence.status', 'Moderate Expansion')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.marketIntelligenceView.stats.correlationShift.label', 'Cross-Asset Correlation')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.marketIntelligenceView.stats.correlationShift.value', '-0.18')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.marketIntelligenceView.stats.correlationShift.status', 'Active Decorrelation')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.marketIntelligenceView.stats.yieldSteepening.label', 'Yield Curve Steepening')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.marketIntelligenceView.stats.yieldSteepening.value', '+14 bps')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.marketIntelligenceView.stats.yieldSteepening.status', 'Normalized Slope')}
          </div>
        </div>
      </div>

      {/* Macro Regime Matrix & Theses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Macro Regime Signal Matrix */}
        <div
          className={`lg:col-span-7 p-5 rounded-xl border flex flex-col justify-between overflow-hidden ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="mb-4">
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.marketIntelligenceView.matrix.eyebrow', 'MACRO REGIME MATRIX')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.marketIntelligenceView.matrix.heading', 'Autonomous Intelligence Engine Signals')}
              </h4>
            </div>

            <div className="space-y-3">
              {MACRO_REGIME_SIGNALS.map((sig) => {
                const localized = indicatorKeyMap[sig.indicator];
                return (
                  <div
                    key={sig.indicator}
                    className={`p-3.5 rounded-lg border flex items-center justify-between text-xs ${
                      isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium text-foreground truncate">
                        {localized?.indicator || sig.indicator}
                      </div>
                      <div className="text-[10px] text-[#8E9995] mt-0.5">
                        {localized?.status || sig.status}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded bg-[#189890]/10 text-[#189890] font-mono font-bold text-[11px]">
                        {localized?.signal || sig.signal}
                      </span>
                      <div className="text-[10px] font-mono text-[#8E9995] mt-0.5">
                        {t('investmentExperience.marketIntelligenceView.matrix.confLabel', 'Confidence')}: {sig.confidence}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#189890]">
            * {t('investmentExperience.marketIntelligenceView.matrix.badge', 'DETERMINISTIC ENGINE')}
          </div>
        </div>

        {/* Autonomous Synthesis Theses */}
        <div
          className={`lg:col-span-5 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.marketIntelligenceView.theses.eyebrow', 'AUTONOMOUS SYNTHESIS')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.marketIntelligenceView.theses.heading', 'Active Investment Theses & Hypotheses')}
            </h4>

            <div className="space-y-3">
              {AUTONOMOUS_THESES.map((thesis) => {
                const localized = thesisKeyMap[thesis.title];
                return (
                  <div
                    key={thesis.title}
                    className={`p-3 rounded-lg border text-xs space-y-1 ${
                      isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        {localized?.title || thesis.title}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-[#189890] px-1.5 py-0.5 rounded bg-[#189890]/10">
                        {localized?.status || thesis.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8E9995] leading-relaxed">
                      {localized?.hypothesis || thesis.hypothesis}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.marketIntelligenceView.footnote', 'Cross-validation across 4,820 macro time series with zero hallucination guardrails.')}
          </div>
        </div>
      </div>
    </div>
  );
};

