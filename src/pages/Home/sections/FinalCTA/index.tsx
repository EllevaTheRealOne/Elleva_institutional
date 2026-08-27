import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FinalCTAProps {
  isDark?: boolean;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ isDark = false }) => {
  const { t } = useTranslation(['home', 'common']);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && institution) {
      setSubmitted(true);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitted(false);
        setEmail('');
        setInstitution('');
      }, 2500);
    }
  };

  return (
    <footer
      id="final-cta"
      className={`py-24 sm:py-32 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#050607] border-[rgba(245,247,246,0.08)] text-[#F5F7F6]'
          : 'bg-[#F1F3F1] border-[rgba(10,13,12,0.08)] text-[#0A0D0C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Main Institutional CTA Banner */}
        <div
          className={`p-8 sm:p-14 rounded-2xl border text-center relative overflow-hidden transition-all mb-16 ${
            isDark
              ? 'bg-[#0A0D0F] border-[rgba(245,247,246,0.1)] shadow-2xl'
              : 'bg-white border-[rgba(10,13,12,0.1)] shadow-md'
          }`}
        >
          <h2 className="type-cta mb-4">
            {t('finalCTA.title')}
          </h2>

          <p
            className={`type-body max-w-2xl mx-auto mb-10 ${
              isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'
            }`}
          >
            {t('finalCTA.description')}
          </p>
        </div>

        {/* Footer Credentials & Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-black/[0.06] dark:border-white/10 text-center sm:text-left mb-12">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Lock className="w-4 h-4 text-[#189890] shrink-0" />
            <span className={`text-xs ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('finalCTA.credentials.segregation')}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#189890] shrink-0" />
            <span className={`text-xs ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('finalCTA.credentials.noCustody')}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#189890] shrink-0" />
            <span className={`text-xs ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('finalCTA.credentials.connectivity')}
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E9995] font-mono gap-4">
          <div>{t('common.footer.copyright')}</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#189890] cursor-pointer">
              {t('common.footer.terms')}
            </span>
            <span className="hover:text-[#189890] cursor-pointer">
              {t('common.footer.security')}
            </span>
            <span className="hover:text-[#189890] cursor-pointer">
              {t('common.footer.regulatory')}
            </span>
          </div>
        </div>
      </div>

      {/* Institutional Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className={`w-full max-w-lg p-6 sm:p-8 rounded-2xl border shadow-2xl relative ${
              isDark ? 'bg-[#0A0D0F] border-white/10 text-white' : 'bg-white border-black/10 text-black'
            }`}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-xs font-mono text-[#8E9995] hover:text-[#F5F7F6]"
            >
              [{t('common.close')}]
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#189890] mx-auto" />
                <h3 className="text-xl font-display font-bold">
                  {t('finalCTA.modal.submittedTitle')}
                </h3>
                <p className="text-xs text-[#8E9995]">
                  {t('finalCTA.modal.submittedDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#189890]">
                    {t('finalCTA.modal.badge')}
                  </span>
                  <h3 className="text-xl font-display font-bold mt-1">
                    {t('finalCTA.modal.title')}
                  </h3>
                  <p className="text-xs text-[#8E9995] mt-1">
                    {t('finalCTA.modal.desc')}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-ui font-semibold block mb-1">
                    {t('finalCTA.modal.institutionLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={t('finalCTA.modal.institutionPlaceholder')}
                    className={`w-full px-3 py-2 rounded-md border text-xs ${
                      isDark
                        ? 'bg-[#0E1214] border-white/10 text-[#F5F7F6] placeholder-neutral-600'
                        : 'bg-[#F7F8F6] border-black/10 text-[#0A0D0C] placeholder-neutral-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-ui font-semibold block mb-1">
                    {t('finalCTA.modal.emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('finalCTA.modal.emailPlaceholder')}
                    className={`w-full px-3 py-2 rounded-md border text-xs ${
                      isDark
                        ? 'bg-[#0E1214] border-white/10 text-[#F5F7F6] placeholder-neutral-600'
                        : 'bg-[#F7F8F6] border-black/10 text-[#0A0D0C] placeholder-neutral-400'
                    }`}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-md font-ui font-semibold text-xs bg-[#0C5F5A] text-white hover:bg-[#189890] transition-all"
                  >
                    {t('finalCTA.modal.submitButton')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

