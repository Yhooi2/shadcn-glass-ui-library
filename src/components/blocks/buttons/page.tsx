// ========================================
// BUTTONS BLOCK
// Demo showcase of button components
// Level 5: Block (shadcn/ui pattern)
// ========================================

import { forwardRef, type HTMLAttributes } from 'react';
import { Sparkles, Settings, Eye, Trash2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/GlassCard';
import { ButtonGlass } from '@/components/ButtonGlass';
import '@/glass-theme.css';

export interface ButtonsBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Show section title */
  readonly showTitle?: boolean;
}

export const ButtonsBlock = forwardRef<HTMLDivElement, ButtonsBlockProps>(
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
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Buttons with Glow & Pulse
          </h2>
        )}

        <div className="space-y-6">
          {/* Button Variants */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Button Variants
            </label>
            <div className="flex flex-wrap gap-3">
              <ButtonGlass variant="primary" icon={Sparkles}>
                Primary
              </ButtonGlass>
              <ButtonGlass variant="secondary" icon={Settings}>
                Secondary
              </ButtonGlass>
              <ButtonGlass variant="ghost" icon={Eye}>
                Ghost
              </ButtonGlass>
              <ButtonGlass variant="danger" icon={Trash2}>
                Danger
              </ButtonGlass>
              <ButtonGlass variant="success" icon={Check}>
                Success
              </ButtonGlass>
            </div>
          </div>

          {/* Button Sizes & States */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Sizes & States
            </label>
            <div className="flex flex-wrap gap-3">
              <ButtonGlass size="sm">Small</ButtonGlass>
              <ButtonGlass size="md">Medium</ButtonGlass>
              <ButtonGlass size="lg">Large</ButtonGlass>
              <ButtonGlass loading>Loading</ButtonGlass>
              <ButtonGlass disabled>Disabled</ButtonGlass>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Icon Positions
            </label>
            <div className="flex flex-wrap gap-3">
              <ButtonGlass icon={Sparkles} iconPosition="left">
                Icon Left
              </ButtonGlass>
              <ButtonGlass icon={Sparkles} iconPosition="right">
                Icon Right
              </ButtonGlass>
              <ButtonGlass variant="primary" size="icon" icon={Sparkles} />
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }
);

ButtonsBlock.displayName = 'ButtonsBlock';
