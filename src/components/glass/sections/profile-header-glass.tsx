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
}

export interface ProfileHeaderGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name?: string;
  readonly username?: string;
  readonly joinDate?: string;
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
 * @example
 * ```tsx
 * <ProfileHeaderGlass
 *   name="John Doe"
 *   username="johndoe"
 *   joinDate="Jan 2023"
 *   stats={{ repos: 42, followers: 100, following: 50 }}
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
      avatar: '', // No avatar URL - will use initials via ProfileAvatarGlass
      url: '#',
      createdAt: joinDate,
      stats: {
        repos: stats.repos ?? 11,
        followers: stats.followers ?? 1,
        following: stats.following ?? 5,
      },
      languages,
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-col md:flex-row gap-3 md:gap-6', className)}
        {...props}
      >
        <ProfileHeaderExtendedGlass
          user={user}
          showStatus
          status="online"
          transparent
          className="flex-1 p-0"
        />
        <AICardGlass onGenerate={onAIGenerate} />
      </div>
    );
  }
);

ProfileHeaderGlass.displayName = 'ProfileHeaderGlass';
