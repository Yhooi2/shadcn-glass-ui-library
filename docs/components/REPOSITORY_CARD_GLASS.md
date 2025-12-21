# RepositoryCardGlass

Expandable repository card component with glassmorphism design.

## Overview

RepositoryCardGlass is a composite component that displays repository information with expandable
details. It features a clean, collapsible interface with support for status indicators, star counts,
language breakdowns, and detailed metrics.

### Key Features

- **Compound Component API** - Flexible composition with 13 sub-components
- **Expandable Details** - Collapsible content with smooth transitions
- **Status Indicators** - Visual feedback with green, yellow, red states
- **Star Display** - GitHub-style star count visualization
- **Issues Alert** - Highlighted warnings and problems
- **Metrics Grid** - Organized display of contribution statistics
- **Language Breakdown** - Visual representation of tech stack
- **Keyboard Navigation** - Enter/Space to expand/collapse
- **Touch-Friendly** - Responsive design for mobile devices
- **Type-Safe** - Full TypeScript support with exported types
- **Accessible** - ARIA attributes and semantic HTML
- **Legacy API Support** - Backward compatible with v1.x props

## Installation

```tsx
import { RepositoryCardGlass } from 'shadcn-glass-ui';
```

## Compound API Reference

### Component Structure

```tsx
<RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
  <RepositoryCardGlass.Header>
    <RepositoryCardGlass.Name>repository-name</RepositoryCardGlass.Name>
    <RepositoryCardGlass.Status type="green" />
    <RepositoryCardGlass.Stars count={42} />
  </RepositoryCardGlass.Header>

  <RepositoryCardGlass.Meta>
    <RepositoryCardGlass.Languages>TypeScript 78% · CSS 22%</RepositoryCardGlass.Languages>
    <RepositoryCardGlass.Stats>134 commits · 100%</RepositoryCardGlass.Stats>
  </RepositoryCardGlass.Meta>

  <RepositoryCardGlass.ExpandedContent>
    <RepositoryCardGlass.Issues issues={['Issue 1', 'Issue 2']} />

    <RepositoryCardGlass.Metrics>
      <RepositoryCardGlass.MetricItem
        label="Your Contribution"
        value="134 commits"
        subtitle="100%"
      />
      <RepositoryCardGlass.MetricItem
        label="Full Project"
        value="134 commits"
        subtitle="~1,608 lines"
      />
    </RepositoryCardGlass.Metrics>

    <RepositoryCardGlass.Actions>
      <ButtonGlass variant="secondary" size="sm">
        GitHub
      </ButtonGlass>
      <ButtonGlass variant="default" size="sm">
        AI Analysis
      </ButtonGlass>
    </RepositoryCardGlass.Actions>
  </RepositoryCardGlass.ExpandedContent>
</RepositoryCardGlass.Root>
```

### Full Component List

| Component         | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `Root`            | Container with context provider and expand/collapse state |
| `Header`          | Clickable header with toggle functionality                |
| `Name`            | Repository name display                                   |
| `Status`          | Status indicator (green/yellow/red)                       |
| `Stars`           | Star count display                                        |
| `Meta`            | Metadata container                                        |
| `Languages`       | Language breakdown display                                |
| `Stats`           | Statistics line (commits, contribution)                   |
| `ExpandedContent` | Collapsible content section                               |
| `Issues`          | Issues alert with warning styling                         |
| `Metrics`         | Metrics grid container                                    |
| `MetricItem`      | Single metric display                                     |
| `Actions`         | Action buttons container                                  |

## Props API

### RepositoryCardGlass.Root

Container with expand/collapse state management.

| Prop        | Type         | Default | Description                       |
| ----------- | ------------ | ------- | --------------------------------- |
| `expanded`  | `boolean`    | `false` | Whether the card is expanded      |
| `onToggle`  | `() => void` | -       | Callback when toggle is triggered |
| `children`  | `ReactNode`  | -       | Sub-components (required)         |
| `className` | `string`     | -       | Additional CSS classes            |

### RepositoryCardGlass.Header

Clickable header section with chevron indicator.

| Prop        | Type        | Default | Description                               |
| ----------- | ----------- | ------- | ----------------------------------------- |
| `children`  | `ReactNode` | -       | Name, Status, Stars components (required) |
| `className` | `string`    | -       | Additional CSS classes                    |

**Features:**

- Automatic chevron icon (up when expanded, down when collapsed)
- Keyboard navigation (Enter/Space to toggle)
- ARIA `aria-expanded` attribute

### RepositoryCardGlass.Name

Repository name display.

| Prop        | Type        | Default | Description                     |
| ----------- | ----------- | ------- | ------------------------------- |
| `children`  | `ReactNode` | -       | Repository name text (required) |
| `className` | `string`    | -       | Additional CSS classes          |

### RepositoryCardGlass.Status

Status indicator wrapper.

| Prop        | Type                           | Default   | Description            |
| ----------- | ------------------------------ | --------- | ---------------------- |
| `type`      | `'green' \| 'yellow' \| 'red'` | `'green'` | Status type            |
| `className` | `string`                       | -         | Additional CSS classes |

**Status Colors:**

- `green` - Active, healthy
- `yellow` - Warning, needs attention
- `red` - Critical, issues detected

### RepositoryCardGlass.Stars

Star count display with icon.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `count`     | `number` | -       | Star count (required)  |
| `className` | `string` | -       | Additional CSS classes |

**Note:** Automatically hidden when `count <= 0`.

### RepositoryCardGlass.Meta

Metadata container for languages and stats.

| Prop        | Type        | Default | Description                               |
| ----------- | ----------- | ------- | ----------------------------------------- |
| `children`  | `ReactNode` | -       | Languages and Stats components (required) |
| `className` | `string`    | -       | Additional CSS classes                    |

### RepositoryCardGlass.Languages

Language breakdown display.

| Prop        | Type        | Default | Description                                      |
| ----------- | ----------- | ------- | ------------------------------------------------ |
| `children`  | `ReactNode` | -       | Language text (e.g., "TypeScript 78% · CSS 22%") |
| `className` | `string`    | -       | Additional CSS classes                           |

### RepositoryCardGlass.Stats

Statistics line (commits, contribution).

| Prop        | Type        | Default | Description                             |
| ----------- | ----------- | ------- | --------------------------------------- |
| `children`  | `ReactNode` | -       | Stats text (e.g., "134 commits · 100%") |
| `className` | `string`    | -       | Additional CSS classes                  |

### RepositoryCardGlass.ExpandedContent

Collapsible content section - only renders when `expanded={true}`.

| Prop        | Type        | Default | Description                                    |
| ----------- | ----------- | ------- | ---------------------------------------------- |
| `children`  | `ReactNode` | -       | Issues, Metrics, Actions components (required) |
| `className` | `string`    | -       | Additional CSS classes                         |

**Features:**

- Conditional rendering (null when collapsed)
- Border-top separator
- Background: `var(--expanded-bg)`
- Border color: `var(--card-border)`

### RepositoryCardGlass.Issues

Issues alert with warning styling.

| Prop        | Type                | Default | Description                        |
| ----------- | ------------------- | ------- | ---------------------------------- |
| `issues`    | `readonly string[]` | -       | Array of issue messages (required) |
| `className` | `string`            | -       | Additional CSS classes             |

**Features:**

- Automatically hidden when `issues.length === 0`
- Alert styling with AlertTriangle icon
- Background: `var(--alert-danger-bg)`
- Border: `var(--alert-danger-border)`
- Text color: `var(--alert-danger-text)`

### RepositoryCardGlass.Metrics

Metrics grid container (2-column layout).

| Prop        | Type        | Default | Description                      |
| ----------- | ----------- | ------- | -------------------------------- |
| `children`  | `ReactNode` | -       | MetricItem components (required) |
| `className` | `string`    | -       | Additional CSS classes           |

**Default Layout:** `grid grid-cols-2 gap-2`

### RepositoryCardGlass.MetricItem

Single metric card.

| Prop        | Type               | Default | Description                              |
| ----------- | ------------------ | ------- | ---------------------------------------- |
| `label`     | `string`           | -       | Metric label (e.g., "Your Contribution") |
| `value`     | `string \| number` | -       | Primary value (e.g., "134 commits")      |
| `subtitle`  | `string`           | -       | Optional subtitle (e.g., "100%")         |
| `className` | `string`           | -       | Additional CSS classes                   |

**Styling:**

- Background: `var(--card-bg)`
- Border: `var(--card-border)`
- Rounded corners: `rounded-lg`

### RepositoryCardGlass.Actions

Action buttons container (responsive flex layout).

| Prop        | Type        | Default | Description                  |
| ----------- | ----------- | ------- | ---------------------------- |
| `children`  | `ReactNode` | -       | Button components (required) |
| `className` | `string`    | -       | Additional CSS classes       |

**Default Layout:**

- Mobile: Column (`flex-col`)
- Desktop: Row (`sm:flex-row`)
- Gap: `gap-2`

## Usage Examples

### Basic Repository Card

```tsx
import { useState } from 'react';
import { RepositoryCardGlass } from 'shadcn-glass-ui';

function BasicCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <RepositoryCardGlass.Header>
        <RepositoryCardGlass.Name>portfolio</RepositoryCardGlass.Name>
        <RepositoryCardGlass.Status type="green" />
        <RepositoryCardGlass.Stars count={5} />
      </RepositoryCardGlass.Header>

      <RepositoryCardGlass.Meta>
        <RepositoryCardGlass.Languages>TypeScript 78% · CSS 22%</RepositoryCardGlass.Languages>
        <RepositoryCardGlass.Stats>134 commits · 100%</RepositoryCardGlass.Stats>
      </RepositoryCardGlass.Meta>

      <RepositoryCardGlass.ExpandedContent>
        <RepositoryCardGlass.Metrics>
          <RepositoryCardGlass.MetricItem
            label="Your Contribution"
            value="134 commits"
            subtitle="100%"
          />
          <RepositoryCardGlass.MetricItem
            label="Full Project"
            value="134 commits"
            subtitle="~1,608 lines"
          />
        </RepositoryCardGlass.Metrics>
      </RepositoryCardGlass.ExpandedContent>
    </RepositoryCardGlass.Root>
  );
}
```

### Repository with Issues

```tsx
function RepositoryWithIssues() {
  const [expanded, setExpanded] = useState(true); // Start expanded to show issues

  return (
    <RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <RepositoryCardGlass.Header>
        <RepositoryCardGlass.Name>bot-scripts</RepositoryCardGlass.Name>
        <RepositoryCardGlass.Status type="red" />
      </RepositoryCardGlass.Header>

      <RepositoryCardGlass.Meta>
        <RepositoryCardGlass.Languages>Python 100%</RepositoryCardGlass.Languages>
        <RepositoryCardGlass.Stats>89 commits · 100%</RepositoryCardGlass.Stats>
      </RepositoryCardGlass.Meta>

      <RepositoryCardGlass.ExpandedContent>
        <RepositoryCardGlass.Issues
          issues={['Empty commits (avg 3 lines/commit)', 'Burst: 67 commits on Oct 15']}
        />

        <RepositoryCardGlass.Metrics>
          <RepositoryCardGlass.MetricItem
            label="Your Contribution"
            value="89 commits"
            subtitle="100%"
          />
          <RepositoryCardGlass.MetricItem
            label="Full Project"
            value="89 commits"
            subtitle="~1,068 lines"
          />
        </RepositoryCardGlass.Metrics>
      </RepositoryCardGlass.ExpandedContent>
    </RepositoryCardGlass.Root>
  );
}
```

### Gallery with Accordion Pattern

```tsx
function RepositoryGallery() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const repos = [
    {
      id: 'portfolio',
      name: 'portfolio',
      status: 'green' as const,
      stars: 5,
      languages: 'TypeScript 78% · CSS 22%',
      commits: 134,
      contribution: 100,
    },
    {
      id: 'api-service',
      name: 'api-service',
      status: 'yellow' as const,
      stars: 12,
      languages: 'Go 85% · Docker 15%',
      commits: 256,
      contribution: 65,
    },
    // ... more repos
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {repos.map((repo) => (
        <RepositoryCardGlass.Root
          key={repo.id}
          expanded={expandedId === repo.id}
          onToggle={() => setExpandedId(expandedId === repo.id ? null : repo.id)}
        >
          <RepositoryCardGlass.Header>
            <RepositoryCardGlass.Name>{repo.name}</RepositoryCardGlass.Name>
            <RepositoryCardGlass.Status type={repo.status} />
            <RepositoryCardGlass.Stars count={repo.stars} />
          </RepositoryCardGlass.Header>

          <RepositoryCardGlass.Meta>
            <RepositoryCardGlass.Languages>{repo.languages}</RepositoryCardGlass.Languages>
            <RepositoryCardGlass.Stats>
              {repo.commits} commits · {repo.contribution}%
            </RepositoryCardGlass.Stats>
          </RepositoryCardGlass.Meta>

          <RepositoryCardGlass.ExpandedContent>
            <RepositoryCardGlass.Metrics>
              <RepositoryCardGlass.MetricItem
                label="Your Contribution"
                value={`${repo.commits} commits`}
                subtitle={`${repo.contribution}%`}
              />
              <RepositoryCardGlass.MetricItem
                label="Full Project"
                value={`${Math.round(repo.commits / (repo.contribution / 100))} commits`}
                subtitle={`~${Math.round(repo.commits * 12)} lines`}
              />
            </RepositoryCardGlass.Metrics>
          </RepositoryCardGlass.ExpandedContent>
        </RepositoryCardGlass.Root>
      ))}
    </div>
  );
}
```

## Hook Documentation

### useRepositoryCard

Access the repository card context (expanded state and toggle function).

```tsx
import { useRepositoryCard } from 'shadcn-glass-ui';

function CustomExpandButton() {
  const { expanded, onToggle } = useRepositoryCard();

  return <button onClick={onToggle}>{expanded ? 'Collapse' : 'Expand'}</button>;
}
```

**Returns:**

```tsx
{
  expanded: boolean;
  onToggle?: () => void;
}
```

**Note:** Must be used inside `RepositoryCardGlass.Root`.

### useRepositoryCardOptional

Same as `useRepositoryCard` but returns `null` if used outside of context (no error thrown).

```tsx
import { useRepositoryCardOptional } from 'shadcn-glass-ui';

function MaybeExpandButton() {
  const context = useRepositoryCardOptional();

  if (!context) {
    return null; // Not inside RepositoryCardGlass.Root
  }

  return <button onClick={context.onToggle}>Toggle</button>;
}
```

## Migration from Legacy API

### Before (v1.x - Legacy API)

```tsx
<RepositoryCardGlass
  name="portfolio"
  languages="TypeScript 78% · CSS 22%"
  commits={134}
  contribution={100}
  stars={5}
  flagType="green"
  expanded={expanded}
  onToggle={() => setExpanded(!expanded)}
  issues={['Issue 1', 'Issue 2']}
  onGitHubClick={() => window.open('...')}
  onAIAnalysisClick={() => console.log('AI Analysis')}
/>
```

### After (v2.0+ - Compound API)

```tsx
import { ButtonGlass } from 'shadcn-glass-ui';
import { ExternalLink, Sparkles } from 'lucide-react';

<RepositoryCardGlass.Root expanded={expanded} onToggle={() => setExpanded(!expanded)}>
  <RepositoryCardGlass.Header>
    <RepositoryCardGlass.Name>portfolio</RepositoryCardGlass.Name>
    <RepositoryCardGlass.Status type="green" />
    <RepositoryCardGlass.Stars count={5} />
  </RepositoryCardGlass.Header>

  <RepositoryCardGlass.Meta>
    <RepositoryCardGlass.Languages>TypeScript 78% · CSS 22%</RepositoryCardGlass.Languages>
    <RepositoryCardGlass.Stats>134 commits · 100%</RepositoryCardGlass.Stats>
  </RepositoryCardGlass.Meta>

  <RepositoryCardGlass.ExpandedContent>
    <RepositoryCardGlass.Issues issues={['Issue 1', 'Issue 2']} />

    <RepositoryCardGlass.Metrics>
      <RepositoryCardGlass.MetricItem
        label="Your Contribution"
        value="134 commits"
        subtitle="100%"
      />
      <RepositoryCardGlass.MetricItem
        label="Full Project"
        value="134 commits"
        subtitle="~1,608 lines"
      />
    </RepositoryCardGlass.Metrics>

    <RepositoryCardGlass.Actions>
      <ButtonGlass
        variant="secondary"
        size="sm"
        icon={ExternalLink}
        onClick={() => window.open('...')}
      >
        GitHub
      </ButtonGlass>
      <ButtonGlass
        variant="default"
        size="sm"
        icon={Sparkles}
        onClick={() => console.log('AI Analysis')}
      >
        AI Analysis
      </ButtonGlass>
    </RepositoryCardGlass.Actions>
  </RepositoryCardGlass.ExpandedContent>
</RepositoryCardGlass.Root>;
```

### Migration Benefits

✅ **More Flexible** - Custom layouts without wrapper props ✅ **Better Tree-Shaking** - Unused
sub-components not bundled ✅ **Type-Safe Composition** - TypeScript validates component hierarchy
✅ **Custom Actions** - Any buttons/links in Actions container ✅ **Conditional Rendering** -
Show/hide Issues, Metrics, Actions independently

### Backward Compatibility

The legacy API is preserved via `Object.assign` pattern. Both APIs work simultaneously:

```tsx
// ✅ Legacy API (still works)
<RepositoryCardGlass name="..." commits={100} ... />

// ✅ Compound API (recommended)
<RepositoryCardGlass.Root>...</RepositoryCardGlass.Root>
```

## Accessibility

### Keyboard Navigation

| Key     | Action                           |
| ------- | -------------------------------- |
| `Enter` | Toggle expand/collapse on Header |
| `Space` | Toggle expand/collapse on Header |
| `Tab`   | Navigate to interactive elements |

### ARIA Attributes

- `role="button"` - Header is interactive
- `aria-expanded` - Reflects expanded state
- `tabIndex={0}` - Header is keyboard focusable

### Semantic HTML

- `<div>` containers with proper ARIA roles
- Meaningful text content (no icon-only buttons without labels)
- Visual indicators (chevrons, status dots) with semantic meaning

### Screen Reader Support

- Header announces current expanded state
- Status indicators use semantic colors (green/yellow/red)
- Issues alert uses warning styling and AlertTriangle icon
- Metrics are organized in a grid with clear labels

## Related Components

- [YearCardGlass](./YEAR_CARD_GLASS.md) - Similar expandable card for career timeline
- [GlassCard](../ui/card-glass.md) - Base card component
- [ButtonGlass](../ui/button-glass.md) - Glass-styled buttons for Actions
- [BadgeGlass](../ui/badge-glass.md) - Status badges
- [StatusIndicatorGlass](../specialized/status-indicator-glass.md) - Status dots

---

**Version:** v2.0.0+ **Last Updated:** 2025-12-21 **Status:** Stable
