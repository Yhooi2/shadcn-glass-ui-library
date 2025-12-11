# Contributing to shadcn-glass-ui

Thank you for your interest in contributing to shadcn-glass-ui! We welcome contributions from the
community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Component Guidelines](#component-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating,
you are expected to uphold this code. Please report unacceptable behavior to [maintainer@email.com].

## Getting Started

### Prerequisites

- **Node.js**: 20.16+, 22.19+, or 24+
- **npm**: Latest stable version
- **Git**: For version control
- **Code Editor**: VS Code recommended with ESLint/Prettier extensions

### Setup Development Environment

1. **Fork the repository**

   Fork the repository: https://github.com/Yhooi2/shadcn-glass-ui-library/fork

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/shadcn-glass-ui-library.git
   cd shadcn-glass-ui-library
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/Yhooi2/shadcn-glass-ui-library.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Start development server**

   ```bash
   npm run dev          # Vite dev server
   npm run storybook    # Storybook on port 6006
   ```

## Development Workflow

### Creating a New Component

1. **Read the design system**

   Familiarize yourself with [UI_DESIGN.md](docs/design-system/UI_DESIGN.md) for design
   specifications:
   - Spacing: 8px base grid
   - Typography: 16px minimum for inputs (iOS)
   - Touch targets: 44×44px minimum (Apple HIG)
   - Blur values: 8px, 16px, 24px, 32px only
   - Opacity ranges: STANDARD_CARDS (15-25%)

2. **Create component files**

   ```bash
   # Component implementation
   src/components/glass/ui/your-component-glass.tsx

   # Variant definitions (if needed)
   src/lib/variants/your-component-glass-variants.ts

   # Storybook story
   src/components/YourComponentGlass.stories.tsx

   # MDX documentation
   src/components/YourComponentGlass.mdx

   # Unit tests (optional but recommended)
   src/components/glass/ui/__tests__/your-component-glass.test.tsx
   ```

3. **Follow component template**

   ```tsx
   // src/components/glass/ui/your-component-glass.tsx
   import * as React from 'react';
   import { cva, type VariantProps } from 'class-variance-authority';
   import { cn } from '@/lib/utils';

   const yourComponentVariants = cva(
     // Base classes
     'relative transition-all duration-200',
     {
       variants: {
         variant: {
           default: 'bg-white/15 backdrop-blur-md',
           subtle: 'bg-white/8 backdrop-blur-sm',
         },
         size: {
           sm: 'px-3 py-2 text-sm',
           md: 'px-4 py-2.5 text-base',
           lg: 'px-5 py-3 text-lg',
         },
       },
       defaultVariants: {
         variant: 'default',
         size: 'md',
       },
     }
   );

   export interface YourComponentGlassProps
     extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof yourComponentVariants> {
     // Add component-specific props
   }

   const YourComponentGlass = React.forwardRef<HTMLDivElement, YourComponentGlassProps>(
     ({ className, variant, size, ...props }, ref) => {
       return (
         <div
           ref={ref}
           className={cn(yourComponentVariants({ variant, size }), className)}
           {...props}
         />
       );
     }
   );

   YourComponentGlass.displayName = 'YourComponentGlass';

   export { YourComponentGlass, yourComponentVariants };
   ```

4. **Create Storybook story**

   ```tsx
   // src/components/YourComponentGlass.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react-vite';
   import { YourComponentGlass } from './glass/ui/your-component-glass';

   const meta = {
     title: 'Components/YourComponentGlass',
     component: YourComponentGlass,
     parameters: {
       layout: 'centered',
     },
     tags: ['autodocs'],
   } satisfies Meta<typeof YourComponentGlass>;

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {
       children: 'Your Component',
     },
   };
   ```

5. **Run compliance tests**

   ```bash
   # jsdom tests
   npm run test:compliance:run

   # Browser-based tests
   npm run test:compliance:browser:run
   ```

6. **Add visual regression tests**

   Add to `src/components/__visual__/components.visual.test.tsx`:

   ```tsx
   describe('YourComponentGlass Visual Tests', () => {
     it('YourComponentGlass default - glass', async ({ page }) => {
       await page.setContent(`
         <div class="theme-glass p-8">
           <your-component-glass>Content</your-component-glass>
         </div>
       `);

       await expect(page).toMatchScreenshot('your-component-default-glass.png');
     });
   });
   ```

7. **Update baselines**

   ```bash
   npm run test:visual:update
   ```

## Code Standards

### TypeScript

- ✅ **Strict Mode**: Enable `strict: true`
- ✅ **No Any**: Avoid `any` types, use `unknown` if necessary
- ✅ **Explicit Types**: Define prop interfaces explicitly
- ✅ **Type Exports**: Export prop types for external use

```tsx
// ✅ Good
export interface ButtonProps {
  variant: 'primary' | 'ghost' | 'text';
  size: 'sm' | 'md' | 'lg';
}

// ❌ Bad
export interface ButtonProps {
  variant: any;
  size: string;
}
```

### React

- ✅ **Functional Components**: Use function components with hooks
- ✅ **Forward Refs**: Use `React.forwardRef` for DOM components
- ✅ **Display Names**: Always set `Component.displayName`
- ✅ **Memoization**: Use `React.memo` for expensive renders

```tsx
// ✅ Good
const ButtonGlass = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} {...props} />;
});
ButtonGlass.displayName = 'ButtonGlass';

// ❌ Bad
const ButtonGlass = (props) => {
  return <button {...props} />;
};
```

### CSS/Tailwind

- ✅ **Design Tokens**: Use tokens from UI_DESIGN.md
- ✅ **Utility Classes**: Prefer Tailwind utilities over custom CSS
- ✅ **CVA Variants**: Use `class-variance-authority` for variants
- ✅ **cn() Utility**: Use `cn()` for className merging

```tsx
// ✅ Good
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/lib/variants/button-glass-variants';

<button className={cn(buttonVariants({ variant, size }), className)} />

// ❌ Bad
<button className={`custom-button ${variant} ${size}`} />
```

### Token System (v2.0.0+)

**CRITICAL:** Never hardcode OKLCH values. Always use CSS variables from the 3-layer token system.

**3-Layer Architecture:**

```
Layer 3: Component Tokens  (--btn-primary-bg, --input-border, --modal-bg)
         ↓ references
Layer 2: Semantic Tokens   (--semantic-primary, --semantic-surface, --semantic-text)
         ↓ references
Layer 1: Primitive Tokens  (--oklch-purple-500, --oklch-white-8, --oklch-slate-800)
```

**Token Usage Rules:**

```css
/* ✅ GOOD: Use semantic tokens in components */
.my-component {
  background: var(--semantic-surface);
  color: var(--semantic-text);
  border: 1px solid var(--semantic-border);
}

.my-component:hover {
  background: var(--semantic-surface-elevated);
  border-color: var(--semantic-primary);
}

/* ✅ GOOD: Use primitive tokens for specific effects */
.my-component-glow {
  box-shadow: 0 0 20px var(--oklch-purple-500-40);
}

/* ❌ BAD: Never hardcode OKLCH values */
.my-component {
  background: oklch(66.6% 0.159 303); /* NEVER do this */
  color: oklch(100% 0 0 / 0.9);
}
```

**v2.0.0 Breaking Changes - Removed Variables:**

```css
/* ❌ REMOVED in v2.0.0 */
--metric-emerald-*   /* Use --metric-success-* instead */
--metric-amber-*     /* Use --metric-warning-* instead */
--metric-blue-*      /* Use --metric-default-* instead */
--metric-red-*       /* Use --metric-destructive-* instead */

/* ✅ Use semantic replacements */
background: var(--metric-success-bg);    /* was --metric-emerald-bg */
color: var(--metric-warning-text);       /* was --metric-amber-text */
border: var(--metric-default-border);    /* was --metric-blue-border */
box-shadow: var(--metric-destructive-glow); /* was --metric-red-glow */
```

**Quick Reference:**

- **207 primitive tokens** in `src/styles/tokens/oklch-primitives.css`
- **Zero hardcoded OKLCH** in all theme files (glass.css, light.css, aurora.css)
- **Semantic tokens** defined per theme in `src/styles/themes/*.css`
- **Component tokens** reference semantic tokens, never primitives directly

**Documentation:**

- [TOKEN_ARCHITECTURE.md](docs/TOKEN_ARCHITECTURE.md) - Complete 3-layer system guide
- [THEME_CREATION_GUIDE.md](docs/THEME_CREATION_GUIDE.md) - Create themes in 15 minutes
- [CSS_VARIABLES_MIGRATION_2.0.md](docs/migration/CSS_VARIABLES_MIGRATION_2.0.md) - Migration guide

### Accessibility

- ✅ **ARIA Attributes**: Proper `aria-*` attributes
- ✅ **Keyboard Support**: Handle Tab, Enter, Escape, Arrows
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Semantic HTML**: Use semantic elements
- ✅ **Touch Targets**: Minimum 44×44px

```tsx
// ✅ Good
<button
  aria-label="Close dialog"
  aria-pressed={isOpen}
  className="min-w-[44px] min-h-[44px]"
  onKeyDown={handleKeyDown}
>
  <X className="w-5 h-5" />
</button>

// ❌ Bad
<div onClick={handleClick}>
  <X />
</div>
```

## Testing Requirements

### Minimum Coverage

- **Compliance Tests**: All components must pass design system compliance
- **Visual Tests**: All interactive states must have screenshots
- **Unit Tests**: Recommended but not required for initial PR
- **Total Coverage**: Target 90% (we're at 13.87%, growing)

### Running Tests

```bash
# All tests
npm test

# Compliance only
npm run test:compliance:run
npm run test:compliance:browser:run

# Visual regression
npm run test:visual:ci
npm run test:visual:update  # Update baselines

# Unit tests
npm run test:unit

# Coverage
npm run test:coverage
```

### Writing Tests

```tsx
// Compliance test example
describe('ButtonGlass Design System Compliance', () => {
  it('should have minimum 44px touch target for md size', () => {
    render(<ButtonGlass size="md">Click</ButtonGlass>);
    const button = screen.getByRole('button');
    const rect = button.getBoundingClientRect();
    expect(rect.height).toBeGreaterThanOrEqual(44);
  });
});

// Visual test example
it('ButtonGlass primary variant - glass theme', async ({ page }) => {
  await page.setContent(`
    <div class="theme-glass p-8">
      <button-glass variant="primary">Primary</button-glass>
    </div>
  `);
  await expect(page).toMatchScreenshot('button-primary-glass.png');
});
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Format

```
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Scopes

- `ui`: Core UI components
- `atomic`: Atomic components
- `composite`: Composite components
- `sections`: Section components
- `compliance`: Design system compliance
- `visual`: Visual regression tests
- `docs`: Documentation

### Examples

```bash
# Good commits
feat(ui): add DatePickerGlass component
fix(compliance): correct touch target size for CheckboxGlass
docs: update CONTRIBUTING.md with testing guidelines
test(visual): add screenshots for ModalGlass sizes
refactor(ui): simplify ButtonGlass variant logic

# Bad commits
Update files
Fixed bug
WIP
asdf
```

## Pull Request Process

### Before Submitting

1. **Update from upstream**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run full test suite**

   ```bash
   npm run lint
   npm run test:compliance:run
   npm run test:compliance:browser:run
   npm run test:visual:ci
   ```

3. **Update documentation**
   - Add/update MDX docs
   - Update README if adding major features
   - Add examples to Storybook

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] Added tests
- [ ] All tests pass
- [ ] No new warnings
- [ ] Updated BREAKING_CHANGES.md (if applicable)

## Screenshots (if applicable)

## Related Issues

Closes #123
```

### Review Process

1. **Automated Checks**: CI must pass (lint, tests, build)
2. **Code Review**: At least one maintainer approval
3. **Design Review**: UI changes reviewed for consistency
4. **Merge**: Squash and merge with conventional commit message

## Component Guidelines

### Component Checklist

Before submitting a new component, ensure:

- [ ] Follows UI_DESIGN.md specifications
- [ ] Supports all 3 themes (glass, light, aurora)
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation works
- [ ] Touch targets >= 44×44px
- [ ] TypeScript strict mode
- [ ] CVA variants defined
- [ ] Storybook story created
- [ ] MDX documentation written
- [ ] Visual regression tests added
- [ ] Compliance tests pass

### Design Token Usage

Always use design tokens instead of hardcoded values:

```tsx
// ✅ Good - Using tokens
className="backdrop-blur-md"    // 16px per UI_DESIGN.md
className="p-6"                 // 24px (STANDARD_CARDS)
className="rounded-2xl"         // 16px border radius
className="min-h-[44px]"        // Touch target

// ❌ Bad - Hardcoded values
className="backdrop-blur-[16px]"
className="p-[24px]"
style={{ backdropFilter: 'blur(20px)' }}
```

### Variant Best Practices

```tsx
// ✅ Good - Semantic variants
const variants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'bg-gradient-to-r from-purple-500 to-violet-600',
      ghost: 'bg-white/10 border border-white/20',
      text: 'bg-transparent hover:bg-white/5',
    },
    size: {
      sm: 'px-3 py-2 text-sm min-h-[32px]',
      md: 'px-4 py-2.5 text-base min-h-[44px]',
      lg: 'px-5 py-3 text-lg min-h-[48px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// ❌ Bad - Unclear variants
const variants = cva('base', {
  variants: {
    type: {
      type1: 'class1',
      type2: 'class2',
    },
  },
});
```

## Publishing & Distribution

### Package Registries

This package is published to two registries:

1. **npm Registry** (Public)
   - Package name: `shadcn-glass-ui`
   - Installation: `npm install shadcn-glass-ui`

2. **GitHub Packages** (Scoped)
   - Package name: `@yhooi2/shadcn-glass-ui`
   - Installation: See [GitHub Packages Guide](docs/GITHUB_PACKAGES.md)

### Publishing Workflow

Publishing is automated via GitHub Actions. See [docs/GITHUB_PACKAGES.md](docs/GITHUB_PACKAGES.md)
for detailed instructions.

**For Maintainers:**

1. **Update version** in package.json:

   ```bash
   npm version patch  # or minor, or major
   ```

2. **Create git tag**:

   ```bash
   git tag v1.0.1
   git push && git push --tags
   ```

3. **Create GitHub Release**:
   - Go to [Releases](https://github.com/Yhooi2/shadcn-glass-ui-library/releases)
   - Click "Draft a new release"
   - Select the tag (e.g., `v1.0.1`)
   - Publish release

4. **Automated Publishing**:
   - GitHub Actions automatically publishes to both registries
   - npm: uses OIDC Trusted Publishing (no tokens needed)
   - GitHub Packages: uses `GITHUB_TOKEN`

### Manual Publishing (Emergency Only)

```bash
# Build library
npm run build:lib

# Publish to npm
npm publish --access public

# Publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

## Questions?

- **Discussions**:
  [GitHub Discussions](https://github.com/Yhooi2/shadcn-glass-ui-library/discussions)
- **Issues**: [Report a bug](https://github.com/Yhooi2/shadcn-glass-ui-library/issues)
- **GitHub Packages**: [Installation Guide](docs/GITHUB_PACKAGES.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to shadcn-glass-ui! 🎉
