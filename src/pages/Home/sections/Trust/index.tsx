import React from 'react';
import { ShieldCheck, Lock, FileSearch, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TrustProps {
  isDark?: boolean;
}

export const Trust: React.FC<TrustProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);

  const trustGuarantees = [
    {
      id: 'trust-mandates',
      number: '01',
      title: t('trust.guarantees.segregation.title'),
      quote: t('trust.guarantees.segregation.quote'),
      icon: <Lock className="w-5 h-5 text-[#189890]" />,
    },
    {
      id: 'trust-decision',
      number: '02',
      title: t('trust.guarantees.determinism.title'),
      quote: t('trust.guarantees.determinism.quote'),
      icon: <ShieldCheck className="w-5 h-5 text-[#189890]" />,
    },
    {
      id: 'trust-transparency',
      number: '03',
      title: t('trust.guarantees.explicability.title'),
      quote: t('trust.guarantees.explicability.quote'),
      icon: <FileSearch className="w-5 h-5 text-[#189890]" />,
    },
  ];

  const certifications = [
    {
      id: 'trust-compliance',
      label: t('trust.certifications.cvm.label'),
      desc: t('trust.certifications.cvm.desc'),
    },
    {
      id: 'trust-audit',
      label: t('trust.certifications.soc2.label'),
      desc: t('trust.certifications.soc2.desc'),
    },
    {
      id: 'trust-risk',
      label: t('trust.certifications.iso.label'),
      desc: t('trust.certifications.iso.desc'),
    },
    {
      id: 'trust-action',
      label: t('trust.certifications.auditable.label'),
      desc: t('trust.certifications.auditable.desc'),
    },
  ];

  return (
    <section
      id="trust"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('trust.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('trust.description')}
          </p>
        </div>

        {/* 3 Core Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {trustGuarantees.map((item) => (
            <div
              key={item.number}
              id={item.id}
              className={`p-6 sm:p-8 rounded-xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                  : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#189890]">
                    {t('trust.guaranteeLabel')} {item.number}
                  </span>
                  <div className="p-2 rounded-sm bg-[#0C5F5A] text-[#189890]">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className={`font-body text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  “{item.quote}”
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Frameworks Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              id={cert.id}
              className={`p-5 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#189890] shrink-0" />
                <span className="font-ui font-semibold text-xs">{cert.label}</span>
              </div>
              <span className={`font-body text-[11px] leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                {cert.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

