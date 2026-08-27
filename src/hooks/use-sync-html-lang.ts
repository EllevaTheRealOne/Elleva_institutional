import { useEffect } from "react";
import { useI18n } from "@/i18n/useI18n";
import { allLangs, defaultLang, getLanguageConfig } from "@/i18n/langs";
import { useLocation } from "react-router-dom";

export function useSyncHtmlLang() {
  const { language, setLanguage } = useI18n();
  const location = useLocation();

  useEffect(() => {
    // 0. Check if URL path has a language prefix and sync i18n + signals
    const segments = location.pathname.split("/").filter(Boolean);
    const firstSegment = segments[0]?.toLowerCase();
    
    const matchedLang = allLangs.find(
      (l) =>
        l.value.toLowerCase() === firstSegment ||
        l.value.toLowerCase().split("-")[0] === firstSegment,
    );

    if (matchedLang && matchedLang.value !== language) {
      setLanguage(matchedLang.value);
    }

    const currentLang = matchedLang ? matchedLang.value : (language || defaultLang.value);
    const config = getLanguageConfig(currentLang);
    const htmlLang = config.valueWhithCurrrency || config.value;

    // 1. Sync <html lang="..."> attribute
    document.documentElement.lang = htmlLang;
    document.documentElement.setAttribute("lang", htmlLang);

    // 2. SEO hreflang tags management
    const origin = window.location.origin;
    const pathWithoutLng = location.pathname.replace(
      new RegExp(`^/(${allLangs.map((l) => l.value).concat(["pt", "vi", "zh", "es", "ja", "ko", "ru"]).join("|")})`),
      "",
    );

    // Remove existing dynamic hreflang tags
    document.querySelectorAll("link[rel='alternate'][hreflang]").forEach((el) => el.remove());

    // Inject alternate links for each supported language
    allLangs.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang.value;
      const targetPath =
        lang.value === defaultLang.value
          ? `${origin}${pathWithoutLng || "/"}`
          : `${origin}/${lang.value}${pathWithoutLng}`;
      link.href = targetPath;
      document.head.appendChild(link);
    });

    // Inject x-default pointing to English default
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${origin}${pathWithoutLng || "/"}`;
    document.head.appendChild(xDefault);
  }, [language, location.pathname, setLanguage]);
}
