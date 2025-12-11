// ========================================
// AI CARD GLASS COMPONENT
// AI summary card with feature list
// ========================================

import { forwardRef } from 'react';
import { Sparkles, Check, Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonGlass } from '../ui/button-glass';
import { InteractiveCard } from '../primitives';
import '@/glass-theme.css';

export interface AICardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly onGenerate?: () => void;
  readonly features?: readonly string[];
  readonly estimatedTime?: string;
}

const defaultFeatures: readonly string[] = [
  'Code quality assessment',
  'Architecture patterns',
  'Best practices',
];

export const AICardGlass = forwardRef<HTMLDivElement, AICardGlassProps>(
  (
    { onGenerate, features = defaultFeatures, estimatedTime = '~30 seconds', className, ...props },
    ref
  ) => {
    return (
      <InteractiveCard
        ref={ref}
        baseBg="var(--ai-card-bg)"
        borderColor="var(--ai-card-border)"
        hoverGlow="var(--ai-card-hover-glow)"
        hoverLift
        blur="sm"
        rounded="rounded-xl"
        className={cn('w-full sm:w-56 md:w-64 p-3 md:p-4', className)}
        {...props}
      >
        <div
          className="flex items-center gap-1.5 md:gap-2 font-semibold text-xs md:text-sm mb-1.5 md:mb-2"
          style={{ color: 'var(--text-accent)' }}
        >
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
          AI Summary
        </div>
        <p className="text-(length:--font-size-2xs) md:text-xs mb-1.5 md:mb-2 text-(--text-secondary)">
          Get comprehensive analysis:
        </p>
        <ul className="text-(length:--font-size-2xs) md:text-xs space-y-0.5 md:space-y-1 mb-2 md:mb-3">
          {features.map((feature, i) => (
            <li
              key={`feature-${i}`}
              className="flex items-center gap-1"
              style={{ color: 'var(--text-muted)' }}
            >
              <Check
                className="w-2.5 h-2.5 md:w-3 md:h-3"
                style={{ color: 'var(--status-online)' }}
              />
              {feature}
            </li>
          ))}
        </ul>
        <ButtonGlass variant="primary" size="sm" icon={Zap} onClick={onGenerate} className="w-full">
          Generate Report
        </ButtonGlass>
        <p className="text-(length:--font-size-2xs) md:text-xs mt-1.5 md:mt-2 text-center flex items-center justify-center gap-1 text-(--text-muted)">
          <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
          {estimatedTime}
        </p>
      </InteractiveCard>
    );
  }
);

AICardGlass.displayName = 'AICardGlass';
