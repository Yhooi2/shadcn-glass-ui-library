import { cva } from 'class-variance-authority';

export type InsightVariant =
  | 'default'
  | 'tip'
  | 'highlight'
  | 'warning'
  | 'stat'
  | 'growth'
  | 'decline';

export const insightVariantConfig: Record<
  InsightVariant,
  {
    defaultEmoji: string;
    glowVar: string | null;
    borderVar: string;
  }
> = {
  default: { defaultEmoji: '💡', glowVar: '--glow-primary', borderVar: '--glass-border' },
  tip: { defaultEmoji: '💡', glowVar: '--glow-secondary', borderVar: '--alert-default-border' },
  highlight: { defaultEmoji: '✨', glowVar: '--glow-success', borderVar: '--alert-success-border' },
  warning: { defaultEmoji: '⚠️', glowVar: '--glow-warning', borderVar: '--alert-warning-border' },
  stat: { defaultEmoji: '📊', glowVar: null, borderVar: '--glass-border' },
  growth: { defaultEmoji: '📈', glowVar: '--glow-success', borderVar: '--alert-success-border' },
  decline: { defaultEmoji: '📉', glowVar: '--glow-error', borderVar: '--alert-destructive-border' },
};

export const insightCardVariants = cva('relative rounded-lg transition-all duration-200', {
  variants: {
    inline: {
      true: 'inline-flex items-center gap-1.5',
      false: 'p-3 bg-[var(--glass-bg-subtle)] border',
    },
    clickable: {
      true: 'cursor-pointer hover:bg-[var(--glass-bg)]',
      false: '',
    },
  },
  defaultVariants: {
    inline: false,
    clickable: false,
  },
});
