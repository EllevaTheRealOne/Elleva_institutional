import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { allLangs, defaultLang } from "./langs";

export const defaultNS = "common";

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: allLangs.map((lang) => lang.value),
      fallbackLng: defaultLang.value,
      preload: allLangs.map((lang) => lang.value),
      defaultNS,
      ns: ["common", "nav", "home", "notfound"],
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      detection: {
        order: ["path", "localStorage", "querystring", "cookie", "navigator"],
        caches: ["localStorage", "cookie"],
        lookupFromPathIndex: 0,
        lookupLocalStorage: "i18nextLng",
        lookupCookie: "i18next",
        cookieMinutes: 60 * 24 * 365,
        cookieOptions: { path: "/" },
      },
    });
}

export default i18n;
