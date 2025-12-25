// ========================================
// PROFILE HEADER GLASS COMPONENT
// Compound Component API + Legacy API
// ========================================

import { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/lib/utils';
import {
  ProfileHeaderExtendedGlass,
  type ExtendedProfileUser,
} from './profile-header-extended-glass';
import { AICardGlass, type AICardGlassProps } from '../composite/ai-card-glass';
import type { LanguageData } from '../specialized/language-bar-glass';
import '@/glass-theme.css';

// ========================================
// CONTEXT
// ========================================

interface ProfileHeaderContextValue {
  layout: 'horizontal' | 'stacked';
}

const ProfileHeaderContext = createContext<ProfileHeaderContextValue | null>(null);

function useProfileHeaderContext() {
  const context = useContext(ProfileHeaderContext);
  if (!context) {
    throw new Error(
      'ProfileHeader compound components must be used within ProfileHeaderGlass.Root'
    );
  }
  return context;
}

// ========================================
// COMPOUND COMPONENTS
// ========================================

export interface ProfileHeaderRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout mode for the profile header
   * - 'horizontal': 50/50 split on desktop (default)
   * - 'stacked': Vertical stack on all breakpoints
   * @default 'horizontal'
   */
  readonly layout?: 'horizontal' | 'stacked';
}

/**
 * ProfileHeaderGlass.Root - Container for compound component API
 *
 * @example
 * ```tsx
 * <ProfileHeaderGlass.Root layout="horizontal">
 *   <ProfileHeaderGlass.Profile user={user} />
 *   <ProfileHeaderGlass.AI onGenerate={handleGenerate} />
 * </ProfileHeaderGlass.Root>
 * ```
 */
const ProfileHeaderRoot = forwardRef<HTMLDivElement, ProfileHeaderRootProps>(
  ({ layout = 'horizontal', className, children, ...props }, ref) => {
    const isHorizontal = layout === 'horizontal';

    return (
      <ProfileHeaderContext.Provider value={{ layout }}>
        <div
          ref={ref}
          className={cn(
            'flex gap-3',
            isHorizontal ? 'flex-col lg:flex-row lg:gap-0' : 'flex-col',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ProfileHeaderContext.Provider>
    );
  }
);

ProfileHeaderRoot.displayName = 'ProfileHeaderGlass.Root';

export interface ProfileHeaderProfileProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /** User data for profile display */
  readonly user: ExtendedProfileUser;
  /** Show online/offline status indicator */
  readonly showStatus?: boolean;
  /** Status type */
  readonly status?: 'online' | 'offline' | 'away' | 'busy';
}

/**
 * ProfileHeaderGlass.Profile - Profile information sub-component
 *
 * @example
 * ```tsx
 * <ProfileHeaderGlass.Profile
 *   user={{
 *     name: 'John Doe',
 *     login: 'johndoe',
 *     avatar: 'https://github.com/johndoe.png',
 *     createdAt: '2023-01-15',
 *     stats: { repos: 42, followers: 100, following: 50 },
 *     languages: [{ name: 'TypeScript', percent: 60 }]
 *   }}
 *   showStatus
 *   status="online"
 * />
 * ```
 */
const ProfileHeaderProfile = forwardRef<HTMLDivElement, ProfileHeaderProfileProps>(
  ({ user, showStatus = true, status = 'online', className, ...props }, ref) => {
    const { layout } = useProfileHeaderContext();
    const isHorizontal = layout === 'horizontal';

    return (
      <ProfileHeaderExtendedGlass
        ref={ref}
        user={user}
        showStatus={showStatus}
        status={status}
        transparent
        className={cn(isHorizontal ? 'lg:w-1/2 lg:shrink-0 p-0' : 'p-0', className)}
        {...props}
      />
    );
  }
);

ProfileHeaderProfile.displayName = 'ProfileHeaderGlass.Profile';

export type ProfileHeaderAIProps = AICardGlassProps;

/**
 * ProfileHeaderGlass.AI - AI card sub-component with full AICardGlass props
 *
 * @example
 * ```tsx
 * <ProfileHeaderGlass.AI
 *   onGenerate={() => console.log('Generate')}
 *   features={['Code review', 'Security audit', 'Performance tips']}
 *   estimatedTime="~1 minute"
 *   className="p-6"
 * />
 * ```
 */
const ProfileHeaderAI = forwardRef<HTMLDivElement, ProfileHeaderAIProps>(
  ({ className, ...props }, ref) => {
    const { layout } = useProfileHeaderContext();
    const isHorizontal = layout === 'horizontal';

    return (
      <div
        className={cn(
          isHorizontal
            ? 'lg:w-1/2 lg:flex lg:items-center lg:justify-center'
            : 'flex justify-center'
        )}
      >
        <AICardGlass ref={ref} className={className} {...props} />
      </div>
    );
  }
);

ProfileHeaderAI.displayName = 'ProfileHeaderGlass.AI';

// ========================================
// LEGACY API (Backward Compatible)
// ========================================

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
  /**
   * Layout mode for the profile header
   * - 'horizontal': 50/50 split on desktop (default)
   * - 'stacked': Vertical stack on all breakpoints
   * @default 'horizontal'
   */
  readonly layout?: 'horizontal' | 'stacked';
}

/**
 * ProfileHeaderGlass - Composite component combining ProfileHeaderExtendedGlass + AICardGlass
 *
 * Supports two APIs:
 * 1. **Legacy API** (props-based) - Simple usage with flat props
 * 2. **Compound API** - Full control with sub-components
 *
 * Layout (desktop ≥1024px for horizontal):
 * - ProfileHeaderExtendedGlass: 50% width (left half)
 * - AICardGlass: centered in remaining 50% (right half)
 *
 * @example Legacy API
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
 *
 * @example Compound API (Issue #31)
 * ```tsx
 * <ProfileHeaderGlass.Root layout="horizontal">
 *   <ProfileHeaderGlass.Profile
 *     user={{
 *       name: 'John Doe',
 *       login: 'johndoe',
 *       avatar: 'https://github.com/johndoe.png',
 *       createdAt: '2023-01-15',
 *       stats: { repos: 42, followers: 100, following: 50 },
 *       languages: [{ name: 'TypeScript', percent: 60 }]
 *     }}
 *     showStatus
 *     status="online"
 *   />
 *   <ProfileHeaderGlass.AI
 *     onGenerate={() => console.log('Generate')}
 *     features={['Code review', 'Security audit']}
 *     estimatedTime="~1 minute"
 *   />
 * </ProfileHeaderGlass.Root>
 * ```
 *
 * @example Custom AI Component
 * ```tsx
 * <ProfileHeaderGlass.Root>
 *   <ProfileHeaderGlass.Profile user={user} />
 *   <MyCustomAICard /> // Replace AICardGlass entirely
 * </ProfileHeaderGlass.Root>
 * ```
 */
const ProfileHeaderGlassLegacy = forwardRef<HTMLDivElement, ProfileHeaderGlassProps>(
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
      layout = 'horizontal',
      className,
      ...props
    },
    ref
  ) => {
    // Convert simple props to ExtendedProfileUser format
    const user: ExtendedProfileUser = {
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
      <ProfileHeaderRoot ref={ref} layout={layout} className={className} {...props}>
        <ProfileHeaderProfile user={user} showStatus status="online" />
        <ProfileHeaderAI onGenerate={onAIGenerate} />
      </ProfileHeaderRoot>
    );
  }
);

ProfileHeaderGlassLegacy.displayName = 'ProfileHeaderGlass';

// ========================================
// EXPORT WITH COMPOUND API
// ========================================

export const ProfileHeaderGlass = Object.assign(ProfileHeaderGlassLegacy, {
  Root: ProfileHeaderRoot,
  Profile: ProfileHeaderProfile,
  AI: ProfileHeaderAI,
});

// Re-export types for consumers
export type { ExtendedProfileUser } from './profile-header-extended-glass';
export type { AICardGlassProps } from '../composite/ai-card-glass';
