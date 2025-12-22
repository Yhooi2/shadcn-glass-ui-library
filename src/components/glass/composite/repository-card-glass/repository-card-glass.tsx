/* eslint-disable react-refresh/only-export-components */
// ========================================
// REPOSITORY CARD GLASS COMPONENT
// Expandable repository card with compound API
// Issue #15: shadcn/ui compatible compound component
// ========================================

import { forwardRef, type CSSProperties, type ReactNode, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Star,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  GitFork,
  Activity,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusIndicatorGlass } from '../../specialized/status-indicator-glass';
import { ButtonGlass } from '../../ui/button-glass';
import { BadgeGlass } from '../../ui/badge-glass';
import { AvatarGlass, AvatarGlassImage, AvatarGlassFallback } from '../../ui/avatar-glass';
import { ProgressGlass } from '../../specialized/progress-glass';
import {
  HoverCardGlass,
  HoverCardGlassTrigger,
  HoverCardGlassContent,
} from '../../ui/hover-card-glass';
import { InteractiveCard } from '../../primitives';
import {
  RepositoryCardContext,
  useRepositoryCard,
  type RepositoryCardContextValue,
} from './repository-card-context';
import {
  getContributionBadgeVariant,
  getActivityStatus,
  getActivityStatusInfo,
  getRoleBadgeVariant,
  getRoleLabel,
  getHealthStatus,
  getHealthStatusInfo,
  getLanguageColor,
  calculateContributionPercent,
  formatNumberWithSuffix,
  type ContributorRole,
  type TeamMember,
} from './repository-card-utils';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export type RepositoryFlagType = 'green' | 'yellow' | 'red';

/** Props for RepositoryCardGlass.Root */
export interface RepositoryCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the card is expanded */
  expanded?: boolean;
  /** Callback when toggle is triggered */
  onToggle?: () => void;
  children: ReactNode;
}

/** Props for RepositoryCardGlass.Header */
export interface RepositoryCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for RepositoryCardGlass.Name */
export interface RepositoryCardNameProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/** Props for RepositoryCardGlass.Status */
export interface RepositoryCardStatusProps {
  type?: RepositoryFlagType;
  className?: string;
}

/** Props for RepositoryCardGlass.Stars */
export interface RepositoryCardStarsProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number;
}

/** Props for RepositoryCardGlass.Meta */
export interface RepositoryCardMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for RepositoryCardGlass.Languages */
export interface RepositoryCardLanguagesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for RepositoryCardGlass.Stats */
export interface RepositoryCardStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for RepositoryCardGlass.ExpandedContent */
export interface RepositoryCardExpandedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for RepositoryCardGlass.Issues */
export interface RepositoryCardIssuesProps extends React.HTMLAttributes<HTMLDivElement> {
  issues: readonly string[];
}

/** Props for RepositoryCardGlass.Metrics */
export interface RepositoryCardMetricsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Props for RepositoryCardGlass.MetricItem */
export interface RepositoryCardMetricItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  subtitle?: string;
}

/** Props for RepositoryCardGlass.Actions */
export interface RepositoryCardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// ========================================
// NEW SUB-COMPONENT TYPES (Issue #28)
// ========================================

/** Props for RepositoryCardGlass.ContributionBadge */
export interface RepositoryCardContributionBadgeProps {
  /** Contribution percentage (0-100) */
  percent: number;
  /** Optional className */
  className?: string;
}

/** Props for RepositoryCardGlass.ForkBadge */
export interface RepositoryCardForkBadgeProps {
  /** Original repository name (e.g., "facebook/react") */
  forkedFrom?: string;
  /** Optional className */
  className?: string;
}

/** Props for RepositoryCardGlass.Language */
export interface RepositoryCardLanguageProps {
  /** Language name */
  name: string;
  /** Custom color (defaults to GitHub language color) */
  color?: string;
  /** Percentage of codebase */
  percent?: number;
  /** Optional className */
  className?: string;
}

/** Props for RepositoryCardGlass.ActivityStatus */
export interface RepositoryCardActivityStatusProps {
  /** Last activity date (ISO string or Date) */
  lastActivityDate: string | Date;
  /** Optional className */
  className?: string;
}

/** Props for RepositoryCardGlass.RoleBadge */
export interface RepositoryCardRoleBadgeProps {
  /** Contributor role */
  role: ContributorRole;
  /** Optional className */
  className?: string;
}

/** Props for RepositoryCardGlass.TeamAvatars */
export interface RepositoryCardTeamAvatarsProps {
  /** Team members */
  members: TeamMember[];
  /** Total team size (for "+N" indicator) */
  total?: number;
  /** Max avatars to show */
  max?: number;
  /** Optional className */
  className?: string;
}

/** Props for RepositoryCardGlass.HealthStatus */
export interface RepositoryCardHealthStatusProps {
  /** Whether the repo is archived */
  isArchived?: boolean;
  /** Last push date (ISO string or Date) */
  pushedAt: string | Date;
  /** Optional className */
  className?: string;
}

/** Props for RepositoryCardGlass.ContributionProgress */
export interface RepositoryCardContributionProgressProps {
  /** User's commits */
  userCommits: number;
  /** Total project commits */
  totalCommits: number;
  /** PRs merged by user */
  prsMerged?: number;
  /** Code reviews by user */
  reviews?: number;
  /** Optional className */
  className?: string;
}

/** Legacy props for backward compatibility */
export interface RepositoryCardGlassLegacyProps extends React.HTMLAttributes<HTMLDivElement> {
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

// ========================================
// COMPOUND COMPONENTS
// ========================================

/** Root container with context provider */
const RepositoryCardRoot = forwardRef<HTMLDivElement, RepositoryCardRootProps>(
  ({ expanded = false, onToggle, children, className, ...props }, ref) => {
    const contextValue = useMemo<RepositoryCardContextValue>(
      () => ({ expanded, onToggle }),
      [expanded, onToggle]
    );

    return (
      <RepositoryCardContext.Provider value={contextValue}>
        <InteractiveCard
          ref={ref}
          baseBg="var(--card-bg)"
          hoverBg="var(--card-hover-bg)"
          borderColor="var(--card-border)"
          hoverLift={false}
          blur="sm"
          rounded="rounded-xl"
          className={cn('overflow-hidden', className)}
          {...props}
        >
          {children}
        </InteractiveCard>
      </RepositoryCardContext.Provider>
    );
  }
);
RepositoryCardRoot.displayName = 'RepositoryCardGlass.Root';

/** Header section with toggle functionality */
const RepositoryCardHeader = forwardRef<HTMLDivElement, RepositoryCardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded, onToggle } = useRepositoryCard();

    return (
      <div
        ref={ref}
        className={cn('p-3 md:p-3.5 cursor-pointer', className)}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle?.();
          }
        }}
        aria-expanded={expanded}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">{children}</div>
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-(--text-muted)" />
            ) : (
              <ChevronDown className="w-4 h-4 text-(--text-muted)" />
            )}
          </div>
        </div>
      </div>
    );
  }
);
RepositoryCardHeader.displayName = 'RepositoryCardGlass.Header';

/** Repository name */
const RepositoryCardName = forwardRef<HTMLSpanElement, RepositoryCardNameProps>(
  ({ children, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('font-medium text-sm text-(--text-primary)', className)}
      {...props}
    >
      {children}
    </span>
  )
);
RepositoryCardName.displayName = 'RepositoryCardGlass.Name';

/** Status indicator wrapper */
const RepositoryCardStatus = forwardRef<HTMLSpanElement, RepositoryCardStatusProps>(
  ({ type = 'green', className }, ref) => (
    <span ref={ref} className={className}>
      <StatusIndicatorGlass type={type} />
    </span>
  )
);
RepositoryCardStatus.displayName = 'RepositoryCardGlass.Status';

/** Stars count display */
const RepositoryCardStars = forwardRef<HTMLSpanElement, RepositoryCardStarsProps>(
  ({ count, className, ...props }, ref) => {
    if (count <= 0) return null;

    return (
      <span
        ref={ref}
        className={cn('flex items-center gap-1 text-xs text-(--status-away)', className)}
        {...props}
      >
        <Star className="w-3 h-3" />
        {count}
      </span>
    );
  }
);
RepositoryCardStars.displayName = 'RepositoryCardGlass.Stars';

/** Meta information container */
const RepositoryCardMeta = forwardRef<HTMLDivElement, RepositoryCardMetaProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('px-3 pb-3 md:px-3.5 md:pb-3.5 -mt-1', className)} {...props}>
      {children}
    </div>
  )
);
RepositoryCardMeta.displayName = 'RepositoryCardGlass.Meta';

/** Languages display */
const RepositoryCardLanguages = forwardRef<HTMLDivElement, RepositoryCardLanguagesProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('text-xs text-(--text-muted)', className)} {...props}>
      {children}
    </div>
  )
);
RepositoryCardLanguages.displayName = 'RepositoryCardGlass.Languages';

/** Stats line display */
const RepositoryCardStatsLine = forwardRef<HTMLDivElement, RepositoryCardStatsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('text-xs mt-0.5 text-(--text-secondary)', className)} {...props}>
      {children}
    </div>
  )
);
RepositoryCardStatsLine.displayName = 'RepositoryCardGlass.Stats';

/** Expanded content container - only renders when expanded */
const RepositoryCardExpandedContent = forwardRef<
  HTMLDivElement,
  RepositoryCardExpandedContentProps
>(({ children, className, ...props }, ref) => {
  const { expanded } = useRepositoryCard();

  if (!expanded) return null;

  const expandedStyles: CSSProperties = {
    background: 'var(--expanded-bg)',
    borderColor: 'var(--card-border)',
  };

  return (
    <div
      ref={ref}
      className={cn('border-t p-3.5 space-y-3', className)}
      style={expandedStyles}
      {...props}
    >
      {children}
    </div>
  );
});
RepositoryCardExpandedContent.displayName = 'RepositoryCardGlass.ExpandedContent';

/** Issues alert */
const RepositoryCardIssues = forwardRef<HTMLDivElement, RepositoryCardIssuesProps>(
  ({ issues, className, ...props }, ref) => {
    if (issues.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn('p-3 rounded-xl border', className)}
        style={{
          background: 'var(--alert-danger-bg)',
          borderColor: 'var(--alert-danger-border)',
        }}
        {...props}
      >
        <div
          className="text-xs font-semibold flex items-center gap-1.5 mb-1.5"
          style={{ color: 'var(--alert-danger-text)' }}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Issues
        </div>
        {issues.map((issue, index) => (
          <div
            key={index}
            className="text-xs opacity-70"
            style={{ color: 'var(--alert-danger-text)' }}
          >
            • {issue}
          </div>
        ))}
      </div>
    );
  }
);
RepositoryCardIssues.displayName = 'RepositoryCardGlass.Issues';

/** Metrics grid container */
const RepositoryCardMetrics = forwardRef<HTMLDivElement, RepositoryCardMetricsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('grid grid-cols-2 gap-2', className)} {...props}>
      {children}
    </div>
  )
);
RepositoryCardMetrics.displayName = 'RepositoryCardGlass.Metrics';

/** Single metric item */
const RepositoryCardMetricItem = forwardRef<HTMLDivElement, RepositoryCardMetricItemProps>(
  ({ label, value, subtitle, className, ...props }, ref) => {
    const metricCardStyles: CSSProperties = {
      background: 'var(--card-bg)',
      borderColor: 'var(--card-border)',
    };

    return (
      <div
        ref={ref}
        className={cn('p-2.5 rounded-lg border', className)}
        style={metricCardStyles}
        {...props}
      >
        <div className="text-xs text-(--text-muted)">{label}</div>
        <div className="font-semibold text-(--text-primary)">{value}</div>
        {subtitle && <div className="text-xs text-(--text-muted)">{subtitle}</div>}
      </div>
    );
  }
);
RepositoryCardMetricItem.displayName = 'RepositoryCardGlass.MetricItem';

/** Actions container */
const RepositoryCardActions = forwardRef<HTMLDivElement, RepositoryCardActionsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col sm:flex-row gap-2', className)} {...props}>
      {children}
    </div>
  )
);
RepositoryCardActions.displayName = 'RepositoryCardGlass.Actions';

// ========================================
// NEW SUB-COMPONENTS (Issue #28)
// ========================================

/**
 * ContributionBadge - Shows contribution percentage with color-coded variant
 * 0-25%: destructive, 26-50%: warning, 51-75%: default, 76-100%: success
 */
const RepositoryCardContributionBadge = forwardRef<
  HTMLDivElement,
  RepositoryCardContributionBadgeProps
>(({ percent, className }, ref) => {
  const variant = getContributionBadgeVariant(percent);

  return (
    <BadgeGlass ref={ref} variant={variant} size="sm" className={className}>
      {percent}%
    </BadgeGlass>
  );
});
RepositoryCardContributionBadge.displayName = 'RepositoryCardGlass.ContributionBadge';

/**
 * ForkBadge - Indicates the repository is a fork
 */
const RepositoryCardForkBadge = forwardRef<HTMLDivElement, RepositoryCardForkBadgeProps>(
  ({ forkedFrom, className }, ref) => {
    if (forkedFrom) {
      return (
        <HoverCardGlass openDelay={200}>
          <HoverCardGlassTrigger asChild>
            <span className={cn('inline-flex', className)}>
              <BadgeGlass ref={ref} variant="secondary" size="sm">
                <GitFork className="w-3 h-3 mr-1" />
                Fork
              </BadgeGlass>
            </span>
          </HoverCardGlassTrigger>
          <HoverCardGlassContent side="top" className="w-auto">
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Forked from{' '}
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {forkedFrom}
              </span>
            </p>
          </HoverCardGlassContent>
        </HoverCardGlass>
      );
    }

    return (
      <BadgeGlass ref={ref} variant="secondary" size="sm" className={className}>
        <GitFork className="w-3 h-3 mr-1" />
        Fork
      </BadgeGlass>
    );
  }
);
RepositoryCardForkBadge.displayName = 'RepositoryCardGlass.ForkBadge';

/**
 * Language - Single language with color dot and optional percentage
 */
const RepositoryCardLanguage = forwardRef<HTMLSpanElement, RepositoryCardLanguageProps>(
  ({ name, color, percent, className }, ref) => {
    const languageColor = getLanguageColor(name, color);

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-1.5 text-xs', className)}
        style={{ color: 'var(--text-secondary)' }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: languageColor }}
        />
        <span>{name}</span>
        {percent !== undefined && <span style={{ color: 'var(--text-muted)' }}>{percent}%</span>}
      </span>
    );
  }
);
RepositoryCardLanguage.displayName = 'RepositoryCardGlass.Language';

/**
 * ActivityStatus - Shows repository activity status based on last activity date
 */
const RepositoryCardActivityStatus = forwardRef<HTMLDivElement, RepositoryCardActivityStatusProps>(
  ({ lastActivityDate, className }, ref) => {
    const status = getActivityStatus(lastActivityDate);
    const { label, variant } = getActivityStatusInfo(status);

    return (
      <BadgeGlass ref={ref} variant={variant} size="sm" className={className}>
        <Activity className="w-3 h-3 mr-1" />
        {label}
      </BadgeGlass>
    );
  }
);
RepositoryCardActivityStatus.displayName = 'RepositoryCardGlass.ActivityStatus';

/**
 * RoleBadge - Shows contributor role
 */
const RepositoryCardRoleBadge = forwardRef<HTMLDivElement, RepositoryCardRoleBadgeProps>(
  ({ role, className }, ref) => {
    const variant = getRoleBadgeVariant(role);
    const label = getRoleLabel(role);

    return (
      <BadgeGlass ref={ref} variant={variant} size="sm" className={className}>
        {label}
      </BadgeGlass>
    );
  }
);
RepositoryCardRoleBadge.displayName = 'RepositoryCardGlass.RoleBadge';

/**
 * TeamAvatars - Shows team member avatars with HoverCard previews
 */
const RepositoryCardTeamAvatars = forwardRef<HTMLDivElement, RepositoryCardTeamAvatarsProps>(
  ({ members, total, max = 5, className }, ref) => {
    const visibleMembers = members.slice(0, max);
    const remaining = total ? total - max : members.length - max;

    return (
      <div ref={ref} className={cn('flex items-center -space-x-2', className)}>
        {visibleMembers.map((member) => (
          <HoverCardGlass key={member.id} openDelay={200}>
            <HoverCardGlassTrigger asChild>
              <span className="inline-flex">
                <AvatarGlass size="sm" className="border-2 border-(--card-bg) cursor-pointer">
                  {member.avatar ? (
                    <AvatarGlassImage src={member.avatar} alt={member.name} />
                  ) : null}
                  <AvatarGlassFallback>
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarGlassFallback>
                </AvatarGlass>
              </span>
            </HoverCardGlassTrigger>
            <HoverCardGlassContent side="top" className="w-auto">
              <div className="flex items-center gap-2">
                <AvatarGlass size="md">
                  {member.avatar ? (
                    <AvatarGlassImage src={member.avatar} alt={member.name} />
                  ) : null}
                  <AvatarGlassFallback>
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarGlassFallback>
                </AvatarGlass>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </p>
                  {member.role && (
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {getRoleLabel(member.role)}
                    </p>
                  )}
                </div>
              </div>
            </HoverCardGlassContent>
          </HoverCardGlass>
        ))}

        {remaining > 0 && (
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium border-2"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              color: 'var(--text-muted)',
            }}
          >
            +{remaining}
          </span>
        )}
      </div>
    );
  }
);
RepositoryCardTeamAvatars.displayName = 'RepositoryCardGlass.TeamAvatars';

/**
 * HealthStatus - Shows repository health based on last push and archive status
 */
const RepositoryCardHealthStatus = forwardRef<HTMLDivElement, RepositoryCardHealthStatusProps>(
  ({ isArchived = false, pushedAt, className }, ref) => {
    const status = getHealthStatus(pushedAt, isArchived);
    const { label, variant } = getHealthStatusInfo(status);

    return (
      <BadgeGlass ref={ref} variant={variant} size="sm" className={className}>
        <Shield className="w-3 h-3 mr-1" />
        {label}
      </BadgeGlass>
    );
  }
);
RepositoryCardHealthStatus.displayName = 'RepositoryCardGlass.HealthStatus';

/**
 * ContributionProgress - Shows contribution metrics with progress bars
 */
const RepositoryCardContributionProgress = forwardRef<
  HTMLDivElement,
  RepositoryCardContributionProgressProps
>(({ userCommits, totalCommits, prsMerged, reviews, className }, ref) => {
  const commitPercent = calculateContributionPercent(userCommits, totalCommits);

  return (
    <div ref={ref} className={cn('space-y-3', className)}>
      {/* Commits progress */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: 'var(--text-secondary)' }}>Commits</span>
          <span style={{ color: 'var(--text-primary)' }}>
            {formatNumberWithSuffix(userCommits)} / {formatNumberWithSuffix(totalCommits)} (
            {commitPercent}%)
          </span>
        </div>
        <ProgressGlass value={commitPercent} size="sm" gradient="violet" />
      </div>

      {/* Additional metrics */}
      {(prsMerged !== undefined || reviews !== undefined) && (
        <div className="flex gap-4">
          {prsMerged !== undefined && (
            <div className="flex-1">
              <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                PRs Merged
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {prsMerged}
              </div>
            </div>
          )}
          {reviews !== undefined && (
            <div className="flex-1">
              <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                Reviews
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {reviews}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
RepositoryCardContributionProgress.displayName = 'RepositoryCardGlass.ContributionProgress';

// ========================================
// LEGACY COMPONENT (backward compatibility)
// ========================================

const RepositoryCardGlassLegacy = forwardRef<HTMLDivElement, RepositoryCardGlassLegacyProps>(
  (
    {
      name,
      languages,
      commits,
      contribution,
      stars = 0,
      flagType = 'green',
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
    // Calculate total project commits from contribution percentage
    const totalProjectCommits =
      contribution > 0 ? Math.round(commits / (contribution / 100)) : commits;
    const estimatedLines = Math.round(commits * 12);

    return (
      <RepositoryCardRoot
        ref={ref}
        expanded={expanded}
        onToggle={onToggle}
        className={className}
        {...props}
      >
        <RepositoryCardHeader>
          <RepositoryCardName>{name}</RepositoryCardName>
          <RepositoryCardStatus type={flagType} />
          <RepositoryCardStars count={stars} />
        </RepositoryCardHeader>

        <RepositoryCardMeta>
          <RepositoryCardLanguages>{languages}</RepositoryCardLanguages>
          <RepositoryCardStatsLine>
            {commits} commits · {contribution}%
          </RepositoryCardStatsLine>
        </RepositoryCardMeta>

        <RepositoryCardExpandedContent>
          <RepositoryCardIssues issues={issues} />

          <RepositoryCardMetrics>
            <RepositoryCardMetricItem
              label="Your Contribution"
              value={`${commits} commits`}
              subtitle={`${contribution}%`}
            />
            <RepositoryCardMetricItem
              label="Full Project"
              value={`${totalProjectCommits} commits`}
              subtitle={`~${estimatedLines} lines`}
            />
          </RepositoryCardMetrics>

          <RepositoryCardActions>
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
              variant="default"
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
          </RepositoryCardActions>
        </RepositoryCardExpandedContent>
      </RepositoryCardRoot>
    );
  }
);
RepositoryCardGlassLegacy.displayName = 'RepositoryCardGlass';

// ========================================
// EXPORTS
// ========================================

/**
 * RepositoryCardGlass - Expandable repository card with compound API
 *
 * @example Legacy API (backward compatible)
 * ```tsx
 * <RepositoryCardGlass
 *   name="my-repo"
 *   languages="TypeScript, React"
 *   commits={500}
 *   contribution={45}
 *   expanded={true}
 *   onToggle={() => setExpanded(!expanded)}
 * />
 * ```
 *
 * @example Compound API (flexible)
 * ```tsx
 * <RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
 *   <RepositoryCardGlass.Header>
 *     <RepositoryCardGlass.Name>my-repo</RepositoryCardGlass.Name>
 *     <RepositoryCardGlass.Status type="green" />
 *     <RepositoryCardGlass.Stars count={42} />
 *   </RepositoryCardGlass.Header>
 *   <RepositoryCardGlass.Meta>
 *     <RepositoryCardGlass.Languages>TypeScript</RepositoryCardGlass.Languages>
 *     <RepositoryCardGlass.Stats>500 commits · 45%</RepositoryCardGlass.Stats>
 *   </RepositoryCardGlass.Meta>
 *   <RepositoryCardGlass.ExpandedContent>
 *     <RepositoryCardGlass.Metrics>
 *       <RepositoryCardGlass.MetricItem label="Commits" value="500" />
 *     </RepositoryCardGlass.Metrics>
 *   </RepositoryCardGlass.ExpandedContent>
 * </RepositoryCardGlass.Root>
 * ```
 */
export const RepositoryCardGlass = Object.assign(RepositoryCardGlassLegacy, {
  Root: RepositoryCardRoot,
  Header: RepositoryCardHeader,
  Name: RepositoryCardName,
  Status: RepositoryCardStatus,
  Stars: RepositoryCardStars,
  Meta: RepositoryCardMeta,
  Languages: RepositoryCardLanguages,
  Stats: RepositoryCardStatsLine,
  ExpandedContent: RepositoryCardExpandedContent,
  Issues: RepositoryCardIssues,
  Metrics: RepositoryCardMetrics,
  MetricItem: RepositoryCardMetricItem,
  Actions: RepositoryCardActions,
  // Issue #28: New sub-components
  ContributionBadge: RepositoryCardContributionBadge,
  ForkBadge: RepositoryCardForkBadge,
  Language: RepositoryCardLanguage,
  ActivityStatus: RepositoryCardActivityStatus,
  RoleBadge: RepositoryCardRoleBadge,
  TeamAvatars: RepositoryCardTeamAvatars,
  HealthStatus: RepositoryCardHealthStatus,
  ContributionProgress: RepositoryCardContributionProgress,
});

// Named exports for direct imports
export {
  RepositoryCardRoot,
  RepositoryCardHeader,
  RepositoryCardName,
  RepositoryCardStatus,
  RepositoryCardStars,
  RepositoryCardMeta,
  RepositoryCardLanguages,
  RepositoryCardStatsLine,
  RepositoryCardExpandedContent,
  RepositoryCardIssues,
  RepositoryCardMetrics,
  RepositoryCardMetricItem,
  RepositoryCardActions,
  // Issue #28: New sub-components
  RepositoryCardContributionBadge,
  RepositoryCardForkBadge,
  RepositoryCardLanguage,
  RepositoryCardActivityStatus,
  RepositoryCardRoleBadge,
  RepositoryCardTeamAvatars,
  RepositoryCardHealthStatus,
  RepositoryCardContributionProgress,
};

// Re-export context hook
export { useRepositoryCard, useRepositoryCardOptional } from './repository-card-context';

// Re-export utility types
export type {
  ActivityStatusType,
  ContributorRole,
  HealthStatusType,
  TeamMember,
} from './repository-card-utils';
