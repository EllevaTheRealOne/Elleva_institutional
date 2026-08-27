import React from 'react';
import { Cpu, Database, Network, Lock, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TechnologyProps {
  isDark?: boolean;
}

export const Technology: React.FC<TechnologyProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);

  const stackItems = [
    {
      id: 'technology-data',
      number: '01',
      title: t('technology.components.data.title'),
      quote: t('technology.components.data.quote'),
      tech: 'Apache Kafka / WebSocket Direct Streams / Parquet Cold Storage',
      icon: <Database className="w-4 h-4 text-[#189890]" />,
    },
    {
      id: 'technology-intelligence',
      number: '02',
      title: t('technology.components.intelligence.title'),
      quote: t('technology.components.intelligence.quote'),
      tech: 'Transformers dedicados / Bayesian calibration / Causal DAG analysis',
      icon: <Cpu className="w-4 h-4 text-[#189890]" />,
    },
    {
      id: 'technology-orchestration',
      number: '03',
      title: t('technology.components.orchestration.title'),
      quote: t('technology.components.orchestration.quote'),
      tech: 'State Machines / FIX 4.4 Engine / Smart Order Routing sub-ms',
      icon: <Network className="w-4 h-4 text-[#189890]" />,
    },
    {
      id: 'technology-decision',
      number: '04',
      title: t('technology.components.storage.title'),
      quote: t('technology.components.storage.quote'),
      tech: 'Append-only ledger / Merkle tree verification / Multi-region redundancy',
      icon: <Lock className="w-4 h-4 text-[#189890]" />,
    },
  ];

  const specs = [
    t('technology.specs.uptime'),
    t('technology.specs.latency'),
    t('technology.specs.encryption'),
    t('technology.specs.compliance'),
  ];

  return (
    <section
      id="technology"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('technology.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('technology.description')}
          </p>
        </div>

        {/* 4 Tech Stack Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stackItems.map((item) => (
            <div
              key={item.number}
              id={item.id}
              className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                  : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#189890]">
                    {t('technology.componentLabel')} {item.number}
                  </span>
                  <div className="p-1.5 rounded-sm bg-[#0C5F5A] text-[#189890]">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-2">
                  {item.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/10">
                <span className="text-[10px] font-mono text-[#8E9995] block line-clamp-1">
                  {item.tech}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel: Especificações Técnicas */}
        <div
          className={`p-6 sm:p-8 rounded-xl border ${
            isDark
              ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
              : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.06)]'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h4 className="font-display font-bold text-xl mb-2">
                {t('technology.specsPanel.title')}
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                {t('technology.specsPanel.description')}
              </p>
            </div>

            {/* Spec Badges */}
            <div className="flex flex-wrap gap-2.5">
              {specs.map((s) => (
                <div
                  key={s}
                  className={`px-3 py-1.5 rounded-md border text-xs font-mono font-bold flex items-center gap-2 ${
                    isDark
                      ? 'bg-[#0A0D0F] border-white/10 text-[#189890]'
                      : 'bg-white border-black/[0.08] text-[#0C5F5A] shadow-xs'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#189890]" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

