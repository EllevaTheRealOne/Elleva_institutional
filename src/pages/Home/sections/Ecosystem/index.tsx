import React from 'react';
import { Landmark, Building, Database, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EcosystemProps {
  isDark?: boolean;
}

export const Ecosystem: React.FC<EcosystemProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);

  const categories = [
    {
      id: 'ecosystem-banks',
      subId: 'ecosystem-custody',
      title: t('ecosystem.categories.custodians.title'),
      icon: <Landmark className="w-4 h-4 text-[#189890]" />,
      partners: ['BTG Pactual', 'Itaú BBA', 'Bradesco BBI', 'XP Investimentos', 'BNY Mellon', 'State Street'],
    },
    {
      id: 'ecosystem-brokers',
      subId: 'ecosystem-portfolios',
      title: t('ecosystem.categories.brokers.title'),
      icon: <Building className="w-4 h-4 text-[#189890]" />,
      partners: ['Interactive Brokers', 'Bloomberg OMS', 'Tradeweb', 'MarketAxess', 'FIX 4.4 Protocols', 'DMA Direct Routes'],
    },
    {
      id: 'ecosystem-market-data',
      subId: 'ecosystem-reporting',
      title: t('ecosystem.categories.marketData.title'),
      icon: <Database className="w-4 h-4 text-[#189890]" />,
      partners: ['Bloomberg Data License', 'LSEG / Refinitiv', 'FactSet', 'S&P Global Market Intelligence', 'Edgar SEC / CVM Feeds', 'Morningstar'],
    },
    {
      id: 'ecosystem-compliance',
      subId: 'ecosystem-family-offices',
      title: t('ecosystem.categories.compliance.title'),
      icon: <ShieldCheck className="w-4 h-4 text-[#189890]" />,
      partners: [
        t('ecosystem.complianceItems.soc2'),
        t('ecosystem.complianceItems.iso27001'),
        t('ecosystem.complianceItems.anbima'),
        t('ecosystem.complianceItems.cvm175'),
        t('ecosystem.complianceItems.preTrade'),
        t('ecosystem.complianceItems.auditTrail'),
      ],
    },
  ];

  return (
    <section
      id="ecosystem"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('ecosystem.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('ecosystem.description')}
          </p>
          <div className="flex flex-wrap gap-2 mt-4 text-xs font-mono text-[#8E9995]">
            <span id="ecosystem-wealth-managers">{t('ecosystem.tags.wealthManagers')}</span> •{' '}
            <span id="ecosystem-custody">{t('ecosystem.tags.custody')}</span> •{' '}
            <span id="ecosystem-reporting">{t('ecosystem.tags.reporting')}</span>
          </div>
        </div>

        {/* 4 Ecosystem Category Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              id={cat.id}
              className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                  : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-sm bg-[#0C5F5A] text-[#189890]">
                    {cat.icon}
                  </div>
                  <h3 className="font-ui font-bold text-xs uppercase tracking-wider text-[#189890]">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {cat.partners.map((partner) => (
                    <div
                      key={partner}
                      className={`p-2.5 rounded-md border text-xs font-mono flex items-center gap-2 ${
                        isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F7F8F6] border-black/[0.04]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#189890] shrink-0" />
                      <span className="truncate">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

