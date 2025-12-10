import { forwardRef, useMemo, type CSSProperties } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  sparklineContainerVariants,
  sparklineBarVariants,
} from '@/lib/variants/sparkline-glass-variants';
import '@/glass-theme.css';

export interface SparklineGlassProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>,
    VariantProps<typeof sparklineContainerVariants> {
  /** Массив числовых значений для отображения */
  readonly data: readonly number[];
  /** Подписи для каждого бара */
  readonly labels?: readonly string[];
  /** Показывать подписи под барами */
  readonly showLabels?: boolean;
  /** Подсветить максимальное значение другим цветом */
  readonly highlightMax?: boolean;
  /** Цвет обычных баров */
  readonly barColor?: string;
  /** Цвет максимального бара */
  readonly maxBarColor?: string;
  /** Tooltips для каждого бара */
  readonly tooltips?: readonly string[];
  /** Анимация появления */
  readonly animated?: boolean;
  /** Минимальная высота бара в % */
  readonly minBarHeightPercent?: number;
}

export const SparklineGlass = forwardRef<HTMLDivElement, SparklineGlassProps>(
  (
    {
      data,
      labels,
      showLabels = false,
      highlightMax = false,
      barColor,
      maxBarColor,
      tooltips,
      height = 'md',
      gap = 'sm',
      animated = false,
      minBarHeightPercent = 4,
      className,
      ...props
    },
    ref
  ) => {
    const { maxValue, maxIndex } = useMemo(() => {
      const max = Math.max(...data, 0);
      return { maxValue: max, maxIndex: data.indexOf(max) };
    }, [data]);

    const ariaLabel = useMemo(() => {
      if (data.length === 0) return 'Empty sparkline chart';
      return `Sparkline chart with ${data.length} data points, maximum value ${maxValue}${
        labels ? ` at ${labels[maxIndex] || `position ${maxIndex + 1}`}` : ''
      }`;
    }, [data, maxValue, maxIndex, labels]);

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={cn('flex flex-col', className)}
        {...props}
      >
        <div className={cn(sparklineContainerVariants({ height, gap }))}>
          {data.map((value, index) => {
            const heightPercent =
              maxValue > 0
                ? Math.max((value / maxValue) * 100, minBarHeightPercent)
                : minBarHeightPercent;
            const isMax = highlightMax && index === maxIndex && value > 0;

            const barStyle: CSSProperties = {
              height: `${heightPercent}%`,
              backgroundColor: isMax
                ? (maxBarColor ?? 'var(--sparkline-bar-max)')
                : (barColor ?? 'var(--sparkline-bar-fill)'),
              animationDelay: animated ? `${index * 50}ms` : undefined,
            };

            return (
              <div
                key={index}
                className={cn(sparklineBarVariants({ animated }))}
                style={barStyle}
                aria-hidden="true"
                title={tooltips?.[index]}
              />
            );
          })}
        </div>

        {showLabels && labels && labels.length > 0 && (
          <div className="flex mt-1" aria-hidden="true">
            {labels.map((label, index) => (
              <span
                key={index}
                className={cn(
                  'flex-1 text-center leading-none truncate',
                  'text-[length:var(--sparkline-label-size)]',
                  'text-[color:var(--sparkline-label-color)]'
                )}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SparklineGlass.displayName = 'SparklineGlass';
