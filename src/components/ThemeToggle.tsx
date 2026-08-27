import React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/context/theme";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThemeToggleProps {
  variant?: "desktop" | "mobile" | "compact";
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "desktop",
  className,
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const { t } = useTranslation("common");

  if (variant === "mobile") {
    return (
      <div
        className={cn(
          "flex items-center justify-between p-2 rounded-xl bg-secondary/80 border border-border text-foreground",
          className,
        )}
      >
        <div className="flex items-center gap-2.5 px-1">
          {resolvedTheme === "dark" ? (
            <Moon className="w-4 h-4 text-primary" />
          ) : (
            <Sun className="w-4 h-4 text-primary" />
          )}
          <span className="text-xs font-medium tracking-wide">
            {t("theme.label")}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-background/80 p-1 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setTheme("light")}
            aria-label={t("theme.light") || "Light mode"}
            className={cn(
              "p-1.5 rounded-md text-xs transition-all flex items-center gap-1",
              theme === "light"
                ? "bg-primary text-primary-foreground font-medium shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="text-[11px]">
              {t("theme.light") || "Light"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            aria-label={t("theme.dark") || "Dark mode"}
            className={cn(
              "p-1.5 rounded-md text-xs transition-all flex items-center gap-1",
              theme === "dark"
                ? "bg-primary text-primary-foreground font-medium shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="text-[11px]">
              {t("theme.dark") || "Dark"}
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t("theme.toggle") || "Toggle theme"}
        title={t("theme.toggle") || "Toggle theme"}
        className={cn(
          "relative p-2 rounded-lg bg-card/80 hover:bg-secondary border border-border text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40",
          className,
        )}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4 text-primary transition-transform duration-200 hover:rotate-12" />
        ) : (
          <Sun className="w-4 h-4 text-primary transition-transform duration-200 hover:rotate-45" />
        )}
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("theme.toggle") || "Toggle theme"}
          className={cn(
            "relative p-2 rounded-lg bg-card/80 hover:bg-secondary border border-border text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 flex items-center justify-center group",
            className,
          )}
        >
          {resolvedTheme === "dark" ? (
            <Moon className="w-4 h-4 text-foreground/80 group-hover:text-primary transition-colors" />
          ) : (
            <Sun className="w-4 h-4 text-foreground/80 group-hover:text-primary transition-colors" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36 bg-popover/95 backdrop-blur-xl border border-border text-popover-foreground shadow-xl rounded-xl p-1 z-[9999]"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer transition-colors",
            theme === "light"
              ? "bg-primary/15 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
          )}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>{t("theme.light") || "Light"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer transition-colors",
            theme === "dark"
              ? "bg-primary/15 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
          )}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>{t("theme.dark") || "Dark"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-2.5 px-2.5 py-1.5 text-xs rounded-lg cursor-pointer transition-colors",
            theme === "system"
              ? "bg-primary/15 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
          )}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>{t("theme.system") || "System"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
