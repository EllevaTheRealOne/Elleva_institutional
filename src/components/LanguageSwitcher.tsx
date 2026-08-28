import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { allLangs, type IAllLangs } from "@/i18n/langs";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useChangeLanguage } from "@/hooks/use-change-language";
import { useTranslation } from "react-i18next";

interface Props {
  onCloseDrawer?: ((open: boolean) => void) | Dispatch<SetStateAction<boolean>>;
  variant?: "desktop" | "mobile" | "compact";
}

interface FlagProps {
  icon: string;
  size?: "sm" | "md";
}

const LanguageFlag = ({ icon, size = "md" }: FlagProps) => {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        size === "sm" ? "size-4" : "size-5",
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          `fi fi-${icon}`,
          "block size-full! bg-cover! bg-center! bg-no-repeat!",
        )}
      />
    </span>
  );
};

export const LanguageSwitcher = ({
  onCloseDrawer,
  variant = "desktop",
}: Props) => {
  const { currentLanguage, currentConfig, changeLanguage } =
    useChangeLanguage();

  const { t } = useTranslation("nav");

  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (variant === "mobile") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (variant === "mobile") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 160);
  };

  const handleSelect = async (lang: IAllLangs) => {
    setOpen(false);
    onCloseDrawer?.(false);
    await changeLanguage(lang.value);
  };

  if (variant === "mobile") {
    return (
      <div className="w-full overflow-hidden rounded-xl border border-border/40 bg-secondary/20">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={t("languageSelector")}
          className={cn(
            "flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm font-medium tracking-wide transition-colors",
            open
              ? "font-semibold text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <LanguageFlag icon={currentConfig.icon} />

            <span>{t("languageSelectorPopover")}</span>

            <span className="truncate rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-primary">
              {currentConfig.nativeLabel || currentConfig.label}
            </span>
          </div>

          <ChevronDown
            className={cn(
              "size-4 shrink-0 opacity-70 transition-transform duration-200",
              open && "rotate-180 text-primary opacity-100",
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 border-t border-border/40 px-2 pt-0.5 pb-2.5">
                {allLangs.map((lang) => {
                  const isSelected = currentLanguage === lang.value;

                  return (
                    <button
                      key={lang.value}
                      type="button"
                      onClick={() => handleSelect(lang)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium tracking-wide transition-colors",
                        isSelected
                          ? "border border-border bg-secondary font-semibold text-primary"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <LanguageFlag icon={lang.icon} />

                        <div>
                          <span className="block font-medium">
                            {lang.nativeLabel || lang.label}
                          </span>

                          <span className="block text-[10px] text-muted-foreground">
                            {lang.label}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="size-4 shrink-0 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("languageSelector")}
        className={cn(
          "relative flex cursor-pointer select-none items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium tracking-wide transition-all",
          open
            ? "border-border bg-secondary text-foreground shadow-xs"
            : "border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
        )}
      >
        <LanguageFlag icon={currentConfig.icon} />

        <span className="uppercase tracking-wider">
          {currentConfig.shortLabel || currentConfig.value.toUpperCase()}
        </span>

        <ChevronDown
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-200",
            open && "rotate-180 text-primary opacity-100",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{
              opacity: 0,
              y: 6,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 4,
              scale: 0.98,
            }}
            transition={{
              duration: 0.16,
              ease: "easeOut",
            }}
            className="absolute top-full right-0 z-50 mt-2 flex min-w-[220px] flex-col gap-0.5 rounded-xl border border-border bg-card/95 p-1.5 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/70"
          >
            <div className="mb-1 border-b border-border/40 px-2.5 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              {t("languageSelectorPopover")}
            </div>

            <div className="max-h-72 space-y-0.5 overflow-y-auto">
              {allLangs.map((lang) => {
                const isSelected = currentLanguage === lang.value;

                return (
                  <button
                    key={lang.value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isSelected}
                    onClick={() => handleSelect(lang)}
                    className={cn(
                      "group flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-all duration-150",
                      isSelected
                        ? "bg-secondary font-semibold text-primary"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <LanguageFlag icon={lang.icon} />

                      <div>
                        <span className="block font-medium">
                          {lang.nativeLabel || lang.label}
                        </span>

                        <span className="block text-[10px] text-muted-foreground">
                          {lang.label}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="size-3.5 shrink-0 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
