// ========================================
// TABS GLASS COMPONENT
// Tab navigation with theme support
// ========================================

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import "@/glass-theme.scss";

export interface TabItem {
  readonly id: string;
  readonly label: string;
}

export interface TabsGlassProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  readonly tabs: readonly TabItem[];
  readonly activeTab: string;
  readonly onChange: (tabId: string) => void;
}

export const TabsGlass = forwardRef<HTMLDivElement, TabsGlassProps>(
  ({ className, tabs, activeTab, onChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-tabs",
          "flex gap-1 p-1 rounded-xl",
          className
        )}
        role="tablist"
        {...props}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={cn(
              "glass-tabs__tab",
              "relative px-4 py-2 rounded-lg",
              "text-sm font-medium",
              "transition-all duration-300",
              activeTab === tab.id && "glass-tabs__tab--active"
            )}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div
                className="glass-tabs__indicator absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    );
  }
);

TabsGlass.displayName = "TabsGlass";
