import React from 'react';
import {
  Database,
  PieChart,
  Landmark,
  Lock,
  Building,
  ShieldCheck,
  FileSpreadsheet,
  Users,
  Shield,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FlowWrapper } from '@/components/flow/FlowWrapper';
import { CentralCoreNode, ModuleNode } from '@/components/flow/CustomNodes';
import { createArchitectureEdge } from '@/components/flow/edgeUtils';
import { Node, Edge } from '@xyflow/react';

interface ArchitectureProps {
  isDark?: boolean;
}

const nodeTypes = {
  centralCore: CentralCoreNode,
  moduleNode: ModuleNode,
};

export const Architecture: React.FC<ArchitectureProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);

  const archNodes: Node[] = [
    // Center: ELLEVA CAMADA DE INTELIGÊNCIA E ORQUESTRAÇÃO (X: 420, Y: 180)
    {
      id: 'arch-core',
      type: 'centralCore',
      position: { x: 420, y: 180 },
      data: {
        title: 'ELLEVA',
        subtitle: t('architecture.flow.coreSubtitle'),
        caption: t('architecture.flow.coreCaption'),
        isDark,
        minWidth: '280px',
      },
    },

    // Left Column: Dados de Mercado, Portfólios, Bancos, Custódia (X: 60)
    {
      id: 'arch-data',
      type: 'moduleNode',
      position: { x: 60, y: 20 },
      data: {
        label: t('architecture.flow.marketDataLabel'),
        subtext: t('architecture.flow.marketDataSub'),
        icon: <Database className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: 'arch-portfolios',
      type: 'moduleNode',
      position: { x: 60, y: 130 },
      data: {
        label: t('architecture.flow.portfoliosLabel'),
        subtext: t('architecture.flow.portfoliosSub'),
        icon: <PieChart className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: 'arch-banks',
      type: 'moduleNode',
      position: { x: 60, y: 240 },
      data: {
        label: t('architecture.flow.banksLabel'),
        subtext: t('architecture.flow.banksSub'),
        icon: <Landmark className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: 'arch-custody',
      type: 'moduleNode',
      position: { x: 60, y: 350 },
      data: {
        label: t('architecture.flow.custodyLabel'),
        subtext: t('architecture.flow.custodySub'),
        icon: <Lock className="w-3.5 h-3.5" />,
        isDark,
      },
    },

    // Right Column: Corretoras e Execução, Compliance, Relatórios e Admin, Family Offices (X: 800)
    {
      id: 'arch-brokers',
      type: 'moduleNode',
      position: { x: 800, y: 20 },
      data: {
        label: t('architecture.flow.brokersLabel'),
        subtext: t('architecture.flow.brokersSub'),
        icon: <Building className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: 'arch-compliance',
      type: 'moduleNode',
      position: { x: 800, y: 130 },
      data: {
        label: t('architecture.flow.complianceLabel'),
        subtext: t('architecture.flow.complianceSub'),
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: 'arch-reports',
      type: 'moduleNode',
      position: { x: 800, y: 240 },
      data: {
        label: t('architecture.flow.reportsLabel'),
        subtext: t('architecture.flow.reportsSub'),
        icon: <FileSpreadsheet className="w-3.5 h-3.5" />,
        isDark,
      },
    },
    {
      id: 'arch-family-offices',
      type: 'moduleNode',
      position: { x: 800, y: 350 },
      data: {
        label: t('architecture.flow.familyOfficesLabel'),
        subtext: t('architecture.flow.familyOfficesSub'),
        icon: <Users className="w-3.5 h-3.5" />,
        isDark,
      },
    },
  ];

  // Refined orthogonal connections with dedicated handle IDs
  const archEdges: Edge[] = [
    // Left Inflow -> Dedicated Left Handles on Elleva Core
    createArchitectureEdge({
      id: 'ea-data',
      source: 'arch-data',
      target: 'arch-core',
      sourceHandle: 'right-src',
      targetHandle: 'left-top',
      isDark,
    }),
    createArchitectureEdge({
      id: 'ea-port',
      source: 'arch-portfolios',
      target: 'arch-core',
      sourceHandle: 'right-src',
      targetHandle: 'left-mid-top',
      isDark,
    }),
    createArchitectureEdge({
      id: 'ea-banks',
      source: 'arch-banks',
      target: 'arch-core',
      sourceHandle: 'right-src',
      targetHandle: 'left-mid-bottom',
      isDark,
    }),
    createArchitectureEdge({
      id: 'ea-cust',
      source: 'arch-custody',
      target: 'arch-core',
      sourceHandle: 'right-src',
      targetHandle: 'left-bottom',
      isDark,
    }),
    // Elleva Core Outflow -> Dedicated Right Outflow Handles
    createArchitectureEdge({
      id: 'ea-brok',
      source: 'arch-core',
      target: 'arch-brokers',
      sourceHandle: 'right-top-src',
      targetHandle: 'left',
      isDark,
    }),
    createArchitectureEdge({
      id: 'ea-comp',
      source: 'arch-core',
      target: 'arch-compliance',
      sourceHandle: 'right-mid-top-src',
      targetHandle: 'left',
      isDark,
    }),
    createArchitectureEdge({
      id: 'ea-rep',
      source: 'arch-core',
      target: 'arch-reports',
      sourceHandle: 'right-mid-bottom-src',
      targetHandle: 'left',
      isDark,
    }),
    createArchitectureEdge({
      id: 'ea-fo',
      source: 'arch-core',
      target: 'arch-family-offices',
      sourceHandle: 'right-bottom-src',
      targetHandle: 'left',
      isDark,
    }),
  ];

  const modulesDetailed = [
    {
      id: 'architecture-market-data',
      title: t('architecture.modules.marketData.title'),
      items: [
        t('architecture.modules.marketData.item1'),
        t('architecture.modules.marketData.item2'),
        t('architecture.modules.marketData.item3'),
        t('architecture.modules.marketData.item4'),
      ],
    },
    {
      id: 'architecture-portfolios',
      title: t('architecture.modules.portfolios.title'),
      items: [
        t('architecture.modules.portfolios.item1'),
        t('architecture.modules.portfolios.item2'),
        t('architecture.modules.portfolios.item3'),
        t('architecture.modules.portfolios.item4'),
      ],
    },
    {
      id: 'architecture-banks',
      title: t('architecture.modules.banks.title'),
      items: [
        t('architecture.modules.banks.item1'),
        t('architecture.modules.banks.item2'),
        t('architecture.modules.banks.item3'),
        t('architecture.modules.banks.item4'),
      ],
    },
    {
      id: 'architecture-custody',
      title: t('architecture.modules.custody.title'),
      items: [
        t('architecture.modules.custody.item1'),
        t('architecture.modules.custody.item2'),
        t('architecture.modules.custody.item3'),
        t('architecture.modules.custody.item4'),
      ],
    },
    {
      id: 'architecture-brokers',
      title: t('architecture.modules.brokers.title'),
      items: [
        t('architecture.modules.brokers.item1'),
        t('architecture.modules.brokers.item2'),
        t('architecture.modules.brokers.item3'),
        t('architecture.modules.brokers.item4'),
      ],
    },
    {
      id: 'architecture-compliance',
      title: t('architecture.modules.compliance.title'),
      items: [
        t('architecture.modules.compliance.item1'),
        t('architecture.modules.compliance.item2'),
        t('architecture.modules.compliance.item3'),
        t('architecture.modules.compliance.item4'),
      ],
    },
    {
      id: 'architecture-reporting',
      title: t('architecture.modules.reporting.title'),
      items: [
        t('architecture.modules.reporting.item1'),
        t('architecture.modules.reporting.item2'),
        t('architecture.modules.reporting.item3'),
        t('architecture.modules.reporting.item4'),
      ],
    },
    {
      id: 'architecture-wealth',
      title: t('architecture.modules.wealth.title'),
      items: [
        t('architecture.modules.wealth.item1'),
        t('architecture.modules.wealth.item2'),
        t('architecture.modules.wealth.item3'),
        t('architecture.modules.wealth.item4'),
      ],
    },
  ];

  return (
    <section
      id="architecture"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="type-section-title mb-4">
            {t('architecture.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('architecture.description')}
          </p>
        </div>

        {/* React Flow Main Diagram */}
        <div className="mb-14">
          <FlowWrapper
            nodes={archNodes}
            edges={archEdges}
            nodeTypes={nodeTypes}
            isDark={isDark}
            heightClass="h-[520px] sm:h-[560px]"
            badgeLabel={t('architecture.flowBadge')}
            fitPadding={0.12}
          />
        </div>

        {/* Detailed Module Taxonomy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modulesDetailed.map((mod) => (
            <div
              key={mod.title}
              id={mod.id}
              className={`p-5 rounded-xl border ${
                isDark ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]' : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
              }`}
            >
              <h4 className="font-display font-bold text-sm text-[#189890] mb-3">
                {mod.title}
              </h4>
              <ul className="space-y-2">
                {mod.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs">
                    <span className="w-1 h-1 rounded-full bg-[#189890] shrink-0" />
                    <span className={isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            className={`p-5 rounded-xl border text-center ${
              isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
            }`}
          >
            <Shield className="w-5 h-5 text-[#189890] mx-auto mb-2" />
            <div className="font-display font-bold text-sm mb-1">{t('architecture.pillars.custodyTitle')}</div>
            <div className={`text-xs ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('architecture.pillars.custodyDesc')}
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border text-center ${
              isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
            }`}
          >
            <Landmark className="w-5 h-5 text-[#189890] mx-auto mb-2" />
            <div className="font-display font-bold text-sm mb-1">{t('architecture.pillars.institutionsTitle')}</div>
            <div className={`text-xs ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('architecture.pillars.institutionsDesc')}
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border text-center ${
              isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
            }`}
          >
            <Zap className="w-5 h-5 text-[#189890] mx-auto mb-2" />
            <div className="font-display font-bold text-sm mb-1">{t('architecture.pillars.capacityTitle')}</div>
            <div className={`text-xs ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('architecture.pillars.capacityDesc')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

