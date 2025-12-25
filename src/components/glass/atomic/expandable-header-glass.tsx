/**
 * ExpandableHeaderGlass Component
 *
 * Collapsible section header with animated chevron for accordion-style interfaces.
 * Provides accessible expand/collapse controls with theme-aware styling.
 *
 * ## Features
 * - **Chevron Animation:** Smooth rotation between ChevronUp/ChevronDown icons
 * - **Optional Leading Icon:** Customizable icon with configurable color
 * - **Controlled State:** Requires `expanded` prop for external state management
 * - **Hover Effect:** Subtle background highlight on hover (`bg-white/5`)
 * - **Theme-Aware:** Uses CSS variables for text and icon colors
 * - **ARIA Compliance:** `aria-expanded` attribute for screen readers
 * - **Keyboard Accessible:** Native button element with focus states
 * - **Flexible Layout:** Full-width button with space-between alignment
 * - **Atomic Component:** Extracted from FlagsSectionGlass for reusability
 *
 * ## CSS Variables
 * Uses inline theme CSS variables (no component-specific variables):
 * - `--text-primary` - Header title text color
 * - `--text-muted` - Chevron icon color
 * - `--text-accent` - Leading icon color (default, customizable via `iconColor`)
 *
 * @example Basic usage
 * ```tsx
 * import { ExpandableHeaderGlass } from 'shadcn-glass-ui'
 * import { Flag } from 'lucide-react'
 *
 * function CollapsibleSection() {
 *   const [expanded, setExpanded] = useState(false)
 *
 *   return (
 *     <>
 *       <ExpandableHeaderGlass
 *         title="Flags"
 *         icon={Flag}
 *         expanded={expanded}
 *         onToggle={() => setExpanded(!expanded)}
 *       />
 *       {expanded && <div>Section content...</div>}
 *     </>
 *   )
 * }
 * ```
 *
 * @example Without icon
 * ```tsx
 * <ExpandableHeaderGlass
 *   title="Additional Information"
 *   expanded={isExpanded}
 *   onToggle={handleToggle}
 * />
 * ```
 *
 * @example With custom icon color
 * ```tsx
 * import { AlertTriangle } from 'lucide-react'
 *
 * <ExpandableHeaderGlass
 *   title="Warnings"
 *   icon={AlertTriangle}
 *   iconColor="oklch(65% 0.19 29)" // Orange warning color
 *   expanded={warningsExpanded}
 *   onToggle={() => setWarningsExpanded(!warningsExpanded)}
 * />
 * ```
 *
 * @example With custom styling
 * ```tsx
 * <ExpandableHeaderGlass
 *   title="Advanced Settings"
 *   expanded={settingsExpanded}
 *   onToggle={toggleSettings}
 *   className="bg-white/10 border border-white/20"
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic `<button>` element for proper keyboard support
 * - `aria-expanded` attribute indicates current state to screen readers
 * - Chevron icon change provides visual feedback for state
 * - Native focus states for keyboard navigation
 * - `type="button"` prevents form submission
 * - Space and Enter keys trigger toggle
 * - WCAG 2.1 AA compliant color contrast
 *
 * @since v1.0.0
 */

// ========================================
// EXPANDABLE HEADER GLASS - ATOMIC COMPONENT
// Collapsible section header with icon and chevron
// Level 2: Atomic (extracted from FlagsSectionGlass)
// ========================================

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from 'react';
import { ChevronUp, ChevronDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

/**
 * Props for ExpandableHeaderGlass component.
 *
 * Extends standard button attributes (excluding `title` to avoid conflict with
 * the component's `title` prop). This is a controlled component requiring
 * `expanded` state management.
 *
 * @example
 * ```tsx
 * import { Flag } from 'lucide-react'
 *
 * const props: ExpandableHeaderGlassProps = {
 *   title: 'Warnings',
 *   icon: Flag,
 *   iconColor: 'var(--text-accent)',
 *   expanded: true,
 *   onToggle: () => console.log('Toggled'),
 * }
 * ```
 */
export interface ExpandableHeaderGlassProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'title'
> {
  /**
   * Header title.
   *
   * Accepts any valid React node (string, JSX, etc.). Displayed with
   * `font-medium` weight for emphasis.
   *
   * @example
   * ```tsx
   * <ExpandableHeaderGlass title="Flags" ... />
   * <ExpandableHeaderGlass title={<span>Custom <b>Title</b></span>} ... />
   * ```
   */
  readonly title: ReactNode;

  /**
   * Leading icon component.
   *
   * Optional Lucide icon displayed before the title. Icon color controlled
   * via `iconColor` prop.
   *
   * @example
   * ```tsx
   * import { Flag, AlertTriangle, Settings } from 'lucide-react'
   *
   * <ExpandableHeaderGlass icon={Flag} title="Flags" ... />
   * <ExpandableHeaderGlass icon={AlertTriangle} title="Warnings" ... />
   * ```
   */
  readonly icon?: LucideIcon;

  /**
   * Icon color (CSS variable or color value).
   *
   * Accepts CSS variables or direct OKLCH/hex/rgb values. Defaults to
   * `--text-accent` for theme consistency.
   *
   * @default 'var(--text-accent)'
   *
   * @example
   * ```tsx
   * <ExpandableHeaderGlass iconColor="var(--text-accent)" ... />
   * <ExpandableHeaderGlass iconColor="oklch(65% 0.19 29)" ... />
   * ```
   */
  readonly iconColor?: string;

  /**
   * Expanded state.
   *
   * Controls chevron direction and `aria-expanded` attribute. This is a
   * controlled component - manage state externally with `useState` or similar.
   *
   * - `true`: Shows ChevronUp icon
   * - `false`: Shows ChevronDown icon
   *
   * @example
   * ```tsx
   * const [expanded, setExpanded] = useState(false)
   *
   * <ExpandableHeaderGlass
   *   expanded={expanded}
   *   onToggle={() => setExpanded(!expanded)}
   * />
   * ```
   */
  readonly expanded: boolean;

  /**
   * Toggle callback.
   *
   * Called when button is clicked. Use to update `expanded` state. Button
   * is still functional without this prop (e.g., for display-only headers).
   *
   * @example
   * ```tsx
   * <ExpandableHeaderGlass
   *   expanded={isExpanded}
   *   onToggle={() => {
   *     setIsExpanded(!isExpanded)
   *     trackAnalytics('section_toggled')
   *   }}
   * />
   * ```
   */
  readonly onToggle?: () => void;
}

export const ExpandableHeaderGlass = forwardRef<HTMLButtonElement, ExpandableHeaderGlassProps>(
  (
    {
      title,
      icon: Icon,
      iconColor = 'var(--text-accent)',
      expanded,
      onToggle,
      className,
      ...props
    },
    ref
  ) => {
    const textStyles: CSSProperties = {
      color: 'var(--text-primary)',
    };

    const chevronStyles: CSSProperties = {
      color: 'var(--text-muted)',
    };

    const iconStyles: CSSProperties = {
      color: iconColor,
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={cn(
          'w-full p-4 flex items-center justify-between rounded-2xl transition-colors hover:bg-white/5',
          className
        )}
        style={textStyles}
        {...props}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" style={iconStyles} />}
          <span className="font-medium">{title}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5" style={chevronStyles} />
        ) : (
          <ChevronDown className="w-5 h-5" style={chevronStyles} />
        )}
      </button>
    );
  }
);

ExpandableHeaderGlass.displayName = 'ExpandableHeaderGlass';
