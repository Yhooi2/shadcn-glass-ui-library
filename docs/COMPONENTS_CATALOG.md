# Component Catalog

Searchable index of all **59 components** in shadcn-glass-ui.

**v2.0.0 Update:** All components now use the 3-layer token system with semantic CSS variables. Zero
hardcoded OKLCH values across all components.

## Quick Reference Table

| Component                      | Level       | File                                                              | Props | Key Features                                 |
| ------------------------------ | ----------- | ----------------------------------------------------------------- | ----- | -------------------------------------------- |
| **ButtonGlass**                | Core UI     | `src/components/glass/ui/button-glass.tsx`                        | 7     | asChild, loading, icon, ripple, 6 variants   |
| **InputGlass**                 | Core UI     | `src/components/glass/ui/input-glass.tsx`                         | 8     | label, error, success, icon, validation      |
| **CheckboxGlass**              | Core UI     | `src/components/glass/ui/checkbox-glass.tsx`                      | 5     | label, checked, glow effect                  |
| **ToggleGlass**                | Core UI     | `src/components/glass/ui/toggle-glass.tsx`                        | 5     | label, switch variant, accessible            |
| **SliderGlass**                | Core UI     | `src/components/glass/ui/slider-glass.tsx`                        | 6     | min/max/step, label, single/range            |
| **ModalGlass**                 | Core UI     | `src/components/glass/ui/modal-glass.tsx`                         | -     | Compound API, overlay, 3 sizes               |
| **TabsGlass**                  | Core UI     | `src/components/glass/ui/tabs-glass.tsx`                          | -     | Compound API, animated                       |
| **DropdownGlass**              | Core UI     | `src/components/glass/ui/dropdown-glass.tsx`                      | 8     | Radix UI based, submenu support              |
| **TooltipGlass**               | Core UI     | `src/components/glass/ui/tooltip-glass.tsx`                       | 6     | Radix UI, 4 sides, delay config              |
| **AlertGlass**                 | Core UI     | `src/components/glass/ui/alert-glass.tsx`                         | 5     | 4 variants, icon, dismissable                |
| **NotificationGlass**          | Core UI     | `src/components/glass/ui/notification-glass.tsx`                  | 6     | Toast style, 4 variants, auto-close          |
| **BadgeGlass**                 | Core UI     | `src/components/glass/ui/badge-glass.tsx`                         | 4     | 7 variants, dot variant                      |
| **AvatarGlass**                | Core UI     | `src/components/glass/ui/avatar-glass.tsx`                        | 5     | asChild, status, 4 sizes, fallback           |
| **GlassCard**                  | Core UI     | `src/components/glass/ui/glass-card.tsx`                          | 6     | asChild, 4 variants, 3 intensities           |
| **ProgressGlass**              | Core UI     | `src/components/glass/ui/progress-glass.tsx`                      | 5     | value, max, label, variants                  |
| **CircularProgressGlass**      | Core UI     | `src/components/glass/ui/circular-progress-glass.tsx`             | 6     | value, size, stroke, label                   |
| **SkeletonGlass**              | Core UI     | `src/components/glass/ui/skeleton-glass.tsx`                      | 5     | width, height, circle, variants              |
| **ComboBoxGlass**              | Core UI     | `src/components/glass/ui/combobox-glass.tsx`                      | 8     | searchable, multi-select, async              |
| **PopoverGlass**               | Core UI     | `src/components/glass/ui/popover-glass.tsx`                       | 6     | Radix UI, trigger, content                   |
| **IconButtonGlass**            | Atomic      | `src/components/glass/atomic/icon-button-glass.tsx`               | 5     | Icon-only, aria-label, 4 sizes               |
| **ThemeToggleGlass**           | Atomic      | `src/components/glass/atomic/theme-toggle-glass.tsx`              | 3     | 3 themes, icon animated                      |
| **SearchBoxGlass**             | Atomic      | `src/components/glass/atomic/search-box-glass.tsx`                | 6     | Search icon, clear button                    |
| **SortDropdownGlass**          | Atomic      | `src/components/glass/atomic/sort-dropdown-glass.tsx`             | 5     | Sort options, ascending/descending           |
| **StatItemGlass**              | Atomic      | `src/components/glass/atomic/stat-item-glass.tsx`                 | 5     | Label, value, change, trend                  |
| **ExpandableHeaderGlass**      | Atomic      | `src/components/glass/atomic/expandable-header-glass.tsx`         | 5     | Collapsible, animated                        |
| **InsightCardGlass**           | Atomic      | `src/components/glass/atomic/insight-card-glass.tsx`              | 7     | 7 variants, inline/card mode, clickable      |
| **StatusIndicatorGlass**       | Specialized | `src/components/glass/specialized/status-indicator-glass.tsx`     | 4     | Status dot, 4 states, glow                   |
| **SegmentedControlGlass**      | Specialized | `src/components/glass/specialized/segmented-control-glass.tsx`    | 5     | Button group, exclusive selection            |
| **RainbowProgressGlass**       | Specialized | `src/components/glass/specialized/rainbow-progress-glass.tsx`     | 4     | Gradient progress, animated                  |
| **LanguageBarGlass**           | Specialized | `src/components/glass/specialized/language-bar-glass.tsx`         | 5     | Proficiency bar, legend                      |
| **ProfileAvatarGlass**         | Specialized | `src/components/glass/specialized/profile-avatar-glass.tsx`       | 5     | Large avatar, glow animation                 |
| **FlagAlertGlass**             | Specialized | `src/components/glass/specialized/flag-alert-glass.tsx`           | 5     | Warning/danger, icon, dismissable            |
| **ProgressGlass**              | Specialized | `src/components/glass/specialized/progress-glass.tsx`             | 5     | Enhanced progress bar                        |
| **BaseProgressGlass**          | Specialized | `src/components/glass/specialized/base-progress-glass.tsx`        | 4     | Base progress component                      |
| **SparklineGlass**             | Specialized | `src/components/glass/specialized/sparkline-glass.tsx`            | 6     | Time series chart, height/gap variants       |
| **MetricCardGlass**            | Composite   | `src/components/glass/composite/metric-card-glass.tsx`            | 6     | Metric display, progress, trend              |
| **YearCardGlass**              | Composite   | `src/components/glass/composite/year-card-glass.tsx`              | 5     | Timeline card, expandable                    |
| **AICardGlass**                | Composite   | `src/components/glass/composite/ai-card-glass.tsx`                | 5     | AI summary, feature list                     |
| **RepositoryCardGlass**        | Composite   | `src/components/glass/composite/repository-card-glass.tsx`        | 7     | Repo info, expandable, stats                 |
| **TrustScoreDisplayGlass**     | Composite   | `src/components/glass/composite/trust-score-display-glass.tsx`    | 5     | Score, visual indicator                      |
| **CareerStatsHeaderGlass**     | Composite   | `src/components/glass/composite/career-stats-header-glass.tsx`    | 5     | Career stats, timeline                       |
| **CircularMetricGlass**        | Composite   | `src/components/glass/composite/circular-metric-glass.tsx`        | 5     | Circular progress, metric                    |
| **ContributionMetricsGlass**   | Composite   | `src/components/glass/composite/contribution-metrics-glass.tsx`   | 5     | Contribution grid                            |
| **MetricsGridGlass**           | Composite   | `src/components/glass/composite/metrics-grid-glass.tsx`           | 4     | Grid layout, responsive                      |
| **RepositoryHeaderGlass**      | Composite   | `src/components/glass/composite/repository-header-glass.tsx`      | 6     | Repo header, metadata                        |
| **RepositoryMetadataGlass**    | Composite   | `src/components/glass/composite/repository-metadata-glass.tsx`    | 6     | Repo metadata display                        |
| **UserInfoGlass**              | Composite   | `src/components/glass/composite/user-info-glass.tsx`              | 5     | User card, avatar, stats                     |
| **UserStatsLineGlass**         | Composite   | `src/components/glass/composite/user-stats-line-glass.tsx`        | 4     | Horizontal stats line                        |
| **SplitLayoutGlass**           | Composite   | `src/components/glass/composite/split-layout-glass/`              | -     | Compound API, sticky scroll, master-detail   |
| **SidebarGlass**               | Core UI     | `src/components/glass/ui/sidebar-glass/`                          | -     | Compound API, shadcn/ui compatible, rail     |
| **HeaderNavGlass**             | Section     | `src/components/glass/sections/header-nav-glass.tsx`              | 6     | Navigation, search, theme                    |
| **ProfileHeaderGlass**         | Section     | `src/components/glass/sections/profile-header-glass.tsx`          | 10    | Composite: Extended (transparent) + AICard   |
| **ProfileHeaderExtendedGlass** | Section     | `src/components/glass/sections/profile-header-extended-glass.tsx` | 10    | Extended profile, bio, location, transparent |
| **CareerStatsGlass**           | Section     | `src/components/glass/sections/career-stats-glass.tsx`            | 5     | Career stats, year cards                     |
| **FlagsSectionGlass**          | Section     | `src/components/glass/sections/flags-section-glass.tsx`           | 5     | Expandable flags/warnings                    |
| **TrustScoreCardGlass**        | Section     | `src/components/glass/sections/trust-score-card-glass.tsx`        | 6     | Trust score, metrics                         |
| **ProjectsListGlass**          | Section     | `src/components/glass/sections/projects-list-glass.tsx`           | 6     | Projects, filtering, sorting                 |
| **HeaderBrandingGlass**        | Section     | `src/components/glass/sections/header-branding-glass.tsx`         | 5     | Branded header, logo, nav                    |
| **FormFieldWrapper**           | Primitive   | `src/components/glass/primitives/form-field-wrapper.tsx`          | 6     | Unified form field structure                 |
| **InteractiveCard**            | Primitive   | `src/components/glass/primitives/interactive-card.tsx`            | 5     | Hover animations, glass effects              |
| **TouchTarget**                | Primitive   | `src/components/glass/primitives/touch-target.tsx`                | 4     | Touch-friendly wrapper, 44px min             |

---

## By Level

### Level 0 - Primitives (3)

Foundation components for building other components.

#### FormFieldWrapper

**File:** `src/components/glass/primitives/form-field-wrapper.tsx` **Purpose:** Unified form field
structure with label, error, and success states **Props:** `label`, `error`, `success`, `required`,
`children`, `className` **Usage:**

```tsx
<FormFieldWrapper label="Email" error={emailError}>
  <input type="email" />
</FormFieldWrapper>
```

#### InteractiveCard

**File:** `src/components/glass/primitives/interactive-card.tsx` **Purpose:** Card with hover
animations and glass effects **Props:** `asChild`, `children`, `className`, `onClick`, `onHover`
**Usage:**

```tsx
<InteractiveCard onClick={() => console.log('clicked')}>
  <h3>Interactive Card</h3>
</InteractiveCard>
```

#### TouchTarget

**File:** `src/components/glass/primitives/touch-target.tsx` **Purpose:** Touch-friendly wrapper
ensuring 44×44px minimum (Apple HIG) **Props:** `asChild`, `children`, `className`, `minSize`
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

**File:** `src/components/glass/ui/button-glass.tsx` **Variants:** primary, secondary, ghost,
destructive, success, text **Sizes:** sm, md, lg, xl, icon **Features:** asChild, loading, icon,
ripple effect, glow

**Basic:**

```tsx
<ButtonGlass variant="default">Click me</ButtonGlass>
```

**With Loading State:**

```tsx
<ButtonGlass variant="default" loading={isLoading} disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save Changes'}
</ButtonGlass>
```

**With Icon:**

```tsx
<ButtonGlass variant="secondary" icon={Download} iconPosition="left">
  Download File
</ButtonGlass>
```

**As Link (asChild pattern):**

```tsx
<ButtonGlass asChild variant="ghost">
  <Link href="/dashboard">Go to Dashboard</Link>
</ButtonGlass>
```

**Icon Only Button:**

```tsx
<ButtonGlass variant="ghost" size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</ButtonGlass>
```

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | variant
| string | primary | Visual style | | size | string | md | Button size | | loading | boolean | false
| Show spinner | | icon | LucideIcon | - | Icon component | | iconPosition | left \| right | left |
Icon placement | | asChild | boolean | false | Polymorphic rendering |

#### InputGlass

**File:** `src/components/glass/ui/input-glass.tsx` **Features:** label, error, success, icon, focus
glow

**Basic:**

```tsx
<InputGlass label="Username" placeholder="Enter username" />
```

**With Validation:**

```tsx
<InputGlass
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValidEmail ? 'Invalid email format' : undefined}
  success={isValidEmail ? 'Email is valid' : undefined}
/>
```

**With Icon:**

```tsx
<InputGlass label="Search" icon={Search} placeholder="Search..." aria-label="Search" />
```

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | label |
string | - | Input label | | error | string | - | Error message (red border) | | success | string
| - | Success message (green border) | | icon | LucideIcon | - | Left icon | | iconPosition | left
\| right | left | Icon placement |

#### CheckboxGlass

**File:** `src/components/glass/ui/checkbox-glass.tsx` **Features:** label, checked state, glow
effect, accessible **Usage:**

```tsx
<CheckboxGlass
  id="terms"
  checked={accepted}
  onCheckedChange={setAccepted}
  label="I accept the terms"
/>
```

#### ToggleGlass

**File:** `src/components/glass/ui/toggle-glass.tsx` **Features:** label, switch variant,
accessible, animated **Usage:**

```tsx
<ToggleGlass pressed={enabled} onPressedChange={setEnabled} label="Enable notifications" />
```

#### SliderGlass

**File:** `src/components/glass/ui/slider-glass.tsx` **Features:** min/max/step, label, single/range
values **Usage:**

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

**File:** `src/components/glass/ui/modal-glass.tsx` **Components:** Root, Overlay, Content, Header,
Title, Description, Body, Footer, Close **Sizes:** sm, md, lg **Features:** Compound API, focus
trap, scroll lock, click-outside-to-close

**Basic Confirmation:**

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
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

**Delete Confirmation:**

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content size="sm">
    <ModalGlass.Header>
      <ModalGlass.Title>Delete Item</ModalGlass.Title>
    </ModalGlass.Header>
    <ModalGlass.Body>
      <p>This action cannot be undone. This will permanently delete the item.</p>
    </ModalGlass.Body>
    <ModalGlass.Footer>
      <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </ButtonGlass>
      <ButtonGlass variant="destructive" onClick={handleDelete}>
        Delete
      </ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

**Form Modal:**

```tsx
<ModalGlass.Root open={open} onOpenChange={setOpen}>
  <ModalGlass.Content size="default">
    <ModalGlass.Header>
      <ModalGlass.Title>Create New Project</ModalGlass.Title>
      <ModalGlass.Description>Fill in the details below</ModalGlass.Description>
    </ModalGlass.Header>
    <ModalGlass.Body>
      <form onSubmit={handleSubmit}>
        <InputGlass label="Project Name" required />
        <InputGlass label="Description" />
      </form>
    </ModalGlass.Body>
    <ModalGlass.Footer>
      <ButtonGlass variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </ButtonGlass>
      <ButtonGlass variant="default" onClick={handleSubmit}>
        Create
      </ButtonGlass>
    </ModalGlass.Footer>
  </ModalGlass.Content>
</ModalGlass.Root>
```

**Props (Root):** | Prop | Type | Default | Description | |------|------|---------|-------------| |
open | boolean | - | Controlled open state | | onOpenChange | (open: boolean) => void | - | Open
state change handler | | children | ReactNode | - | Modal content |

**Props (Content):** | Prop | Type | Default | Description | |------|------|---------|-------------|
| size | sm \| md \| lg | md | Modal width | | className | string | - | Additional styles |

#### TabsGlass (Compound API)

**File:** `src/components/glass/ui/tabs-glass.tsx` **Components:** Root, List, Trigger, Content
**Features:** Animated indicator, keyboard navigation, ARIA support

**Basic Tabs:**

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

**Settings Tabs with Icons:**

```tsx
<TabsGlass.Root defaultValue="general">
  <TabsGlass.List>
    <TabsGlass.Trigger value="general">
      <Settings className="w-4 h-4 mr-2" />
      General
    </TabsGlass.Trigger>
    <TabsGlass.Trigger value="security">
      <Shield className="w-4 h-4 mr-2" />
      Security
    </TabsGlass.Trigger>
    <TabsGlass.Trigger value="notifications">
      <Bell className="w-4 h-4 mr-2" />
      Notifications
    </TabsGlass.Trigger>
  </TabsGlass.List>
  <TabsGlass.Content value="general">
    <GlassCard>General settings content</GlassCard>
  </TabsGlass.Content>
  <TabsGlass.Content value="security">
    <GlassCard>Security settings content</GlassCard>
  </TabsGlass.Content>
  <TabsGlass.Content value="notifications">
    <GlassCard>Notification preferences</GlassCard>
  </TabsGlass.Content>
</TabsGlass.Root>
```

**Props (Root):** | Prop | Type | Default | Description | |------|------|---------|-------------| |
value | string | - | Controlled active tab | | defaultValue | string | - | Initial tab | |
onValueChange | (value: string) => void | - | Change handler |

**Props (Trigger):** | Prop | Type | Default | Description | |------|------|---------|-------------|
| value | string | - | Tab identifier | | disabled | boolean | false | Disable tab |

#### DropdownGlass

**File:** `src/components/glass/ui/dropdown-glass.tsx` + `dropdown-menu-glass.tsx` **Features:**
Radix UI based, submenu support, keyboard navigation **API:** Simple API (items prop) + Compound
components (DropdownMenuGlass.\*)

**Simple API (recommended for basic dropdowns):**

```tsx
<DropdownGlass
  trigger={<ButtonGlass>Menu</ButtonGlass>}
  items={[
    { label: 'Profile', icon: User, onClick: () => {} },
    { label: 'Settings', icon: Settings, onClick: () => {} },
    { divider: true },
    { label: 'Logout', icon: LogOut, onClick: () => {}, danger: true },
  ]}
/>
```

**Compound API (for complex dropdowns with full control):**

```tsx
<DropdownMenuGlass>
  <DropdownMenuGlassTrigger asChild>
    <ButtonGlass>Open Menu</ButtonGlass>
  </DropdownMenuGlassTrigger>
  <DropdownMenuGlassContent>
    <DropdownMenuGlassLabel>My Account</DropdownMenuGlassLabel>
    <DropdownMenuGlassSeparator />
    <DropdownMenuGlassGroup>
      <DropdownMenuGlassItem>
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuGlassItem>
      <DropdownMenuGlassItem>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </DropdownMenuGlassItem>
    </DropdownMenuGlassGroup>
    <DropdownMenuGlassSeparator />
    <DropdownMenuGlassItem variant="destructive">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuGlassItem>
  </DropdownMenuGlassContent>
</DropdownMenuGlass>
```

**Available Compound Components:**

- `DropdownMenuGlass` - Root container
- `DropdownMenuGlassTrigger` - Trigger button (use `asChild`)
- `DropdownMenuGlassContent` - Menu content container
- `DropdownMenuGlassItem` - Menu item (supports `variant="destructive"`)
- `DropdownMenuGlassLabel` - Section label
- `DropdownMenuGlassSeparator` - Divider
- `DropdownMenuGlassGroup` - Group items
- `DropdownMenuGlassCheckboxItem` - Checkbox menu item
- `DropdownMenuGlassRadioGroup` + `DropdownMenuGlassRadioItem` - Radio menu items
- `DropdownMenuGlassSub` + `DropdownMenuGlassSubTrigger` + `DropdownMenuGlassSubContent` - Submenu

#### AlertGlass

**File:** `src/components/glass/ui/alert-glass.tsx` **Variants:** default, destructive, success,
warning **Features:** Compound component (Title, Description), icon, dismissable **API:** Compound
component pattern (shadcn/ui compatible)

**Default Alert:**

```tsx
<AlertGlass variant="default">
  <AlertGlassTitle>Information</AlertGlassTitle>
  <AlertGlassDescription>This is an informational message.</AlertGlassDescription>
</AlertGlass>
```

**Destructive Alert:**

```tsx
<AlertGlass variant="destructive">
  <AlertGlassTitle>Error</AlertGlassTitle>
  <AlertGlassDescription>Something went wrong. Please try again.</AlertGlassDescription>
</AlertGlass>
```

**Success Alert:**

```tsx
<AlertGlass variant="success">
  <AlertGlassTitle>Success!</AlertGlassTitle>
  <AlertGlassDescription>Your changes have been saved successfully.</AlertGlassDescription>
</AlertGlass>
```

**Warning Alert:**

```tsx
<AlertGlass variant="warning">
  <AlertGlassTitle>Warning</AlertGlassTitle>
  <AlertGlassDescription>This action may have unintended consequences.</AlertGlassDescription>
</AlertGlass>
```

**Dismissable Alert:**

```tsx
<AlertGlass variant="warning" dismissable onDismiss={() => console.log('dismissed')}>
  <AlertGlassTitle>Session Expiring</AlertGlassTitle>
  <AlertGlassDescription>Your session will expire in 5 minutes.</AlertGlassDescription>
</AlertGlass>
```

**Props (AlertGlass):**

| Prop        | Type                                         | Default | Description                             |
| ----------- | -------------------------------------------- | ------- | --------------------------------------- |
| variant     | default \| destructive \| success \| warning | default | Visual style variant                    |
| children    | ReactNode                                    | -       | AlertGlassTitle + AlertGlassDescription |
| dismissable | boolean                                      | false   | Show dismiss button                     |
| onDismiss   | () => void                                   | -       | Dismiss callback                        |

**Sub-components:**

- `AlertGlassTitle` - Alert title (inherits color from variant)
- `AlertGlassDescription` - Alert description text (inherits color, 80% opacity)

#### BadgeGlass

**File:** `src/components/glass/ui/badge-glass.tsx` **Variants:** default, secondary, outline,
destructive, success, warning, info **Features:** Multiple variants, clickable, with icons

**Status Badges:**

```tsx
<BadgeGlass variant="success">Active</BadgeGlass>
<BadgeGlass variant="warning">Pending</BadgeGlass>
<BadgeGlass variant="destructive">Expired</BadgeGlass>
```

**Badge with Icon:**

```tsx
<BadgeGlass variant="info">
  <Star className="w-3 h-3 mr-1" />
  Featured
</BadgeGlass>
```

**Badge Group:**

```tsx
<div className="flex gap-2">
  <BadgeGlass variant="default">React</BadgeGlass>
  <BadgeGlass variant="default">TypeScript</BadgeGlass>
  <BadgeGlass variant="default">Tailwind</BadgeGlass>
</div>
```

**Outline Badges:**

```tsx
<BadgeGlass variant="outline">Draft</BadgeGlass>
<BadgeGlass variant="secondary">v1.0.0</BadgeGlass>
```

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | variant
| string | default | Visual style (7 options) | | children | ReactNode | - | Badge content | |
className | string | - | Additional styles |

#### AvatarGlass

**File:** `src/components/glass/ui/avatar-glass.tsx` **Sizes:** sm (32px), md (48px), lg (64px), xl
(96px) **Status:** online, offline, busy, away **Features:** Compound component (Radix UI),
fallback, image **API:** Compound component + Simple wrapper

**Compound API (recommended):**

```tsx
<AvatarGlass size="lg" status="online">
  <AvatarGlassImage src="/avatar.jpg" alt="John Doe" />
  <AvatarGlassFallback>JD</AvatarGlassFallback>
</AvatarGlass>
```

**Simple API (backward compatible):**

```tsx
<AvatarGlassSimple name="John Doe" size="lg" status="online" />
```

#### GlassCard

**File:** `src/components/glass/ui/glass-card.tsx` **Variants:** glass, light, aurora, outline
**Intensities:** subtle (8px blur), medium (16px blur), strong (24px blur) **Features:** asChild,
padding variants, hover effects

**Basic Card:**

```tsx
<GlassCard variant="glass" intensity="medium" padding="default">
  <h3>Card Title</h3>
  <p>Card content</p>
</GlassCard>
```

**Subtle Glass (Low Blur):**

```tsx
<GlassCard intensity="subtle">
  <p>Subtle glass effect for layered content</p>
</GlassCard>
```

**Strong Glass (High Blur):**

```tsx
<GlassCard intensity="strong" padding="lg">
  <h2 className="text-xl font-bold">Featured Section</h2>
  <p>High visibility glass card for important content</p>
</GlassCard>
```

**As Clickable Link (asChild):**

```tsx
<GlassCard asChild>
  <a href="/dashboard">
    <h3>Go to Dashboard</h3>
    <p>Click to navigate</p>
  </a>
</GlassCard>
```

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | variant
| glass \| light \| aurora \| outline | glass | Theme variant | | intensity | subtle \| medium \|
strong | medium | Blur intensity | | padding | none \| sm \| default \| lg | default | Padding size
| | asChild | boolean | false | Polymorphic rendering |

#### ProgressGlass

**File:** `src/components/glass/ui/progress-glass.tsx` **Features:** value, max, label, variants
**Usage:**

```tsx
<ProgressGlass value={60} max={100} label="60%" />
```

#### CircularProgressGlass

**File:** `src/components/glass/ui/circular-progress-glass.tsx` **Features:** value, size, stroke
width, label **Usage:**

```tsx
<CircularProgressGlass value={75} size={120} strokeWidth={8}>
  75%
</CircularProgressGlass>
```

#### SkeletonGlass

**File:** `src/components/glass/ui/skeleton-glass.tsx` **Features:** width, height, circle variant,
animated **Usage:**

```tsx
<SkeletonGlass width={200} height={20} />
<SkeletonGlass circle size={48} />
```

#### ComboBoxGlass

**File:** `src/components/glass/ui/combobox-glass.tsx` **Features:** Searchable, multi-select, async
loading, keyboard navigation

**Basic ComboBox:**

```tsx
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

<ComboBoxGlass
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select framework..."
/>;
```

**Searchable ComboBox:**

```tsx
<ComboBoxGlass
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Search frameworks..."
  searchable
/>
```

**Multi-Select:**

```tsx
<ComboBoxGlass
  options={options}
  value={selectedItems}
  onChange={setSelectedItems}
  placeholder="Select multiple..."
  multiple
/>
```

**With Performance Optimization (useMemo):**

```tsx
// IMPORTANT: Memoize options to prevent re-renders
const options = useMemo(
  () => [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ],
  []
);

<ComboBoxGlass options={options} value={value} onChange={setValue} />;
```

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | options
| Option[] | - | Available options | | value | string \| string[] | - | Selected value(s) | |
onChange | (value) => void | - | Change handler | | placeholder | string | - | Placeholder text | |
searchable | boolean | false | Enable search | | multiple | boolean | false | Allow multi-select | |
disabled | boolean | false | Disable input |

#### NotificationGlass

**File:** `src/components/glass/ui/notification-glass.tsx` **Variants:** default, destructive,
success, warning **Features:** Toast style, auto-close, dismissable, actions

**Success Notification:**

```tsx
<NotificationGlass
  variant="success"
  title="Success"
  message="Changes saved successfully"
  onClose={() => {}}
  autoClose={3000}
/>
```

**Error Notification:**

```tsx
<NotificationGlass
  variant="destructive"
  title="Error"
  message="Failed to save changes. Please try again."
  onClose={() => {}}
/>
```

**Warning Notification:**

```tsx
<NotificationGlass
  variant="warning"
  title="Warning"
  message="Your session will expire in 5 minutes."
  onClose={() => {}}
  autoClose={10000}
/>
```

**Notification with Action:**

```tsx
<NotificationGlass
  variant="default"
  title="New Update Available"
  message="A new version is ready to install."
  onClose={() => {}}
  action={
    <ButtonGlass size="sm" variant="secondary" onClick={handleUpdate}>
      Update Now
    </ButtonGlass>
  }
/>
```

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | variant
| default \| destructive \| success \| warning | default | Visual style | | title | string | - |
Notification title | | message | string | - | Notification message | | onClose | () => void | - |
Close handler | | autoClose | number | - | Auto-close delay (ms) | | action | ReactNode | - | Action
button |

#### TooltipGlass

**File:** `src/components/glass/ui/tooltip-glass.tsx` **Sides:** top, bottom, left, right
**Features:** Radix UI based, accessible, delay config **API:** Compound component + Simple wrapper

**Compound API (recommended):**

```tsx
<TooltipGlassProvider>
  <TooltipGlass>
    <TooltipGlassTrigger asChild>
      <ButtonGlass>Hover me</ButtonGlass>
    </TooltipGlassTrigger>
    <TooltipGlassContent side="top">
      <p>This is a tooltip</p>
    </TooltipGlassContent>
  </TooltipGlass>
</TooltipGlassProvider>
```

**Simple API (backward compatible):**

```tsx
<TooltipGlassProvider>
  <TooltipGlassSimple content="This is a tooltip" side="top">
    <ButtonGlass>Hover me</ButtonGlass>
  </TooltipGlassSimple>
</TooltipGlassProvider>
```

**Tooltip on Icon Button (Accessibility):**

```tsx
<TooltipGlassProvider>
  <TooltipGlassSimple content="Delete item" side="bottom">
    <ButtonGlass variant="ghost" size="icon" aria-label="Delete item">
      <Trash className="h-4 w-4" />
    </ButtonGlass>
  </TooltipGlassSimple>
</TooltipGlassProvider>
```

**Tooltip with Custom Delay:**

```tsx
<TooltipGlass content="Detailed information" side="right" delayDuration={500}>
  <Info className="h-4 w-4 text-muted-foreground" />
</TooltipGlass>
```

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | content
| ReactNode | - | Tooltip content | | side | top \| bottom \| left \| right | top | Position | |
delayDuration | number | 200 | Show delay (ms) | | sideOffset | number | 4 | Distance from trigger |
| children | ReactNode | - | Trigger element |

#### PopoverGlass

**File:** `src/components/glass/ui/popover-glass.tsx` **Features:** Radix UI based, trigger,
content, anchor **API:** Compound component + Legacy wrapper

**Compound API (recommended):**

```tsx
<PopoverGlass>
  <PopoverGlassTrigger asChild>
    <ButtonGlass>Open</ButtonGlass>
  </PopoverGlassTrigger>
  <PopoverGlassContent side="bottom" align="center">
    <p>Popover content</p>
  </PopoverGlassContent>
</PopoverGlass>
```

**Legacy API (backward compatible):**

```tsx
<PopoverGlassLegacy trigger={<ButtonGlass>Open</ButtonGlass>} side="bottom" align="center">
  <p>Popover content</p>
</PopoverGlassLegacy>
```

#### SidebarGlass (Compound API)

**File:** `src/components/glass/ui/sidebar-glass/sidebar-glass.tsx` **Components:** Provider, Root,
Header, Content, Footer, Rail, Inset, Trigger, Separator, Group, GroupLabel, GroupAction,
GroupContent, Menu, MenuItem, MenuButton, MenuAction, MenuBadge, MenuSkeleton, MenuSub, MenuSubItem,
MenuSubButton **Features:** 100% shadcn/ui compatible, mobile drawer, desktop collapsible
(offcanvas/icon/none), glassmorphism

**Basic Sidebar:**

```tsx
<SidebarGlass.Provider>
  <SidebarGlass.Root>
    <SidebarGlass.Header>
      <Logo />
    </SidebarGlass.Header>
    <SidebarGlass.Content>
      <SidebarGlass.Menu>
        <SidebarGlass.MenuItem>
          <SidebarGlass.MenuButton isActive>
            <Home className="w-4 h-4" />
            Dashboard
          </SidebarGlass.MenuButton>
        </SidebarGlass.MenuItem>
        <SidebarGlass.MenuItem>
          <SidebarGlass.MenuButton>
            <Settings className="w-4 h-4" />
            Settings
          </SidebarGlass.MenuButton>
        </SidebarGlass.MenuItem>
      </SidebarGlass.Menu>
    </SidebarGlass.Content>
    <SidebarGlass.Footer>
      <UserInfo />
    </SidebarGlass.Footer>
  </SidebarGlass.Root>
  <SidebarGlass.Inset>
    <main>Main Content</main>
  </SidebarGlass.Inset>
</SidebarGlass.Provider>
```

**With Groups and Submenus:**

```tsx
<SidebarGlass.Provider collapsible="icon" side="left">
  <SidebarGlass.Root>
    <SidebarGlass.Content>
      <SidebarGlass.Group>
        <SidebarGlass.GroupLabel>Main</SidebarGlass.GroupLabel>
        <SidebarGlass.GroupContent>
          <SidebarGlass.Menu>
            <SidebarGlass.MenuItem>
              <SidebarGlass.MenuButton tooltip="Dashboard">
                <Home /> Dashboard
              </SidebarGlass.MenuButton>
            </SidebarGlass.MenuItem>
          </SidebarGlass.Menu>
        </SidebarGlass.GroupContent>
      </SidebarGlass.Group>
    </SidebarGlass.Content>
    <SidebarGlass.Rail />
  </SidebarGlass.Root>
</SidebarGlass.Provider>
```

**Props (Provider):**

| Prop             | Type                               | Default         | Description                        |
| ---------------- | ---------------------------------- | --------------- | ---------------------------------- |
| side             | 'left' \| 'right'                  | 'left'          | Sidebar position                   |
| variant          | 'sidebar' \| 'floating' \| 'inset' | 'sidebar'       | Visual style                       |
| collapsible      | 'offcanvas' \| 'icon' \| 'none'    | 'offcanvas'     | Collapse behavior                  |
| open             | boolean                            | -               | Controlled open state              |
| onOpenChange     | (open: boolean) => void            | -               | Open state change handler          |
| defaultOpen      | boolean                            | true            | Initial open state                 |
| cookieName       | string                             | 'sidebar:state' | Cookie name for persistence        |
| keyboardShortcut | string \| false                    | 'b'             | Keyboard shortcut (Cmd/Ctrl + key) |

**Hook: useSidebar()**

```tsx
const { state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
```

---

### Level 2 - Atomic (7)

Small, specialized components for specific use cases.

#### IconButtonGlass

**File:** `src/components/glass/atomic/icon-button-glass.tsx` **Sizes:** sm, md, lg, xl **Usage:**

```tsx
<IconButtonGlass size="default" aria-label="Close">
  <X />
</IconButtonGlass>
```

#### ThemeToggleGlass

**File:** `src/components/glass/atomic/theme-toggle-glass.tsx` **Themes:** glass, light, aurora
**Usage:**

```tsx
<ThemeToggleGlass />
```

#### SearchBoxGlass

**File:** `src/components/glass/atomic/search-box-glass.tsx` **Features:** Search icon, clear
button, debounced **Usage:**

```tsx
<SearchBoxGlass placeholder="Search..." onSearch={(query) => handleSearch(query)} />
```

#### SortDropdownGlass

**File:** `src/components/glass/atomic/sort-dropdown-glass.tsx` **Features:** Sort options,
ascending/descending **Usage:**

```tsx
<SortDropdownGlass options={['Name', 'Date', 'Size']} value={sortBy} onChange={setSortBy} />
```

#### StatItemGlass

**File:** `src/components/glass/atomic/stat-item-glass.tsx` **Features:** Label, value, change
percentage, trend indicator **Usage:**

```tsx
<StatItemGlass label="Total Users" value="12,345" change={12.5} trend="up" />
```

#### ExpandableHeaderGlass

**File:** `src/components/glass/atomic/expandable-header-glass.tsx` **Features:** Collapsible,
animated, chevron icon **Usage:**

```tsx
<ExpandableHeaderGlass title="Section Title" defaultExpanded>
  <p>Expandable content</p>
</ExpandableHeaderGlass>
```

---

### Level 3 - Specialized (9)

Advanced specialized components for specific use cases.

#### StatusIndicatorGlass

**File:** `src/components/glass/specialized/status-indicator-glass.tsx` **States:** online, offline,
busy, away **Features:** Glow effect, pulsing animation **Usage:**

```tsx
<StatusIndicatorGlass status="online" />
```

#### SegmentedControlGlass

**File:** `src/components/glass/specialized/segmented-control-glass.tsx` **Features:** Button group,
exclusive selection, animated indicator **Usage:**

```tsx
<SegmentedControlGlass options={['Day', 'Week', 'Month']} value={period} onChange={setPeriod} />
```

#### RainbowProgressGlass

**File:** `src/components/glass/specialized/rainbow-progress-glass.tsx` **Features:** Gradient
progress, animated, smooth transitions **Usage:**

```tsx
<RainbowProgressGlass value={60} max={100} />
```

#### LanguageBarGlass

**File:** `src/components/glass/specialized/language-bar-glass.tsx` **Features:** Proficiency bar,
language legend, color-coded **Usage:**

```tsx
<LanguageBarGlass
  languages={[
    { name: 'TypeScript', percent: 45, color: '#3178c6' },
    { name: 'JavaScript', percent: 30, color: '#f7df1e' },
    { name: 'CSS', percent: 25, color: '#1572b6' },
  ]}
/>
```

#### ProfileAvatarGlass

**File:** `src/components/glass/specialized/profile-avatar-glass.tsx` **Sizes:** xl (128px), xxl
(160px) **Features:** Large avatar, glow animation, status indicator **Usage:**

```tsx
<ProfileAvatarGlass name="John Doe" src="/avatar.jpg" status="online" size="xl" />
```

#### FlagAlertGlass

**File:** `src/components/glass/specialized/flag-alert-glass.tsx` **Types:** warning, danger
**Features:** Icon, dismissable, prominent styling **Usage:**

```tsx
<FlagAlertGlass type="warning" title="Warning">
  This action requires admin privileges
</FlagAlertGlass>
```

---

### Level 4 - Composite (13)

Pre-built complex components combining multiple elements.

#### MetricCardGlass

**File:** `src/components/glass/composite/metric-card-glass.tsx` **Features:** Metric display,
progress indicator, trend **Usage:**

```tsx
<MetricCardGlass label="Revenue" value="$45,678" change={12.5} trend="up" progress={75} />
```

#### AICardGlass

**File:** `src/components/glass/composite/ai-card-glass.tsx` **Features:** AI summary card with
feature list **Usage:**

```tsx
<AICardGlass
  title="AI Analysis"
  summary="User shows high engagement"
  features={['Active user', 'High trust score', 'Regular contributor']}
/>
```

#### SplitLayoutGlass (Compound API)

**File:** `src/components/glass/composite/split-layout-glass/split-layout-glass.tsx` **Components:**
Provider, Root, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, Main, MainHeader,
MainContent, MainFooter, Trigger, Accordion **Features:** Sticky scroll, responsive
(stack/main-only/sidebar-only), master-detail pattern, keyboard shortcut (Cmd+B)

**Basic Two-Column Layout:**

```tsx
<SplitLayoutGlass.Provider>
  <SplitLayoutGlass.Root>
    <SplitLayoutGlass.Sidebar>
      <SplitLayoutGlass.SidebarHeader>
        <h3>Navigation</h3>
      </SplitLayoutGlass.SidebarHeader>
      <SplitLayoutGlass.SidebarContent>
        <nav>
          <a href="#section1">Section 1</a>
          <a href="#section2">Section 2</a>
        </nav>
      </SplitLayoutGlass.SidebarContent>
    </SplitLayoutGlass.Sidebar>
    <SplitLayoutGlass.Main>
      <SplitLayoutGlass.MainContent>
        <article>
          <h1>Main Content</h1>
          <p>Your content here...</p>
        </article>
      </SplitLayoutGlass.MainContent>
    </SplitLayoutGlass.Main>
  </SplitLayoutGlass.Root>
</SplitLayoutGlass.Provider>
```

**With Master-Detail Pattern:**

```tsx
<SplitLayoutGlass.Provider
  defaultSelectedKey="item-1"
  breakpoint="lg"
  mobileMode="drawer"
  intensity="medium"
>
  <SplitLayoutGlass.Root ratio={{ sidebar: 1, main: 2 }} minSidebarWidth="300px">
    <SplitLayoutGlass.Sidebar>
      <SplitLayoutGlass.SidebarHeader>
        <h3>Items List</h3>
        <SplitLayoutGlass.Trigger variant="menu" />
      </SplitLayoutGlass.SidebarHeader>
      <SplitLayoutGlass.SidebarContent scrollable>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </SplitLayoutGlass.SidebarContent>
    </SplitLayoutGlass.Sidebar>
    <SplitLayoutGlass.Main>
      <SplitLayoutGlass.MainHeader>
        <Breadcrumbs />
      </SplitLayoutGlass.MainHeader>
      <SplitLayoutGlass.MainContent>
        <ItemDetail />
      </SplitLayoutGlass.MainContent>
      <SplitLayoutGlass.MainFooter>
        <Actions />
      </SplitLayoutGlass.MainFooter>
    </SplitLayoutGlass.Main>
  </SplitLayoutGlass.Root>
</SplitLayoutGlass.Provider>
```

**Props (Provider):**

| Prop                | Type                                  | Default  | Description                              |
| ------------------- | ------------------------------------- | -------- | ---------------------------------------- |
| selectedKey         | string \| null                        | -        | Controlled selected key (master-detail)  |
| onSelectedKeyChange | (key: string \| null) => void         | -        | Selection change handler                 |
| defaultSelectedKey  | string \| null                        | -        | Initial selected key                     |
| open                | boolean                               | -        | Controlled sidebar open state            |
| onOpenChange        | (open: boolean) => void               | -        | Open state change handler                |
| defaultOpen         | boolean                               | true     | Initial sidebar open state               |
| breakpoint          | 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' | 'md'     | Desktop layout breakpoint                |
| mobileMode          | 'stack' \| 'accordion' \| 'drawer'    | 'stack'  | Mobile layout behavior                   |
| intensity           | 'subtle' \| 'medium' \| 'strong'      | 'medium' | Glass blur intensity                     |
| stickyOffset        | number                                | 24       | Sticky offset in pixels                  |
| urlParamName        | string                                | -        | URL param name for selection persistence |
| keyboardShortcut    | string \| false                       | 'b'      | Keyboard shortcut (Cmd/Ctrl + key)       |

**Props (Root):**

| Prop            | Type                                            | Default                     | Description                   |
| --------------- | ----------------------------------------------- | --------------------------- | ----------------------------- |
| ratio           | { sidebar: number; main: number }               | { sidebar: 1, main: 2 }     | Column ratio (1:2 = 33%/67%)  |
| minSidebarWidth | string                                          | '300px'                     | Minimum sidebar width         |
| maxSidebarWidth | string                                          | -                           | Maximum sidebar width         |
| gap             | number \| { mobile?: number; desktop?: number } | { mobile: 16, desktop: 24 } | Gap between panels            |
| breakpoint      | Breakpoint                                      | -                           | Overrides Provider breakpoint |
| mobileLayout    | 'stack' \| 'main-only' \| 'sidebar-only'        | 'stack'                     | Mobile layout mode            |

**Hook: useSplitLayout()**

```tsx
const {
  selectedKey,
  setSelectedKey,
  isOpen,
  setIsOpen,
  isMobileOpen,
  setMobileOpen,
  isMobile,
  toggle,
  state,
  toggleSidebar, // shadcn/ui alias
} = useSplitLayout();
```

---

### Level 5 - Sections (7)

Full-page sections ready to use in your application.

#### HeaderNavGlass

**File:** `src/components/glass/sections/header-nav-glass.tsx` **Features:** Navigation header,
search, theme toggle **Usage:**

```tsx
<HeaderNavGlass logo={<Logo />} navigation={navItems} onSearch={(query) => handleSearch(query)} />
```

#### ProfileHeaderGlass

**File:** `src/components/glass/sections/profile-header-glass.tsx`

**Type:** Composite component

**Structure:**

- `ProfileHeaderExtendedGlass` (transparent, no glass) - user info, avatar, stats, languages
- `AICardGlass` (with glass effect) - AI summary generation card

**Layout (desktop ≥1024px):**

- ProfileHeaderExtendedGlass: 50% width (left half)
- AICardGlass: centered in remaining 50% (right half)

**Props:**

| Prop           | Type                                        | Default            | Description                |
| -------------- | ------------------------------------------- | ------------------ | -------------------------- |
| `name`         | `string`                                    | `"Artem Safronov"` | User's display name        |
| `username`     | `string`                                    | `"Yhooi2"`         | GitHub/GitLab username     |
| `joinDate`     | `string`                                    | `"Jan 2023"`       | Account creation date      |
| `bio`          | `string \| null`                            | `undefined`        | User biography (Issue #30) |
| `location`     | `string \| null`                            | `undefined`        | User location (Issue #30)  |
| `avatar`       | `string`                                    | `""`               | Avatar URL (Issue #30)     |
| `url`          | `string`                                    | `"#"`              | Profile URL (Issue #30)    |
| `stats`        | `{ repos?, followers?, following?, gists?}` | `{}`               | Profile statistics         |
| `languages`    | `LanguageData[]`                            | `[]`               | Programming languages      |
| `onAIGenerate` | `() => void`                                | `undefined`        | Callback for AI report     |

**Usage:**

```tsx
// Basic usage
<ProfileHeaderGlass
  name="Evan You"
  username="yyx990803"
  joinDate="2011-11-29"
  stats={{ repos: 156, followers: 92500, following: 0 }}
  languages={[
    { name: 'TypeScript', percent: 55, color: '#3178c6' },
    { name: 'JavaScript', percent: 30, color: '#f7df1e' },
  ]}
  onAIGenerate={() => console.log('Generate AI report')}
/>

// With extended fields (Issue #30)
<ProfileHeaderGlass
  name="The Octocat"
  username="octocat"
  avatar="https://github.com/octocat.png"
  bio="GitHub mascot and cat enthusiast"
  location="San Francisco"
  url="https://github.com/octocat"
  joinDate="2011-01-25T18:44:36Z"
  stats={{ repos: 42, followers: 1000, following: 50, gists: 10 }}
  languages={[
    { name: 'TypeScript', percent: 60, color: '#3178c6' },
    { name: 'JavaScript', percent: 25, color: '#f7df1e' },
    { name: 'CSS', percent: 15, color: '#1572b6' },
  ]}
  onAIGenerate={() => console.log('Generate AI summary')}
/>
```

#### ProfileHeaderExtendedGlass

**File:** `src/components/glass/sections/profile-header-extended-glass.tsx`

**Type:** Section component with optional glass background

**Props:** | Prop | Type | Default | Description | |------|------|---------|-------------| | `user`
| `ExtendedProfileUser` | required | User profile data object | | `showStatus` | `boolean` | `false`
| Show avatar status indicator | | `status` | `'online' \| 'offline' \| 'away' \| 'busy'` |
`'online'` | Avatar status | | `actions` | `ReactNode` | - | Custom action slot | | `transparent` |
`boolean` | `false` | Remove glass background |

**ExtendedProfileUser type:**

```typescript
interface ExtendedProfileUser {
  name: string | null; // Display name
  login: string; // Username
  avatar: string; // Avatar URL
  url: string; // Profile URL
  createdAt: string; // Join date (ISO 8601)
  bio?: string | null; // Biography
  location?: string | null; // Location
  stats?: { repos?; followers?; following?; gists? };
  languages?: LanguageData[];
}
```

**Usage:**

```tsx
// With glass background (default)
<ProfileHeaderExtendedGlass user={user} />

// Without glass background (transparent)
<ProfileHeaderExtendedGlass user={user} transparent />

// With actions slot
<ProfileHeaderExtendedGlass
  user={user}
  actions={<ButtonGlass size="sm">Follow</ButtonGlass>}
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
- **SidebarGlass** - Collapsible sidebar navigation (compound API)

### Layouts

- **SplitLayoutGlass** - Two-column responsive layout (compound API)
- **SidebarGlass** - Sidebar with collapsible rail
- **GlassCard** - Card containers
- **ModalGlass** - Modal dialogs (compound API)

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
- "progress, loading, spinner" → ProgressGlass, CircularProgressGlass, RainbowProgressGlass,
  SkeletonGlass
- "card, container, box" → GlassCard, MetricCardGlass, AICardGlass, YearCardGlass,
  TrustScoreCardGlass
- "avatar, profile, user" → AvatarGlass, ProfileAvatarGlass, ProfileHeaderGlass, UserInfoGlass
- "badge, tag, label, status" → BadgeGlass, StatusIndicatorGlass
- "tabs, navigation, switch" → TabsGlass, HeaderNavGlass, SegmentedControlGlass
- "sidebar, drawer, collapsible, rail" → SidebarGlass
- "split, two-column, layout, master-detail" → SplitLayoutGlass
- "compound, compound component" → ModalGlass, TabsGlass, SidebarGlass, SplitLayoutGlass,
  StepperGlass
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
</form>;
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
</div>;
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
</TabsGlass.Root>;
```

---

**Total Components:** 57 **Total Variants:** 100+ **Accessibility:** WCAG 2.1 AA compliant
**TypeScript:** Full type definitions **Themes:** 3 (glass, light, aurora)
