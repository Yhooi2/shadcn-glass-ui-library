// ========================================
// USER INFO GLASS - COMPOSITE COMPONENT
// User name, username, and join date display
// Level 3: Composite (extracted from ProfileHeaderGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export interface UserInfoGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Full name */
  readonly name: string;
  /** Username (without @) */
  readonly username: string;
  /** Join date string (e.g., "Jan 2023") */
  readonly joinDate: string;
  /** Username link URL (default: #) */
  readonly profileUrl?: string;
  /** Layout orientation */
  readonly layout?: 'vertical' | 'horizontal';
}

export const UserInfoGlass = forwardRef<HTMLDivElement, UserInfoGlassProps>(
  (
    {
      name,
      username,
      joinDate,
      profileUrl = '#',
      layout = 'vertical',
      className,
      ...props
    },
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
        className={cn(
          layout === 'vertical' ? 'space-y-1' : 'flex items-center gap-4',
          className
        )}
        {...props}
      >
        <h1
          className={cn(
            'font-bold',
            layout === 'vertical' ? 'text-lg md:text-xl' : 'text-xl'
          )}
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
