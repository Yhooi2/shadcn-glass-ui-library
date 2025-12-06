# Component Catalog

Searchable index of all **55 components** in shadcn-glass-ui.

## Quick Reference Table

| Component | Level | File | Props | Key Features |
|-----------|-------|------|-------|--------------|
| **ButtonGlass** | Core UI | `src/components/glass/ui/button-glass.tsx` | 7 | asChild, loading, icon, ripple, 6 variants |
| **InputGlass** | Core UI | `src/components/glass/ui/input-glass.tsx` | 8 | label, error, success, icon, validation |
| **CheckboxGlass** | Core UI | `src/components/glass/ui/checkbox-glass.tsx` | 5 | label, checked, glow effect |
| **ToggleGlass** | Core UI | `src/components/glass/ui/toggle-glass.tsx` | 5 | label, switch variant, accessible |
| **SliderGlass** | Core UI | `src/components/glass/ui/slider-glass.tsx` | 6 | min/max/step, label, single/range |
| **ModalGlass** | Core UI | `src/components/glass/ui/modal-glass.tsx` | - | Compound API, overlay, 3 sizes |
| **TabsGlass** | Core UI | `src/components/glass/ui/tabs-glass.tsx` | - | Compound API, animated |
| **DropdownGlass** | Core UI | `src/components/glass/ui/dropdown-glass.tsx` | 8 | Radix UI based, submenu support |
| **TooltipGlass** | Core UI | `src/components/glass/ui/tooltip-glass.tsx` | 6 | Radix UI, 4 sides, delay config |
| **AlertGlass** | Core UI | `src/components/glass/ui/alert-glass.tsx` | 5 | 4 variants, icon, dismissable |
| **NotificationGlass** | Core UI | `src/components/glass/ui/notification-glass.tsx` | 6 | Toast style, 4 variants, auto-close |
| **BadgeGlass** | Core UI | `src/components/glass/ui/badge-glass.tsx` | 4 | 7 variants, dot variant |
| **AvatarGlass** | Core UI | `src/components/glass/ui/avatar-glass.tsx` | 5 | asChild, status, 4 sizes, fallback |
| **GlassCard** | Core UI | `src/components/glass/ui/glass-card.tsx` | 6 | asChild, 4 variants, 3 intensities |
| **ProgressGlass** | Core UI | `src/components/glass/ui/progress-glass.tsx` | 5 | value, max, label, variants |
| **CircularProgressGlass** | Core UI | `src/components/glass/ui/circular-progress-glass.tsx` | 6 | value, size, stroke, label |
| **SkeletonGlass** | Core UI | `src/components/glass/ui/skeleton-glass.tsx` | 5 | width, height, circle, variants |
| **ComboBoxGlass** | Core UI | `src/components/glass/ui/combobox-glass.tsx` | 8 | searchable, multi-select, async |
| **PopoverGlass** | Core UI | `src/components/glass/ui/popover-glass.tsx` | 6 | Radix UI, trigger, content |
| **IconButtonGlass** | Atomic | `src/components/glass/atomic/icon-button-glass.tsx` | 5 | Icon-only, aria-label, 4 sizes |
| **ThemeToggleGlass** | Atomic | `src/components/glass/atomic/theme-toggle-glass.tsx` | 3 | 3 themes, icon animated |
| **SearchBoxGlass** | Atomic | `src/components/glass/atomic/search-box-glass.tsx` | 6 | Search icon, clear button |
| **SortDropdownGlass** | Atomic | `src/components/glass/atomic/sort-dropdown-glass.tsx` | 5 | Sort options, ascending/descending |
| **StatItemGlass** | Atomic | `src/components/glass/atomic/stat-item-glass.tsx` | 5 | Label, value, change, trend |
| **ExpandableHeaderGlass** | Atomic | `src/components/glass/atomic/expandable-header-glass.tsx` | 5 | Collapsible, animated |
| **StatusIndicatorGlass** | Specialized | `src/components/glass/specialized/status-indicator-glass.tsx` | 4 | Status dot, 4 states, glow |
| **SegmentedControlGlass** | Specialized | `src/components/glass/specialized/segmented-control-glass.tsx` | 5 | Button group, exclusive selection |
| **RainbowProgressGlass** | Specialized | `src/components/glass/specialized/rainbow-progress-glass.tsx` | 4 | Gradient progress, animated |
| **LanguageBarGlass** | Specialized | `src/components/glass/specialized/language-bar-glass.tsx` | 5 | Proficiency bar, legend |
| **ProfileAvatarGlass** | Specialized | `src/components/glass/specialized/profile-avatar-glass.tsx` | 5 | Large avatar, glow animation |
| **FlagAlertGlass** | Specialized | `src/components/glass/specialized/flag-alert-glass.tsx` | 5 | Warning/danger, icon, dismissable |
| **ProgressGlass** | Specialized | `src/components/glass/specialized/progress-glass.tsx` | 5 | Enhanced progress bar |
| **BaseProgressGlass** | Specialized | `src/components/glass/specialized/base-progress-glass.tsx` | 4 | Base progress component |
| **MetricCardGlass** | Composite | `src/components/glass/composite/metric-card-glass.tsx` | 6 | Metric display, progress, trend |
| **YearCardGlass** | Composite | `src/components/glass/composite/year-card-glass.tsx` | 5 | Timeline card, expandable |
| **AICardGlass** | Composite | `src/components/glass/composite/ai-card-glass.tsx` | 5 | AI summary, feature list |
| **RepositoryCardGlass** | Composite | `src/components/glass/composite/repository-card-glass.tsx` | 7 | Repo info, expandable, stats |
| **TrustScoreDisplayGlass** | Composite | `src/components/glass/composite/trust-score-display-glass.tsx` | 5 | Score, visual indicator |
| **CareerStatsHeaderGlass** | Composite | `src/components/glass/composite/career-stats-header-glass.tsx` | 5 | Career stats, timeline |
| **CircularMetricGlass** | Composite | `src/components/glass/composite/circular-metric-glass.tsx` | 5 | Circular progress, metric |
| **ContributionMetricsGlass** | Composite | `src/components/glass/composite/contribution-metrics-glass.tsx` | 5 | Contribution grid |
| **MetricsGridGlass** | Composite | `src/components/glass/composite/metrics-grid-glass.tsx` | 4 | Grid layout, responsive |
| **RepositoryHeaderGlass** | Composite | `src/components/glass/composite/repository-header-glass.tsx` | 6 | Repo header, metadata |
| **RepositoryMetadataGlass** | Composite | `src/components/glass/composite/repository-metadata-glass.tsx` | 6 | Repo metadata display |
| **UserInfoGlass** | Composite | `src/components/glass/composite/user-info-glass.tsx` | 5 | User card, avatar, stats |
| **UserStatsLineGlass** | Composite | `src/components/glass/composite/user-stats-line-glass.tsx` | 4 | Horizontal stats line |
| **HeaderNavGlass** | Section | `src/components/glass/sections/header-nav-glass.tsx` | 6 | Navigation, search, theme |
| **ProfileHeaderGlass** | Section | `src/components/glass/sections/profile-header-glass.tsx` | 7 | Profile, avatar, stats, langs |
| **CareerStatsGlass** | Section | `src/components/glass/sections/career-stats-glass.tsx` | 5 | Career stats, year cards |
| **FlagsSectionGlass** | Section | `src/components/glass/sections/flags-section-glass.tsx` | 5 | Expandable flags/warnings |
| **TrustScoreCardGlass** | Section | `src/components/glass/sections/trust-score-card-glass.tsx` | 6 | Trust score, metrics |
| **ProjectsListGlass** | Section | `src/components/glass/sections/projects-list-glass.tsx` | 6 | Projects, filtering, sorting |
| **HeaderBrandingGlass** | Section | `src/components/glass/sections/header-branding-glass.tsx` | 5 | Branded header, logo, nav |
| **FormFieldWrapper** | Primitive | `src/components/glass/primitives/form-field-wrapper.tsx` | 6 | Unified form field structure |
| **InteractiveCard** | Primitive | `src/components/glass/primitives/interactive-card.tsx` | 5 | Hover animations, glass effects |
| **TouchTarget** | Primitive | `src/components/glass/primitives/touch-target.tsx` | 4 | Touch-friendly wrapper, 44px min |

---

## By Level

### Level 0 - Primitives (3)

Foundation components for building other components.

#### FormFieldWrapper
**File:** `src/components/glass/primitives/form-field-wrapper.tsx`
**Purpose:** Unified form field structure with label, error, and success states
**Props:** `label`, `error`, `success`, `required`, `children`, `className`
**Usage:**
```tsx
<FormFieldWrapper label="Email" error={emailError}>
  <input type="email" />
</FormFieldWrapper>
```

#### InteractiveCard
**File:** `src/components/glass/primitives/interactive-card.tsx`
**Purpose:** Card with hover animations and glass effects
**Props:** `asChild`, `children`, `className`, `onClick`, `onHover`
**Usage:**
```tsx
<InteractiveCard onClick={() => console.log('clicked')}>
  <h3>Interactive Card</h3>
</InteractiveCard>
```

#### TouchTarget
**File:** `src/components/glass/primitives/touch-target.tsx`
**Purpose:** Touch-friendly wrapper ensuring 44×44px minimum (Apple HIG)
**Props:** `asChild`, `children`, `className`, `minSize`
**Usage:**
```tsx
<TouchTarget minSize={44}>
  <button>Tap me</button>
</TouchTarget>
```

---

### Level 1 - Core UI (18)

Essential building blocks for any application.

#### ButtonGlass
**File:** `src/components/glass/ui/button-glass.tsx`
**Variants:** primary, secondary, ghost, destructive, success, text
**Sizes:** sm, md, lg, xl, icon
**Features:** asChild, loading, icon, ripple effect, glow
**Usage:**
```tsx
<ButtonGlass variant="primary" icon={Check} loading={isLoading}>
  Save Changes
</ButtonGlass>
```

#### InputGlass
**File:** `src/components/glass/ui/input-glass.tsx`
**Features:** label, error, success, icon, focus glow
**Usage:**
```tsx
<InputGlass
  label="Email"
  type="email"
  icon={Mail}
  error={errors.email}
  success={success.email}
/>
```

#### CheckboxGlass
**File:** `src/components/glass/ui/checkbox-glass.tsx`
**Features:** label, checked state, glow effect, accessible
**Usage:**
```tsx
<CheckboxGlass
  id="terms"
  checked={accepted}
  onCheckedChange={setAccepted}
  label="I accept the terms"
/>
```

#### ToggleGlass
**File:** `src/components/glass/ui/toggle-glass.tsx`
**Features:** label, switch variant, accessible, animated
**Usage:**
```tsx
<ToggleGlass
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Enable notifications"
/>
```

#### SliderGlass
**File:** `src/components/glass/ui/slider-glass.tsx`
**Features:** min/max/step, label, single/range values
**Usage:**
```tsx
<SliderGlass
  label="Volume"
  value={[volume]}
  onValueChange={([v]) => setVolume(v)}
  min={0}
  max={100}
/>
```

#### ModalGlass (Compound API)
**File:** `src/components/glass/ui/modal-glass.tsx`
**Components:** Root, Overlay, Content, Header, Title, Description, Body, Footer, Close
**Sizes:** sm, md, lg
**Usage:**
```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Overlay />
  <ModalGlass.Content>
    <ModalGlass.Header>
      <ModalGlass.Title>Confirm</ModalGlass.Title>
      <ModalGlass.Close />
    </ModalGlass.Header>
    <ModalGlass.Body>Are you sure?</ModalGlass.Body>
    <ModalGlass.Footer>
      <ButtonGlass onClick={() => setOpen(false)}>Cancel</ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

#### TabsGlass (Compound API)
**File:** `src/components/glass/ui/tabs-glass.tsx`
**Components:** Root, List, Trigger, Content
**Features:** Animated indicator, keyboard navigation
**Usage:**
```tsx
<TabsGlass.Root value={tab} onValueChange={setTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
    <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="tab1">Content 1</TabsGlass.Content>
  <TabsGlass.Content value="tab2">Content 2</TabsGlass.Content>
</TabsGlass.Root>
```

#### DropdownGlass
**File:** `src/components/glass/ui/dropdown-glass.tsx`
**Features:** Radix UI based, submenu support, keyboard navigation
**Usage:**
```tsx
<DropdownGlass
  trigger={<ButtonGlass>Menu</ButtonGlass>}
  items={[
    { label: 'Profile', onClick: () => {} },
    { label: 'Settings', onClick: () => {} },
    { separator: true },
    { label: 'Logout', onClick: () => {} },
  ]}
/>
```

#### AlertGlass
**File:** `src/components/glass/ui/alert-glass.tsx`
**Variants:** default, destructive, success, warning
**Features:** Icon, title, description, dismissable
**Usage:**
```tsx
<AlertGlass variant="destructive" title="Error">
  Something went wrong. Please try again.
</AlertGlass>
```

#### BadgeGlass
**File:** `src/components/glass/ui/badge-glass.tsx`
**Variants:** default, secondary, outline, destructive, success, warning, info
**Usage:**
```tsx
<BadgeGlass variant="success">Active</BadgeGlass>
<BadgeGlass variant="warning">Pending</BadgeGlass>
```

#### AvatarGlass
**File:** `src/components/glass/ui/avatar-glass.tsx`
**Sizes:** sm (32px), md (48px), lg (64px), xl (96px)
**Status:** online, offline, busy, away
**Features:** asChild, fallback, image
**Usage:**
```tsx
<AvatarGlass
  name="John Doe"
  src="/avatar.jpg"
  status="online"
  size="lg"
/>
```

#### GlassCard
**File:** `src/components/glass/ui/glass-card.tsx`
**Variants:** glass, light, aurora, outline
**Intensities:** subtle (8px blur), medium (16px blur), strong (24px blur)
**Features:** asChild, padding variants
**Usage:**
```tsx
<GlassCard variant="glass" intensity="medium" padding="default">
  <h3>Card Title</h3>
  <p>Card content</p>
</GlassCard>
```

#### ProgressGlass
**File:** `src/components/glass/ui/progress-glass.tsx`
**Features:** value, max, label, variants
**Usage:**
```tsx
<ProgressGlass value={60} max={100} label="60%" />
```

#### CircularProgressGlass
**File:** `src/components/glass/ui/circular-progress-glass.tsx`
**Features:** value, size, stroke width, label
**Usage:**
```tsx
<CircularProgressGlass value={75} size={120} strokeWidth={8}>
  75%
</CircularProgressGlass>
```

#### SkeletonGlass
**File:** `src/components/glass/ui/skeleton-glass.tsx`
**Features:** width, height, circle variant, animated
**Usage:**
```tsx
<SkeletonGlass width={200} height={20} />
<SkeletonGlass circle size={48} />
```

#### ComboBoxGlass
**File:** `src/components/glass/ui/combobox-glass.tsx`
**Features:** Searchable, multi-select, async loading, keyboard navigation
**Usage:**
```tsx
<ComboBoxGlass
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select option..."
  searchable
/>
```

#### NotificationGlass
**File:** `src/components/glass/ui/notification-glass.tsx`
**Variants:** default, destructive, success, warning
**Features:** Toast style, auto-close, dismissable
**Usage:**
```tsx
<NotificationGlass
  variant="success"
  title="Success"
  message="Changes saved successfully"
  onClose={() => {}}
  autoClose={3000}
/>
```

#### TooltipGlass
**File:** `src/components/glass/ui/tooltip-glass.tsx`
**Sides:** top, bottom, left, right
**Features:** Delay config, Radix UI based
**Usage:**
```tsx
<TooltipGlass content="This is a tooltip" side="top">
  <ButtonGlass>Hover me</ButtonGlass>
</TooltipGlass>
```

#### PopoverGlass
**File:** `src/components/glass/ui/popover-glass.tsx`
**Features:** Trigger, content, Radix UI based
**Usage:**
```tsx
<PopoverGlass>
  <PopoverGlass.Trigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </PopoverGlass.Trigger>
  <PopoverGlass.Content>
    <p>Popover content</p>
  </PopoverGlass.Content>
</PopoverGlass>
```

---

### Level 2 - Atomic (6)

Small, specialized components for specific use cases.

#### IconButtonGlass
**File:** `src/components/glass/atomic/icon-button-glass.tsx`
**Sizes:** sm, md, lg, xl
**Usage:**
```tsx
<IconButtonGlass size="md" aria-label="Close">
  <X />
</IconButtonGlass>
```

#### ThemeToggleGlass
**File:** `src/components/glass/atomic/theme-toggle-glass.tsx`
**Themes:** glass, light, aurora
**Usage:**
```tsx
<ThemeToggleGlass />
```

#### SearchBoxGlass
**File:** `src/components/glass/atomic/search-box-glass.tsx`
**Features:** Search icon, clear button, debounced
**Usage:**
```tsx
<SearchBoxGlass
  placeholder="Search..."
  onSearch={(query) => handleSearch(query)}
/>
```

#### SortDropdownGlass
**File:** `src/components/glass/atomic/sort-dropdown-glass.tsx`
**Features:** Sort options, ascending/descending
**Usage:**
```tsx
<SortDropdownGlass
  options={['Name', 'Date', 'Size']}
  value={sortBy}
  onChange={setSortBy}
/>
```

#### StatItemGlass
**File:** `src/components/glass/atomic/stat-item-glass.tsx`
**Features:** Label, value, change percentage, trend indicator
**Usage:**
```tsx
<StatItemGlass
  label="Total Users"
  value="12,345"
  change={12.5}
  trend="up"
/>
```

#### ExpandableHeaderGlass
**File:** `src/components/glass/atomic/expandable-header-glass.tsx`
**Features:** Collapsible, animated, chevron icon
**Usage:**
```tsx
<ExpandableHeaderGlass title="Section Title" defaultExpanded>
  <p>Expandable content</p>
</ExpandableHeaderGlass>
```

---

### Level 3 - Specialized (8)

Advanced specialized components for specific use cases.

#### StatusIndicatorGlass
**File:** `src/components/glass/specialized/status-indicator-glass.tsx`
**States:** online, offline, busy, away
**Features:** Glow effect, pulsing animation
**Usage:**
```tsx
<StatusIndicatorGlass status="online" />
```

#### SegmentedControlGlass
**File:** `src/components/glass/specialized/segmented-control-glass.tsx`
**Features:** Button group, exclusive selection, animated indicator
**Usage:**
```tsx
<SegmentedControlGlass
  options={['Day', 'Week', 'Month']}
  value={period}
  onChange={setPeriod}
/>
```

#### RainbowProgressGlass
**File:** `src/components/glass/specialized/rainbow-progress-glass.tsx`
**Features:** Gradient progress, animated, smooth transitions
**Usage:**
```tsx
<RainbowProgressGlass value={60} max={100} />
```

#### LanguageBarGlass
**File:** `src/components/glass/specialized/language-bar-glass.tsx`
**Features:** Proficiency bar, language legend, color-coded
**Usage:**
```tsx
<LanguageBarGlass
  languages={[
    { name: 'TypeScript', percentage: 45, color: '#3178c6' },
    { name: 'JavaScript', percentage: 30, color: '#f7df1e' },
    { name: 'CSS', percentage: 25, color: '#1572b6' },
  ]}
/>
```

#### ProfileAvatarGlass
**File:** `src/components/glass/specialized/profile-avatar-glass.tsx`
**Sizes:** xl (128px), xxl (160px)
**Features:** Large avatar, glow animation, status indicator
**Usage:**
```tsx
<ProfileAvatarGlass
  name="John Doe"
  src="/avatar.jpg"
  status="online"
  size="xl"
/>
```

#### FlagAlertGlass
**File:** `src/components/glass/specialized/flag-alert-glass.tsx`
**Types:** warning, danger
**Features:** Icon, dismissable, prominent styling
**Usage:**
```tsx
<FlagAlertGlass type="warning" title="Warning">
  This action requires admin privileges
</FlagAlertGlass>
```

---

### Level 4 - Composite (13)

Pre-built complex components combining multiple elements.

#### MetricCardGlass
**File:** `src/components/glass/composite/metric-card-glass.tsx`
**Features:** Metric display, progress indicator, trend
**Usage:**
```tsx
<MetricCardGlass
  label="Revenue"
  value="$45,678"
  change={12.5}
  trend="up"
  progress={75}
/>
```

#### AICardGlass
**File:** `src/components/glass/composite/ai-card-glass.tsx`
**Features:** AI summary card with feature list
**Usage:**
```tsx
<AICardGlass
  title="AI Analysis"
  summary="User shows high engagement"
  features={['Active user', 'High trust score', 'Regular contributor']}
/>
```

---

### Level 5 - Sections (7)

Full-page sections ready to use in your application.

#### HeaderNavGlass
**File:** `src/components/glass/sections/header-nav-glass.tsx`
**Features:** Navigation header, search, theme toggle
**Usage:**
```tsx
<HeaderNavGlass
  logo={<Logo />}
  navigation={navItems}
  onSearch={(query) => handleSearch(query)}
/>
```

#### ProfileHeaderGlass
**File:** `src/components/glass/sections/profile-header-glass.tsx`
**Features:** User profile, avatar, stats, languages
**Usage:**
```tsx
<ProfileHeaderGlass
  user={userData}
  stats={userStats}
  languages={userLanguages}
/>
```

---

## By Use Case

### Forms
- **InputGlass** - Text, email, password inputs
- **CheckboxGlass** - Checkboxes with labels
- **ToggleGlass** - Toggle switches
- **SliderGlass** - Range sliders
- **ComboBoxGlass** - Searchable select
- **FormFieldWrapper** (primitive) - Form field structure

### Navigation
- **HeaderNavGlass** - Navigation header
- **TabsGlass** - Tab navigation
- **DropdownGlass** - Dropdown menus
- **ButtonGlass** (asChild) - Link buttons
- **SegmentedControlGlass** - Segmented buttons

### Feedback
- **AlertGlass** - Alert messages (4 variants)
- **NotificationGlass** - Toast notifications
- **TooltipGlass** - Tooltips
- **BadgeGlass** - Status badges (7 variants)
- **SkeletonGlass** - Loading skeletons
- **ProgressGlass** - Progress bars

### Data Display
- **GlassCard** - Card containers
- **MetricCardGlass** - Metric displays
- **CircularMetricGlass** - Circular metrics
- **TrustScoreCardGlass** - Score displays
- **StatItemGlass** - Stat items

### Modals & Overlays
- **ModalGlass** (compound) - Modal dialogs
- **PopoverGlass** - Popovers
- **DropdownGlass** - Dropdowns

---

## Search Index

For AI assistants: Use Ctrl+F to search by keyword.

**Keywords mapping:**
- "button" → ButtonGlass, IconButtonGlass
- "input, text field" → InputGlass, SearchBoxGlass
- "form, validation" → InputGlass, CheckboxGlass, ToggleGlass, SliderGlass, FormFieldWrapper
- "modal, dialog, popup" → ModalGlass
- "dropdown, menu, select" → DropdownGlass, ComboBoxGlass, SortDropdownGlass
- "notification, toast, alert, message" → NotificationGlass, AlertGlass, FlagAlertGlass
- "progress, loading, spinner" → ProgressGlass, CircularProgressGlass, RainbowProgressGlass, SkeletonGlass
- "card, container, box" → GlassCard, MetricCardGlass, AICardGlass, YearCardGlass, TrustScoreCardGlass
- "avatar, profile, user" → AvatarGlass, ProfileAvatarGlass, ProfileHeaderGlass, UserInfoGlass
- "badge, tag, label, status" → BadgeGlass, StatusIndicatorGlass
- "tabs, navigation, switch" → TabsGlass, HeaderNavGlass, SegmentedControlGlass
- "theme, dark mode" → ThemeProvider, ThemeToggleGlass, useTheme
- "tooltip, hint, help" → TooltipGlass
- "slider, range" → SliderGlass
- "checkbox, check" → CheckboxGlass
- "toggle, switch" → ToggleGlass
- "search, filter" → SearchBoxGlass, ComboBoxGlass
- "sort, order" → SortDropdownGlass
- "stats, metrics, analytics" → StatItemGlass, MetricCardGlass, MetricsGridGlass
- "repository, repo, project" → RepositoryCardGlass, ProjectsListGlass
- "header, navigation, nav" → HeaderNavGlass, HeaderBrandingGlass
- "expandable, collapsible, accordion" → ExpandableHeaderGlass
- "touch, mobile, accessibility" → TouchTarget
- "primitive, wrapper, container" → FormFieldWrapper, InteractiveCard, TouchTarget

---

## Quick Start Examples

### Simple Form
```tsx
import { InputGlass, CheckboxGlass, ButtonGlass } from 'shadcn-glass-ui';

<form>
  <InputGlass label="Email" type="email" required />
  <InputGlass label="Password" type="password" required />
  <CheckboxGlass label="Remember me" />
  <ButtonGlass type="submit">Sign In</ButtonGlass>
</form>
```

### Dashboard
```tsx
import { MetricCardGlass, ProgressGlass, GlassCard } from 'shadcn-glass-ui';

<div className="grid grid-cols-3 gap-4">
  <MetricCardGlass label="Users" value="12,345" change={12.5} trend="up" />
  <MetricCardGlass label="Revenue" value="$45k" change={-3.2} trend="down" />
  <GlassCard>
    <ProgressGlass value={75} label="Completion" />
  </GlassCard>
</div>
```

### Navigation
```tsx
import { TabsGlass, ButtonGlass } from 'shadcn-glass-ui';

<TabsGlass.Root value={tab} onValueChange={setTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="overview">Overview</TabsGlass.Trigger>
    <TabsGlass.Trigger value="analytics">Analytics</TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="overview">...</TabsGlass.Content>
  <TabsGlass.Content value="analytics">...</TabsGlass.Content>
</TabsGlass.Root>
```

---

**Total Components:** 55
**Total Variants:** 100+
**Accessibility:** WCAG 2.1 AA compliant
**TypeScript:** Full type definitions
**Themes:** 3 (glass, light, aurora)
