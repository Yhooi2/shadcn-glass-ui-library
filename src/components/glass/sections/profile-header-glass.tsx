// ========================================
// PROFILE HEADER GLASS COMPONENT
// Composite: ProfileHeaderExtendedGlass (transparent) + AICardGlass
// ========================================

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ProfileHeaderExtendedGlass } from './profile-header-extended-glass';
import { AICardGlass } from '../composite/ai-card-glass';
import type { LanguageData } from '../specialized/language-bar-glass';
import '@/glass-theme.css';

export interface ProfileStats {
  readonly repos?: number;
  readonly followers?: number;
  readonly following?: number;
  readonly gists?: number;
}

export interface ProfileHeaderGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name?: string;
  readonly username?: string;
  readonly joinDate?: string;
  readonly bio?: string | null;
  readonly location?: string | null;
  readonly avatar?: string;
  readonly url?: string;
  readonly stats?: ProfileStats;
  readonly languages?: readonly LanguageData[];
  readonly onAIGenerate?: () => void;
}

/**
 * ProfileHeaderGlass - Composite component combining ProfileHeaderExtendedGlass + AICardGlass
 *
 * The profile header is rendered without glass background (transparent),
 * while AICardGlass retains its glass styling.
 *
 * Layout (desktop ≥1024px):
 * - ProfileHeaderExtendedGlass: 50% width (left half)
 * - AICardGlass: centered in remaining 50% (right half)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ProfileHeaderGlass
 *   name="John Doe"
 *   username="johndoe"
 *   joinDate="Jan 2023"
 *   stats={{ repos: 42, followers: 100, following: 50 }}
 *   languages={[{ name: "TypeScript", percent: 60 }]}
 *   onAIGenerate={() => console.log("Generate AI summary")}
 * />
 *
 * // With extended fields (Issue #30)
 * <ProfileHeaderGlass
 *   name="The Octocat"
 *   username="octocat"
 *   avatar="https://github.com/octocat.png"
 *   bio="GitHub mascot and cat enthusiast"
 *   location="San Francisco"
 *   url="https://github.com/octocat"
 *   joinDate="2011-01-25T18:44:36Z"
 *   stats={{ repos: 42, followers: 1000, following: 50, gists: 10 }}
 *   languages={[{ name: "TypeScript", percent: 60 }]}
 *   onAIGenerate={() => console.log("Generate AI summary")}
 * />
 * ```
 */
export const ProfileHeaderGlass = forwardRef<HTMLDivElement, ProfileHeaderGlassProps>(
  (
    {
      name = 'Artem Safronov',
      username = 'Yhooi2',
      joinDate = 'Jan 2023',
      bio,
      location,
      avatar = '',
      url = '#',
      stats = {},
      languages = [],
      onAIGenerate,
      className,
      ...props
    },
    ref
  ) => {
    // Convert simple props to ExtendedProfileUser format
    const user = {
      name,
      login: username,
      avatar,
      url,
      createdAt: joinDate,
      bio,
      location,
      stats: {
        repos: stats.repos ?? 11,
        followers: stats.followers ?? 1,
        following: stats.following ?? 5,
        gists: stats.gists ?? 0,
      },
      languages,
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-col lg:flex-row gap-3 lg:gap-0', className)}
        {...props}
      >
        {/* Left half: ProfileHeaderExtendedGlass takes exactly 50% on desktop */}
        <ProfileHeaderExtendedGlass
          user={user}
          showStatus
          status="online"
          transparent
          className="lg:w-1/2 lg:shrink-0 p-0"
        />
        {/* Right half: AICardGlass centered in the remaining 50% */}
        <div className="lg:w-1/2 lg:flex lg:items-center lg:justify-center">
          <AICardGlass onGenerate={onAIGenerate} />
        </div>
      </div>
    );
  }
);

ProfileHeaderGlass.displayName = 'ProfileHeaderGlass';
