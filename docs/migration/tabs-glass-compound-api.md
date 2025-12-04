# TabsGlass Compound API Migration Guide

**Version:** v3.x → v4.0
**Status:** Both APIs supported (Legacy + Compound)
**Timeline:** Legacy API will be deprecated in v4.0 (6+ months)

---

## Why Migrate?

The new **Compound Component API** provides:

✅ **Content co-location** - Define tab content alongside triggers
✅ **Radix UI patterns** - Industry-standard tab component architecture
✅ **Better composition** - Mix tabs with other components easily
✅ **Type safety** - Enhanced TypeScript inference for tab values
✅ **Flexibility** - Custom layouts, icons, badges in tab triggers
✅ **Accessibility** - Improved ARIA attributes and keyboard navigation

---

## API Comparison

### Legacy API (Still Supported)

```tsx
<TabsGlass
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>
```

**Limitations:**
- Tab content must be rendered separately
- Cannot add icons/badges to tabs easily
- Limited customization of tab triggers

### Compound API (Recommended)

```tsx
<TabsGlass.Root value={activeTab} onValueChange={setActiveTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="overview">
      <LayoutDashboard className="w-4 h-4 mr-2" />
      Overview
    </TabsGlass.Trigger>
    <TabsGlass.Trigger value="analytics">
      <BarChart className="w-4 h-4 mr-2" />
      Analytics
      <Badge className="ml-2">New</Badge>
    </TabsGlass.Trigger>
    <TabsGlass.Trigger value="settings">
      <Settings className="w-4 h-4 mr-2" />
      Settings
    </TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="overview">
    <DashboardOverview />
  </TabsGlass.Content>

  <TabsGlass.Content value="analytics">
    <AnalyticsPanel />
  </TabsGlass.Content>

  <TabsGlass.Content value="settings">
    <SettingsPanel />
  </TabsGlass.Content>
</TabsGlass.Root>
```

---

## Migration Examples

### Example 1: Basic Tabs

**Before (Legacy):**
```tsx
import { TabsGlass } from '@/components/glass/ui/tabs-glass';

function MyComponent() {
  const [tab, setTab] = useState('profile');

  return (
    <>
      <TabsGlass
        tabs={[
          { id: 'profile', label: 'Profile' },
          { id: 'settings', label: 'Settings' }
        ]}
        activeTab={tab}
        onChange={setTab}
      />

      {/* Content rendered separately */}
      {tab === 'profile' && <ProfileContent />}
      {tab === 'settings' && <SettingsContent />}
    </>
  );
}
```

**After (Compound):**
```tsx
import { TabsGlass } from '@/components/glass/ui/tabs-glass';

function MyComponent() {
  const [tab, setTab] = useState('profile');

  return (
    <TabsGlass.Root value={tab} onValueChange={setTab}>
      <TabsGlass.List>
        <TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
        <TabsGlass.Trigger value="settings">Settings</TabsGlass.Trigger>
      </TabsGlass.List>

      <TabsGlass.Content value="profile">
        <ProfileContent />
      </TabsGlass.Content>

      <TabsGlass.Content value="settings">
        <SettingsContent />
      </TabsGlass.Content>
    </TabsGlass.Root>
  );
}
```

---

### Example 2: Tabs with Icons

**Before (Legacy - Difficult):**
```tsx
<TabsGlass
  tabs={[
    { id: 'home', label: '🏠 Home' },  // Emoji workaround
    { id: 'stats', label: '📊 Stats' }
  ]}
  activeTab={tab}
  onChange={setTab}
/>
```

**After (Compound - Natural):**
```tsx
<TabsGlass.Root value={tab} onValueChange={setTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="home">
      <Home className="w-4 h-4 mr-2" />
      Home
    </TabsGlass.Trigger>
    <TabsGlass.Trigger value="stats">
      <TrendingUp className="w-4 h-4 mr-2" />
      Stats
    </TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="home">
    <HomePage />
  </TabsGlass.Content>

  <TabsGlass.Content value="stats">
    <StatsPage />
  </TabsGlass.Content>
</TabsGlass.Root>
```

---

### Example 3: Tabs with Badges and Counters

**Before (Legacy - Not Possible):**
```tsx
// Cannot add badges to individual tabs easily
<TabsGlass
  tabs={[
    { id: 'inbox', label: 'Inbox (5)' },  // Text only
    { id: 'sent', label: 'Sent' }
  ]}
  activeTab={tab}
  onChange={setTab}
/>
```

**After (Compound - Full Control):**
```tsx
<TabsGlass.Root value={tab} onValueChange={setTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="inbox">
      <Inbox className="w-4 h-4 mr-2" />
      Inbox
      <Badge variant="destructive" className="ml-2">
        5
      </Badge>
    </TabsGlass.Trigger>
    <TabsGlass.Trigger value="sent">
      <Send className="w-4 h-4 mr-2" />
      Sent
    </TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="inbox">
    <InboxMessages unread={5} />
  </TabsGlass.Content>

  <TabsGlass.Content value="sent">
    <SentMessages />
  </TabsGlass.Content>
</TabsGlass.Root>
```

---

### Example 4: Vertical Tabs Layout

**Before (Legacy - Not Supported):**
```tsx
// Vertical layout not available in legacy API
```

**After (Compound - Custom Layout):**
```tsx
<TabsGlass.Root value={tab} onValueChange={setTab}>
  <div className="flex gap-4">
    {/* Vertical tab list */}
    <TabsGlass.List className="flex-col w-48">
      <TabsGlass.Trigger value="general">General</TabsGlass.Trigger>
      <TabsGlass.Trigger value="security">Security</TabsGlass.Trigger>
      <TabsGlass.Trigger value="privacy">Privacy</TabsGlass.Trigger>
    </TabsGlass.List>

    {/* Content area */}
    <div className="flex-1">
      <TabsGlass.Content value="general">
        <GeneralSettings />
      </TabsGlass.Content>

      <TabsGlass.Content value="security">
        <SecuritySettings />
      </TabsGlass.Content>

      <TabsGlass.Content value="privacy">
        <PrivacySettings />
      </TabsGlass.Content>
    </div>
  </div>
</TabsGlass.Root>
```

---

### Example 5: Dynamic Tabs

**Before (Legacy):**
```tsx
const dynamicTabs = projects.map(p => ({
  id: p.id,
  label: p.name
}));

<TabsGlass
  tabs={dynamicTabs}
  activeTab={selectedProject}
  onChange={setSelectedProject}
/>

{/* Render content separately */}
{projects.map(project => (
  project.id === selectedProject && (
    <ProjectDetails key={project.id} project={project} />
  )
))}
```

**After (Compound - Cleaner):**
```tsx
<TabsGlass.Root value={selectedProject} onValueChange={setSelectedProject}>
  <TabsGlass.List>
    {projects.map(project => (
      <TabsGlass.Trigger key={project.id} value={project.id}>
        {project.name}
      </TabsGlass.Trigger>
    ))}
  </TabsGlass.List>

  {projects.map(project => (
    <TabsGlass.Content key={project.id} value={project.id}>
      <ProjectDetails project={project} />
    </TabsGlass.Content>
  ))}
</TabsGlass.Root>
```

---

## Component API Reference

### TabsGlass.Root

**Props:**
- `value: string` - Currently active tab value
- `onValueChange: (value: string) => void` - Called when tab changes
- `defaultValue?: string` - Initial tab value (uncontrolled)
- `children: ReactNode` - Must contain `TabsGlass.List` and `TabsGlass.Content` components
- `className?: string` - Custom classes

**Example:**
```tsx
<TabsGlass.Root value="overview" onValueChange={setTab}>
  {/* children */}
</TabsGlass.Root>
```

### TabsGlass.List

**Props:**
- `className?: string` - Custom classes for tab list container
- `children: ReactNode` - `TabsGlass.Trigger` components
- Standard HTML div attributes

**Default styles:** Horizontal flexbox layout with gap

**Example:**
```tsx
<TabsGlass.List className="justify-center">
  <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
  <TabsGlass.Trigger value="tab2">Tab 2</TabsGlass.Trigger>
</TabsGlass.List>
```

### TabsGlass.Trigger

**Props:**
- `value: string` - **Required** - Tab identifier
- `disabled?: boolean` - Disable tab
- `className?: string` - Custom classes
- `children: ReactNode` - Tab label (text, icons, badges, etc.)
- Standard HTML button attributes

**States:**
- Active: When `value` matches `TabsGlass.Root`'s `value`
- Hover: Glass effect with glow
- Focus: Keyboard navigation support
- Disabled: Grayed out, not clickable

**Example:**
```tsx
<TabsGlass.Trigger value="settings" disabled={!isAdmin}>
  <Settings className="w-4 h-4 mr-2" />
  Settings
  {isNew && <Badge className="ml-2">New</Badge>}
</TabsGlass.Trigger>
```

### TabsGlass.Content

**Props:**
- `value: string` - **Required** - Must match a `TabsGlass.Trigger` value
- `className?: string` - Custom classes
- `children: ReactNode` - Content to show when tab is active
- Standard HTML div attributes

**Behavior:**
- Only visible when `value` matches active tab
- Smooth fade-in animation
- Preserves content in DOM (unmounted when inactive)

**Example:**
```tsx
<TabsGlass.Content value="analytics" className="p-6">
  <AnalyticsDashboard />
</TabsGlass.Content>
```

---

## Benefits by Use Case

### 1. **Dashboard with Multiple Views**
```tsx
<TabsGlass.Root value={view} onValueChange={setView}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="overview">
      <LayoutDashboard className="w-4 h-4 mr-2" />
      Overview
    </TabsGlass.Trigger>
    <TabsGlass.Trigger value="sales">
      <DollarSign className="w-4 h-4 mr-2" />
      Sales
      <Badge className="ml-2">{salesCount}</Badge>
    </TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="overview">
    <OverviewDashboard />
  </TabsGlass.Content>

  <TabsGlass.Content value="sales">
    <SalesDashboard />
  </TabsGlass.Content>
</TabsGlass.Root>
```

### 2. **Settings Page with Sections**
```tsx
<TabsGlass.Root value={section} onValueChange={setSection}>
  <TabsGlass.List className="border-b border-white/10 pb-2">
    <TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
    <TabsGlass.Trigger value="notifications">Notifications</TabsGlass.Trigger>
    <TabsGlass.Trigger value="billing">Billing</TabsGlass.Trigger>
  </TabsGlass.List>

  <div className="py-6">
    <TabsGlass.Content value="profile">
      <ProfileForm />
    </TabsGlass.Content>
    {/* ... */}
  </div>
</TabsGlass.Root>
```

### 3. **Product Details with Tabs**
```tsx
<TabsGlass.Root value={detailTab} onValueChange={setDetailTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="description">Description</TabsGlass.Trigger>
    <TabsGlass.Trigger value="specs">Specs</TabsGlass.Trigger>
    <TabsGlass.Trigger value="reviews">
      Reviews
      <Badge className="ml-2">{reviewCount}</Badge>
    </TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="description">
    <ProductDescription />
  </TabsGlass.Content>
  {/* ... */}
</TabsGlass.Root>
```

---

## Migration Timeline

| Version | Status | Notes |
|---------|--------|-------|
| **v3.x** | ✅ Both APIs supported | Legacy API fully functional |
| **v4.0** | ⚠️ Legacy deprecated | Deprecation warnings in dev mode |
| **v5.0** | 🔥 Legacy removed | Only Compound API available |

**Recommended:** Migrate to Compound API for new code starting today.

---

## Performance Notes

- ✅ **Content preservation** - Tab content stays mounted (no re-render on switch)
- ✅ **Lazy rendering** - Can implement lazy loading for heavy content
- ✅ **Bundle size** - Compound API adds ~150 bytes (negligible)
- ✅ **Animation** - Smooth transitions with CSS transforms

---

## Accessibility

The Compound API enhances accessibility:

- ✅ `TabsGlass.Root` provides ARIA context (`role="tablist"`)
- ✅ `TabsGlass.Trigger` has `role="tab"`, `aria-selected`, `aria-controls`
- ✅ `TabsGlass.Content` has `role="tabpanel"`, `aria-labelledby`
- ✅ Keyboard navigation: Arrow keys to switch tabs, Enter/Space to activate
- ✅ Focus management: Automatic focus on active tab

---

## Common Pitfalls

### ❌ Mismatched Values
```tsx
// Wrong - value mismatch
<TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
<TabsGlass.Content value="user">...</TabsGlass.Content>
```

```tsx
// Correct - matching values
<TabsGlass.Trigger value="profile">Profile</TabsGlass.Trigger>
<TabsGlass.Content value="profile">...</TabsGlass.Content>
```

### ❌ Missing TabsGlass.List
```tsx
// Wrong - triggers without List wrapper
<TabsGlass.Root>
  <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
</TabsGlass.Root>
```

```tsx
// Correct
<TabsGlass.Root>
  <TabsGlass.List>
    <TabsGlass.Trigger value="tab1">Tab 1</TabsGlass.Trigger>
  </TabsGlass.List>
</TabsGlass.Root>
```

### ❌ Forgetting onValueChange
```tsx
// Wrong - uncontrolled without defaultValue
<TabsGlass.Root value={tab}>
  {/* ... */}
</TabsGlass.Root>
```

```tsx
// Correct - controlled
<TabsGlass.Root value={tab} onValueChange={setTab}>
  {/* ... */}
</TabsGlass.Root>

// Or uncontrolled with defaultValue
<TabsGlass.Root defaultValue="overview">
  {/* ... */}
</TabsGlass.Root>
```

---

## Advanced Patterns

### Lazy Loading Content
```tsx
<TabsGlass.Root value={tab} onValueChange={setTab}>
  <TabsGlass.List>
    <TabsGlass.Trigger value="heavy">Heavy Data</TabsGlass.Trigger>
  </TabsGlass.List>

  <TabsGlass.Content value="heavy">
    {tab === 'heavy' && <HeavyDataComponent />}
  </TabsGlass.Content>
</TabsGlass.Root>
```

### Custom Active Indicator
```tsx
<TabsGlass.List className="relative">
  {tabs.map(t => (
    <TabsGlass.Trigger key={t.value} value={t.value}>
      {t.label}
    </TabsGlass.Trigger>
  ))}

  {/* Custom animated indicator */}
  <motion.div
    className="absolute bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
    layoutId="activeTab"
  />
</TabsGlass.List>
```

---

## Need Help?

- 📖 See [Storybook examples](http://localhost:6006/?path=/story/components-tabsglass--compound-api)
- 💬 Ask in [GitHub Discussions](https://github.com/your-org/shadcn-glass-ui-library/discussions)
- 🐛 Report issues in [GitHub Issues](https://github.com/your-org/shadcn-glass-ui-library/issues)

---

**Last updated:** 2025-12-05
**Status:** ✅ Ready for migration
**Backward compatibility:** Maintained until v5.0
