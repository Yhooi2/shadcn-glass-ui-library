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

export interface UserStatsLineGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of repositories */
  readonly repos: number;
  /** Number of followers */
  readonly followers: number;
  /** Number of following */
  readonly following: number;
  /** Wrap stats on mobile */
  readonly wrap?: boolean;
  /** Abbreviated numbers for mobile (1.2k instead of 1234) */
  readonly abbreviated?: boolean;
}

export const UserStatsLineGlass = forwardRef<HTMLDivElement, UserStatsLineGlassProps>(
  (
    {
      repos,
      followers,
      following,
      wrap = true,
      abbreviated = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-4 text-sm',
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        <StatItemGlass
          icon={FolderGit2}
          value={repos}
          label="repos"
          abbreviated={abbreviated}
        />
        <StatItemGlass
          icon={Users}
          value={followers}
          label="followers"
          abbreviated={abbreviated}
        />
        <StatItemGlass
          icon={User}
          value={following}
          label="following"
          abbreviated={abbreviated}
        />
      </div>
    );
  }
);

UserStatsLineGlass.displayName = 'UserStatsLineGlass';
