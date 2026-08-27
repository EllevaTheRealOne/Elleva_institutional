import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQProps {
  isDark?: boolean;
}

export const FAQ: React.FC<FAQProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t('faq.items.custody.q'),
      a: t('faq.items.custody.a'),
    },
    {
      q: t('faq.items.replacement.q'),
      a: t('faq.items.replacement.a'),
    },
    {
      q: t('faq.items.compliance.q'),
      a: t('faq.items.compliance.a'),
    },
    {
      q: t('faq.items.assets.q'),
      a: t('faq.items.assets.a'),
    },
    {
      q: t('faq.items.integration.q'),
      a: t('faq.items.integration.a'),
    },
  ];

  return (
    <section
      id="faq"
      className={`py-20 sm:py-28 border-t border-black/[0.04] dark:border-white/5 transition-colors duration-300 ${
        isDark ? 'bg-[#050607] text-[#F5F7F6]' : 'bg-[#F7F8F6] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="type-section-title mb-4">
            {t('faq.title')}
          </h2>
          <p className={`type-body ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
            {t('faq.description')}
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isDark
                    ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.08)]'
                    : 'bg-white border-[rgba(10,13,12,0.08)] shadow-xs'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="type-card-title text-base sm:text-lg font-semibold">
                    {faq.q}
                  </span>
                  <div
                    className={`p-1 rounded-full shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#189890]' : 'text-[#8E9995]'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`px-6 pb-6 pt-1 type-editorial text-sm sm:text-[15px] border-t border-black/[0.04] dark:border-white/5 ${
                      isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
                    }`}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

