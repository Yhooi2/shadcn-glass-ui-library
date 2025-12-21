# YearCardGlass

Year card component with glassmorphism styling for career timeline displays. 100% API compatible
with compound component patterns.

## Overview

`YearCardGlass` provides a modern card for displaying yearly metrics and statistics with expandable
details, sparkline visualizations, and insight items. It supports both legacy props-based and
compound component APIs.

### Key Features

- **Dual API Support** - Legacy props API for quick setup, compound API for full control
- **Expandable Content** - Click to reveal detailed statistics and insights
- **Sparkline Visualization** - Mini bar charts for monthly activity trends
- **Insight Cards** - 7 variants for tips, warnings, highlights, and statistics
- **Selection State** - Controlled selection for timeline navigation
- **Glassmorphism** - Backdrop blur, glow effects, CSS variables
- **Theme Support** - Works with all 3 themes (glass, light, aurora)
- **Responsive** - Adapts to mobile and desktop viewports

### Browser Compatibility

- Chrome 89+
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

```tsx
import { YearCardGlass, useYearCard } from 'shadcn-glass-ui';
```

---

## Compound API Reference

### Component Structure

```tsx
<YearCardGlass.Root
  isSelected={selected}
  onSelect={handleSelect}
  isExpanded={expanded}
  onExpandedChange={setExpanded}
>
  <YearCardGlass.Header>
    <YearCardGlass.Year>2024</YearCardGlass.Year>
    <YearCardGlass.Badge emoji="🚀" label="Breakthrough" />
    <YearCardGlass.Value>1,234 commits</YearCardGlass.Value>
  </YearCardGlass.Header>

  <YearCardGlass.Progress value={75} gradient="blue" />
  <YearCardGlass.Sparkline data={monthlyData} height="sm" />

  <YearCardGlass.ExpandedContent>
    <YearCardGlass.Stats columns={3}>
      <YearCardGlass.StatItem label="Commits" value="1,234" icon={<GitCommit />} />
      <YearCardGlass.StatItem label="PRs" value="56" icon={<GitPullRequest />} />
      <YearCardGlass.StatItem label="Repos" value="12" icon={<FolderGit />} />
    </YearCardGlass.Stats>

    <YearCardGlass.Insights>
      <YearCardGlass.InsightItem variant="growth" text="Activity Growth" detail="+47%" />
    </YearCardGlass.Insights>

    <YearCardGlass.Action onClick={onShowYear}>Show repos from 2024</YearCardGlass.Action>
  </YearCardGlass.ExpandedContent>
</YearCardGlass.Root>
```

### Full Component List

| Component         | Description                                      |
| ----------------- | ------------------------------------------------ |
| `Root`            | Context provider with selection and expand state |
| `Header`          | Header section with chevron indicator            |
| `Year`            | Year display (styled text)                       |
| `Badge`           | Emoji + label badge (uses BadgeGlass internally) |
| `Value`           | Commits/metrics value display                    |
| `Progress`        | Progress bar (uses ProgressGlass)                |
| `Sparkline`       | Mini bar chart (uses SparklineGlass)             |
| `ExpandedContent` | Container for expanded details (auto-hides)      |
| `Stats`           | Grid container for stat items                    |
| `StatItem`        | Single stat with label, value, and optional icon |
| `Insights`        | Container for insight items                      |
| `InsightItem`     | Single insight (uses InsightCardGlass)           |
| `Action`          | Action button (uses ButtonGlass)                 |

---

## Props API

### Root Props

| Prop               | Type                          | Default | Description                 |
| ------------------ | ----------------------------- | ------- | --------------------------- |
| `isSelected`       | `boolean`                     | `false` | Whether card is selected    |
| `isExpanded`       | `boolean`                     | `false` | Whether card is expanded    |
| `onSelect`         | `() => void`                  | -       | Selection callback          |
| `onExpandedChange` | `(expanded: boolean) => void` | -       | Expand state change handler |
| `className`        | `string`                      | -       | Custom className            |

### Header Props

| Prop        | Type        | Default | Description      |
| ----------- | ----------- | ------- | ---------------- |
| `children`  | `ReactNode` | -       | Header content   |
| `className` | `string`    | -       | Custom className |

### Year Props

| Prop        | Type        | Default | Description      |
| ----------- | ----------- | ------- | ---------------- |
| `children`  | `ReactNode` | -       | Year text        |
| `className` | `string`    | -       | Custom className |

### Badge Props

| Prop        | Type     | Default | Description      |
| ----------- | -------- | ------- | ---------------- |
| `emoji`     | `string` | -       | Emoji icon       |
| `label`     | `string` | -       | Badge text       |
| `className` | `string` | -       | Custom className |

### Value Props

| Prop        | Type        | Default | Description      |
| ----------- | ----------- | ------- | ---------------- |
| `children`  | `ReactNode` | -       | Value text       |
| `className` | `string`    | -       | Custom className |

### Progress Props

| Prop        | Type               | Default  | Description      |
| ----------- | ------------------ | -------- | ---------------- |
| `value`     | `number`           | -        | Progress (0-100) |
| `gradient`  | `ProgressGradient` | `'blue'` | Color gradient   |
| `className` | `string`           | -        | Custom className |

**ProgressGradient options:** `'blue'`, `'emerald'`, `'violet'`, `'amber'`, `'rose'`

### Sparkline Props

| Prop         | Type                   | Default | Description             |
| ------------ | ---------------------- | ------- | ----------------------- |
| `data`       | `readonly number[]`    | -       | Array of values         |
| `labels`     | `readonly string[]`    | -       | X-axis labels           |
| `showLabels` | `boolean`              | `false` | Show labels below chart |
| `height`     | `'sm' \| 'md' \| 'lg'` | `'sm'`  | Chart height            |
| `className`  | `string`               | -       | Custom className        |

### ExpandedContent Props

| Prop        | Type        | Default | Description                 |
| ----------- | ----------- | ------- | --------------------------- |
| `children`  | `ReactNode` | -       | Content shown when expanded |
| `className` | `string`    | -       | Custom className            |

**Note:** This component automatically hides when `isExpanded` is `false`.

### Stats Props

| Prop        | Type        | Default | Description                       |
| ----------- | ----------- | ------- | --------------------------------- |
| `children`  | `ReactNode` | -       | StatItem children                 |
| `columns`   | `number`    | auto    | Grid columns (auto from children) |
| `className` | `string`    | -       | Custom className                  |

### StatItem Props

| Prop        | Type               | Default | Description      |
| ----------- | ------------------ | ------- | ---------------- |
| `label`     | `string`           | -       | Stat label       |
| `value`     | `string \| number` | -       | Stat value       |
| `icon`      | `ReactNode`        | -       | Optional icon    |
| `className` | `string`           | -       | Custom className |

### Insights Props

| Prop        | Type        | Default | Description      |
| ----------- | ----------- | ------- | ---------------- |
| `children`  | `ReactNode` | -       | InsightItem list |
| `className` | `string`    | -       | Custom className |

### InsightItem Props

| Prop        | Type             | Default     | Description      |
| ----------- | ---------------- | ----------- | ---------------- |
| `variant`   | `InsightVariant` | `'default'` | Insight style    |
| `emoji`     | `string`         | -           | Emoji icon       |
| `text`      | `string`         | -           | Main text        |
| `detail`    | `string`         | -           | Detail text      |
| `className` | `string`         | -           | Custom className |

**InsightVariant options:** `'default'`, `'tip'`, `'highlight'`, `'warning'`, `'stat'`, `'growth'`,
`'decline'`

### Action Props

| Prop        | Type                            | Default | Description      |
| ----------- | ------------------------------- | ------- | ---------------- |
| `children`  | `ReactNode`                     | -       | Button text      |
| `onClick`   | `(e: React.MouseEvent) => void` | -       | Click handler    |
| `className` | `string`                        | -       | Custom className |

---

## Usage Examples

### Basic Compound API

```tsx
import { useState } from 'react';
import { YearCardGlass } from 'shadcn-glass-ui';

function BasicYearCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
      <YearCardGlass.Header>
        <YearCardGlass.Year>2024</YearCardGlass.Year>
        <YearCardGlass.Badge emoji="🚀" label="Breakthrough" />
        <YearCardGlass.Value>1,234 commits</YearCardGlass.Value>
      </YearCardGlass.Header>
      <YearCardGlass.Progress value={75} gradient="blue" />
    </YearCardGlass.Root>
  );
}
```

---

### Career Timeline

```tsx
import { useState } from 'react';
import { YearCardGlass } from 'shadcn-glass-ui';
import { GitCommit, GitPullRequest } from 'lucide-react';

function CareerTimeline() {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const years = [
    {
      year: 2024,
      emoji: '🏆',
      label: 'Champion',
      commits: '4,123',
      progress: 95,
      gradient: 'amber',
    },
    {
      year: 2023,
      emoji: '🚀',
      label: 'Breakthrough',
      commits: '2,567',
      progress: 78,
      gradient: 'violet',
    },
    {
      year: 2022,
      emoji: '🌱',
      label: 'Growing',
      commits: '1,234',
      progress: 55,
      gradient: 'emerald',
    },
  ];

  return (
    <div className="space-y-3">
      {years.map(({ year, emoji, label, commits, progress, gradient }) => (
        <YearCardGlass.Root
          key={year}
          isExpanded={expandedYear === year}
          onExpandedChange={(expanded) => setExpandedYear(expanded ? year : null)}
          isSelected={expandedYear === year}
        >
          <YearCardGlass.Header>
            <YearCardGlass.Year>{year}</YearCardGlass.Year>
            <YearCardGlass.Badge emoji={emoji} label={label} />
            <YearCardGlass.Value>{commits}</YearCardGlass.Value>
          </YearCardGlass.Header>
          <YearCardGlass.Progress value={progress} gradient={gradient} />
          <YearCardGlass.ExpandedContent>
            <YearCardGlass.Stats>
              <YearCardGlass.StatItem label="Commits" value={commits} icon={<GitCommit />} />
              <YearCardGlass.StatItem label="PRs" value={progress * 2} icon={<GitPullRequest />} />
            </YearCardGlass.Stats>
          </YearCardGlass.ExpandedContent>
        </YearCardGlass.Root>
      ))}
    </div>
  );
}
```

---

### With Sparkline Visualization

```tsx
import { YearCardGlass } from 'shadcn-glass-ui';
import { GitCommit, GitPullRequest, FolderGit, Star } from 'lucide-react';

function SparklineCard() {
  const [expanded, setExpanded] = useState(true);
  const monthlyData = [89, 112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334];
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
      <YearCardGlass.Header>
        <YearCardGlass.Year>2024</YearCardGlass.Year>
        <YearCardGlass.Badge emoji="📊" label="Analytics" />
        <YearCardGlass.Value>2,345 commits</YearCardGlass.Value>
      </YearCardGlass.Header>

      {/* Collapsed: mini sparkline next to progress */}
      <div className="flex items-center gap-2">
        <YearCardGlass.Progress value={85} gradient="blue" />
        <YearCardGlass.Sparkline data={monthlyData} height="sm" className="w-20" />
      </div>

      <YearCardGlass.ExpandedContent>
        {/* Expanded: full sparkline with labels */}
        <YearCardGlass.Sparkline
          data={monthlyData}
          labels={monthLabels}
          showLabels
          height="md"
          className="w-full"
        />

        <YearCardGlass.Stats columns={4}>
          <YearCardGlass.StatItem label="Commits" value="2,345" icon={<GitCommit />} />
          <YearCardGlass.StatItem label="PRs" value="189" icon={<GitPullRequest />} />
          <YearCardGlass.StatItem label="Repos" value="15" icon={<FolderGit />} />
          <YearCardGlass.StatItem label="Stars" value="1.2k" icon={<Star />} />
        </YearCardGlass.Stats>

        <YearCardGlass.Action onClick={() => console.log('View details')}>
          View detailed analytics
        </YearCardGlass.Action>
      </YearCardGlass.ExpandedContent>
    </YearCardGlass.Root>
  );
}
```

---

### With Insights

```tsx
import { YearCardGlass } from 'shadcn-glass-ui';

function InsightsCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
      <YearCardGlass.Header>
        <YearCardGlass.Year>2024</YearCardGlass.Year>
        <YearCardGlass.Badge emoji="🔥" label="Record Year" />
        <YearCardGlass.Value>3,456 commits</YearCardGlass.Value>
      </YearCardGlass.Header>
      <YearCardGlass.Progress value={95} gradient="amber" />

      <YearCardGlass.ExpandedContent>
        <YearCardGlass.Stats columns={3}>
          <YearCardGlass.StatItem label="Commits" value="3,456" />
          <YearCardGlass.StatItem label="PRs" value="412" />
          <YearCardGlass.StatItem label="Repos" value="24" />
        </YearCardGlass.Stats>

        <YearCardGlass.Insights>
          <YearCardGlass.InsightItem
            variant="growth"
            emoji="📈"
            text="Activity Growth"
            detail="+47% from last year"
          />
          <YearCardGlass.InsightItem
            variant="highlight"
            emoji="🎯"
            text="Best Month"
            detail="April: 456 commits"
          />
          <YearCardGlass.InsightItem
            variant="warning"
            emoji="⚠️"
            text="Notice"
            detail="Low activity in December"
          />
        </YearCardGlass.Insights>

        <YearCardGlass.Action onClick={() => console.log('Show repos')}>
          Show repos from 2024
        </YearCardGlass.Action>
      </YearCardGlass.ExpandedContent>
    </YearCardGlass.Root>
  );
}
```

---

### Legacy API (Backward Compatible)

```tsx
import { YearCardGlass } from 'shadcn-glass-ui';

function LegacyCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <YearCardGlass
      year={2024}
      emoji="🚀"
      label="Breakthrough"
      commits="1,234"
      progress={75}
      isExpanded={expanded}
      gradient="blue"
      prs={56}
      repos={12}
      sparklineData={[89, 112, 134, 156, 178, 201, 223, 245, 267, 289, 312, 334]}
      insights={[
        { variant: 'growth', text: 'Activity Growth', detail: '+47% from last year' },
        { variant: 'highlight', text: 'Best Month', detail: 'April: 456 commits' },
      ]}
      onShowYear={() => console.log('Show 2024')}
      onClick={() => setExpanded(!expanded)}
    />
  );
}
```

---

## Hook: useYearCard()

Access the YearCardGlass context from any child component:

```tsx
import { useYearCard } from 'shadcn-glass-ui';

function CustomYearContent() {
  const {
    isSelected, // Current selection state
    isExpanded, // Current expanded state
    onSelect, // Trigger selection
    onExpandedChange, // Change expanded state
  } = useYearCard();

  return (
    <div>
      {isExpanded && <p>Card is expanded</p>}
      {isSelected && <p>Card is selected</p>}
    </div>
  );
}
```

**Note:** `useYearCardOptional()` is also available for contexts where the provider may not exist.

---

## Migration from Legacy API

### Before (Legacy API)

```tsx
<YearCardGlass
  year={2024}
  emoji="🚀"
  label="Breakthrough"
  commits="1,234"
  progress={75}
  isExpanded={expanded}
  prs={56}
  repos={12}
  insights={[{ variant: 'growth', text: 'Growth', detail: '+47%' }]}
  onShowYear={handleShow}
  onClick={() => setExpanded(!expanded)}
/>
```

### After (Compound API)

```tsx
<YearCardGlass.Root isExpanded={expanded} onExpandedChange={setExpanded}>
  <YearCardGlass.Header>
    <YearCardGlass.Year>2024</YearCardGlass.Year>
    <YearCardGlass.Badge emoji="🚀" label="Breakthrough" />
    <YearCardGlass.Value>1,234 commits</YearCardGlass.Value>
  </YearCardGlass.Header>
  <YearCardGlass.Progress value={75} gradient="blue" />
  <YearCardGlass.ExpandedContent>
    <YearCardGlass.Stats>
      <YearCardGlass.StatItem label="PRs" value={56} />
      <YearCardGlass.StatItem label="Repos" value={12} />
    </YearCardGlass.Stats>
    <YearCardGlass.Insights>
      <YearCardGlass.InsightItem variant="growth" text="Growth" detail="+47%" />
    </YearCardGlass.Insights>
    <YearCardGlass.Action onClick={handleShow}>Show repos</YearCardGlass.Action>
  </YearCardGlass.ExpandedContent>
</YearCardGlass.Root>
```

**Benefits of Compound API:**

- Full control over layout and ordering
- Custom components between sections
- Conditional rendering of individual parts
- Better tree-shaking for unused sub-components

---

## CSS Variables

YearCardGlass uses CSS variables for theming:

```css
:root {
  --year-card-bg: oklch(var(--glass-bg));
  --year-card-border: oklch(var(--border));
  --year-card-selected-border: oklch(var(--primary));
  --year-card-selected-ring: oklch(var(--primary) / 0.3);
  --year-card-hover-glow: 0 0 20px oklch(var(--glow-color));
  --expanded-bg: oklch(var(--surface));
  --expanded-border: oklch(var(--border-subtle));
}
```

---

## Accessibility

### Semantic HTML

- Card uses `role="button"` with `tabIndex={0}`
- Supports keyboard navigation (Enter/Space to toggle)
- Uses `aria-expanded` for expand state
- Uses `aria-selected` for selection state

### Keyboard Navigation

- **Tab:** Navigate between cards
- **Enter/Space:** Toggle expanded state
- **Focus:** Visual focus ring on active card

### Screen Readers

- Announces expand/collapse state changes
- Stat items labeled with semantic text
- Insight items announce variant and detail

---

## Related Components

- **[SparklineGlass](./SPARKLINE_GLASS.md)** - Bar chart visualization
- **[ProgressGlass](./PROGRESS_GLASS.md)** - Progress bar with gradients
- **[InsightCardGlass](./INSIGHT_CARD_GLASS.md)** - Insight display variants
- **[BadgeGlass](./BADGE_GLASS.md)** - Badge component

---

## Changelog

### v2.1.5 (2025-12-XX)

- Added compound API documentation
- Added 5 new Storybook stories demonstrating compound patterns
- Resolves Issue #16

### v2.0.0

- Added compound component API
- Added `useYearCard` hook
- Added 13 sub-components
- Maintained backward compatibility with legacy API

---

## Support

- **GitHub Issues:** [Report bugs](https://github.com/yhooi2/shadcn-glass-ui-library/issues)
- **Storybook:** [View live examples](https://yhooi2.github.io/shadcn-glass-ui-library/)
- **Documentation:** [CLAUDE.md](../../CLAUDE.md) for AI assistants

---

## License

MIT License - Part of [shadcn-glass-ui-library](https://github.com/yhooi2/shadcn-glass-ui-library)
