// ========================================
// TRUST SCORE CARD GLASS COMPONENT
// Overall trust score display with metrics
// ========================================

import { forwardRef } from 'react';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '../ui/glass-card';
import { RainbowProgressGlass } from '../specialized/rainbow-progress-glass';
import { MetricCardGlass, type MetricVariant } from '../composite/metric-card-glass';
import '@/glass-theme.css';

export interface MetricData {
  readonly title: string;
  readonly value: string | number;
  readonly variant: MetricVariant;
}

export interface TrustScoreCardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly score?: number;
  readonly metrics?: readonly MetricData[];
}

export const TrustScoreCardGlass = forwardRef<HTMLDivElement, TrustScoreCardGlassProps>(
  ({ score = 72, metrics = [], className, ...props }, ref) => {
    return (
      <GlassCard
        ref={ref}
        className={cn('p-4 md:p-5', className)}
        intensity="strong"
        glow="cyan"
        hover={false}
        {...props}
      >
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2
            className="font-semibold flex items-center gap-1.5 md:gap-2 text-base md:text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            <Target className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--text-accent)' }} />
            Overall Trust Score
          </h2>
          <div className="flex items-center gap-1.5 md:gap-2 animate-[score-pulse_2s_ease-in-out_infinite]">
            <span
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--score-gradient)' }}
            >
              {score}
            </span>
            <span className="text-lg md:text-xl" style={{ color: 'var(--text-muted)' }}>
              / 100
            </span>
          </div>
        </div>
        <RainbowProgressGlass value={score} size="lg" showGlow />
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-5">
            {metrics.map((m) => (
              <MetricCardGlass key={m.title} title={m.title} value={m.value} variant={m.variant} />
            ))}
          </div>
        )}
      </GlassCard>
    );
  }
);

TrustScoreCardGlass.displayName = 'TrustScoreCardGlass';
