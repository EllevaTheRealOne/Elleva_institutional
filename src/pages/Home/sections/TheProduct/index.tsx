import React, { useState } from 'react';
import {
  Search,
  Scale,
  Zap,
  Activity,
  Terminal,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TheProductProps {
  isDark?: boolean;
}

interface OSPhase {
  id: 'pesquisar' | 'decidir' | 'executar' | 'monitorar';
  number: string;
  title: string;
  scope: string;
  moduleName: string;
  moduleDescription: string;
  icon: React.ReactNode;
  activeProcesses: string[];
  systemMetrics: { label: string; value: string }[];
}

export const TheProduct: React.FC<TheProductProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const [activeTab, setActiveTab] = useState<'pesquisar' | 'decidir' | 'executar' | 'monitorar'>('pesquisar');

  const phases: OSPhase[] = [
    {
      id: 'pesquisar',
      number: '01',
      title: t('theProduct.phases.research.title'),
      scope: t('theProduct.phases.research.scope'),
      moduleName: t('theProduct.phases.research.moduleName'),
      moduleDescription: t('theProduct.phases.research.moduleDescription'),
      icon: <Search className="w-4 h-4" />,
      activeProcesses: [
        t('theProduct.phases.research.process1'),
        t('theProduct.phases.research.process2'),
        t('theProduct.phases.research.process3'),
      ],
      systemMetrics: [
        { label: t('theProduct.phases.research.metric1'), value: '4.820/s' },
        { label: t('theProduct.phases.research.metric2'), value: '< 120ms' },
        { label: t('theProduct.phases.research.metric3'), value: '18.400+' },
      ],
    },
    {
      id: 'decidir',
      number: '02',
      title: t('theProduct.phases.decide.title'),
      scope: t('theProduct.phases.decide.scope'),
      moduleName: t('theProduct.phases.decide.moduleName'),
      moduleDescription: t('theProduct.phases.decide.moduleDescription'),
      icon: <Scale className="w-4 h-4" />,
      activeProcesses: [
        t('theProduct.phases.decide.process1'),
        t('theProduct.phases.decide.process2'),
        t('theProduct.phases.decide.process3'),
      ],
      systemMetrics: [
        { label: t('theProduct.phases.decide.metric1'), value: '50.000/dia' },
        { label: t('theProduct.phases.decide.metric2'), value: '100.0%' },
        { label: t('theProduct.phases.decide.metric3'), value: t('theProduct.realTime') },
      ],
    },
    {
      id: 'executar',
      number: '03',
      title: t('theProduct.phases.execute.title'),
      scope: t('theProduct.phases.execute.scope'),
      moduleName: t('theProduct.phases.execute.moduleName'),
      moduleDescription: t('theProduct.phases.execute.moduleDescription'),
      icon: <Zap className="w-4 h-4" />,
      activeProcesses: [
        t('theProduct.phases.execute.process1'),
        t('theProduct.phases.execute.process2'),
        t('theProduct.phases.execute.process3'),
      ],
      systemMetrics: [
        { label: t('theProduct.phases.execute.metric1'), value: '0.012%' },
        { label: t('theProduct.phases.execute.metric2'), value: 'FIX 4.4 / REST' },
        { label: t('theProduct.phases.execute.metric3'), value: t('theProduct.phases.execute.segregated') },
      ],
    },
    {
      id: 'monitorar',
      number: '04',
      title: t('theProduct.phases.monitor.title'),
      scope: t('theProduct.phases.monitor.scope'),
      moduleName: t('theProduct.phases.monitor.moduleName'),
      moduleDescription: t('theProduct.phases.monitor.moduleDescription'),
      icon: <Activity className="w-4 h-4" />,
      activeProcesses: [
        t('theProduct.phases.monitor.process1'),
        t('theProduct.phases.monitor.process2'),
        t('theProduct.phases.monitor.process3'),
      ],
      systemMetrics: [
        { label: t('theProduct.phases.monitor.metric1'), value: '100% Causal' },
        { label: t('theProduct.phases.monitor.metric2'), value: '< 50ms' },
        { label: t('theProduct.phases.monitor.metric3'), value: t('theProduct.phases.monitor.immutable') },
      ],
    },
  ];

  const currentPhase = phases.find((p) => p.id === activeTab) || phases[0];

  return (
    <section
      id="product"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('theProduct.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('theProduct.description')}
          </p>
        </div>

        {/* Operating System UI Wrapper */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.1)] shadow-xl'
              : 'bg-white border-[rgba(10,13,12,0.1)] shadow-sm'
          }`}
        >
          {/* OS Header Bar */}
          <div
            className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 ${
              isDark
                ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
                : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.06)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
              </div>
              <span className="text-xs font-mono font-semibold text-[#189890]">
                ELLEVA_OS // KERNEL v4.2.0 [AUTONOMOUS ENGINE]
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#8E9995]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#189890] animate-pulse" />
                {t('theProduct.osHeader.systemActive')}
              </span>
              <span>•</span>
              <span>{t('theProduct.osHeader.circuitsClosed')}</span>
            </div>
          </div>

          {/* OS Navigation Tabs (4 Core Pillars) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-black/[0.06] dark:border-white/10">
            {phases.map((phase) => {
              const isActive = phase.id === activeTab;
              const anchorId =
                phase.id === 'pesquisar'
                  ? 'product-research'
                  : phase.id === 'decidir'
                  ? 'product-decide'
                  : phase.id === 'executar'
                  ? 'product-execute'
                  : 'product-monitor';

              return (
                <button
                  key={phase.id}
                  id={anchorId}
                  onClick={() => setActiveTab(phase.id)}
                  className={`p-5 text-left transition-all border-r last:border-r-0 border-black/[0.06] dark:border-white/10 flex flex-col justify-between ${
                    isActive
                      ? isDark
                        ? 'bg-[#0E1214] border-b-2 border-b-[#189890]'
                        : 'bg-white border-b-2 border-b-[#0C5F5A]'
                      : isDark
                      ? 'bg-[#0A0D0F]/60 hover:bg-[#0E1214]/60'
                      : 'bg-[#F7F8F6] hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                        isActive ? 'text-[#189890]' : 'text-[#8E9995]'
                      }`}
                    >
                      {phase.number} {phase.title}
                    </span>
                    <div
                      className={`p-1.5 rounded-md ${
                        isActive
                          ? 'bg-[#0C5F5A] text-white'
                          : isDark
                          ? 'bg-white/5 text-[#8E9995]'
                          : 'bg-black/5 text-[#4E5653]'
                      }`}
                    >
                      {phase.icon}
                    </div>
                  </div>
                  <div className="text-xs font-ui font-semibold tracking-tight line-clamp-1">
                    {phase.moduleName}
                  </div>
                  <div className={`text-[11px] font-body mt-1 line-clamp-1 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                    {phase.scope}
                  </div>
                </button>
              );
            })}
          </div>

          {/* OS Main Content Pane */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Active Module Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#189890] font-semibold uppercase tracking-wider mb-2">
                  <span>{t('theProduct.moduleHeader')} {currentPhase.number}</span>
                </div>
                <h3 className="text-2xl font-display font-bold">{currentPhase.moduleName}</h3>
                <p className={`font-body text-sm mt-2 leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                  {currentPhase.moduleDescription}
                </p>
              </div>

              {/* Active Sub-Processes */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-ui uppercase font-semibold tracking-wider text-[#8E9995]">
                  {t('theProduct.activeProcessesHeader')}
                </div>
                <div className="space-y-2.5">
                  {currentPhase.activeProcesses.map((proc, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-lg border flex items-start gap-3 text-xs font-body leading-relaxed ${
                        isDark
                          ? 'bg-[#0E1214] border-[rgba(245,247,246,0.06)]'
                          : 'bg-[#F7F8F6] border-[rgba(10,13,12,0.06)]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#189890] shrink-0 mt-0.5" />
                      <span>{proc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Telemetry & Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div
                className={`p-6 rounded-xl border space-y-5 ${
                  isDark
                    ? 'bg-[#0E1214] border-[rgba(245,247,246,0.08)]'
                    : 'bg-[#F7F8F6] border-[rgba(10,13,12,0.06)]'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/10">
                  <span className="text-xs font-ui uppercase font-semibold tracking-wider text-[#8E9995]">
                    {t('theProduct.telemetryHeader')}
                  </span>
                  <Terminal className="w-4 h-4 text-[#189890]" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentPhase.systemMetrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className={`text-xs font-ui ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                        {m.label}
                      </span>
                      <span className="text-sm font-mono font-bold text-[#189890]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* OS Status footer */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                  isDark ? 'bg-[#0A0D0F] border-white/5' : 'bg-white border-black/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#189890]" />
                  <span className="font-ui font-medium">
                    {t('theProduct.footerStatus')}
                  </span>
                </div>
                <span className="text-[#8E9995] font-mono">
                  {t('theProduct.footerInviolable')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

