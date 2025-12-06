// ========================================
// HEADER BRANDING GLASS - SECTION COMPONENT
// Header branding with logo and subtitle
// Level 4: Section (extracted from HeaderNavGlass)
// ========================================

import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButtonGlass } from '../atomic/icon-button-glass';
import '@/glass-theme.css';

export interface HeaderBrandingGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Logo icon component */
  readonly logoIcon: LucideIcon;
  /** Main title */
  readonly title: string;
  /** Subtitle (hidden on mobile) */
  readonly subtitle?: string;
  /** Logo click handler */
  readonly onLogoClick?: () => void;
  /** Logo aria label */
  readonly logoAriaLabel?: string;
}

export const HeaderBrandingGlass = forwardRef<HTMLDivElement, HeaderBrandingGlassProps>(
  (
    {
      logoIcon,
      title,
      subtitle,
      onLogoClick,
      logoAriaLabel = 'Home',
      className,
      ...props
    },
    ref
  ) => {
    const titleStyles: CSSProperties = {
      color: 'var(--text-primary)',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4', className)}
        {...props}
      >
        <IconButtonGlass
          icon={logoIcon}
          aria-label={logoAriaLabel}
          onClick={onLogoClick}
          variant="gradient"
          size="md"
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="font-semibold text-base md:text-lg" style={titleStyles}>
            {title}
          </span>
          {subtitle && (
            <span
              className="hidden md:inline text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              · {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  }
);

HeaderBrandingGlass.displayName = 'HeaderBrandingGlass';
