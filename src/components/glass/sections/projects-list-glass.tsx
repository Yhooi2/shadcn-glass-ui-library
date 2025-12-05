// ========================================
// PROJECTS LIST GLASS COMPONENT
// List of repository cards with filtering, sorting, and ownership controls
// ========================================

import { forwardRef, useState, useMemo, type CSSProperties } from "react";
import { FolderGit2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "../ui/glass-card";
import { BadgeGlass } from "../ui/badge-glass";
import { RepositoryCardGlass, type RepositoryFlagType } from "../composite/repository-card-glass";
import { SegmentedControlGlass } from "../specialized/segmented-control-glass";
import { SortDropdownGlass, type SortField, type SortOrder } from "../atomic";
import "@/glass-theme.css";

// ========================================
// TYPES
// ========================================

export type OwnershipFilter = 'your' | 'contrib' | 'all';

// Re-export for convenience
export type { SortField, SortOrder } from "../atomic";

export interface Repository {
  readonly name: string;
  readonly languages: string;
  readonly commits: number;
  readonly contribution: number;
  readonly stars?: number;
  readonly flagType?: RepositoryFlagType;
  readonly issues?: readonly string[];
  readonly createdYear?: number;
  /** Ownership type for Your/Contrib filtering */
  readonly ownership?: 'your' | 'contrib';
}

export interface ProjectsListGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of repositories to display */
  readonly repositories: readonly Repository[];
  /** Show only flagged (non-green) repositories */
  readonly showFlaggedOnly?: boolean;
  /** Filter by creation year */
  readonly selectedYear?: number | null;
  /** Callback to clear all filters */
  readonly onClearFilters?: () => void;
  /** Custom title (overrides auto-generated) */
  readonly title?: string;

  // ======== NEW: Ownership Filter ========
  /** Current ownership filter */
  readonly ownershipFilter?: OwnershipFilter;
  /** Callback when ownership filter changes */
  readonly onOwnershipChange?: (filter: OwnershipFilter) => void;

  // ======== NEW: Sorting ========
  /** Current sort field */
  readonly sortBy?: SortField;
  /** Current sort order */
  readonly sortOrder?: SortOrder;
  /** Callback when sort changes */
  readonly onSortChange?: (field: SortField, order: SortOrder) => void;

  // ======== NEW: Controls ========
  /** Show header controls (sort dropdown, ownership filter). Default: true when callbacks provided */
  readonly showControls?: boolean;
}

// ========================================
// OWNERSHIP FILTER OPTIONS
// ========================================

const ownershipOptions = [
  { value: 'your' as const, label: 'Your' },
  { value: 'contrib' as const, label: 'Contrib' },
];

// ========================================
// COMPONENT
// ========================================

export const ProjectsListGlass = forwardRef<HTMLDivElement, ProjectsListGlassProps>(
  (
    {
      repositories,
      showFlaggedOnly = false,
      selectedYear = null,
      onClearFilters,
      title,
      // New props
      ownershipFilter,
      onOwnershipChange,
      sortBy = 'commits',
      sortOrder = 'desc',
      onSortChange,
      showControls,
      className,
      ...props
    },
    ref
  ) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Determine if controls should be shown
    const shouldShowControls = showControls ?? (onOwnershipChange !== undefined || onSortChange !== undefined);

    // Filter repositories
    const filteredRepos = useMemo(() => {
      return repositories.filter((repo) => {
        // Flag filter
        if (showFlaggedOnly && repo.flagType === "green") return false;
        // Year filter
        if (selectedYear && repo.createdYear !== selectedYear) return false;
        // Ownership filter
        if (ownershipFilter && ownershipFilter !== 'all' && repo.ownership !== ownershipFilter) return false;
        return true;
      });
    }, [repositories, showFlaggedOnly, selectedYear, ownershipFilter]);

    // Sort repositories
    const sortedRepos = useMemo(() => {
      if (!onSortChange) return filteredRepos;

      return [...filteredRepos].sort((a, b) => {
        const multiplier = sortOrder === 'asc' ? 1 : -1;
        switch (sortBy) {
          case 'commits':
            return (a.commits - b.commits) * multiplier;
          case 'stars':
            return ((a.stars ?? 0) - (b.stars ?? 0)) * multiplier;
          case 'name':
            return a.name.localeCompare(b.name) * multiplier;
          case 'contribution':
            return (a.contribution - b.contribution) * multiplier;
          default:
            return 0;
        }
      });
    }, [filteredRepos, sortBy, sortOrder, onSortChange]);

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

    // Handle ownership change with type safety
    const handleOwnershipChange = (value: string): void => {
      if (onOwnershipChange && (value === 'your' || value === 'contrib')) {
        onOwnershipChange(value);
      }
    };

    return (
      <GlassCard
        ref={ref}
        intensity="medium"
        className={cn("p-3 sm:p-4", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          {/* Left: Title + Badge */}
          <div className="flex items-center gap-2">
            {showFlaggedOnly ? (
              <AlertTriangle className="w-4 h-4" style={{ color: "var(--status-yellow)" }} />
            ) : (
              <FolderGit2 className="w-4 h-4" style={{ color: "var(--text-accent)" }} />
            )}
            <h3
              className="font-semibold text-sm sm:text-base"
              style={{ color: "var(--text-primary)" }}
            >
              {displayTitle}
            </h3>
            <BadgeGlass variant="info">{sortedRepos.length} repos</BadgeGlass>
          </div>

          {/* Right: Controls */}
          {shouldShowControls && (
            <div className="flex items-center gap-2 flex-wrap">
              {onSortChange && (
                <SortDropdownGlass
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={onSortChange}
                />
              )}
              {onOwnershipChange && ownershipFilter && (
                <SegmentedControlGlass
                  options={ownershipOptions}
                  value={ownershipFilter}
                  onChange={handleOwnershipChange}
                />
              )}
            </div>
          )}
        </div>

        {/* Content */}
        {sortedRepos.length === 0 ? (
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
            {sortedRepos.map((repo, index) => (
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
