import { useLocation, useNavigate } from "react-router-dom";
import { allLangs, defaultLang } from "@/i18n/langs";
import { useI18n } from "@/i18n/useI18n";
import { setLanguage as setSignalLanguage } from "@/i18n/signals";
import i18n from "@/i18n";

export function useChangeLanguage() {
  const { currentLanguage, currentConfig } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = async (newLangValue: string) => {
    // 1. Dispatch through centralized signal (synchronously updates state, document.documentElement.lang, and storage)
    setSignalLanguage(newLangValue);
    await i18n.changeLanguage(newLangValue);

    // 2. Update route if path has language segment, preserving hash and search (Section 47)
    const { pathname, search, hash } = location;
    const segments = pathname.split("/").filter(Boolean);

    // Check if the first segment is an existing language code
    const isFirstSegmentLang = allLangs.some(
      (l) => l.value.toLowerCase() === segments[0]?.toLowerCase(),
    );

    const pureSegments = isFirstSegmentLang ? segments.slice(1) : segments;
    const subPath = pureSegments.length > 0 ? `/${pureSegments.join("/")}` : "";

    let newPath = "";
    if (newLangValue === defaultLang.value) {
      newPath = subPath || "/";
    } else {
      newPath = `/${newLangValue}${subPath}`;
    }

    const fullTargetUrl = `${newPath}${search}${hash}`;
    if (fullTargetUrl !== `${pathname}${search}${hash}`) {
      navigate(fullTargetUrl, { replace: true });
    }
  };

  return {
    currentLanguage,
    currentConfig,
    changeLanguage,
  };
}
