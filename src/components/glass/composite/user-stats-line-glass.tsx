// ========================================
// USER STATS LINE GLASS - COMPOSITE COMPONENT
// User statistics line (repos, followers, following)
// Level 3: Composite (extracted from ProfileHeaderGlass)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { FolderGit2, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatItemGlass } from '../atomic/stat-item-glass';
import '@/glass-theme.css';

/**
 * Props for UserStatsLineGlass component.
 *
 * Extends standard div attributes for maximum flexibility.
 * All props are readonly to ensure immutability.
 *
 * @example
 * ```tsx
 * const props: UserStatsLineGlassProps = {
 *   repos: 42,
 *   followers: 1234,
 *   following: 567,
 *   wrap: true,
 *   abbreviated: false,
 * };
 * ```
 */
export interface UserStatsLineGlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of repositories.
   *
   * Displayed with FolderGit2 icon and "repos" label.
   * Supports thousand separators and abbreviation.
   *
   * @example
   * ```tsx
   * <UserStatsLineGlass repos={42} /> // Shows "📁 42 repos"
   * ```
   */
  readonly repos: number;

  /**
   * Number of followers.
   *
   * Displayed with Users icon and "followers" label.
   * Supports thousand separators and abbreviation.
   *
   * @example
   * ```tsx
   * <UserStatsLineGlass followers={1234} /> // Shows "👥 1,234 followers"
   * <UserStatsLineGlass followers={1234} abbreviated /> // Shows "👥 1.2k followers"
   * ```
   */
  readonly followers: number;

  /**
   * Number of users following.
   *
   * Displayed with User icon and "following" label.
   * Supports thousand separators and abbreviation.
   *
   * @example
   * ```tsx
   * <UserStatsLineGlass following={567} /> // Shows "👤 567 following"
   * ```
   */
  readonly following: number;

  /**
   * Whether to wrap stats on mobile.
   *
   * - `true`: Stats wrap to multiple lines on narrow screens
   * - `false`: Stats stay in single line (may overflow)
   *
   * @default true
   */
  readonly wrap?: boolean;

  /**
   * Abbreviate large numbers (1.2k instead of 1,234).
   *
   * Useful for mobile layouts with limited space.
   * Applied to all three stat values (repos, followers, following).
   *
   * @default false
   *
   * @example
   * ```tsx
   * // Standard: "1,234 followers"
   * <UserStatsLineGlass followers={1234} />
   *
   * // Abbreviated: "1.2k followers"
   * <UserStatsLineGlass followers={1234} abbreviated />
   * ```
   */
  readonly abbreviated?: boolean;
}

/**
 * UserStatsLineGlass Component
 *
 * User statistics line displaying repos, followers, and following counts.
 * Extracted from ProfileHeaderGlass for reusable user metrics displays.
 *
 * ## Features
 * - 3 stat items (repos, followers, following)
 * - Icon integration (FolderGit2, Users, User from lucide-react)
 * - Automatic thousand separator formatting
 * - Optional number abbreviation (1.2k instead of 1,234)
 * - Optional wrapping for mobile layouts
 * - StatItemGlass integration for consistent styling
 * - Responsive gap spacing (1rem between items)
 * - Compact text size (14px) for inline display
 * - Semantic labels for each stat
 * - Customizable via className
 *
 * ## CSS Variables
 * Inherits all StatItemGlass CSS variables:
 * - `--text-primary` - Primary text color for values
 * - `--text-secondary` - Secondary text color for labels
 *
 * @example
 * // Basic usage with default settings
 * <UserStatsLineGlass
 *   repos={42}
 *   followers={1234}
 *   following={567}
 * />
 *
 * @example
 * // With abbreviated numbers for mobile
 * <UserStatsLineGlass
 *   repos={42}
 *   followers={1234}
 *   following={567}
 *   abbreviated
 * />
 *
 * @example
 * // Without wrapping (single line)
 * <UserStatsLineGlass
 *   repos={42}
 *   followers={1234}
 *   following={567}
 *   wrap={false}
 * />
 *
 * @example
 * // With custom styling
 * <UserStatsLineGlass
 *   repos={42}
 *   followers={1234}
 *   following={567}
 *   className="gap-6"
 * />
 *
 * @accessibility
 * - Semantic HTML structure via StatItemGlass
 * - Icon labels with proper sizing (16px)
 * - Color contrast via CSS variables
 * - Screen reader friendly labels ("repos", "followers", "following")
 * - Non-interactive display (no keyboard requirements)
 * - Number formatting for readability (thousand separators)
 *
 * @since v1.0.0
 */
export const UserStatsLineGlass = forwardRef<HTMLDivElement, UserStatsLineGlassProps>(
  ({ repos, followers, following, wrap = true, abbreviated = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4 text-sm', wrap && 'flex-wrap', className)}
        {...props}
      >
        <StatItemGlass icon={FolderGit2} value={repos} label="repos" abbreviated={abbreviated} />
        <StatItemGlass icon={Users} value={followers} label="followers" abbreviated={abbreviated} />
        <StatItemGlass icon={User} value={following} label="following" abbreviated={abbreviated} />
      </div>
    );
  }
);

UserStatsLineGlass.displayName = 'UserStatsLineGlass';
