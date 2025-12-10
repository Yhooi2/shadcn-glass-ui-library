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
  default: { defaultEmoji: '💡', glowVar: '--glow-primary', borderVar: '--glass-border-light' },
  tip: { defaultEmoji: '💡', glowVar: '--glow-info', borderVar: '--glass-accent-info' },
  highlight: { defaultEmoji: '✨', glowVar: '--glow-success', borderVar: '--glass-accent-success' },
  warning: { defaultEmoji: '⚠️', glowVar: '--glow-warning', borderVar: '--glass-accent-warning' },
  stat: { defaultEmoji: '📊', glowVar: null, borderVar: '--glass-border-light' },
  growth: { defaultEmoji: '📈', glowVar: '--glow-success', borderVar: '--glass-accent-success' },
  decline: { defaultEmoji: '📉', glowVar: '--glow-danger', borderVar: '--glass-accent-danger' },
};

export const insightCardVariants = cva('relative rounded-lg transition-all duration-200', {
  variants: {
    inline: {
      true: 'inline-flex items-center gap-1.5',
      false: 'p-3 bg-[var(--glass-frost-5)] border',
    },
    clickable: {
      true: 'cursor-pointer hover:bg-[var(--glass-frost-10)]',
      false: '',
    },
  },
  defaultVariants: {
    inline: false,
    clickable: false,
  },
});
