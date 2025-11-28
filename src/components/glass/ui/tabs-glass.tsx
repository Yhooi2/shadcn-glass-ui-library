/**
 * TabsGlass Component
 *
 * Glass-themed tab navigation with:
 * - Theme-aware styling (glass/light/aurora)
 * - Active tab indicator
 * - Smooth transitions
 */

import { forwardRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';
import { themeStyles } from '@/lib/themeStyles';
import '@/glass-theme.css';

// ========================================
// TYPES
// ========================================

export interface TabItem {
  readonly id: string;
  readonly label: string;
}

// ========================================
// PROPS INTERFACE
// ========================================

export interface TabsGlassProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly tabs: readonly TabItem[];
  readonly activeTab: string;
  readonly onChange: (tabId: string) => void;
}

// ========================================
// COMPONENT
// ========================================

export const TabsGlass = forwardRef<HTMLDivElement, TabsGlassProps>(
  ({ className, tabs, activeTab, onChange, ...props }, ref) => {
    const { theme } = useTheme();
    const t = themeStyles[theme];

    const containerStyles: CSSProperties = {
      background: t.glassSubtleBg,
      border: `1px solid ${t.glassSubtleBorder}`,
    };

    const getTabStyles = (isActive: boolean): CSSProperties => ({
      background: isActive ? t.tabActiveBg : t.tabBg,
      color: isActive ? t.tabActiveText : t.textSecondary,
    });

    return (
      <div
        ref={ref}
        className={cn('flex gap-1 p-1 rounded-xl', className)}
        style={containerStyles}
        role="tablist"
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              style={getTabStyles(isActive)}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
              {isActive && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: t.tabIndicator }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

TabsGlass.displayName = 'TabsGlass';
