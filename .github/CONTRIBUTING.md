# Contributing Guide

Thank you for your interest in improving **shadcn-glass-ui**! 🎉

## Getting Started

### Prerequisites

- Node.js 20.16+, 22.19+, or 24+
- npm (with overrides support for rolldown-vite)
- Git

### Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone git@github.com:YOUR_USERNAME/shadcn-glass-ui-library.git
cd shadcn-glass-ui-library

# 3. Install dependencies
npm install

# 4. Verify everything works
npm run build
npm run test:visual:ci
npm run lint
```

## Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/bug-description
```

Use prefixes:
- `feat/` - new feature
- `fix/` - bug fix
- `docs/` - documentation
- `refactor/` - refactoring
- `test/` - tests
- `chore/` - other

### 2. Make Changes

**Before starting:**
- Read [CLAUDE.md](../CLAUDE.md) - project overview
- Study existing code to understand patterns
- Check [REFACTORING_PLAN.md](../REFACTORING_PLAN.md) for architecture

**While working:**
- Follow existing code style
- Write TypeScript with strict mode (no `any`)
- Add JSDoc comments to public API
- Use CSS variables instead of hardcoded values

### 3. Testing

```bash
# TypeScript check
npx tsc --noEmit

# ESLint
npm run lint

# Build
npm run build

# Visual regression tests
npm run test:visual

# Update screenshots if design changed intentionally
npm run test:visual:update

# Check in Storybook
npm run storybook
```

**For new components, required:**
- ✅ Storybook stories with examples of all variants
- ✅ Visual regression tests for all themes (glass, light, aurora)
- ✅ TypeScript types and JSDoc
- ✅ Accessibility (WCAG 2.1 AA)

### 4. Commit

Follow [Conventional Commits](.github/COMMIT_CONVENTION.md):

```bash
# Use commit template
git commit

# Or quick commit
git commit -m "feat: add CircularProgressGlass component"
```

**Commit format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 5. Push and Pull Request

```bash
# Push to your fork
git push origin feat/your-feature-name
```

Then create a Pull Request on GitHub:
1. Fill out the PR template
2. Describe changes in detail
3. Add screenshots for UI changes
4. Ensure CI passes

## Code Style

### TypeScript

```typescript
// ✅ DO: Use explicit types
interface ComponentProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// ❌ DON'T: Avoid any
const handleClick = (e: any) => { ... }  // Bad

// ✅ DO: Use proper types
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }
```

### React Components

```typescript
// ✅ DO: Use forwardRef for components with ref
export const ButtonGlass = forwardRef<HTMLButtonElement, ButtonGlassProps>(
  ({ variant, ...props }, ref) => {
    return <button ref={ref} {...props} />;
  }
);
ButtonGlass.displayName = 'ButtonGlass';

// ✅ DO: Use React.useId() for stable IDs
const uniqueId = React.useId();

// ❌ DON'T: Avoid Math.random() (violates purity)
const id = Math.random().toString();  // Bad
```

### CSS

```css
/* ✅ DO: Use CSS variables */
.component {
  background: var(--glass-bg-medium);
  backdrop-filter: blur(var(--blur-lg));
}

/* ❌ DON'T: Avoid hardcoded values */
.component {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}
```

### Naming

- **Components**: `PascalCase` with `Glass` suffix (e.g., `ButtonGlass`)
- **Files**: `kebab-case` (e.g., `button-glass.tsx`)
- **CSS classes**: `kebab-case` (e.g., `glass-button`)
- **CSS variables**: `--kebab-case` (e.g., `--glass-bg-medium`)

## Architecture

### Component Structure

```
src/components/
├── ui/                    # Pure shadcn components
│   └── button.tsx
├── glass/
│   ├── ui/               # Level 1: Basic UI components
│   │   └── button-glass.tsx
│   ├── specialized/      # Level 2: Specialized
│   │   └── circular-progress-glass.tsx
│   ├── composite/        # Level 3: Composite
│   │   └── metric-card-glass.tsx
│   └── sections/         # Level 4: Page sections
│       └── header-nav-glass.tsx
```

### CSS Modules

```
src/styles/
├── tokens/               # Design tokens
│   ├── primitives.css   # Scales (blur, radius, opacity)
│   ├── colors.css       # Color palette
│   └── animations.css   # Keyframes
├── themes/              # Themes
│   ├── glass.css
│   ├── light.css
│   └── aurora.css
└── utilities/           # Utility classes
    ├── glass-effects.css
    └── glow-effects.css
```

## Testing

### Visual Regression Tests

For each new component, create visual tests:

```typescript
// src/components/__visual__/my-component.visual.test.tsx
import { test, expect } from '@vitest/browser/playwright';

test('MyComponent - default - glass', async () => {
  const { page } = await setupTest('glass');

  await page.setContent(`
    <div class="p-8 bg-slate-900">
      <my-component variant="default"></my-component>
    </div>
  `);

  await expect(page).toMatchScreenshot('my-component-default-glass.png');
});
```

### Storybook Stories

```typescript
// src/components/glass/ui/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponentGlass } from './my-component-glass';

const meta = {
  title: 'Glass/UI/MyComponentGlass',
  component: MyComponentGlass,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
  },
} satisfies Meta<typeof MyComponentGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};
```

## Accessibility

All components must meet WCAG 2.1 AA:

- ✅ Keyboard navigation
- ✅ Screen reader support (ARIA labels)
- ✅ Focus indicators
- ✅ Color contrast ≥4.5:1
- ✅ Responsive touch targets (≥44×44px)

Test in Storybook with a11y addon.

## CI/CD

Every PR automatically runs:

1. **ESLint** - code style check
2. **TypeScript** - type checking
3. **Build** - build verification
4. **Visual Tests** - 484 regression tests
5. **Storybook Build** - stories verification

All checks must pass ✅ before merge.

## Questions?

- 📝 Read [CLAUDE.md](../CLAUDE.md)
- 📊 Study [REFACTORING_PLAN.md](../REFACTORING_PLAN.md)
- 💬 Create [GitHub Discussion](../../discussions)
- 🐛 Create [Issue](../../issues)

## License

By contributing, you agree that your code will be licensed under the same license as the project.
