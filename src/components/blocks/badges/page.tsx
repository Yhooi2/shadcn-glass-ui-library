// ========================================
// BADGES BLOCK
// Demo showcase of badge components
// Level 5: Block (shadcn/ui pattern)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass/ui/glass-card';
import { BadgeGlass } from '@/components/glass/ui/badge-glass';
import { TooltipGlassProvider, TooltipGlassSimple } from '@/components/glass/ui/tooltip-glass';
import '@/glass-theme.css';

export interface BadgesBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Show section title */
  readonly showTitle?: boolean;
}

export const BadgesBlock = forwardRef<HTMLDivElement, BadgesBlockProps>(
  ({ showTitle = true, className, ...props }, ref) => {
    return (
      <GlassCard
        ref={ref}
        className={cn('p-6', className)}
        intensity="medium"
        hover={false}
        {...props}
      >
        {showTitle && (
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Badges & Tooltips
          </h2>
        )}

        <div className="space-y-6">
          {/* Badge Variants */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Badge Variants
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              <BadgeGlass variant="default">Default</BadgeGlass>
              <BadgeGlass variant="secondary">Secondary</BadgeGlass>
              <BadgeGlass variant="destructive">Destructive</BadgeGlass>
              <BadgeGlass variant="outline">Outline</BadgeGlass>
              <BadgeGlass variant="success">Success</BadgeGlass>
              <BadgeGlass variant="warning">Warning</BadgeGlass>
              <BadgeGlass variant="info">Info</BadgeGlass>
            </div>
          </div>

          {/* Badge Sizes */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Badge Sizes
            </label>
            <div className="flex items-center gap-2">
              <BadgeGlass size="sm">Small</BadgeGlass>
              <BadgeGlass size="md">Medium</BadgeGlass>
              <BadgeGlass size="lg">Large</BadgeGlass>
            </div>
          </div>

          {/* Tooltips */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Tooltips
            </label>
            <TooltipGlassProvider>
              <div className="flex items-center gap-4">
                <TooltipGlassSimple content="This is a helpful tooltip">
                  <BadgeGlass>Hover me</BadgeGlass>
                </TooltipGlassSimple>
                <TooltipGlassSimple content="Another tooltip example" side="top">
                  <BadgeGlass variant="info">Top tooltip</BadgeGlass>
                </TooltipGlassSimple>
                <TooltipGlassSimple content="Bottom tooltip" side="bottom">
                  <BadgeGlass variant="success">Bottom tooltip</BadgeGlass>
                </TooltipGlassSimple>
              </div>
            </TooltipGlassProvider>
          </div>
        </div>
      </GlassCard>
    );
  }
);

BadgesBlock.displayName = 'BadgesBlock';
