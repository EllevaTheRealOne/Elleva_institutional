import React from 'react';
import { ShieldCheck, Lock, Scale, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StrategicPillarsProps {
  isDark?: boolean;
}

export const StrategicPillars: React.FC<StrategicPillarsProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);

  const pillars = [
    {
      number: '01',
      title: t('pillars.pillar1.title'),
      quote: t('pillars.pillar1.quote'),
      icon: <Lock className="w-4 h-4 text-[#189890]" />,
    },
    {
      number: '02',
      title: t('pillars.pillar2.title'),
      quote: t('pillars.pillar2.quote'),
      icon: <Scale className="w-4 h-4 text-[#189890]" />,
    },
    {
      number: '03',
      title: t('pillars.pillar3.title'),
      quote: t('pillars.pillar3.quote'),
      icon: <ShieldCheck className="w-4 h-4 text-[#189890]" />,
    },
    {
      number: '04',
      title: t('pillars.pillar4.title'),
      quote: t('pillars.pillar4.quote'),
      icon: <Zap className="w-4 h-4 text-[#189890]" />,
    },
  ];

  const badges = [
    t('pillars.badges.segregation'),
    t('pillars.badges.encryption'),
    t('pillars.badges.auditability'),
    t('pillars.badges.compliance'),
  ];

  return (
    <section
      id="strategic-pillars"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('pillars.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('pillars.description')}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                  : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#189890]">
                    {t('pillars.pillarPrefix')} {pillar.number}
                  </span>
                  <div className="p-1.5 rounded-sm bg-[#0C5F5A] text-[#189890]">
                    {pillar.icon}
                  </div>
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-2">
                  {pillar.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  “{pillar.quote}”
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel: Governança e Segurança */}
        <div
          className={`p-6 sm:p-8 rounded-xl border ${
            isDark
              ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
              : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.06)]'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h4 className="font-display font-bold text-xl mb-2">{t('pillars.governanceTitle')}</h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                {t('pillars.governanceDescription')}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-md border text-xs font-ui font-semibold flex items-center gap-2 ${
                    isDark
                      ? 'bg-[#0A0D0F] border-white/10 text-[#F5F7F6]'
                      : 'bg-white border-black/[0.08] text-[#0A0D0C] shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#189890]" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

