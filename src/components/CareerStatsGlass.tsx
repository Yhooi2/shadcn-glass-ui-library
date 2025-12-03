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
  readonly prs?: number;
  readonly repos?: number;
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
        className={cn("p-4 md:p-5 lg:p-6", className)}
        intensity="medium"
        hover={false}
        {...props}
      >
        <h3
          className="font-semibold flex items-center gap-2 md:gap-2.5 lg:gap-3 mb-1 text-base md:text-lg lg:text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" style={{ color: "var(--text-accent)" }} />
          Career Stats
        </h3>
        <p
          className="text-xs md:text-sm lg:text-base mb-3 md:mb-4 flex items-center gap-2 md:gap-2.5 lg:gap-3 flex-wrap"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="flex items-center gap-1 md:gap-1.5">
            <Code className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            {totalCommits.toLocaleString()} commits
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <GitPullRequest className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            {totalPRs} PRs
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 md:gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            {totalRepos} repos
          </span>
        </p>
        <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
          {years.map((y) => (
            <YearCardGlass
              key={y.year}
              year={y.year}
              emoji={y.emoji}
              label={y.label}
              commits={y.commits}
              progress={y.progress}
              prs={y.prs}
              repos={y.repos}
              isExpanded={expandedYear === y.year}
              onClick={() => handleYearClick(y.year)}
              onShowYear={() => {
                // This can be used to filter repos by year
                console.log(`Filter repos for year ${y.year}`);
              }}
            />
          ))}
        </div>
      </GlassCard>
    );
  }
);

CareerStatsGlass.displayName = "CareerStatsGlass";
