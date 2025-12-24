// ========================================
// PROFILE HEADER EXTENDED GLASS COMPONENT
// Extended user profile header with GitHub-compatible fields
// Implements Issue #29 feature request
// ========================================

import { forwardRef } from 'react';
import { Calendar, ExternalLink, FolderGit2, Users, User, MapPin, FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '../ui/glass-card';
import { ProfileAvatarGlass } from '../specialized/profile-avatar-glass';
import { LanguageBarGlass, type LanguageData } from '../specialized/language-bar-glass';
import '@/glass-theme.css';

export interface ExtendedProfileStats {
  readonly repos?: number;
  readonly followers?: number;
  readonly following?: number;
  readonly gists?: number;
}

export interface ExtendedProfileUser {
  /** Display name (can be null for users without a name set) */
  readonly name: string | null;
  /** Username/handle (e.g., "octocat") */
  readonly login: string;
  /** Avatar URL */
  readonly avatar: string;
  /** Profile URL */
  readonly url: string;
  /** Join date (ISO 8601 string or formatted string) */
  readonly createdAt: string;
  /** User biography/description */
  readonly bio?: string | null;
  /** User location */
  readonly location?: string | null;
  /** Profile stats */
  readonly stats?: ExtendedProfileStats;
  /** Programming languages distribution */
  readonly languages?: readonly LanguageData[];
}

export interface ProfileHeaderExtendedGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** User profile data */
  readonly user: ExtendedProfileUser;
  /** Whether to show the avatar with online status */
  readonly showStatus?: boolean;
  /** Avatar status when showStatus is true */
  readonly status?: 'online' | 'offline' | 'away' | 'busy';
  /** Custom action slot (replaces default external link behavior) */
  readonly actions?: React.ReactNode;
}

/**
 * Formats ISO 8601 date to human-readable format
 * @example "2011-01-25T18:44:36Z" -> "January 25, 2011"
 */
function formatJoinDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If not a valid date, return as-is (might already be formatted)
      return dateString;
    }
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Gets initials from a name string
 */
function getInitials(name: string | null, login: string): string {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return login.slice(0, 2).toUpperCase();
}

/**
 * ProfileHeaderExtendedGlass - Extended profile header with GitHub-compatible fields
 *
 * Features:
 * - Full GitHub/GitLab user field support
 * - Avatar with optional status indicator
 * - Bio display
 * - Location with icon
 * - Extended stats (repos, followers, following, gists)
 * - Language distribution bar
 * - Custom actions slot
 *
 * @example
 * ```tsx
 * <ProfileHeaderExtendedGlass
 *   user={{
 *     name: "The Octocat",
 *     login: "octocat",
 *     avatar: "https://github.com/octocat.png",
 *     url: "https://github.com/octocat",
 *     createdAt: "2011-01-25T18:44:36Z",
 *     bio: "GitHub mascot",
 *     location: "San Francisco",
 *     stats: { repos: 42, followers: 100, following: 50, gists: 10 },
 *     languages: [
 *       { name: "TypeScript", percentage: 56, color: "#3178c6" },
 *       { name: "HTML", percentage: 22, color: "#e34c26" },
 *     ],
 *   }}
 * />
 * ```
 */
export const ProfileHeaderExtendedGlass = forwardRef<
  HTMLDivElement,
  ProfileHeaderExtendedGlassProps
>(({ user, showStatus = false, status = 'online', actions, className, ...props }, ref) => {
  const displayName = user.name || user.login;
  const stats = {
    repos: 0,
    followers: 0,
    following: 0,
    gists: 0,
    ...user.stats,
  };

  return (
    <GlassCard
      ref={ref}
      className={cn('p-5', className)}
      intensity="strong"
      glow="violet"
      hover={false}
      {...props}
    >
      <div className="flex flex-col gap-4">
        {/* Top section: Avatar + Identity */}
        <div className="flex gap-4">
          {/* Avatar */}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${displayName}'s avatar`}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-2 ring-white/20 object-cover flex-shrink-0"
            />
          ) : (
            <ProfileAvatarGlass
              initials={getInitials(user.name, user.login)}
              size="lg"
              status={showStatus ? status : undefined}
            />
          )}

          {/* Identity section */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h1
              className="text-lg md:text-xl font-bold truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {displayName}
            </h1>

            {/* Username + Link */}
            <div
              className="flex items-center gap-2 text-sm mt-0.5"
              style={{ color: 'var(--text-secondary)' }}
            >
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline transition-colors"
                style={{ color: 'var(--text-accent)' }}
              >
                @{user.login} <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-sm mt-2 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {user.bio}
              </p>
            )}

            {/* Location + Join date */}
            <div
              className="flex items-center gap-3 mt-2 text-sm flex-wrap"
              style={{ color: 'var(--text-secondary)' }}
            >
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--text-accent)' }} />
                  {user.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--text-accent)' }} />
                Joined {formatJoinDate(user.createdAt)}
              </span>
            </div>
          </div>

          {/* Actions slot */}
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-4 md:gap-6 text-sm flex-wrap"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span className="flex items-center gap-1.5">
            <FolderGit2 className="w-4 h-4" style={{ color: 'var(--text-accent)' }} />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {stats.repos}
            </span>
            repos
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" style={{ color: 'var(--text-accent)' }} />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {stats.followers}
            </span>
            followers
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" style={{ color: 'var(--text-accent)' }} />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {stats.following}
            </span>
            following
          </span>
          {stats.gists > 0 && (
            <span className="flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4" style={{ color: 'var(--text-accent)' }} />
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {stats.gists}
              </span>
              gists
            </span>
          )}
        </div>

        {/* Languages bar */}
        {user.languages && user.languages.length > 0 && (
          <LanguageBarGlass languages={user.languages} />
        )}
      </div>
    </GlassCard>
  );
});

ProfileHeaderExtendedGlass.displayName = 'ProfileHeaderExtendedGlass';
