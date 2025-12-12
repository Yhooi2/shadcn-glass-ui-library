// ========================================
// RAINBOW PROGRESS GLASS COMPONENT
// Animated rainbow gradient progress bar
// ========================================

import { forwardRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import '@/glass-theme.css';

export type RainbowProgressSize = 'sm' | 'md' | 'lg' | 'xl';

export interface RainbowProgressGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly value: number;
  readonly size?: RainbowProgressSize;
  readonly showGlow?: boolean;
}

const sizeClasses: Record<RainbowProgressSize, string> = {
  sm: 'h-2.5 md:h-2',
  md: 'h-3.5 md:h-3',
  lg: 'h-[1.125rem] md:h-4',
  xl: 'h-6 md:h-5',
};

export const RainbowProgressGlass = forwardRef<HTMLDivElement, RainbowProgressGlassProps>(
  ({ value, size = 'lg', showGlow = true, className, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    const trackStyles: CSSProperties = {
      background: 'var(--progress-bg)',
    };

    const fillStyles: CSSProperties = {
      width: `${clampedValue}%`,
      background: 'var(--rainbow-gradient)',
      boxShadow: showGlow ? 'var(--rainbow-glow)' : 'none',
      animation: showGlow ? 'var(--rainbow-animation)' : 'none',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-full overflow-hidden', sizeClasses[size], className)}
        style={trackStyles}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Rainbow progress: ${clampedValue}%`}
        {...props}
      >
        <div className="h-full rounded-full transition-all duration-1000" style={fillStyles} />
      </div>
    );
  }
);

RainbowProgressGlass.displayName = 'RainbowProgressGlass';
