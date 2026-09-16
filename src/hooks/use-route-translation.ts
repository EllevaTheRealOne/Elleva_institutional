import { useLocation } from "react-router-dom";
import { stripLanguagePrefix } from "@/i18n/localizePath";
import { ROUTE_KEY, type RouteKey } from "@/constants/routes/routes.constants";

/**
 * Identifies the current route independently of its language prefix, so that
 * navigation and content can be configured per route ("home", "business-plan")
 * rather than per URL.
 */
export const useRouteTranslation = () => {
  const { pathname } = useLocation();

  const appPath = stripLanguagePrefix(pathname);
  const firstSegment = appPath.split("/").filter(Boolean)[0];

  const routeKey: RouteKey | string = firstSegment ?? ROUTE_KEY.home;

  return { appPath, routeKey };
};
