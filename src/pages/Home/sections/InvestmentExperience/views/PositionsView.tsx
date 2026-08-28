import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { INSTITUTIONAL_HOLDINGS, CUSTODIAN_DISTRIBUTION } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const PositionsView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);

  const holdingsNameMap: Record<string, string> = {
    'US-T-BILL-26': t('investmentExperience.positions.holdingsNames.tbills', 'US Treasury Bills 3M / 6M'),
    'US-T-NOTE-10Y': t('investmentExperience.positions.holdingsNames.tnotes', 'US Treasury Notes 10Y Benchmark'),
    'MSCI-WORLD-ESG': t('investmentExperience.positions.holdingsNames.msciWorld', 'Global Core Institutional Index'),
    'INFRA-GLOBAL-EQ': t('investmentExperience.positions.holdingsNames.infra', 'Essential Infrastructure & Utilities'),
    'SOFR-CASH-EQUIV': t('investmentExperience.positions.holdingsNames.sofrSweep', 'Overnight SOFR Sweep & Fiduciary Cash'),
  };

  const categoryMap: Record<string, string> = {
    'Sovereign Fixed Income': t('investmentExperience.positions.categories.sovereignFixedIncome', 'Sovereign Fixed Income'),
    'Global Equities': t('investmentExperience.positions.categories.globalEquities', 'Global Equities'),
    'Real Assets': t('investmentExperience.positions.categories.realAssets', 'Real Assets'),
    'Strategic Liquidity': t('investmentExperience.positions.categories.strategicLiquidity', 'Strategic Liquidity'),
  };

  const settlementMap: Record<string, string> = {
    'T+0 Intraday': t('investmentExperience.positions.settlementTypes.t0', 'T+0 Intraday'),
    'T+1 DVP': t('investmentExperience.positions.settlementTypes.t1', 'T+1 DVP'),
    'T+0 Real-time': t('investmentExperience.positions.settlementTypes.t0Realtime', 'T+0 Real-time'),
  };

  const custodianLabelMap: Record<string, string> = {
    'BNY Mellon Trust': t('investmentExperience.positions.distribution.bny', 'BNY Mellon Trust'),
    'State Street Global': t('investmentExperience.positions.distribution.stateStreet', 'State Street Global'),
    'JPMorgan CASS': t('investmentExperience.positions.distribution.jpMorgan', 'JPMorgan CASS'),
    'Euroclear Segregated': t('investmentExperience.positions.distribution.euroclear', 'Euroclear Segregated'),
  };

  const custodianData = CUSTODIAN_DISTRIBUTION.map((item) => ({
    ...item,
    displayName: custodianLabelMap[item.name] || item.name,
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
            {t('investmentExperience.positions.stats.holdings.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.positions.stats.holdings.value')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.positions.stats.holdings.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.positions.stats.custody.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.positions.stats.custody.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.positions.stats.custody.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.positions.stats.liquidity.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.positions.stats.liquidity.value')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.positions.stats.liquidity.status')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.positions.stats.exposure.label')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.positions.stats.exposure.value')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.positions.stats.exposure.status')}
          </div>
        </div>
      </div>

      {/* Main Content: Institutional Holdings Table + Custody Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Holdings Table */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border overflow-hidden ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.positions.table.eyebrow')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.positions.table.heading')}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#189890] font-bold">
              {t('investmentExperience.positions.table.badge')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isDark ? 'border-white/10 text-[#8E9995]' : 'border-black/10 text-[#4E5653]'}`}>
                  <th className="pb-2.5 font-semibold">{t('investmentExperience.positions.table.asset')}</th>
                  <th className="pb-2.5 font-semibold">{t('investmentExperience.positions.table.category')}</th>
                  <th className="pb-2.5 font-semibold text-right">{t('investmentExperience.positions.table.weight')}</th>
                  <th className="pb-2.5 font-semibold">{t('investmentExperience.positions.table.custodian')}</th>
                  <th className="pb-2.5 font-semibold text-right">{t('investmentExperience.positions.table.settlement')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/5 font-mono">
                {INSTITUTIONAL_HOLDINGS.map((item) => (
                  <tr key={item.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-2">
                      <div className="font-sans font-medium text-xs text-foreground">
                        {holdingsNameMap[item.id] || item.name}
                      </div>
                      <div className="text-[10px] text-[#8E9995]">{item.id}</div>
                    </td>
                    <td className="py-3 px-2 font-sans text-[11px] text-[#8E9995]">
                      {categoryMap[item.category] || item.category}
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-[#189890]">{item.weight}</td>
                    <td className="py-3 px-2 font-sans text-[11px] text-[#8E9995]">{item.custodian}</td>
                    <td className="py-3 pl-2 text-right text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-[#189890]/10 text-[#189890] font-medium">
                        {settlementMap[item.settlement] || item.settlement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custodian Segregation Breakdown */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.positions.distribution.eyebrow')}
            </div>
            <h4 className="font-display font-bold text-sm mb-3">
              {t('investmentExperience.positions.distribution.heading')}
            </h4>

            <div className="w-full h-36">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={custodianData}
                    innerRadius={38}
                    outerRadius={58}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {custodianData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, t('investmentExperience.positions.distribution.tooltipLabel')]}
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
            {custodianData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className={`truncate ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                    {item.displayName}
                  </span>
                </div>
                <span className="font-mono font-bold ml-2">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
