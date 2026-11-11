import { useSyncExternalStore, useCallback } from "react";
import {
  languageSignal,
  selectedCurrencySignal,
  setLanguage as setLangAction,
  getLanguageConfig,
  getLocale,
  getCurrencySymbol,
} from "./signals";
import i18n from ".";

export function useI18n() {
  const currentLang = useSyncExternalStore(
    languageSignal.subscribe,
    () => languageSignal.get(),
    () => languageSignal.get(),
  );

  const currentCurrency = useSyncExternalStore(
    selectedCurrencySignal.subscribe,
    () => selectedCurrencySignal.get(),
    () => selectedCurrencySignal.get(),
  );

  const currentConfig = getLanguageConfig(currentLang);
  const locale = getLocale(currentLang);

  const setLanguage = useCallback((newLang: string) => {
    setLangAction(newLang);
    void i18n.changeLanguage(newLang);
  }, []);

  return {
    language: currentLang,
    currentLanguage: currentLang,
    config: currentConfig,
    currentConfig,
    currency: currentCurrency,
    currencySymbol: getCurrencySymbol(currentLang),
    locale,
    setLanguage,
    changeLanguage: setLanguage,
  };
}

export default useI18n;
