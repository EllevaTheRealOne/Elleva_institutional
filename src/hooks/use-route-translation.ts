import { allLangs } from "@/i18n/langs";
import { useLocation } from "react-router-dom";

export const useRouteTranslation = () => {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  const isLang = allLangs.some((l) => l.value.toLowerCase() === segments[0]);

  const pathSegments = isLang ? segments.slice(1) : segments;

  const pathWithoutLng = pathSegments.length === 0 ? 1 : 2;

  return { pathWithoutLng };
};
