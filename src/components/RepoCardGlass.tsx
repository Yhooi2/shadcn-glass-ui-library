// ========================================
// REPO CARD GLASS COMPONENT
// Repository card with expandable details
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import {
  ChevronUp,
  ChevronDown,
  Star,
  AlertTriangle,
  Github,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import { themeStyles } from "@/lib/themeStyles";
import { StatusIndicatorGlass, type StatusType } from "./StatusIndicatorGlass";
import { ButtonGlass } from "./ButtonGlass";
import "@/glass-theme.css";

export type RepoStatus = "good" | "warning" | "danger";

export interface RepoLanguage {
  readonly name: string;
  readonly percent: number;
  readonly color?: string;
}

export interface RepoCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name: string;
  readonly status?: RepoStatus;
  readonly stars?: number;
  readonly commits: string;
  readonly contribution: number;
  readonly languages?: readonly RepoLanguage[];
  readonly issues?: readonly string[];
  readonly expanded?: boolean;
  readonly onToggle?: () => void;
  readonly onGitHubClick?: () => void;
  readonly onAIAnalysisClick?: () => void;
}

const langColors: Record<string, string> = {
  JS: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-emerald-500",
  CSS: "bg-purple-500",
  HTML: "bg-orange-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
};

export const RepoCardGlass = forwardRef<HTMLDivElement, RepoCardGlassProps>(
  (
    {
      name,
      status = "good",
      stars = 0,
      commits,
      contribution,
      languages = [],
      issues = [],
      expanded = false,
      onToggle,
      onGitHubClick,
      onAIAnalysisClick,
      className,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];
    const isGlass = theme === "glass";
    const [isHovered, setIsHovered] = useState(false);

    const statusType: StatusType =
      status === "good" ? "green" : status === "warning" ? "yellow" : "red";

    const cardStyles: CSSProperties = {
      background: expanded || isHovered ? t.cardHoverBg : t.cardBg,
      borderColor: t.cardBorder,
      boxShadow: isHovered && isGlass ? "0 8px 32px rgba(168,85,247,0.15)" : "none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border transition-all duration-300 overflow-hidden",
          className
        )}
        style={cardStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          className="p-3 cursor-pointer"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle?.();
            }
          }}
          aria-expanded={expanded}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium" style={{ color: t.textPrimary }}>
                {name}
              </span>
              <StatusIndicatorGlass type={statusType} size="large" />
              {stars > 0 && (
                <span
                  className="text-xs flex items-center gap-0.5"
                  style={{ color: t.textMuted }}
                >
                  <Star className="w-3 h-3 fill-current" />
                  {stars}
                </span>
              )}
            </div>
            <span
              className="text-sm flex items-center gap-1"
              style={{ color: t.textSecondary }}
            >
              {commits} commits
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </span>
          </div>
          <div
            className="flex items-center gap-2 mt-1.5 text-xs"
            style={{ color: t.textSecondary }}
          >
            {languages.map((l, i) => (
              <span key={`lang-${i}`} className="flex items-center gap-1">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    l.color ?? langColors[l.name] ?? "bg-slate-400"
                  )}
                />
                {l.name} {l.percent}%
              </span>
            ))}
            <span>·</span>
            <span>{contribution}% contribution</span>
          </div>
        </div>
        {expanded && (
          <div
            className="px-3 pb-3 pt-2 space-y-3"
            style={{ borderTop: `1px solid ${t.cardBorder}` }}
          >
            {issues.length > 0 && (
              <div
                className="p-2 rounded-lg border"
                style={{
                  background: t.alertDangerBg,
                  borderColor: t.alertDangerBorder,
                }}
              >
                <p
                  className="text-xs font-medium mb-1 flex items-center gap-1"
                  style={{ color: t.alertDangerText }}
                >
                  <AlertTriangle className="w-3 h-3" /> Issues detected
                </p>
                {issues.map((issue, i) => (
                  <p
                    key={`issue-${i}`}
                    className="text-xs"
                    style={{ color: `${t.alertDangerText}cc` }}
                  >
                    • {issue}
                  </p>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="p-2 rounded-lg border"
                style={{ background: t.expandedBg, borderColor: t.cardBorder }}
              >
                <p className="text-xs" style={{ color: t.textMuted }}>
                  Your Contribution
                </p>
                <p className="font-medium" style={{ color: t.textPrimary }}>
                  {commits} commits
                </p>
                <p className="text-xs" style={{ color: t.textSecondary }}>
                  {contribution}% of project
                </p>
              </div>
              <div
                className="p-2 rounded-lg border"
                style={{ background: t.expandedBg, borderColor: t.cardBorder }}
              >
                <p className="text-xs" style={{ color: t.textMuted }}>
                  Full Project
                </p>
                <p className="font-medium" style={{ color: t.textPrimary }}>
                  {commits} commits
                </p>
                <p className="text-xs" style={{ color: t.textSecondary }}>
                  1 contributor
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <ButtonGlass
                variant="secondary"
                size="sm"
                icon={Github}
                className="flex-1"
                onClick={onGitHubClick}
              >
                GitHub
              </ButtonGlass>
              <ButtonGlass
                variant="primary"
                size="sm"
                icon={Sparkles}
                className="flex-1"
                onClick={onAIAnalysisClick}
              >
                AI Analysis
              </ButtonGlass>
            </div>
          </div>
        )}
      </div>
    );
  }
);

RepoCardGlass.displayName = "RepoCardGlass";
