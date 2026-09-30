import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface PresenceFormat {
  lang: string;
  number: (n: number) => string;
  share: (share: number) => string;
  dateTime: (iso: string) => string;
  /** The country's name in the visitor's language, from its alpha-2 code. */
  countryName: (code: string) => string;
}

/**
 * Locale-aware formatting for the section, in the language the visitor picked.
 * Country names come from the browser (Intl.DisplayNames), so the api sends codes
 * only and no translation file has to list the world's countries.
 */
export function usePresenceFormat(): PresenceFormat {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || "en";

  return useMemo(() => {
    const number = new Intl.NumberFormat(lang);
    const percent = new Intl.NumberFormat(lang, { style: "percent", maximumFractionDigits: 1 });
    // Below 1 %, one decimal would round a single member down to "0 %".
    const smallPercent = new Intl.NumberFormat(lang, { style: "percent", maximumSignificantDigits: 2 });
    const dateTime = new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short" });

    let regions: Intl.DisplayNames | undefined;
    try {
      regions = new Intl.DisplayNames([lang], { type: "region" });
    } catch {
      // Browsers without Intl.DisplayNames fall back to the ISO code, which is still correct.
      regions = undefined;
    }

    return {
      lang,
      number: (n) => number.format(n),
      share: (s) => (s > 0 && s < 0.01 ? smallPercent : percent).format(s),
      dateTime: (iso) => dateTime.format(new Date(iso)),
      countryName: (code) => regions?.of(code) ?? code,
    };
  }, [lang]);
}
