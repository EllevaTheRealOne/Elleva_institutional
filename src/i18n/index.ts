import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import {
  allLangs,
  defaultLang,
  detectInitialLanguage,
  getLanguageConfig,
} from "./langs";

export const defaultNS = "common";
const initialLanguage = detectInitialLanguage();

// Set initial document lang attribute synchronously
if (typeof document !== "undefined") {
  const config = getLanguageConfig(initialLanguage);
  document.documentElement.lang =
    config.valueWhithCurrrency || initialLanguage;
}

export const i18nReady = i18n.isInitialized
  ? Promise.resolve()
  : i18n
      .use(Backend)
      .use(initReactI18next)
      .init({
        lng: initialLanguage,
        supportedLngs: allLangs.map((lang) => lang.value),
        fallbackLng: defaultLang.value,
        defaultNS,
        ns: ["common", "nav", "home", "notfound"],
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: "/internationalization/{{lng}}/{{ns}}.json",
        },
        react: {
          useSuspense: false,
        },
      });

export default i18n;

