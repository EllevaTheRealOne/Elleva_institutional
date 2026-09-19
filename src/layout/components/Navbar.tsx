import ellevaLogoCyanWhite from "@/assets/brand/brand_cyan_white.svg";
import ellevaLogoCyanBlack from "@/assets/brand/brand_cyan_black.svg";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { navLinks } from "../constants/nav-links";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { animateVar } from "@/components/animate/variants";
import { scrollToSection } from "../utils/scrollToSection";
import { useRouteTranslation } from "@/hooks/use-route-translation";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { useI18n } from "@/i18n/useI18n";
import { localizePath } from "@/i18n/localizePath";
import { PATH_PAGE, ROUTE_KEY } from "@/constants/routes/routes.constants";
import NavDropdown from "./NavDropdown";
import MobileNavAccordion from "./MobileNavAccordion";
import { useTheme } from "@/context/theme";

const Navbar = () => {
  const { language } = useI18n();
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { routeKey, appPath } = useRouteTranslation();
  const navList = navLinks[routeKey] || navLinks[ROUTE_KEY.home];
  const location = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const ellevaLogo =
    resolvedTheme === "dark" ? ellevaLogoCyanWhite : ellevaLogoCyanBlack;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 140;

      // Flatten all link targets (direct and sub-items) to detect the active one
      const checkHref = (href?: string) => {
        if (!href) return;
        if (!href.startsWith("#")) {
          // A route link is active while the visitor is on that route.
          const [path] = href.split("#");
          if (path && path === appPath) setActive(href);
          return;
        }

        const id = href.replace("#", "");
        const section = document.getElementById(id);
        if (!section) return;

        // Measured from the document, not from the offset parent: the home
        // sections sit inside positioned backdrop wrappers, so their
        // offsetTop is 0 and every section would claim the scroll position.
        const offsetTop = section.getBoundingClientRect().top + window.scrollY;
        const height = section.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + height
        ) {
          setActive(href);
        }
      };

      navList.forEach((item) => {
        if (item.href) {
          checkHref(item.href);
        }
        if (item.items && item.items.length > 0) {
          item.items.forEach((sub) => {
            checkHref(sub.href);
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navList, appPath, location.pathname]);

  // Close mobile drawer whenever route changes (pathname, search, hash)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  /**
   * A "#hash" scrolls within the page. A "/path" or "/path#hash" is a route:
   * it is prefixed with the current language and handed to the router, and
   * the layout scrolls to the hash once the page is in.
   */
  const handleSelectLink = useCallback(
    (href: string) => {
      setOpen(false);

      if (href.startsWith("#")) {
        setTimeout(() => scrollToSection(href), 50);
        return;
      }

      if (href.startsWith("/")) {
        const target = localizePath(href, language);
        const current = `${location.pathname}${location.hash}`;
        if (target === current) {
          const hash = href.includes("#") ? `#${href.split("#")[1]}` : "";
          if (hash) scrollToSection(hash);
          else window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        navigate(target);
        return;
      }

      window.location.href = href;
    },
    [language, location.pathname, location.hash, navigate],
  );

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9990] bg-black/40 backdrop-blur-xs lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-4 md:top-6 left-0 right-0 z-[9999] flex flex-col items-center px-4 md:px-8">
        <div
          className={cn(
            "w-full max-w-7xl transition-all duration-300 rounded-2xl border",
            scrolled
              ? "bg-background/90 backdrop-blur-xl border-border shadow-2xl shadow-black/5 dark:shadow-black/70"
              : "bg-card/90 backdrop-blur-md border-border/80",
            open && "rounded-b-none border-b-0",
          )}
        >
          <div className="flex h-16 md:h-18 items-center justify-between px-5 md:px-8">
            {/* Official Logo */}
            <div className="flex items-center gap-4">
              <a
                href={localizePath(PATH_PAGE.home, language)}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectLink(
                    routeKey === ROUTE_KEY.home ? "#hero" : PATH_PAGE.home,
                  );
                }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <img
                  src={ellevaLogo}
                  alt="ELLEVA"
                  className="h-14 sm:h-16 w-auto object-contain transition-opacity group-hover:opacity-90 dark:brightness-100"
                />
              </a>
            </div>

            {/* Desktop Navigation Links with Hover and Click Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navList.map((item) => (
                <NavDropdown
                  key={item.label}
                  item={item}
                  activeHref={active}
                  onSelect={handleSelectLink}
                />
              ))}
            </nav>

            {/* Actions: Theme Switcher + Lang Switcher */}
            <div className="hidden lg:flex items-center gap-2.5">
              <ThemeToggle />
              <LanguageSwitcher onCloseDrawer={setOpen} />
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                className="p-2 text-foreground hover:text-primary transition-colors rounded-lg bg-secondary border border-border cursor-pointer"
                onClick={() => setOpen(!open)}
                aria-label="Toggle navigation menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              variants={animateVar.drawer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="lg:hidden w-full max-w-7xl rounded-b-2xl border border-t-0 border-border bg-background/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-5 flex flex-col gap-2 max-h-[75vh] overflow-y-auto">
                {navList.map((item) => (
                  <MobileNavAccordion
                    key={item.label}
                    item={item}
                    activeHref={active}
                    onSelect={handleSelectLink}
                  />
                ))}

                <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
                  <ThemeToggle variant="mobile" onCloseDrawer={setOpen} />
                  <LanguageSwitcher onCloseDrawer={setOpen} variant="mobile" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
