// ========================================
// USER INFO GLASS - COMPOSITE COMPONENT
// User name, username, and join date display
// Level 3: Composite (extracted from ProfileHeaderGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

/**
 * Props for UserInfoGlass component.
 *
 * Extends standard div attributes for maximum flexibility.
 * All props are readonly to ensure immutability.
 *
 * @example
 * ```tsx
 * const props: UserInfoGlassProps = {
 *   name: 'John Doe',
 *   username: 'johndoe',
 *   joinDate: 'Jan 2023',
 *   profileUrl: 'https://github.com/johndoe',
 *   layout: 'vertical',
 * };
 * ```
 */
export interface UserInfoGlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * User's full name.
   *
   * Displayed as h1 heading with primary text color.
   * Responsive font size: lg (mobile) to xl (desktop) in vertical layout.
   *
   * @example
   * ```tsx
   * <UserInfoGlass name="Jane Smith" />
   * ```
   */
  readonly name: string;

  /**
   * Username (without @ prefix).
   *
   * Displayed as clickable link with @ prefix and external link icon.
   * Uses accent color for visual hierarchy.
   *
   * @example
   * ```tsx
   * <UserInfoGlass username="janesmith" /> // Displays "@janesmith"
   * ```
   */
  readonly username: string;

  /**
   * Join date in human-readable format.
   *
   * Displayed with calendar icon and "Joined" prefix.
   * Typically formatted as "MMM YYYY" (e.g., "Jan 2023").
   *
   * @example
   * ```tsx
   * <UserInfoGlass joinDate="Jan 2023" /> // Shows "📅 Joined Jan 2023"
   * ```
   */
  readonly joinDate: string;

  /**
   * URL for the username link.
   *
   * Typically points to user profile page.
   * Includes aria-label for accessibility.
   *
   * @default '#'
   *
   * @example
   * ```tsx
   * <UserInfoGlass profileUrl="https://github.com/johndoe" />
   * ```
   */
  readonly profileUrl?: string;

  /**
   * Layout orientation.
   *
   * - `vertical`: Name above username/join date (default, mobile-friendly)
   * - `horizontal`: Name and metadata side-by-side (desktop-optimized)
   *
   * @default 'vertical'
   */
  readonly layout?: 'vertical' | 'horizontal';
}

/**
 * UserInfoGlass Component
 *
 * User name, username, and join date display component.
 * Extracted from ProfileHeaderGlass for reusable user identity sections.
 *
 * ## Features
 * - User full name as h1 heading
 * - Clickable username link with @ prefix
 * - External link icon for username links
 * - Calendar icon for join date
 * - 2 layout variants (vertical, horizontal)
 * - Responsive font sizing in vertical layout
 * - Semantic color variables for theme consistency
 * - Icon integration (Calendar, ExternalLink from lucide-react)
 * - Accessible link with aria-label
 * - Hover underline on username link
 *
 * ## CSS Variables
 * - `--text-primary` - Primary text color for name
 * - `--text-secondary` - Secondary text color for metadata
 * - `--text-accent` - Accent color for username link
 *
 * @example
 * // Basic usage with vertical layout
 * <UserInfoGlass
 *   name="Jane Smith"
 *   username="janesmith"
 *   joinDate="Jan 2023"
 * />
 *
 * @example
 * // With custom profile URL
 * <UserInfoGlass
 *   name="John Doe"
 *   username="johndoe"
 *   joinDate="Mar 2020"
 *   profileUrl="https://github.com/johndoe"
 * />
 *
 * @example
 * // Horizontal layout for desktop headers
 * <UserInfoGlass
 *   name="Alice Johnson"
 *   username="alicejohnson"
 *   joinDate="Dec 2022"
 *   layout="horizontal"
 * />
 *
 * @example
 * // With custom styling
 * <UserInfoGlass
 *   name="Bob Wilson"
 *   username="bobwilson"
 *   joinDate="Jun 2021"
 *   className="mb-6"
 * />
 *
 * @accessibility
 * - Semantic h1 heading for user name
 * - Accessible link with descriptive aria-label ("View {username}'s profile")
 * - Icon buttons with proper sizing (12px for small icons)
 * - Hover states for interactive elements
 * - Color contrast via CSS variables
 * - Keyboard navigable links
 * - Screen reader friendly separator (·)
 *
 * @since v1.0.0
 */
export const UserInfoGlass = forwardRef<HTMLDivElement, UserInfoGlassProps>(
  (
    { name, username, joinDate, profileUrl = '#', layout = 'vertical', className, ...props },
    ref
  ) => {
    const titleStyles: CSSProperties = {
      color: 'var(--text-primary)',
    };

    const metaStyles: CSSProperties = {
      color: 'var(--text-secondary)',
    };

    const linkStyles: CSSProperties = {
      color: 'var(--text-accent)',
    };

    return (
      <div
        ref={ref}
        className={cn(layout === 'vertical' ? 'space-y-1' : 'flex items-center gap-4', className)}
        {...props}
      >
        <h1
          className={cn('font-bold', layout === 'vertical' ? 'text-lg md:text-xl' : 'text-xl')}
          style={titleStyles}
        >
          {name}
        </h1>
        <div
          className={cn(
            'flex items-center gap-2 text-sm flex-wrap',
            layout === 'vertical' && 'mt-0.5'
          )}
          style={metaStyles}
        >
          <a
            href={profileUrl}
            className="flex items-center gap-1 hover:underline"
            style={linkStyles}
            aria-label={`View ${username}'s profile`}
          >
            @{username} <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Joined {joinDate}
          </span>
        </div>
      </div>
    );
  }
);

UserInfoGlass.displayName = 'UserInfoGlass';
