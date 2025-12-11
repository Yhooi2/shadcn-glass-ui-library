/* eslint-disable react-refresh/only-export-components */
// ========================================
// CHART COMPONENTS (shadcn/ui pattern)
// Base chart utilities following shadcn/ui Charts API
// ========================================

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';

// ========================================
// CHART CONFIG TYPE
// ========================================

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: { light: string; dark: string } }
  );
};

// ========================================
// CHART CONTEXT
// ========================================

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

// ========================================
// CHART CONTAINER
// ========================================

interface ChartContainerProps
  extends React.ComponentProps<'div'>, Pick<ChartContextProps, 'config'> {
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-[var(--text-muted)] [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[var(--glass-border)] [&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--glass-border)] [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-[var(--glass-border)] [&_.recharts-radial-bar-background-sector]:fill-[var(--glass-frost-5)] [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--glass-frost-10)] [&_.recharts-reference-line_[stroke='#ccc']]:stroke-[var(--glass-border)] [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = 'ChartContainer';

// ========================================
// CHART STYLE (CSS Variables injection)
// ========================================

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.color || itemConfig.theme
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart="${id}"] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.color || itemConfig.theme?.light;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}

[data-theme="glass"] [data-chart="${id}"],
.dark [data-chart="${id}"] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.dark || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}
`,
      }}
    />
  );
};

// ========================================
// CHART TOOLTIP
// ========================================

const ChartTooltip = RechartsPrimitive.Tooltip;

interface TooltipPayloadItem {
  dataKey?: string | number;
  name?: string;
  value?: number;
  color?: string;
  payload?: Record<string, unknown>;
  fill?: string;
  type?: string;
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  className?: string;
  labelClassName?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: 'line' | 'dot' | 'dashed';
  nameKey?: string;
  labelKey?: string;
  labelFormatter?: (label: string, payload: TooltipPayloadItem[]) => React.ReactNode;
  valueFormatter?: (value: number) => string;
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      nameKey,
      labelKey,
      valueFormatter,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter && typeof label === 'string') {
        return (
          <div className={cn('font-medium', labelClassName)}>{labelFormatter(label, payload)}</div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn('font-medium', labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2.5 py-1.5 text-xs shadow-xl backdrop-blur-md',
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item: TooltipPayloadItem, index: number) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = item.fill || item.color;

            return (
              <div
                key={`${item.dataKey}-${index}`}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-[var(--text-muted)]',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {itemConfig?.icon ? (
                  <itemConfig.icon />
                ) : (
                  !hideIndicator && (
                    <div
                      className={cn(
                        'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                        {
                          'h-2.5 w-2.5': indicator === 'dot',
                          'w-1': indicator === 'line',
                          'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                          'my-0.5': nestLabel && indicator === 'dashed',
                        }
                      )}
                      style={
                        {
                          '--color-bg': indicatorColor,
                          '--color-border': indicatorColor,
                        } as React.CSSProperties
                      }
                    />
                  )
                )}
                <div
                  className={cn(
                    'flex flex-1 justify-between leading-none',
                    nestLabel ? 'items-end' : 'items-center'
                  )}
                >
                  <div className="grid gap-1.5">
                    {nestLabel ? tooltipLabel : null}
                    <span className="text-[var(--text-muted)]">
                      {itemConfig?.label || item.name}
                    </span>
                  </div>
                  {item.value !== undefined && (
                    <span className="font-mono font-medium tabular-nums text-[var(--text-primary)]">
                      {valueFormatter ? valueFormatter(item.value) : item.value.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltipContent';

// ========================================
// CHART LEGEND
// ========================================

const ChartLegend = RechartsPrimitive.Legend;

interface LegendPayloadItem {
  value?: string;
  dataKey?: string | number;
  color?: string;
}

interface ChartLegendContentProps extends React.ComponentProps<'div'> {
  payload?: LegendPayloadItem[];
  verticalAlign?: 'top' | 'bottom';
  hideIcon?: boolean;
  nameKey?: string;
}

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className
        )}
      >
        {payload.map((item: LegendPayloadItem) => {
          const key = `${nameKey || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-[var(--text-muted)]'
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = 'ChartLegendContent';

// ========================================
// HELPER FUNCTIONS
// ========================================

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in config) {
    return config[key];
  }

  if (payloadPayload && key in payloadPayload) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

// ========================================
// EXPORTS
// ========================================

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
};
