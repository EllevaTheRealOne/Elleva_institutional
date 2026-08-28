import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Lock } from 'lucide-react';
import { MANDATE_COMPLIANCE_RULES } from '../data';

interface ViewProps {
  isDark?: boolean;
}

export const ComplianceView: React.FC<ViewProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);

  const ruleKeyMap: Record<string, { name: string; limit: string }> = {
    'Mandate Leverage Constraint': {
      name: t('investmentExperience.complianceView.rules.leverage', 'Mandate Leverage Constraint'),
      limit: t('investmentExperience.complianceView.rules.leverageLimit', '0.00x (No Leverage Permitted)'),
    },
    'Single Issuer Exposure Cap': {
      name: t('investmentExperience.complianceView.rules.singleIssuer', 'Single Issuer Exposure Cap'),
      limit: t('investmentExperience.complianceView.rules.singleIssuerLimit', 'Max 5.00% Net AUM'),
    },
    'Minimum Investment Grade Floor': {
      name: t('investmentExperience.complianceView.rules.investmentGrade', 'Minimum Investment Grade Floor'),
      limit: t('investmentExperience.complianceView.rules.investmentGradeLimit', '100% BBB- or higher'),
    },
    'Direct Custody Segregation Mandate': {
      name: t('investmentExperience.complianceView.rules.custodySegregation', 'Direct Custody Segregation Mandate'),
      limit: t('investmentExperience.complianceView.rules.custodySegregationLimit', '100% Client Legal Title'),
    },
    'Restricted Entity / OFAC Sanctions List': {
      name: t('investmentExperience.complianceView.rules.esgScreening', 'Restricted Entity / OFAC Sanctions List'),
      limit: t('investmentExperience.complianceView.rules.esgScreeningLimit', '0 Violations Permitted'),
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
            {t('investmentExperience.complianceView.stats.policyRules.label', 'Audited Mandate Rules')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 text-[#189890]">
            {t('investmentExperience.complianceView.stats.policyRules.value', '100%')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.complianceView.stats.policyRules.status', '240 of 240 Rules Passed')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.complianceView.stats.restrictedList.label', 'Restricted Entity Violations')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.complianceView.stats.restrictedList.value', '0')}
          </div>
          <div className="text-[11px] text-[#189890] mt-0.5">
            {t('investmentExperience.complianceView.stats.restrictedList.status', 'Clean OFAC / Sanctions Filter')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.complianceView.stats.esg.label', 'ESG / Exclusion Mandate Adherence')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1">
            {t('investmentExperience.complianceView.stats.esg.value', '100.0%')}
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.complianceView.stats.esg.status', 'Full Fiduciary Compliance')}
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div className="text-[10px] font-ui uppercase tracking-wider text-[#8E9995] font-semibold">
            {t('investmentExperience.complianceView.stats.preTrade.label', 'Pre-Trade Verification')}
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#189890]" />
            <span>{t('investmentExperience.complianceView.stats.preTrade.value', '< 1 ms')}</span>
          </div>
          <div className="text-[11px] text-[#8E9995] mt-0.5">
            {t('investmentExperience.complianceView.stats.preTrade.status', 'Deterministic Lock Active')}
          </div>
        </div>
      </div>

      {/* Mandate Matrix & Cryptographic Seal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mandate & Constraints Matrix */}
        <div
          className={`lg:col-span-8 p-5 rounded-xl border flex flex-col justify-between overflow-hidden ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="mb-4">
              <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
                {t('investmentExperience.complianceView.matrix.eyebrow', 'MANDATE & CONSTRAINT MATRIX')}
              </div>
              <h4 className="font-display font-bold text-sm">
                {t('investmentExperience.complianceView.matrix.heading', 'Statutory Controls & Fiduciary Limits')}
              </h4>
            </div>

            <div className="space-y-3">
              {MANDATE_COMPLIANCE_RULES.map((rule) => {
                const localized = ruleKeyMap[rule.rule];
                return (
                  <div
                    key={rule.rule}
                    className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                      isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/[0.04]'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium text-foreground font-sans truncate">
                        {localized?.name || rule.rule}
                      </div>
                      <div className="text-[10px] text-[#8E9995] mt-0.5 font-mono">
                        {t('investmentExperience.complianceView.matrix.limitLabel', 'Limit:')} {localized?.limit || rule.limit}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded bg-[#189890]/10 text-[#189890] font-mono font-bold text-[10px]">
                        {t('investmentExperience.complianceView.matrix.compliant', t('investmentExperience.complianceView.matrix.statusPassed', 'COMPLIANT'))}
                      </span>
                      <div className="text-[10px] text-[#8E9995] mt-0.5 font-mono">
                        {t('investmentExperience.complianceView.matrix.currentLabel', 'Current:')} {rule.current}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#189890]">
            * {t('investmentExperience.complianceView.matrix.badge', 'DETERMINISTIC AUDIT')}
          </div>
        </div>

        {/* Cryptographic Audit Seal */}
        <div
          className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.06]'
          }`}
        >
          <div>
            <div className="text-[10px] font-ui uppercase tracking-widest text-[#8E9995] font-semibold">
              {t('investmentExperience.complianceView.seal.eyebrow', 'CRYPTOGRAPHIC AUDIT SEAL')}
            </div>
            <h4 className="font-display font-bold text-sm mb-4">
              {t('investmentExperience.complianceView.seal.heading', 'Immutable Governance Trail')}
            </h4>

            <div className={`p-4 rounded-xl border space-y-3 text-xs ${
              isDark ? 'bg-black/40 border-white/5' : 'bg-white border-black/[0.04]'
            }`}>
              <div className="flex items-center gap-2 text-[#189890]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{t('investmentExperience.complianceView.seal.soc2', 'SOC-2 Type II Certified')}</span>
              </div>
              <div className="flex items-center gap-2 text-[#189890]">
                <Lock className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{t('investmentExperience.complianceView.seal.merkle', t('investmentExperience.complianceView.seal.merkleTree', 'Immutable Merkle Tree Ledger'))}</span>
              </div>
              <div className="pt-2 border-t border-black/[0.04] dark:border-white/5 space-y-1 font-mono text-[10px] text-[#8E9995]">
                <div>{t('investmentExperience.complianceView.seal.merkleRoot', 'Merkle Root:')} 0x9f82...b341</div>
                <div>{t('investmentExperience.complianceView.seal.epoch', t('investmentExperience.complianceView.seal.epochTimestamp', 'Epoch Timestamp:'))} 2026-08-28T04:10:00Z</div>
                <div>{t('investmentExperience.complianceView.seal.custodyId', 'Fiduciary Custody ID:')} CASS-T1-8842</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/5 mt-4 text-[11px] text-[#8E9995]">
            {t('investmentExperience.complianceView.footnote', 'Zero compliance exceptions recorded across all monitored mandates.')}
          </div>
        </div>
      </div>
    </div>
  );
};

