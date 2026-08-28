import React from 'react';
import { useTranslation } from 'react-i18next';
import { TELEMETRY_LOGS } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const AlertsView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);

  const subsystemKeyMap: Record<string, string> = {
    'Core Order Router (FIX 5.0)': t('investmentExperience.alertsView.health.orderRouter', t('investmentExperience.alertsView.subsystems.router', 'Core Order Router (FIX 5.0)')),
    'Monte Carlo Risk Engine (HPC)': t('investmentExperience.alertsView.health.riskEngine', t('investmentExperience.alertsView.subsystems.riskEngine', 'Monte Carlo Risk Engine (HPC)')),
    'Custodial DVP Reconciliation': t('investmentExperience.alertsView.health.custodyRecon', t('investmentExperience.alertsView.subsystems.reconciliation', 'Custodial DVP Reconciliation')),
    'Pre-Trade Mandate Firewall': t('investmentExperience.alertsView.health.firewall', t('investmentExperience.alertsView.subsystems.firewall', 'Pre-Trade Mandate Firewall')),
  };

  const logNodeKeyMap: Record<string, string> = {
    'Vault-01 (BNY Mellon)': t('investmentExperience.alertsView.logNodes.vault01', 'Vault-01 (BNY Mellon)'),
    'Compliance Engine Pre-Trade': t('investmentExperience.alertsView.logNodes.compliance', 'Compliance Engine Pre-Trade'),
    'Risk Engine Monte Carlo': t('investmentExperience.alertsView.logNodes.riskEngine', 'Risk Engine Monte Carlo'),
    'Custody Rebalancer': t('investmentExperience.alertsView.logNodes.rebalancer', 'Custody Rebalancer'),
    'Market Feed Telemetry': t('investmentExperience.alertsView.logNodes.marketFeed', 'Market Feed Telemetry'),
    EXEC_ROUTER_01: t('investmentExperience.alertsView.logNodes.router', 'EXEC_ROUTER_01'),
    RISK_VAR_ENGINE: t('investmentExperience.alertsView.logNodes.riskEngine', 'RISK_VAR_ENGINE'),
    CUSTODY_RECON: t('investmentExperience.alertsView.logNodes.custodyRecon', 'CUSTODY_RECON'),
    PORTFOLIO_CORE: t('investmentExperience.alertsView.logNodes.portfolioCore', 'PORTFOLIO_CORE'),
  };

  const logEventKeyMap: Record<string, string> = {
    'Settlement Hash Verified (T+0)': t('investmentExperience.alertsView.logEvents.settlementHash', 'Settlement Hash Verified (T+0)'),
    '240 Mandate Rules Evaluated (0.4ms)': t('investmentExperience.alertsView.logEvents.mandateRules', '240 Mandate Rules Evaluated (0.4ms)'),
    '10,000 Path VaR Recalibration (1.24%)': t('investmentExperience.alertsView.logEvents.varRecalibration', '10,000 Path VaR Recalibration (1.24%)'),
    'Drift Threshold Check (±0.12% < ±1.50%)': t('investmentExperience.alertsView.logEvents.driftCheck', 'Drift Threshold Check (±0.12% < ±1.50%)'),
    'Global 4,820 feeds/sec Ingestion': t('investmentExperience.alertsView.logEvents.feedIngestion', 'Global 4,820 feeds/sec Ingestion'),
    'FIX 5.0 Session Acknowledged by Primary Dealer': t('investmentExperience.alertsView.logEvents.fixAck', 'FIX 5.0 Session Acknowledged by Primary Dealer'),
    'Monte Carlo 10,000-path simulation epoch converged': t('investmentExperience.alertsView.logEvents.varEpoch', 'Monte Carlo 10,000-path simulation epoch converged'),
    'Cryptographic ledger hash match verified with BNY Mellon': t('investmentExperience.alertsView.logEvents.dvpSettled', 'Cryptographic ledger hash match verified with BNY Mellon'),
    'Dynamic factor drift recalculation completed (0.42% drift)': t('investmentExperience.alertsView.logEvents.driftTolerance', 'Dynamic factor drift recalculation completed (0.42% drift)'),
  };

  const logStatusKeyMap: Record<string, string> = {
    SECURE: t('investmentExperience.alertsView.logStatus.secure', 'SECURE'),
    PASSED: t('investmentExperience.alertsView.logStatus.passed', 'PASSED'),
    COMPLIANT: t('investmentExperience.alertsView.logStatus.compliant', 'COMPLIANT'),
    OPTIMAL: t('investmentExperience.alertsView.logStatus.optimal', 'OPTIMAL'),
    SYNCHRONIZED: t('investmentExperience.alertsView.logStatus.synchronized', 'SYNCHRONIZED'),
    SUCCESS: t('investmentExperience.alertsView.logStatus.success', 'SUCCESS'),
    NORMAL: t('investmentExperience.alertsView.logStatus.normal', 'NORMAL'),
    SETTLED: t('investmentExperience.alertsView.logStatus.settled', 'SETTLED'),
  };

  const subsystems = [
    { name: 'Core Order Router (FIX 5.0)', latency: '0.8ms', status: 'ONLINE', load: '14%' },
    { name: 'Monte Carlo Risk Engine (HPC)', latency: '12ms', status: 'ONLINE', load: '42%' },
    { name: 'Custodial DVP Reconciliation', latency: '4.2ms', status: 'ONLINE', load: '8%' },
    { name: 'Pre-Trade Mandate Firewall', latency: '0.4ms', status: 'ONLINE', load: '18%' },
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
            {t('investmentExperience.alertsView.stats.critical.label', 'Active Critical Alerts')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.alertsView.stats.critical.value', '0')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.alertsView.stats.critical.status', 'System in Perfect Compliance')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.alertsView.stats.auditNodes.label', 'Monitored Audit Nodes')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.alertsView.stats.auditNodes.value', '1,240')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.alertsView.stats.auditNodes.status', '100% Cryptographic Integrity')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.alertsView.stats.heartbeat.label', 'Telemetry Latency')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.alertsView.stats.heartbeat.value', '32 ms')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.alertsView.stats.heartbeat.status', 'Sub-50ms Network SLA')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.alertsView.stats.checkpoints.label', 'Daily Automated Checks')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.alertsView.stats.checkpoints.value', '86,400')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.alertsView.stats.checkpoints.status', '1 Check per Second')}
          </div>
        </div>
      </div>

      {/* Telemetry Log & Subsystem Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Telemetry Stream */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border overflow-hidden ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.alertsView.log.eyebrow', 'REAL-TIME TELEMETRY FEED')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.alertsView.log.heading', 'Continuous Fiduciary Process Audit')}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#189890] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#189890] animate-pulse" />
              {t('investmentExperience.alertsView.log.badge', 'ACTIVE HEARTBEAT')}
            </span>
          </div>

          {/* Mobile Card View (< sm) */}
          <div className="space-y-2.5 sm:hidden">
            {TELEMETRY_LOGS.map((log, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex flex-col gap-1.5 ${
                  isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans font-medium text-foreground text-xs">
                    {logNodeKeyMap[log.node] || log.node}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#189890]/10 text-[#189890] font-bold font-mono text-[10px] shrink-0">
                    {logStatusKeyMap[log.status] || log.status}
                  </span>
                </div>
                <div className="text-xs text-[#8E9995] font-sans">
                  {logEventKeyMap[log.event] || log.event}
                </div>
                <div className="text-[10px] text-[#8E9995] font-mono">
                  {log.time}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop & Tablet Table View (>= sm) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[540px] text-left text-xs font-mono">
              <thead>
                <tr className={`border-b ${isDark ? 'border-white/10 text-[#8E9995]' : 'border-black/10 text-[#4E5653]'}`}>
                  <th className="pb-2.5 font-semibold font-sans">{t('investmentExperience.alertsView.log.time', 'Time (UTC)')}</th>
                  <th className="pb-2.5 font-semibold font-sans">{t('investmentExperience.alertsView.log.node', 'Node / Component')}</th>
                  <th className="pb-2.5 font-semibold font-sans">{t('investmentExperience.alertsView.log.event', 'Verified Event')}</th>
                  <th className="pb-2.5 font-semibold font-sans text-right">{t('investmentExperience.alertsView.log.status', 'Status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/5">
                {TELEMETRY_LOGS.map((log, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-2 text-[#8E9995] text-[11px] whitespace-nowrap">{log.time}</td>
                    <td className="py-3 px-2 font-sans font-medium text-foreground text-xs whitespace-nowrap">
                      {logNodeKeyMap[log.node] || log.node}
                    </td>
                    <td className="py-3 px-2 font-sans text-[#8E9995] text-xs">
                      {logEventKeyMap[log.event] || log.event}
                    </td>
                    <td className="py-3 pl-2 text-right whitespace-nowrap">
                      <span className="px-1.5 py-0.5 rounded bg-[#189890]/10 text-[#189890] font-bold text-[10px]">
                        {logStatusKeyMap[log.status] || log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Infrastructure Subsystem Health */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.alertsView.health.eyebrow', 'INFRASTRUCTURE HEALTH')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.alertsView.health.heading', 'Critical Subsystem Status')}
            </h4>

            <div className="space-y-3">
              {subsystems.map((sub) => (
                <div
                  key={sub.name}
                  className={`p-3 rounded-lg border text-xs ${
                    isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between font-sans">
                    <span className="font-medium text-foreground truncate pr-2">
                      {subsystemKeyMap[sub.name] || sub.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#189890] font-bold shrink-0">
                      {sub.status === 'ONLINE' ? t('investmentExperience.alertsView.health.online', 'ONLINE') : sub.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#8E9995] mt-1.5">
                    <span>{t('investmentExperience.alertsView.health.latencyLabel', t('investmentExperience.alertsView.health.latency', 'Latency:'))} {sub.latency}</span>
                    <span>{t('investmentExperience.alertsView.health.loadLabel', t('investmentExperience.alertsView.health.load', 'Load:'))} {sub.load}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.alertsView.footnote', '99.999% SLA backed by multi-region deterministic consensus.')}
          </div>
        </div>
      </div>
    </div>
  );
};

