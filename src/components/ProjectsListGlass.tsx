// ========================================
// PROJECTS LIST GLASS COMPONENT
// List of repository cards with filtering
// ========================================

import { forwardRef, useState, type CSSProperties } from "react";
import { FolderGit2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { BadgeGlass } from "./BadgeGlass";
import { RepositoryCardGlass, type RepositoryFlagType } from "./RepositoryCardGlass";
import "@/glass-theme.css";

export interface Repository {
  readonly name: string;
  readonly languages: string;
  readonly commits: number;
  readonly contribution: number;
  readonly stars?: number;
  readonly flagType?: RepositoryFlagType;
  readonly issues?: readonly string[];
  readonly createdYear?: number;
}

export interface ProjectsListGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly repositories: readonly Repository[];
  readonly showFlaggedOnly?: boolean;
  readonly selectedYear?: number | null;
  readonly onClearFilters?: () => void;
  readonly title?: string;
}

export const ProjectsListGlass = forwardRef<HTMLDivElement, ProjectsListGlassProps>(
  (
    {
      repositories,
      showFlaggedOnly = false,
      selectedYear = null,
      onClearFilters,
      title,
      className,
      ...props
    },
    ref
  ) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Filter repositories
    const filteredRepos = repositories.filter((repo) => {
      if (showFlaggedOnly && repo.flagType === "green") return false;
      if (selectedYear && repo.createdYear !== selectedYear) return false;
      return true;
    });

    // Generate title based on filters
    const displayTitle = title ?? (
      showFlaggedOnly
        ? "Flagged"
        : selectedYear
          ? `${selectedYear}`
          : "All"
    ) + " Projects";

    const emptyContainerStyles: CSSProperties = {
      background: "var(--card-bg)",
    };

    return (
      <GlassCard
        ref={ref}
        intensity="medium"
        className={cn("p-4", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {showFlaggedOnly ? (
              <AlertTriangle className="w-4 h-4" style={{ color: "var(--status-yellow)" }} />
            ) : (
              <FolderGit2 className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
            )}
            <h3
              className="font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {displayTitle}
            </h3>
            <BadgeGlass variant="violet">{filteredRepos.length}</BadgeGlass>
          </div>
        </div>

        {/* Content */}
        {filteredRepos.length === 0 ? (
          // Empty State
          <div className="text-center py-10">
            <div
              className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center"
              style={emptyContainerStyles}
            >
              <FolderGit2 className="w-8 h-8" style={{ color: "var(--text-muted)" }} />
            </div>
            <p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No repositories found
            </p>
            {onClearFilters && (
              <button
                onClick={onClearFilters}
                className="mt-2 text-sm underline transition-colors hover:opacity-80"
                style={{ color: "var(--text-accent)" }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          // Repository List
          <div className="space-y-2">
            {filteredRepos.map((repo, index) => (
              <RepositoryCardGlass
                key={repo.name}
                name={repo.name}
                languages={repo.languages}
                commits={repo.commits}
                contribution={repo.contribution}
                stars={repo.stars}
                flagType={repo.flagType}
                issues={repo.issues}
                expanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </div>
        )}
      </GlassCard>
    );
  }
);

ProjectsListGlass.displayName = "ProjectsListGlass";
