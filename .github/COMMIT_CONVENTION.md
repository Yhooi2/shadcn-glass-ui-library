# Git Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit history.

## Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type (required)

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Formatting, whitespace (no code logic changes)
- `refactor`: Code refactoring without functionality changes
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes (don't modify src or test files)

### Scope (optional)

Area of changes: `components`, `styles`, `build`, `ci`, `docs`, etc.

Examples:
- `feat(components): add CircularProgressGlass`
- `fix(styles): correct aurora theme gradient`
- `ci(github): add visual regression tests`

### Subject (required)

- Use imperative mood: "add" not "added" or "adds"
- Don't end with a period
- Maximum 50 characters
- Start with lowercase (after `type:`)

**✅ Correct:**
```
feat: add circular progress component
fix: correct button hover state
```

**❌ Incorrect:**
```
feat: Added circular progress component.
fix: Corrected the button hover state
```

### Body (optional, recommended)

- Explain **what** and **why**, not **how**
- Separate from subject with blank line
- Wrap lines at 72 characters
- Use bullet points when needed

### Footer (optional)

- Issue references: `Fixes #123`, `Closes #456`, `Related to #789`
- Breaking changes: `BREAKING CHANGE: description`
- Co-authors: `Co-Authored-By: Name <email@example.com>`

## Examples

### Simple Commit

```
feat: add ComboBoxGlass component

Add searchable select component with glass styling.
```

### Detailed Commit

```
feat(components): add CircularProgressGlass with visual tests

Add SVG-based circular progress indicator:
- Determinate and indeterminate variants
- 4 sizes: sm (80px), md (120px), lg (160px), xl (200px)
- 6 color gradients: violet, blue, emerald, amber, rose, cyan
- Configurable glow effect (low, medium, high)
- Custom label support

Technical details:
- Uses React.useId() for stable SVG element IDs
- Implements stroke-dasharray technique for progress
- Responsive to theme changes (glass, light, aurora)

Testing:
- 10 Storybook stories covering all variants
- 30 visual regression tests (10 tests × 3 themes)
- All tests pass with 0 pixel diff threshold

Closes #42

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Fix Commit

```
fix(components): correct Math.random purity violation in CircularProgressGlass

Replace Math.random() with React.useId() for SVG element IDs.
Math.random() violates React purity rules and can cause hydration
mismatches in SSR scenarios.

Fixes ESLint error: react-hooks/purity

Fixes #123
```

### Breaking Change

```
feat(styles)!: migrate to modular CSS structure

BREAKING CHANGE: glass-theme.css split into 10 modules

Migration guide:
1. Update imports from `@/glass-theme.css` to `@/styles/index.css`
2. CSS variables remain unchanged - no code changes needed
3. Custom theme extensions should now extend from `@/styles/themes/`

Benefits:
- 58% reduction in CSS variables (200 → 85)
- Better tree-shaking potential
- Easier to maintain and extend

Closes #200
```

### Chore Commit

```
chore(ci): add GitHub Actions workflow

Add automated CI/CD pipeline:
- ESLint and TypeScript checks on push/PR
- Build verification
- Visual regression tests (484 tests)
- Storybook build

Workflow runs on:
- Every push to main
- All pull requests to main
```

## Using the Template

Commit template configured in `.gitmessage`:

```bash
# Use template automatically
git commit

# Or quick commit without editor
git commit -m "feat: add new component"
```

## Automated Checks

CI pipeline validates commit format compliance.
Commits must:
- Start with valid type
- Contain subject
- Follow `type: subject` or `type(scope): subject` format

## Best Practices

1. **Atomicity**: One commit = one logical change
2. **Testability**: Each commit should pass tests
3. **Readability**: Write so it's clear a year from now
4. **Context**: Explain decisions not obvious from code
5. **References**: Always link to related issues

## Useful Commands

```bash
# Amend last commit
git commit --amend

# Interactive rebase to clean history
git rebase -i HEAD~3

# Squash multiple commits into one
git rebase -i HEAD~5  # then mark commits as 'squash'

# Check commit format
git log --oneline -10
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
