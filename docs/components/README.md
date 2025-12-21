# Glass UI Components Documentation

Comprehensive documentation for shadcn-glass-ui compound components with glassmorphism design.

## Overview

This directory contains detailed documentation for Glass UI components that use the **compound
component API pattern**. Each document provides:

- Complete API reference with props tables
- Multiple usage examples
- Accessibility guidelines
- shadcn/ui compatibility information
- Migration guides (where applicable)

## Available Documentation

### UI Components

#### [DropdownMenuGlass](./DROPDOWN_MENU_GLASS.md)

Glass-themed dropdown menu with full shadcn/ui DropdownMenu API compatibility.

- **Status:** Stable (v2.0.0+)
- **Sub-components:** 15 (Root, Trigger, Content, Item, CheckboxItem, RadioGroup, Label, Separator,
  etc.)
- **Based on:** `@radix-ui/react-dropdown-menu`
- **Highlights:** Keyboard navigation, nested submenus, checkbox/radio items, icons with shortcuts

#### [ModalGlass](./MODAL_GLASS.md)

Glass-themed modal/dialog with full shadcn/ui Dialog API compatibility.

- **Status:** Stable (v2.0.0+)
- **Sub-components:** 11 (Root, Trigger, Portal, Overlay, Content, Header, Body, Footer, Title,
  Description, Close)
- **Based on:** `@radix-ui/react-dialog`
- **Highlights:** Controlled & uncontrolled modes, 5 size variants, focus management, escape to
  close

#### [TabsGlass](./TABS_GLASS.md)

Glass-themed tab navigation with full shadcn/ui Tabs API compatibility.

- **Status:** Stable (v2.3.0+)
- **Sub-components:** 4 (Root, List, Trigger, Content)
- **Based on:** `@radix-ui/react-tabs`
- **Highlights:** Horizontal/vertical orientation, automatic/manual activation, RTL support, arrow
  key navigation

#### [AlertGlass](./ALERT_GLASS.md)

Glass-themed alert with full shadcn/ui Alert API compatibility.

- **Status:** Stable (v2.6.0+)
- **Components:** 3 (AlertGlass, AlertGlassTitle, AlertGlassDescription)
- **Variants:** default, destructive, success, warning (+ aliases: info, error)
- **Highlights:** Auto icons, dismissible option, responsive sizing

### Composite Components

#### [YearCardGlass](./YEAR_CARD_GLASS.md)

Expandable year card component for career timelines with glassmorphism design.

- **Status:** Stable (v2.0.0+)
- **Sub-components:** 13 (Root, Header, Year, Badge, Value, Progress, Sparkline, ExpandedContent,
  Stats, etc.)
- **Use Cases:** GitHub-style career timeline, year selector, activity summaries
- **Highlights:** Sparkline charts, insights system, controlled expand/collapse, custom stats

#### [RepositoryCardGlass](./REPOSITORY_CARD_GLASS.md)

Expandable repository card with status indicators and metrics.

- **Status:** Stable (v2.0.0+)
- **Sub-components:** 13 (Root, Header, Name, Status, Stars, Meta, Languages, Stats,
  ExpandedContent, Issues, Metrics, MetricItem, Actions)
- **Use Cases:** Repository galleries, project lists, contribution summaries
- **Highlights:** Status indicators (green/yellow/red), star counts, issues alerts, metrics grid,
  actions container

### Layout Components

#### [SplitLayoutGlass](./SPLIT_LAYOUT_GLASS.md)

Two-column responsive layout with sticky scroll behavior.

- **Status:** Stable (v2.0.0+)
- **Sub-components:** 9 (Provider, Root, Sidebar, SidebarHeader/Content/Footer, Main,
  MainHeader/Content/Footer, Trigger)
- **Use Cases:** Master-detail pattern, dashboard layouts, documentation sites
- **Highlights:** Sticky scroll, responsive breakpoints, controlled visibility, mobile stack mode

#### [SidebarGlass](./SIDEBAR_GLASS.md)

Collapsible sidebar navigation with mobile drawer support.

- **Status:** Stable (v2.0.0+)
- **Sub-components:** 15+ (Provider, Root, Header, Content, Footer, Rail, Inset, Trigger, Menu,
  MenuItem, etc.)
- **Use Cases:** App navigation, admin dashboards, mobile-first applications
- **Highlights:** 100% shadcn/ui Sidebar compatible, mobile drawer, collapsible modes
  (offcanvas/icon/none), `useSidebar()` hook

## Documentation Structure

Each component documentation follows this consistent format:

### 1. Overview

- Component description
- Key features list
- Browser compatibility

### 2. Installation

```tsx
import { ComponentGlass } from 'shadcn-glass-ui';
```

### 3. Compound API Reference

- Component structure examples
- Full sub-component list table

### 4. Props API

- Complete props tables for all sub-components
- Format: `| Prop | Type | Default | Description |`

### 5. Usage Examples

- Basic usage
- Advanced patterns (3-5 examples)
- Code snippets with TypeScript

### 6. Hook Documentation (if applicable)

- Hook API reference
- Usage examples

### 7. Migration Guide (if applicable)

- Before/After comparisons
- Breaking changes
- Backward compatibility notes

### 8. Accessibility

- Keyboard navigation table
- ARIA attributes list
- Screen reader support
- Focus management

### 9. shadcn/ui Compatibility

- Component alias table
- API compatibility matrix
- Usage comparison

### 10. Related Components

- Links to related documentation
- Use case comparisons

## Naming Conventions

### Component Names

- **Glass Variant:** `ComponentGlass` (e.g., `ModalGlass`, `TabsGlass`)
- **shadcn/ui Alias:** Same as shadcn/ui (e.g., `Dialog`, `Tabs`)

### Sub-components

- **Compound API:** `ComponentGlass.SubComponent` (e.g., `ModalGlass.Content`, `TabsGlass.Trigger`)
- **Named Exports:** `ComponentSubComponent` (e.g., `ModalContent`, `TabsTrigger`)

### Documentation Files

- **Format:** `COMPONENT_NAME_GLASS.md` (uppercase with underscores)
- **Examples:** `MODAL_GLASS.md`, `DROPDOWN_MENU_GLASS.md`

## shadcn/ui Compatibility

All documented components provide **100% API compatibility** with shadcn/ui:

| Glass UI Component | shadcn/ui Equivalent | Compatibility               |
| ------------------ | -------------------- | --------------------------- |
| ModalGlass         | Dialog               | ✅ 100%                     |
| TabsGlass          | Tabs                 | ✅ 100%                     |
| AlertGlass         | Alert                | ✅ 100% + extended variants |
| DropdownMenuGlass  | DropdownMenu         | ✅ 100%                     |
| SidebarGlass       | Sidebar              | ✅ 100%                     |

**Import Styles:**

```tsx
// Glass UI style
import { ModalGlass } from 'shadcn-glass-ui';
<ModalGlass.Root>...</ModalGlass.Root>;

// shadcn/ui compatible style
import { Dialog } from 'shadcn-glass-ui';
<Dialog>...</Dialog>;
```

## Version Information

- **Minimum Version:** v2.0.0 (compound API introduction)
- **Current Stable:** v2.6.0+
- **Documentation Status:** Active maintenance

### Version-Specific Features

| Feature                       | Version | Components              |
| ----------------------------- | ------- | ----------------------- |
| Compound Component API        | v2.0.0+ | All                     |
| shadcn/ui Aliases             | v2.3.0+ | TabsGlass, SidebarGlass |
| Dialog → ModalGlass Migration | v2.0.0  | ModalGlass              |
| Extended Alert Variants       | v2.6.0+ | AlertGlass              |

## Contributing to Documentation

When adding new component documentation:

1. **Follow the standard structure** (see "Documentation Structure" above)
2. **Use consistent formatting** (Markdown tables, code blocks with syntax highlighting)
3. **Include TypeScript examples** (with proper type annotations)
4. **Document all props** (including optional props with defaults)
5. **Add accessibility section** (keyboard navigation, ARIA, screen readers)
6. **Test all code examples** (ensure they actually work)
7. **Update this README** (add link in appropriate category)

## Additional Resources

### General Documentation

- [Getting Started](../GETTING_STARTED.md) - Installation and setup guide
- [Components Catalog](../COMPONENTS_CATALOG.md) - Complete component list with descriptions
- [Best Practices](../BEST_PRACTICES.md) - Coding standards and patterns

### API Documentation

- [Exports Structure](../EXPORTS_STRUCTURE.md) - Complete exports map
- [API Patterns Comparison](../API_PATTERNS_COMPARISON.md) - Legacy vs Compound API

### Design System

- [Theme Creation Guide](../THEME_CREATION_GUIDE.md) - Creating custom themes
- [Token Architecture](../TOKEN_ARCHITECTURE.md) - CSS variable system
- [Primitive Mapping](../PRIMITIVE_MAPPING.md) - OKLCH color primitives

### Migration Guides

- [Breaking Changes](../BREAKING_CHANGES.md) - Version 2.0.0+ breaking changes
- [Compound Components v2](../migration/compound-components-v2.md) - Migration patterns

### Technical Guides

- [Visual Testing Guide](../visual-testing-guide.md) - Screenshot testing workflow
- [Compliance Testing](../COMPLIANCE_TESTING.md) - Accessibility and token compliance
- [Dropdown Architecture](../DROPDOWN_ARCHITECTURE.md) - Dropdown component patterns

## Support

For questions, issues, or feature requests:

- **GitHub Issues:**
  [shadcn-glass-ui-library/issues](https://github.com/Yhooi2/shadcn-glass-ui-library/issues)
- **Documentation Issues:** Label with `documentation`
- **Component Requests:** Label with `enhancement`

---

**Last Updated:** 2025-12-21 **Documentation Version:** v2.6.0 **Maintained By:** shadcn-glass-ui
team
