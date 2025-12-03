# Legacy Components Migration Strategy

**Date:** 2025-12-03
**Status:** APPROVED - Strategy B (Re-export with Deprecation)

## Problem Statement

- 35 legacy components in root `src/components/`
- 14 UI components are duplicates of `glass/ui/` components
- 6 Section components not migrated
- 5 Composite components not migrated
- 4 Atomic components not migrated
- Creates confusion and maintenance burden

## Selected Strategy: B (Re-export with Deprecation)

### Approach

1. **Keep legacy files** for backward compatibility
2. **Re-export from glass/** to use canonical implementations
3. **Add deprecation warnings** in development mode
4. **Document migration path** in CLAUDE.md and README

### Implementation Plan

#### Phase 1: UI Components (14 duplicates) - Priority P0

Re-export from `glass/ui/`:

```typescript
// src/components/ButtonGlass.tsx
export { ButtonGlass } from './glass/ui/button-glass';
export type { ButtonGlassProps } from './glass/ui/button-glass';

if (process.env.NODE_ENV === 'development') {
  console.warn(
    'ButtonGlass: Importing from root is deprecated. Use: import { ButtonGlass } from "@/components/glass/ui"'
  );
}
```

**Components:**
- AlertGlass → glass/ui/alert-glass
- AvatarGlass → glass/ui/avatar-glass
- BadgeGlass → glass/ui/badge-glass
- ButtonGlass → glass/ui/button-glass
- CheckboxGlass → glass/ui/checkbox-glass
- DropdownGlass → glass/ui/dropdown-glass
- InputGlass → glass/ui/input-glass
- ModalGlass → glass/ui/modal-glass
- NotificationGlass → glass/ui/notification-glass
- ProgressGlass → glass/ui/progress-glass
- SkeletonGlass → glass/ui/skeleton-glass
- SliderGlass → glass/ui/slider-glass
- TabsGlass → glass/ui/tabs-glass
- ToggleGlass → glass/ui/toggle-glass
- TooltipGlass → glass/ui/tooltip-glass

#### Phase 2: Atomic Components (4) - Priority P1

Migrate to `glass/atomic/`:

- StatusIndicatorGlass → glass/atomic/status-indicator-glass
- SegmentedControlGlass → glass/atomic/segmented-control-glass
- RainbowProgressGlass → glass/atomic/rainbow-progress-glass
- LanguageBarGlass → glass/atomic/language-bar-glass

Then re-export from root with deprecation warnings.

#### Phase 3: Composite Components (5) - Priority P1

Migrate to `glass/composite/`:

- GlassCard → already in glass/ui/ (re-export)
- MetricCardGlass → glass/composite/metric-card-glass
- YearCardGlass → glass/composite/year-card-glass
- AICardGlass → glass/composite/ai-card-glass
- RepositoryCardGlass → glass/composite/repository-card-glass

Then re-export from root with deprecation warnings.

#### Phase 4: Section Components (6) - Priority P1

Migrate to `glass/sections/`:

- HeaderNavGlass → glass/sections/header-nav-glass
- ProfileHeaderGlass → glass/sections/profile-header-glass
- CareerStatsGlass → glass/sections/career-stats-glass
- FlagsSectionGlass → glass/sections/flags-section-glass
- TrustScoreCardGlass → glass/sections/trust-score-card-glass
- ProjectsListGlass → glass/sections/projects-list-glass

Then re-export from root with deprecation warnings.

#### Phase 5: Specialized Components (2) - Priority P2

Migrate to `glass/specialized/` (new category):

- ProfileAvatarGlass → glass/specialized/profile-avatar-glass
- FlagAlertGlass → glass/specialized/flag-alert-glass

#### Phase 6: Demo/Utility (4) - Keep as-is

- ComponentShowcase (demo page)
- DesktopShowcase (demo page)
- MobileShowcase (demo page)
- AnimatedBackground (utility)

**Action:** Keep in root, no migration needed.

## Benefits of Strategy B

✅ **Backward Compatibility**: Existing imports continue to work
✅ **Gradual Migration**: Users can migrate at their own pace
✅ **Single Source of Truth**: All logic in `glass/` folder
✅ **Clear Deprecation Path**: Warnings guide users to new imports
✅ **Low Risk**: No breaking changes

## Migration Timeline

- **Week 1:** Phase 1 (UI components - 14 files)
- **Week 2:** Phase 2 (Atomic - 4 files) + Phase 3 (Composite - 5 files)
- **Week 3:** Phase 4 (Sections - 6 files) + Phase 5 (Specialized - 2 files)

**Total:** 31 files to migrate (4 remain in root)

## Breaking Changes Plan

### Version 3.0 (Future Major Release)

- Remove all legacy exports from root
- Force users to import from `@/components/glass/*`
- Update all documentation and examples

### Deprecation Notice Template

```typescript
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '[DEPRECATED] {ComponentName}: Importing from root is deprecated and will be removed in v3.0. ' +
    'Use: import { {ComponentName} } from "@/components/glass/{level}/{component-name}"'
  );
}
```

## Documentation Updates

1. **CLAUDE.md**: Update import examples
2. **README.md**: Add migration guide
3. **CHANGELOG.md**: Document deprecations
4. **Storybook**: Update import paths in stories

## Success Metrics

- ✅ All 31 components re-export from `glass/`
- ✅ All tests pass (567 visual + 71 unit)
- ✅ Zero breaking changes for existing users
- ✅ TypeScript compilation succeeds
- ✅ ESLint passes with no warnings

## Alternative Strategies (Rejected)

### Strategy A (Full Migration)

**Pros:** Clean architecture, no duplicates
**Cons:** Breaking changes, requires user code updates

**Reason for rejection:** Too disruptive for existing users

### Strategy C (Hybrid)

**Pros:** Balance between A and B
**Cons:** More complex, inconsistent approach

**Reason for rejection:** Inconsistency across component types

## Next Steps

1. ✅ Create barrel exports (completed)
2. ✅ Update visual baselines (completed)
3. 🔄 Implement Phase 1 (UI components re-export)
4. ⏳ Implement Phase 2-5 (migrate & re-export)
5. ⏳ Add unit tests for migrated components
6. ⏳ Update documentation
