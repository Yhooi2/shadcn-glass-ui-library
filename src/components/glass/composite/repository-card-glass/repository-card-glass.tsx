/* eslint-disable react-refresh/only-export-components */
// ========================================
// REPOSITORY CARD GLASS COMPONENT
// Expandable repository card with compound API
// Issue #15: shadcn/ui compatible compound component
// ========================================

import { forwardRef, type CSSProperties, type ReactNode, useMemo } from 'react';
import { ChevronDown, ChevronUp, Star, ExternalLink, Sparkles, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusIndicatorGlass } from '../../specialized/status-indicator-glass';
import { ButtonGlass } from '../../ui/button-glass';
import { InteractiveCard } from '../../primitives';
import {
  RepositoryCardContext,
  useRepositoryCard,
  type RepositoryCardContextValue,
} from './repository-card-context';
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
};

// Re-export context hook
export { useRepositoryCard, useRepositoryCardOptional } from './repository-card-context';
