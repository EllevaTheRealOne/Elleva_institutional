import { IAllLangs } from "@/types/i18n.types";

export type { IAllLangs };

export const allLangs: IAllLangs[] = [
  {
    label: "English",
    nativeLabel: "English",
    shortLabel: "EN",
    value: "en",
    icon: "us",
    valueWhithCurrrency: "en-US",
    currency: "USD",
    symbol: "$",
  },
  {
    label: "Chinese",
    nativeLabel: "中文",
    shortLabel: "ZH",
    value: "zh",
    icon: "cn",
    valueWhithCurrrency: "zh-CN",
    currency: "USD",
    symbol: "$",
  },
  {
    label: "Spanish",
    nativeLabel: "Español",
    shortLabel: "ES",
    value: "es",
    icon: "es",
    valueWhithCurrrency: "es-ES",
    currency: "USD",
    symbol: "$",
  },
  {
    label: "Japanese",
    nativeLabel: "日本語",
    shortLabel: "JA",
    value: "ja",
    icon: "jp",
    valueWhithCurrrency: "ja-JP",
    currency: "USD",
    symbol: "$",
  },
  {
    label: "Korean",
    nativeLabel: "한국어",
    shortLabel: "KO",
    value: "ko",
    icon: "kr",
    valueWhithCurrrency: "ko-KR",
    currency: "USD",
    symbol: "$",
  },
  {
    label: "Portuguese",
    nativeLabel: "Português",
    shortLabel: "PT",
    value: "pt-BR",
    icon: "br",
    valueWhithCurrrency: "pt-BR",
    currency: "USD",
    symbol: "$",
  },
  {
    label: "Russian",
    nativeLabel: "Русский",
    shortLabel: "RU",
    value: "ru",
    icon: "ru",
    valueWhithCurrrency: "ru-RU",
    currency: "USD",
    symbol: "$",
  },
  {
    label: "Vietnamese",
    nativeLabel: "Tiếng Việt",
    shortLabel: "VI",
    value: "vi-VN",
    icon: "vn",
    valueWhithCurrrency: "vi-VN",
    currency: "USD",
    symbol: "$",
  },
];

export const defaultLang: IAllLangs = allLangs[0];

/**
 * Utility functions for central i18n access (Section 52)
 */
export function getLanguageConfig(langValue?: string): IAllLangs {
  if (!langValue) return defaultLang;
  const match = allLangs.find(
    (l) =>
      l.value.toLowerCase() === langValue.toLowerCase() ||
      l.valueWhithCurrrency.toLowerCase() === langValue.toLowerCase() ||
      l.value.toLowerCase().startsWith(langValue.toLowerCase().split("-")[0]),
  );
  return match || defaultLang;
}

export function getLocale(langValue?: string): string {
  return getLanguageConfig(langValue).valueWhithCurrrency;
}

export function getCurrency(langValue?: string): string {
  return getLanguageConfig(langValue).currency;
}

export function getCurrencySymbol(langValue?: string): string {
  return getLanguageConfig(langValue).symbol;
}

export function getNativeLabel(langValue?: string): string {
  const config = getLanguageConfig(langValue);
  return config.nativeLabel || config.label;
}
