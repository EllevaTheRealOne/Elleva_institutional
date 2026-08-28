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
 * Match candidate language string against supported languages with exact & fallback logic
 */
export function matchSupportedLanguage(candidate?: string | null): string | null {
  if (!candidate || typeof candidate !== "string") return null;
  const clean = candidate.trim().toLowerCase();
  if (!clean) return null;

  // 1. Exact match with lang.value (e.g. 'en', 'zh', 'es', 'ja', 'ko', 'pt-BR', 'ru', 'vi-VN')
  const exact = allLangs.find((l) => l.value.toLowerCase() === clean);
  if (exact) return exact.value;

  // 2. Exact match with lang.valueWhithCurrrency (e.g. 'pt-br', 'en-us', 'es-es', 'zh-cn', 'vi-vn')
  const exactLocale = allLangs.find(
    (l) => l.valueWhithCurrrency.toLowerCase() === clean,
  );
  if (exactLocale) return exactLocale.value;

  // 3. Base language match (e.g. 'pt', 'pt-PT' -> 'pt-BR', 'es-419' -> 'es', 'zh-TW' -> 'zh', 'vi' -> 'vi-VN')
  const baseCode = clean.split("-")[0];
  const baseMatch = allLangs.find(
    (l) =>
      l.value.toLowerCase() === baseCode ||
      l.value.toLowerCase().startsWith(baseCode + "-") ||
      l.valueWhithCurrrency.toLowerCase().startsWith(baseCode + "-"),
  );
  if (baseMatch) return baseMatch.value;

  return null;
}

/**
 * Detect initial language synchronously before first React render:
 * 1. URL pathname segment (if language prefix exists)
 * 2. User choice in localStorage (i18nextLng / elleva_lang)
 * 3. First supported language in navigator.languages
 * 4. navigator.language fallback
 * 5. Default application language
 */
export function detectInitialLanguage(): string {
  // 1. URL pathname check (e.g. /es, /pt-BR)
  if (typeof window !== "undefined" && window.location?.pathname) {
    const fromPath = window.location.pathname.split("/").filter(Boolean)[0];
    const pathMatch = matchSupportedLanguage(fromPath);
    if (pathMatch) return pathMatch;
  }

  // 2. User choice in localStorage
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const saved =
        localStorage.getItem("i18nextLng") ||
        localStorage.getItem("elleva_lang");
      const savedMatch = matchSupportedLanguage(saved);
      if (savedMatch) return savedMatch;
    } catch {
      // ignore storage error
    }
  }

  // 3. First supported language in navigator.languages
  if (typeof navigator !== "undefined" && Array.isArray(navigator.languages)) {
    for (const lang of navigator.languages) {
      const match = matchSupportedLanguage(lang);
      if (match) return match;
    }
  }

  // 4. navigator.language fallback
  if (typeof navigator !== "undefined" && navigator.language) {
    const match = matchSupportedLanguage(navigator.language);
    if (match) return match;
  }

  // 5. Default application language
  return defaultLang.value;
}

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
