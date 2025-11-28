// ========================================
// HEADER NAV GLASS COMPONENT
// Navigation header with search and theme toggle
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { Github, Search, Sun, Moon, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type ThemeName } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { ButtonGlass } from "./ButtonGlass";
import "@/glass-theme.css";

const themes: ThemeName[] = ["light", "aurora", "glass"];

const themeConfig: Record<ThemeName, { label: string; icon: typeof Sun }> = {
  light: { label: "Light", icon: Sun },
  aurora: { label: "Aurora", icon: Moon },
  glass: { label: "Glass", icon: Palette },
};

export interface HeaderNavGlassProps extends React.HTMLAttributes<HTMLElement> {
  readonly username?: string;
  readonly onSearch?: (value: string) => void;
  readonly onThemeToggle?: () => void;
}

export const HeaderNavGlass = forwardRef<HTMLElement, HeaderNavGlassProps>(
  ({ username = "Yhooi2", onSearch, onThemeToggle, className, ...props }, ref) => {
    const { theme, cycleTheme } = useTheme();
    const t = themeStyles[theme];
    const [searchValue, setSearchValue] = useState(username);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const isGlass = theme === "glass";

    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    const NextIcon = themeConfig[nextTheme].icon;

    const headerStyles: CSSProperties = {
      background: t.headerBg,
      borderColor: t.headerBorder,
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
    };

    const iconBtnStyles: CSSProperties = {
      background: `linear-gradient(135deg, ${t.iconBtnFrom}, ${t.iconBtnTo})`,
      boxShadow: t.iconBtnShadow,
    };

    const searchBoxStyles: CSSProperties = {
      boxShadow: isSearchFocused && isGlass ? "0 0 20px rgba(168,85,247,0.25)" : "none",
    };

    const inputStyles: CSSProperties = {
      background: t.searchBg,
      color: t.textPrimary,
      border: `1px solid ${t.searchBorder}`,
      borderRight: "none",
      borderTopLeftRadius: "0.75rem",
      borderBottomLeftRadius: "0.75rem",
    };

    const searchBtnStyles: CSSProperties = {
      background: t.searchBtnBg,
      color: t.searchBtnText,
      borderTopRightRadius: "0.75rem",
      borderBottomRightRadius: "0.75rem",
    };

    const themeBtnStyles: CSSProperties = {
      background: t.glassSubtleBg,
      border: `1px solid ${t.glassSubtleBorder}`,
    };

    const handleSearch = (): void => {
      onSearch?.(searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <header
        ref={ref}
        className={cn("border rounded-xl py-3 px-4 transition-all duration-300", className)}
        style={headerStyles}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={iconBtnStyles}
              type="button"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" style={{ color: t.iconBtnText }} />
            </button>
            <span className="font-semibold text-lg" style={{ color: t.textPrimary }}>
              User Analytics
            </span>
            <div
              className="ml-4 flex rounded-xl overflow-hidden"
              style={searchBoxStyles}
            >
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-4 py-2 w-48 text-sm outline-none"
                style={inputStyles}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Search username..."
                aria-label="Search username"
              />
              <button
                onClick={handleSearch}
                className="px-5 py-2 text-sm font-medium flex items-center gap-2 hover:scale-[1.02] transition-transform"
                style={searchBtnStyles}
                type="button"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onThemeToggle ?? cycleTheme}
              className="p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
              style={themeBtnStyles}
              type="button"
              aria-label={`Switch to ${themeConfig[nextTheme].label} theme`}
            >
              <NextIcon className="w-5 h-5" style={{ color: t.textSecondary }} />
            </button>
            <ButtonGlass variant="secondary" icon={Github}>
              Sign in with GitHub
            </ButtonGlass>
          </div>
        </div>
      </header>
    );
  }
);

HeaderNavGlass.displayName = "HeaderNavGlass";
