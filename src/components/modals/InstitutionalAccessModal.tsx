import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle, ArrowRight, Building2, Mail, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InstitutionalAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const InstitutionalAccessModal: React.FC<InstitutionalAccessModalProps> = ({
  isOpen,
  onClose,
  isDark = false,
}) => {
  const { t } = useTranslation(['common', 'home']);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    institutionType: 'assetManager',
    aumBracket: '$50M - $250M',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      id="institutional-access-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="institutional-access-modal-dialog"
        className={`relative w-full max-w-xl rounded-2xl border p-6 sm:p-8 overflow-hidden shadow-2xl transition-all ${
          isDark
            ? 'bg-[#0A0D0F] border-white/10 text-[#F5F7F6]'
            : 'bg-white border-black/[0.08] text-[#0A0D0C]'
        }`}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-lg transition-colors ${
            isDark ? 'text-[#8E9995] hover:text-[#F5F7F6] hover:bg-white/10' : 'text-[#4E5653] hover:text-[#0A0D0C] hover:bg-black/5'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#189890]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#189890]">
                {t('modal.badge')}
              </span>
            </div>

            <h3 className="text-2xl font-bold font-poppins tracking-tight mb-2">
              {t('modal.title')}
            </h3>

            <p className={`text-xs sm:text-sm font-body mb-6 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('modal.description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    {t('modal.nameLabel')}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                    <input
                      id="input-applicant-name"
                      type="text"
                      required
                      placeholder={t('modal.namePlaceholder')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-xs border outline-none transition-all ${
                        isDark
                          ? 'bg-[#0E1214] border-[rgba(245,247,246,0.1)] focus:border-[#189890] text-[#F5F7F6]'
                          : 'bg-[#F7F8F6] border-[rgba(10,13,12,0.1)] focus:border-[#0C5F5A] text-[#0A0D0C]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    {t('modal.institutionLabel')}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                    <input
                      id="input-institution-name"
                      type="text"
                      required
                      placeholder={t('modal.institutionPlaceholder')}
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-xs border outline-none transition-all ${
                        isDark
                          ? 'bg-[#0E1214] border-[rgba(245,247,246,0.1)] focus:border-[#189890] text-[#F5F7F6]'
                          : 'bg-[#F7F8F6] border-[rgba(10,13,12,0.1)] focus:border-[#0C5F5A] text-[#0A0D0C]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    {t('modal.emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
                    <input
                      id="input-applicant-email"
                      type="email"
                      required
                      placeholder={t('modal.emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-xs border outline-none transition-all ${
                        isDark
                          ? 'bg-[#0E1214] border-[rgba(245,247,246,0.1)] focus:border-[#189890] text-[#F5F7F6]'
                          : 'bg-[#F7F8F6] border-[rgba(10,13,12,0.1)] focus:border-[#0C5F5A] text-[#0A0D0C]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    {t('modal.typeLabel')}
                  </label>
                  <select
                    id="select-institution-type"
                    value={formData.institutionType}
                    onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-lg text-xs border outline-none transition-all ${
                      isDark
                        ? 'bg-[#0E1214] border-[rgba(245,247,246,0.1)] focus:border-[#189890] text-[#F5F7F6]'
                        : 'bg-[#F7F8F6] border-[rgba(10,13,12,0.1)] focus:border-[#0C5F5A] text-[#0A0D0C]'
                    }`}
                  >
                    <option value="assetManager">{t('modal.types.assetManager')}</option>
                    <option value="multiFamilyOffice">{t('modal.types.multiFamilyOffice')}</option>
                    <option value="singleFamilyOffice">{t('modal.types.singleFamilyOffice')}</option>
                    <option value="advisor">{t('modal.types.advisor')}</option>
                    <option value="treasury">{t('modal.types.treasury')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  {t('modal.scopeLabel')}
                </label>
                <textarea
                  id="textarea-mandate-scope"
                  rows={2}
                  placeholder={t('modal.scopePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full p-3 rounded-lg text-xs border outline-none transition-all resize-none ${
                    isDark
                      ? 'bg-[#0E1214] border-[rgba(245,247,246,0.1)] focus:border-[#189890] text-[#F5F7F6]'
                      : 'bg-[#F7F8F6] border-[rgba(10,13,12,0.1)] focus:border-[#0C5F5A] text-[#0A0D0C]'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  id="submit-institutional-inquiry-btn"
                  type="submit"
                  className="w-full py-3 px-5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#0C5F5A] hover:bg-[#189890] text-white transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{t('modal.submitButton')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#189890]/15 text-[#189890] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">
              {t('modal.successTitle')}
            </h3>
            <p className={`text-xs sm:text-sm font-body max-w-md mx-auto mb-6 ${isDark ? 'text-[#8E9995]' : 'text-[#4E5653]'}`}>
              {t('modal.successDescPrefix')} <strong>{formData.institution}</strong>. {t('modal.successDescSuffix')}
            </p>
            <button
              id="confirm-modal-done-btn"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-[#0C5F5A] hover:bg-[#189890] text-white transition-all"
            >
              {t('actions.completed')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

