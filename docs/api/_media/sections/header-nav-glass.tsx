// ========================================
// HEADER NAV GLASS COMPONENT
// Navigation header with search and theme toggle
// ========================================

import { forwardRef, type CSSProperties } from "react";
import { Github, Sun, Moon, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type ThemeName } from "@/lib/theme-context";
import { ButtonGlass } from "../ui/button-glass";
import { SearchBoxGlass } from "../atomic/search-box-glass";
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

    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    const NextIcon = themeConfig[nextTheme].icon;

    const headerStyles: CSSProperties = {
      background: "var(--header-bg)",
      borderColor: "var(--header-border)",
      backdropFilter: "blur(var(--blur-md))",
      WebkitBackdropFilter: "blur(var(--blur-md))",
    };

    const iconBtnStyles: CSSProperties = {
      background: "linear-gradient(135deg, var(--icon-btn-from), var(--icon-btn-to))",
      boxShadow: "var(--icon-btn-shadow)",
    };

    const themeBtnStyles: CSSProperties = {
      background: "var(--card-subtle-bg)",
      border: "1px solid var(--card-subtle-border)",
    };

    return (
      <header
        ref={ref}
        className={cn("border rounded-xl py-2 px-3 md:py-3 md:px-4 transition-all duration-300", className)}
        style={headerStyles}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={iconBtnStyles}
              type="button"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" style={{ color: "var(--icon-btn-text)" }} />
            </button>
            <span className="font-semibold text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
              User Analytics
            </span>
            <SearchBoxGlass
              className="ml-2 md:ml-4"
              defaultValue={username}
              onSubmit={onSearch}
              inputWidth="w-28 sm:w-36 md:w-48"
              placeholder="Search username..."
            />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={onThemeToggle ?? cycleTheme}
              className="p-2 md:p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
              style={themeBtnStyles}
              type="button"
              aria-label={`Switch to ${themeConfig[nextTheme].label} theme`}
            >
              <NextIcon className="w-4 h-4 md:w-5 md:h-5" style={{ color: "var(--text-secondary)" }} />
            </button>
            <ButtonGlass variant="secondary" icon={Github} className="hidden md:inline-flex">
              Sign in with GitHub
            </ButtonGlass>
          </div>
        </div>
      </header>
    );
  }
);

HeaderNavGlass.displayName = "HeaderNavGlass";
