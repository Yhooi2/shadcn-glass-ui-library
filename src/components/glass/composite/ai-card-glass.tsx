/**
 * AICardGlass Component
 *
 * AI-themed interactive card with feature list and generate button.
 * Designed for AI analysis, report generation, and ML-powered features.
 *
 * ## Features
 * - AI-themed Sparkles icon with accent color
 * - Customizable features list with checkmark icons (default: 3 items)
 * - Generate button with Zap icon for action trigger
 * - Estimated time display with Clock icon
 * - Hover lift effect via InteractiveCard primitive
 * - Responsive sizing (full-width on mobile, fixed width on desktop)
 * - Theme-aware accent colors for icons and title
 *
 * ## CSS Variables
 * - `--ai-card-bg` - Card background color
 * - `--ai-card-border` - Card border color
 * - `--ai-card-hover-glow` - Glow effect on hover
 * - `--text-accent` - Accent color for title and Sparkles icon
 * - `--text-secondary` - Description text color
 * - `--text-muted` - Feature list and time text color
 * - `--status-online` - Green checkmark color for features
 *
 * @example Basic usage
 * ```tsx
 * import { AICardGlass } from 'shadcn-glass-ui'
 *
 * function Dashboard() {
 *   return (
 *     <AICardGlass
 *       onGenerate={() => console.log('Generating report...')}
 *     />
 *   )
 * }
 * ```
 *
 * @example Custom features and timing
 * ```tsx
 * <AICardGlass
 *   features={[
 *     'Security analysis',
 *     'Performance metrics',
 *     'Optimization suggestions',
 *     'Dependency audit',
 *   ]}
 *   estimatedTime="~45 seconds"
 *   onGenerate={handleGenerateReport}
 * />
 * ```
 *
 * @example With custom styling
 * ```tsx
 * <AICardGlass
 *   className="lg:w-80"
 *   onGenerate={() => setIsGenerating(true)}
 * />
 * ```
 *
 * @example Without generate handler
 * ```tsx
 * <AICardGlass
 *   features={['Feature detection', 'Pattern recognition', 'Recommendations']}
 * />
 * // Button is still displayed but onClick is undefined
 * ```
 *
 * @accessibility
 * - ButtonGlass has built-in keyboard navigation (Enter/Space)
 * - Sparkles icon includes implicit decorative role
 * - High contrast icons (Sparkles, Check, Zap, Clock) for visual clarity
 * - Responsive text sizing (2xs on mobile, xs on desktop)
 * - Feature list uses semantic `<ul>` and `<li>` elements
 *
 * @since v1.0.0
 */

import { forwardRef } from 'react';
import { Sparkles, Check, Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonGlass } from '../ui/button-glass';
import { InteractiveCard } from '../primitives';
import '@/glass-theme.css';

/**
 * Props for AICardGlass component.
 *
 * Extends standard div attributes with AI card-specific props.
 *
 * @example
 * ```tsx
 * const props: AICardGlassProps = {
 *   onGenerate: () => handleGenerateReport(),
 *   features: ['Security audit', 'Performance analysis'],
 *   estimatedTime: '~1 minute',
 * };
 * ```
 */
export interface AICardGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Callback when generate button is clicked.
   *
   * Triggers the AI report generation or analysis action.
   * Button remains visible even if undefined.
   *
   * @example
   * ```tsx
   * <AICardGlass
   *   onGenerate={() => {
   *     setIsLoading(true);
   *     generateReport().then(setReport);
   *   }}
   * />
   * ```
   */
  readonly onGenerate?: () => void;

  /**
   * List of features included in the AI analysis.
   *
   * Each feature is displayed with a green checkmark icon.
   * Defaults to: "Code quality assessment", "Architecture patterns", "Best practices".
   *
   * @default ['Code quality assessment', 'Architecture patterns', 'Best practices']
   *
   * @example
   * ```tsx
   * <AICardGlass
   *   features={[
   *     'Security analysis',
   *     'Performance metrics',
   *     'Code coverage',
   *     'Dependency audit',
   *   ]}
   * />
   * ```
   */
  readonly features?: readonly string[];

  /**
   * Estimated time for report generation.
   *
   * Displayed below the generate button with a Clock icon.
   *
   * @default "~30 seconds"
   *
   * @example
   * ```tsx
   * <AICardGlass estimatedTime="~2 minutes" />
   * <AICardGlass estimatedTime="< 1 minute" />
   * ```
   */
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
        <ButtonGlass variant="default" size="sm" icon={Zap} onClick={onGenerate} className="w-full">
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
