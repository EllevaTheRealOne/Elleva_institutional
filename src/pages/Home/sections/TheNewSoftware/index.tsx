import React from 'react';
import { TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TheNewSoftwareProps {
  isDark?: boolean;
}

export const TheNewSoftware: React.FC<TheNewSoftwareProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);

  const sequenceSteps = [
    {
      step: '01',
      title: t('theNewSoftware.sequence.software.title'),
      subtitle: t('theNewSoftware.sequence.software.subtitle'),
      description: t('theNewSoftware.sequence.software.desc'),
    },
    {
      step: '02',
      title: t('theNewSoftware.sequence.work.title'),
      subtitle: t('theNewSoftware.sequence.work.subtitle'),
      description: t('theNewSoftware.sequence.work.desc'),
    },
    {
      step: '03',
      title: t('theNewSoftware.sequence.decision.title'),
      subtitle: t('theNewSoftware.sequence.decision.subtitle'),
      description: t('theNewSoftware.sequence.decision.desc'),
    },
  ];

  const benefits = [
    {
      title: t('theNewSoftware.benefits.margin.title'),
      desc: t('theNewSoftware.benefits.margin.desc'),
      icon: <TrendingUp className="w-4 h-4 text-[#189890]" />,
    },
    {
      title: t('theNewSoftware.benefits.scale.title'),
      desc: t('theNewSoftware.benefits.scale.desc'),
      icon: <Zap className="w-4 h-4 text-[#189890]" />,
    },
    {
      title: t('theNewSoftware.benefits.quality.title'),
      desc: t('theNewSoftware.benefits.quality.desc'),
      icon: <ShieldCheck className="w-4 h-4 text-[#189890]" />,
    },
  ];

  return (
    <section
      id="new-software"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('theNewSoftware.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('theNewSoftware.description')}
          </p>
        </div>

        {/* 3-Part Sequential Chain: SOFTWARE -> TRABALHO -> DECISÃO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {sequenceSteps.map((item, idx) => (
            <div
              key={item.step}
              className={`p-6 sm:p-8 rounded-xl border relative transition-all ${
                isDark
                  ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                  : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold text-[#189890] uppercase tracking-widest">
                  {t('theNewSoftware.stepLabel')} {item.step}
                </span>
                {idx < 2 && (
                  <span className="text-[#189890] opacity-40 font-mono hidden md:inline">→</span>
                )}
              </div>

              <h3 className="font-display font-bold text-xl mb-1">{item.title}</h3>
              <div className="text-xs font-mono text-[#189890] mb-3">{item.subtitle}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`p-6 rounded-xl border ${
                isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 rounded-sm bg-[#0C5F5A] text-[#189890]">
                  {benefit.icon}
                </div>
                <h4 className="font-display font-bold text-sm">{benefit.title}</h4>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Callout */}
        <div
          className={`p-6 sm:p-8 rounded-xl border text-center transition-all ${
            isDark
              ? 'bg-[#0A0D0F] border-[#189890]/40 accent-glow'
              : 'bg-white border-[#189890] shadow-sm accent-glow'
          }`}
        >
          <p className="font-display text-xl sm:text-2xl font-bold text-[#189890]">
            “{t('theNewSoftware.closingQuote')}”
          </p>
        </div>
      </div>
    </section>
  );
};

