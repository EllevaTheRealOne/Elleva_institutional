import React, { useState } from 'react';
import {
  Eye,
  Layers,
  PieChart,
  TrendingUp,
  ShieldAlert,
  Droplets,
  Brain,
  Activity,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OverviewView } from './views/OverviewView';
import { PositionsView } from './views/PositionsView';
import { AllocationView } from './views/AllocationView';
import { PerformanceView } from './views/PerformanceView';
import { RiskView } from './views/RiskView';
import { LiquidityView } from './views/LiquidityView';
import { MarketIntelligenceView } from './views/MarketIntelligenceView';
import { AttributionView } from './views/AttributionView';
import { AlertsView } from './views/AlertsView';
import { ComplianceView } from './views/ComplianceView';

interface InvestmentExperienceProps {
  isDark?: boolean;
}

export const InvestmentExperience: React.FC<InvestmentExperienceProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);
  const [selectedArea, setSelectedArea] = useState<string>('portfolio-overview');

  const areas = [
    { id: 'portfolio-overview', label: t('investmentExperience.tabs.overview'), icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'portfolio-positions', label: t('investmentExperience.tabs.positions'), icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'portfolio-allocation', label: t('investmentExperience.tabs.allocation'), icon: <PieChart className="w-3.5 h-3.5" /> },
    { id: 'portfolio-performance', label: t('investmentExperience.tabs.performance'), icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'portfolio-risk', label: t('investmentExperience.tabs.risk'), icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'portfolio-liquidity', label: t('investmentExperience.tabs.liquidity'), icon: <Droplets className="w-3.5 h-3.5" /> },
    { id: 'portfolio-market-intelligence', label: t('investmentExperience.tabs.marketIntelligence'), icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'portfolio-attribution', label: t('investmentExperience.tabs.attribution'), icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'portfolio-alerts', label: t('investmentExperience.tabs.alerts'), icon: <Bell className="w-3.5 h-3.5" /> },
    { id: 'portfolio-compliance', label: t('investmentExperience.tabs.compliance'), icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  const renderActiveView = () => {
    switch (selectedArea) {
      case 'portfolio-positions':
        return <PositionsView isDark={isDark} />;
      case 'portfolio-allocation':
        return <AllocationView isDark={isDark} />;
      case 'portfolio-performance':
        return <PerformanceView isDark={isDark} />;
      case 'portfolio-risk':
        return <RiskView isDark={isDark} />;
      case 'portfolio-liquidity':
        return <LiquidityView isDark={isDark} />;
      case 'portfolio-market-intelligence':
        return <MarketIntelligenceView isDark={isDark} />;
      case 'portfolio-attribution':
        return <AttributionView isDark={isDark} />;
      case 'portfolio-alerts':
        return <AlertsView isDark={isDark} />;
      case 'portfolio-compliance':
        return <ComplianceView isDark={isDark} />;
      case 'portfolio-overview':
      default:
        return <OverviewView isDark={isDark} />;
    }
  };

  return (
    <section
      id="investment-experience"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-14">
          <h2 className="type-section-title mb-4">
            {t('investmentExperience.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('investmentExperience.description')}
          </p>
        </div>

        {/* Institutional Experience Workspace */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.1)] shadow-xl'
              : 'bg-white border-[rgba(10,13,12,0.1)] shadow-sm'
          }`}
        >
          {/* Top Bar with Interface Areas */}
          <div
            className={`p-2 sm:p-3 border-b flex items-center overflow-x-auto no-scrollbar gap-1.5 ${
              isDark
                ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
                : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.06)]'
            }`}
          >
            {areas.map((area) => {
              const active = selectedArea === area.id;
              return (
                <button
                  key={area.id}
                  id={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-ui font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all ${
                    active
                      ? isDark
                        ? 'bg-[#189890] text-white'
                        : 'bg-[#0C5F5A] text-white shadow-xs'
                      : isDark
                      ? 'text-[#8E9995] hover:text-[#F5F7F6] hover:bg-white/5'
                      : 'text-[#4E5653] hover:text-[#0A0D0C] hover:bg-black/5'
                  }`}
                >
                  {area.icon}
                  <span>{area.label}</span>
                </button>
              );
            })}
          </div>

          {/* Institutional Dashboard Interior */}
          <div className="p-4 sm:p-8">
            {renderActiveView()}
          </div>
        </div>
      </div>
    </section>
  );
};
