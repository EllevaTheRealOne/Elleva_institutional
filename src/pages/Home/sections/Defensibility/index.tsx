import React from 'react';
import { Layers, Database, Activity, Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DefensibilityProps {
  isDark?: boolean;
}

export const Defensibility: React.FC<DefensibilityProps> = ({
  isDark = false,
}) => {
  const { t } = useTranslation(['home', 'common']);

  const layers = [
    {
      id: 'layer-4',
      title: t('defensibility.layer4.title'),
      quote: t('defensibility.layer4.quote'),
      detail: t('defensibility.layer4.detail'),
      depthIndex: t('defensibility.layer4.level'),
      icon: <Network className="w-4 h-4 text-[#189890]" />,
    },
    {
      id: 'layer-3',
      title: t('defensibility.layer3.title'),
      quote: t('defensibility.layer3.quote'),
      detail: t('defensibility.layer3.detail'),
      depthIndex: t('defensibility.layer3.level'),
      icon: <Activity className="w-4 h-4 text-[#189890]" />,
    },
    {
      id: 'layer-2',
      title: t('defensibility.layer2.title'),
      quote: t('defensibility.layer2.quote'),
      detail: t('defensibility.layer2.detail'),
      depthIndex: t('defensibility.layer2.level'),
      icon: <Layers className="w-4 h-4 text-[#189890]" />,
    },
    {
      id: 'layer-1',
      title: t('defensibility.layer1.title'),
      quote: t('defensibility.layer1.quote'),
      detail: t('defensibility.layer1.detail'),
      depthIndex: t('defensibility.layer1.level'),
      icon: <Database className="w-4 h-4 text-[#189890]" />,
    },
  ];

  return (
    <section
      id="defensibility"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="type-section-title mb-4">
            {t('defensibility.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('defensibility.description')}
          </p>
        </div>

        {/* Stacked Strata Representation (Accumulated Depth) */}
        <div className="space-y-4 max-w-4xl mx-auto mb-14">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className={`p-6 rounded-xl border transition-all relative overflow-hidden ${
                isDark
                  ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)] hover:border-[#189890]/40'
                  : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs hover:border-[#189890]'
              }`}
              style={{
                marginLeft: `${index * 12}px`,
                marginRight: `${index * 12}px`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-sm bg-[#050607] text-[#F5F7F6]">
                    {layer.icon}
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg">{layer.title}</h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#189890] font-bold px-2 py-0.5 rounded bg-[#189890]/10 self-start sm:self-auto">
                  {layer.depthIndex}
                </span>
              </div>

              <div className="text-sm font-semibold text-[#189890] mb-1">
                “{layer.quote}”
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
                {layer.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Accumulated Compounding Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div
            className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
            }`}
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[#8E9995] mb-1">
              {t('defensibility.footer.scaleLabel')}
            </div>
            <div className="font-display font-bold text-base text-[#189890]">
              {t('defensibility.footer.scaleValue')}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
            }`}
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[#8E9995] mb-1">
              {t('defensibility.footer.retentionLabel')}
            </div>
            <div className="font-display font-bold text-base text-[#189890]">
              {t('defensibility.footer.retentionValue')}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-center ${
              isDark ? 'bg-[#0E1214] border-white/5' : 'bg-[#F1F3F1] border-black/[0.06]'
            }`}
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[#8E9995] mb-1">
              {t('defensibility.footer.barrierLabel')}
            </div>
            <div className="font-display font-bold text-base text-[#189890]">
              {t('defensibility.footer.barrierValue')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

