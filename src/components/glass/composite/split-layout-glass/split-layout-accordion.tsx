/* eslint-disable react-refresh/only-export-components */
/**
 * SplitLayoutGlass Accordion Components
 *
 * Mobile-specific components that render content in accordion pattern.
 * Details expand below the selected item instead of showing in a separate panel.
 *
 * @module split-layout-accordion
 */

import { forwardRef, type ReactNode, useId, useRef, useEffect, useCallback, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass/ui/glass-card';
import { useSplitLayout, useSplitLayoutOptional } from './split-layout-context';

// ========================================
// ACCORDION ROOT
// ========================================

/**
 * Props for SplitLayoutAccordion.Root component
 * Container for accordion items in mobile view
 */
export interface SplitLayoutAccordionRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * ARIA label for the accordion region
   * @default "Content accordion"
   */
  label?: string;
}

const SplitLayoutAccordionRoot = forwardRef<HTMLDivElement, SplitLayoutAccordionRootProps>(
  ({ children, label = 'Content accordion', className, ...props }, ref) => {
    const context = useSplitLayoutOptional();
    const intensity = context?.intensity ?? 'medium';

    return (
      <GlassCard
        asChild
        intensity={intensity}
        padding="none"
        className={cn('divide-y divide-white/10', className)}
      >
        <div ref={ref} role="region" aria-label={label} data-split-accordion="" {...props}>
          {children}
        </div>
      </GlassCard>
    );
  }
);

SplitLayoutAccordionRoot.displayName = 'SplitLayoutAccordion.Root';

// ========================================
// ACCORDION ITEM
// ========================================

/**
 * Props for SplitLayoutAccordion.Item component
 * A single accordion item with trigger and collapsible content
 */
export interface SplitLayoutAccordionItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  /**
   * Unique key for this item (used for selection)
   */
  itemKey: string;
  /**
   * Content shown in the trigger/header area
   */
  trigger: ReactNode;
  /**
   * Content shown when expanded (details)
   */
  children: ReactNode;
  /**
   * Disable this item
   * @default false
   */
  disabled?: boolean;
}

const SplitLayoutAccordionItem = forwardRef<HTMLDivElement, SplitLayoutAccordionItemProps>(
  ({ itemKey, trigger, children, disabled = false, className, ...props }, ref) => {
    const { selectedKey, setSelectedKey } = useSplitLayout();
    const isExpanded = selectedKey === itemKey;
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const triggerId = useId();
    const contentId = useId();

    // Measure content height for smooth animation
    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [children, isExpanded]);

    const handleToggle = useCallback(() => {
      if (disabled) return;
      setSelectedKey(isExpanded ? null : itemKey);
    }, [disabled, isExpanded, itemKey, setSelectedKey]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            handleToggle();
            break;
          case 'ArrowDown': {
            e.preventDefault();
            // Focus next item trigger
            const next = (e.currentTarget as HTMLElement).parentElement?.nextElementSibling;
            const nextTrigger = next?.querySelector('[data-accordion-trigger]') as HTMLElement;
            nextTrigger?.focus();
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            // Focus previous item trigger
            const prev = (e.currentTarget as HTMLElement).parentElement?.previousElementSibling;
            const prevTrigger = prev?.querySelector('[data-accordion-trigger]') as HTMLElement;
            prevTrigger?.focus();
            break;
          }
          case 'Home': {
            e.preventDefault();
            // Focus first item trigger
            const first = (e.currentTarget as HTMLElement)
              .closest('[data-split-accordion]')
              ?.querySelector('[data-accordion-trigger]') as HTMLElement;
            first?.focus();
            break;
          }
          case 'End': {
            e.preventDefault();
            // Focus last item trigger
            const triggers = (e.currentTarget as HTMLElement)
              .closest('[data-split-accordion]')
              ?.querySelectorAll('[data-accordion-trigger]');
            const last = triggers?.[triggers.length - 1] as HTMLElement;
            last?.focus();
            break;
          }
        }
      },
      [disabled, handleToggle]
    );

    return (
      <div
        ref={ref}
        data-accordion-item=""
        data-state={isExpanded ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        className={cn('overflow-hidden', disabled && 'opacity-50 cursor-not-allowed', className)}
        {...props}
      >
        {/* Trigger/Header */}
        <button
          type="button"
          id={triggerId}
          data-accordion-trigger=""
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex w-full items-center justify-between gap-4',
            'p-4 text-left',
            'transition-colors duration-200',
            'hover:bg-white/5 focus-visible:bg-white/5',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-inset',
            disabled && 'pointer-events-none'
          )}
        >
          <div className="flex-1">{trigger}</div>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-white/60',
              'transition-transform duration-300 ease-out',
              isExpanded && 'rotate-180'
            )}
          />
        </button>

        {/* Content */}
        <div
          id={contentId}
          ref={contentRef}
          role="region"
          aria-labelledby={triggerId}
          data-accordion-content=""
          data-state={isExpanded ? 'open' : 'closed'}
          className={cn('overflow-hidden', 'transition-[max-height,opacity] duration-300 ease-out')}
          style={{
            maxHeight: isExpanded ? (contentHeight ?? 'auto') : 0,
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className="p-4 pt-0 border-t border-white/5">{children}</div>
        </div>
      </div>
    );
  }
);

SplitLayoutAccordionItem.displayName = 'SplitLayoutAccordion.Item';

// ========================================
// COMPOUND EXPORT
// ========================================

/**
 * SplitLayoutAccordion compound component for mobile accordion view
 *
 * @example
 * ```tsx
 * // Use with mobileMode="accordion" in Provider
 * <SplitLayoutGlass.Provider mobileMode="accordion">
 *   {isMobile ? (
 *     <SplitLayoutAccordion.Root>
 *       {years.map((year) => (
 *         <SplitLayoutAccordion.Item
 *           key={year.id}
 *           itemKey={year.id}
 *           trigger={<YearTitle year={year} />}
 *         >
 *           <YearDetails year={year} />
 *         </SplitLayoutAccordion.Item>
 *       ))}
 *     </SplitLayoutAccordion.Root>
 *   ) : (
 *     <SplitLayoutGlass.Root>...</SplitLayoutGlass.Root>
 *   )}
 * </SplitLayoutGlass.Provider>
 * ```
 */
export const SplitLayoutAccordion = {
  Root: SplitLayoutAccordionRoot,
  Item: SplitLayoutAccordionItem,
};

export type { SplitLayoutAccordionRootProps, SplitLayoutAccordionItemProps };
