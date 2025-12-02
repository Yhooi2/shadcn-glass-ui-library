// ========================================
// REPOSITORY CARD GLASS COMPONENT
// Expandable repository card with metrics
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import {
  ChevronDown,
  ChevronUp,
  Star,
  ExternalLink,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusIndicatorGlass } from "./StatusIndicatorGlass";
import { ButtonGlass } from "./ButtonGlass";
import "@/glass-theme.css";

export type RepositoryFlagType = "green" | "yellow" | "red";

export interface RepositoryCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name: string;
  readonly languages: string;
  readonly commits: number;
  readonly contribution: number;
  readonly stars?: number;
  readonly flagType?: RepositoryFlagType;
  readonly issues?: readonly string[];
  readonly expanded?: boolean;
  readonly onToggle?: () => void;
  readonly onGitHubClick?: () => void;
  readonly onAIAnalysisClick?: () => void;
}

export const RepositoryCardGlass = forwardRef<HTMLDivElement, RepositoryCardGlassProps>(
  (
    {
      name,
      languages,
      commits,
      contribution,
      stars = 0,
      flagType = "green",
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
    const [isHovered, setIsHovered] = useState(false);

    // Calculate total project commits from contribution percentage
    const totalProjectCommits = contribution > 0
      ? Math.round(commits / (contribution / 100))
      : commits;
    const estimatedLines = Math.round(commits * 12);

    const cardStyles: CSSProperties = {
      background: isHovered ? "var(--card-hover-bg)" : "var(--card-bg)",
      borderColor: "var(--card-border)",
    };

    const expandedStyles: CSSProperties = {
      background: "var(--expanded-bg)",
      borderColor: "var(--card-border)",
    };

    const metricCardStyles: CSSProperties = {
      background: "var(--card-bg)",
      borderColor: "var(--card-border)",
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
        {/* Main Card Content */}
        <div
          className="p-3.5 cursor-pointer"
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
            <div className="flex items-center gap-2.5">
              <span
                className="font-medium text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {name}
              </span>
              <StatusIndicatorGlass type={flagType} />
            </div>
            <div className="flex items-center gap-2">
              {stars > 0 && (
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--status-yellow)" }}
                >
                  <Star className="w-3 h-3" />
                  {stars}
                </span>
              )}
              {expanded ? (
                <ChevronUp className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              ) : (
                <ChevronDown className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              )}
            </div>
          </div>
          <div
            className="text-xs mt-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            {languages}
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "var(--text-secondary)" }}
          >
            {commits} commits · {contribution}%
          </div>
        </div>

        {/* Expanded Section */}
        {expanded && (
          <div
            className="border-t p-3.5 space-y-3"
            style={expandedStyles}
          >
            {/* Issues Alert */}
            {issues.length > 0 && (
              <div
                className="p-3 rounded-xl border"
                style={{
                  background: "var(--alert-danger-bg)",
                  borderColor: "var(--alert-danger-border)",
                }}
              >
                <div
                  className="text-xs font-semibold flex items-center gap-1.5 mb-1.5"
                  style={{ color: "var(--alert-danger-text)" }}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Issues
                </div>
                {issues.map((issue, index) => (
                  <div
                    key={index}
                    className="text-xs opacity-70"
                    style={{ color: "var(--alert-danger-text)" }}
                  >
                    • {issue}
                  </div>
                ))}
              </div>
            )}

            {/* Contribution Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className="p-2.5 rounded-lg border"
                style={metricCardStyles}
              >
                <div
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your Contribution
                </div>
                <div
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {commits} commits
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {contribution}%
                </div>
              </div>
              <div
                className="p-2.5 rounded-lg border"
                style={metricCardStyles}
              >
                <div
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Full Project
                </div>
                <div
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {totalProjectCommits} commits
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  ~{estimatedLines} lines
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <ButtonGlass
                variant="secondary"
                size="sm"
                icon={ExternalLink}
                onClick={(e) => {
                  e.stopPropagation();
                  onGitHubClick?.();
                }}
                className="flex-1"
              >
                GitHub
              </ButtonGlass>
              <ButtonGlass
                variant="primary"
                size="sm"
                icon={Sparkles}
                onClick={(e) => {
                  e.stopPropagation();
                  onAIAnalysisClick?.();
                }}
                className="flex-1"
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

RepositoryCardGlass.displayName = "RepositoryCardGlass";
