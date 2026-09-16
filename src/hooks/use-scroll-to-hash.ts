import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/layout/utils/scrollToSection";

/**
 * Scrolls to the section named by the URL hash after a route change.
 *
 * Cross-page links ("/business-plan#framework") land on a page whose sections
 * may not be in the DOM on the first frame, so the lookup retries briefly
 * before giving up. Without a hash, a route change starts at the top.
 */
export function useScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tryScroll = () => {
      const id = hash.replace("#", "");
      if (document.getElementById(id)) {
        scrollToSection(hash);
        return;
      }
      attempts += 1;
      if (attempts < 20) timer = setTimeout(tryScroll, 50);
    };

    tryScroll();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname, hash]);
}
