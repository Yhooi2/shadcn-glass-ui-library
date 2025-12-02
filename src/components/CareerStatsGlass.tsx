// ========================================
// CAREER STATS GLASS COMPONENT
// Career statistics with expandable year cards
// ========================================

import { forwardRef, useState } from "react";
import { TrendingUp, Code, GitPullRequest, FolderGit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { YearCardGlass } from "./YearCardGlass";
import "@/glass-theme.css";

export interface YearData {
  readonly year: string | number;
  readonly emoji: string;
  readonly label: string;
  readonly commits: string;
  readonly progress: number;
}

export interface CareerStatsGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly totalCommits?: number;
  readonly totalPRs?: number;
  readonly totalRepos?: number;
  readonly years?: readonly YearData[];
}

export const CareerStatsGlass = forwardRef<HTMLDivElement, CareerStatsGlassProps>(
  (
    {
      totalCommits = 2242,
      totalPRs = 47,
      totalRepos = 11,
      years = [],
      className,
      ...props
    },
    ref
  ) => {
    const [expandedYear, setExpandedYear] = useState<string | number | null>(null);

    const handleYearClick = (year: string | number): void => {
      setExpandedYear(expandedYear === year ? null : year);
    };

    return (
      <GlassCard
        ref={ref}
        className={cn("p-4", className)}
        intensity="medium"
        hover={false}
        {...props}
      >
        <h3
          className="font-semibold flex items-center gap-2 mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          <TrendingUp className="w-5 h-5" style={{ color: "var(--text-accent)" }} />
          Career Stats
        </h3>
        <p
          className="text-sm mb-4 flex items-center gap-2 flex-wrap"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="flex items-center gap-1">
            <Code className="w-4 h-4" />
            {totalCommits.toLocaleString()} commits
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <GitPullRequest className="w-4 h-4" />
            {totalPRs} PRs
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <FolderGit2 className="w-4 h-4" />
            {totalRepos} repos
          </span>
        </p>
        <div className="space-y-2">
          {years.map((y) => (
            <YearCardGlass
              key={y.year}
              year={y.year}
              emoji={y.emoji}
              label={y.label}
              commits={y.commits}
              progress={y.progress}
              isExpanded={expandedYear === y.year}
              onClick={() => handleYearClick(y.year)}
            />
          ))}
        </div>
      </GlassCard>
    );
  }
);

CareerStatsGlass.displayName = "CareerStatsGlass";
