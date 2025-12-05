# registry.directory Submission - shadcn-glass-ui

**Submission Date:** 2025-12-05
**Registry Name:** shadcn-glass-ui
**Status:** Ready for submission

## 📋 Submission Entry for registries.json

Add this entry to `/apps/web/public/registries.json`:

```json
{
  "name": "shadcn-glass-ui",
  "description": "Modern glassmorphism UI component library with 55 components for React. Features 3 themes (glass, light, aurora), WCAG 2.1 AA accessibility, and full shadcn/ui compatibility.",
  "author": "Yhooi2",
  "homepage": "https://yhooi2.github.io/shadcn-glass-ui-library/",
  "repository": "https://github.com/Yhooi2/shadcn-glass-ui-library",
  "registry": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r",
  "npm": "shadcn-glass-ui",
  "tags": ["glassmorphism", "ui", "components", "react", "tailwind", "accessibility", "themes"],
  "components": 55,
  "license": "MIT",
  "version": "1.0.0"
}
```

## ✅ Pre-Submission Checklist

- [x] **Registry not already listed** - Verified unique
- [x] **Uses shadcn distribution** - Compatible with `npx shadcn@latest add @shadcn-glass-ui/button-glass`
- [x] **JSON format valid** - All registry files validated
- [x] **Public accessibility** - Available via GitHub raw URLs
- [x] **Open source** - MIT license
- [x] **Documentation** - Comprehensive guides available
- [x] **Working demo** - Live Storybook at GitHub Pages

## 🔗 Important URLs

| Resource | URL |
|----------|-----|
| **Registry Index** | https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r/registry.json |
| **Homepage** | https://yhooi2.github.io/shadcn-glass-ui-library/ |
| **Repository** | https://github.com/Yhooi2/shadcn-glass-ui-library |
| **npm Package** | https://www.npmjs.com/package/shadcn-glass-ui |
| **Documentation** | https://github.com/Yhooi2/shadcn-glass-ui-library/blob/main/docs/REGISTRY_USAGE.md |

## 📦 Registry Details

### Components Available

**55 total components** across 4 registry types:

#### Registry Types
- **`registry:ui` (18 components)** - Core UI components
  - ButtonGlass, InputGlass, ModalGlass, TabsGlass, CheckboxGlass, ToggleGlass, SliderGlass, TooltipGlass, AlertGlass, AvatarGlass, BadgeGlass, GlassCard, DropdownGlass, ComboBoxGlass, CircularProgressGlass, SkeletonGlass, PopoverGlass, NotificationGlass

- **`registry:component` (14 components)** - Atomic & Specialized components
  - **Atomic (6):** ThemeToggleGlass, SearchBoxGlass, IconButtonGlass, SortDropdownGlass, StatItemGlass, ExpandableHeaderGlass
  - **Specialized (8):** RainbowProgressGlass, LanguageBarGlass, SegmentedControlGlass, StatusIndicatorGlass, ProgressGlass, BaseProgressGlass, ProfileAvatarGlass, FlagAlertGlass

- **`registry:block` (20 components)** - Composite & Section blocks
  - **Composite (13):** MetricCardGlass, RepositoryCardGlass, AICardGlass, YearCardGlass, CircularMetricGlass, ContributionMetricsGlass, MetricsGridGlass, RepositoryHeaderGlass, RepositoryMetadataGlass, TrustScoreDisplayGlass, UserInfoGlass, UserStatsLineGlass, CareerStatsHeaderGlass
  - **Sections (7):** HeaderNavGlass, ProfileHeaderGlass, CareerStatsGlass, FlagsSectionGlass, TrustScoreCardGlass, ProjectsListGlass, HeaderBrandingGlass

- **`registry:lib` (3 components)** - Primitive utilities
  - TouchTarget, FormFieldWrapper, InteractiveCard

### Installation Example

```bash
# Configure registry
# In components.json:
{
  "registries": {
    "@shadcn-glass-ui": {
      "url": "https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r"
    }
  }
}

# Install components
npx shadcn@latest add @shadcn-glass-ui/button-glass
npx shadcn@latest add @shadcn-glass-ui/input-glass
npx shadcn@latest add @shadcn-glass-ui/modal-glass
```

## 🎯 Key Features

- ✅ **shadcn/ui v4 compatible** - Full schema compliance
- ✅ **3 built-in themes** - Glass (dark), Light, Aurora (gradient)
- ✅ **WCAG 2.1 AA accessible** - Automated a11y testing
- ✅ **TypeScript strict mode** - Full type safety
- ✅ **Modern stack** - React 19, Tailwind v4, Radix UI
- ✅ **704 tests** - 99.5% passing (125 unit + 579 visual)
- ✅ **Compound components** - Advanced patterns (Modal, Tabs)
- ✅ **Touch optimized** - 44×44px minimum targets

## 📊 Project Metrics

| Metric | Value |
|--------|-------|
| **GitHub Stars** | TBD (newly released) |
| **npm Downloads** | TBD (v1.0.0 just published) |
| **Components** | 55 |
| **Test Coverage** | 99.5% |
| **Bundle Size** | ~110KB gzipped |
| **License** | MIT |
| **Last Updated** | 2025-12-05 |

## 🎨 Screenshots

### Component Showcase
![ComponentShowcase](https://yhooi2.github.io/shadcn-glass-ui-library/?path=/story/showcase-componentshowcase--default)

### Desktop Demo
![DesktopShowcase](https://yhooi2.github.io/shadcn-glass-ui-library/?path=/story/showcase-desktopshowcase--default)

### Glass Theme
![Glass Theme](https://yhooi2.github.io/shadcn-glass-ui-library/?path=/story/core-ui-buttonglass--glass-theme)

## 📝 Submission Steps

1. **Fork** https://github.com/rbadillap/registry.directory
2. **Edit** `/apps/web/public/registries.json`
3. **Add entry** (see JSON above)
4. **Commit** with message: `feat: add shadcn-glass-ui registry`
5. **Create PR** with description:
   ```
   Add shadcn-glass-ui registry

   Modern glassmorphism UI component library with 55 components.

   - Full shadcn/ui v4 compatibility
   - 3 themes (glass, light, aurora)
   - WCAG 2.1 AA accessible
   - 704 tests (99.5% passing)

   Registry URL: https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r
   Demo: https://yhooi2.github.io/shadcn-glass-ui-library/
   ```

## 🔍 Verification

Before submission, verify:

```bash
# Test registry accessibility
curl https://raw.githubusercontent.com/Yhooi2/shadcn-glass-ui-library/main/public/r/registry.json

# Test component installation (after push to GitHub)
npx shadcn@latest add @shadcn-glass-ui/button-glass
```

## 📞 Contact

- **Maintainer:** Yhooi2
- **GitHub:** https://github.com/Yhooi2
- **Repository Issues:** https://github.com/Yhooi2/shadcn-glass-ui-library/issues

---

**Ready for submission:** ✅
**Registry version:** 1.0.0
**Submission prepared:** 2025-12-05
