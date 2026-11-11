import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { allLangs, defaultLang, normalizeDetectedLanguage } from "./langs";

// Vite emits separate hashed chunks. Each language/namespace is fetched only when needed.
const localeImports = import.meta.glob<{ default: Record<string, unknown> }>(
  "./locales/*/*.json",
);

const backend = {
  type: "backend" as const,
  read(
    language: string,
    namespace: string,
    callback: (error: Error | null, data: unknown) => void,
  ) {
    const load = localeImports[`./locales/${language}/${namespace}.json`];
    if (!load) {
      callback(new Error(`Missing locale ${language}/${namespace}`), null);
      return;
    }
    load()
      .then((mod) => callback(null, mod.default ?? mod))
      .catch((error) =>
        callback(
          error instanceof Error ? error : new Error(String(error)),
          null,
        ),
      );
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(backend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: allLangs.map((lng) => lng.value),
      fallbackLng: defaultLang.value,
      debug: false,
      ns: ["common", "nav"],
      defaultNS: "common",
      load: "currentOnly",
      partialBundledLanguages: false,
      interpolation: { escapeValue: false },
      detection: {
        order: ["path", "querystring", "cookie", "navigator"],
        convertDetectedLanguage: normalizeDetectedLanguage,
        caches: ["cookie"],
        lookupFromPathIndex: 0,
        cookieMinutes: 60 * 24 * 365,
        cookieOptions: { path: "/" },
        lookupLocalStorage: "i18nextLng",
        lookupCookie: "i18next",
      },
    });
}

export default i18n;
