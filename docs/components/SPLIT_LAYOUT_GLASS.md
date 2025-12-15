# SplitLayoutGlass

Responsive two-column layout component with sticky scroll behavior and glassmorphism styling.

## Overview

`SplitLayoutGlass` provides a modern split-panel layout inspired by MDN, GitHub Docs, and Linear. It
features independent scrolling in each panel after sticky positioning activates, making it perfect
for documentation sites, dashboards, and analytics applications.

### Key Features

- **Sticky Scroll Behavior** - Panels scroll together until reaching sticky offset, then scroll
  independently
- **Responsive Design** - 2 columns on desktop, configurable mobile layouts
  (stack/main-only/sidebar-only)
- **CSS Grid with minmax()** - Minimum sidebar width prevents squeezing
- **Glassmorphism Styling** - Configurable blur intensity (subtle/medium/strong)
- **Flexible Ratios** - Customizable sidebar-to-main width ratios
- **Semantic HTML** - Uses `<aside>` and `<main>` elements with ARIA labels
- **Theme Support** - Works with all 3 themes (glass, light, aurora)

### Browser Compatibility

- Chrome 89+ (CSS Grid minmax support)
- Firefox 87+
- Safari 14.1+
- Edge 89+

---

## Installation

The component is part of the Glass UI library. Import it from the composite components directory:

```tsx
import { SplitLayoutGlass } from '@/components/glass/composite/split-layout-glass';
import { ScrollArea } from '@/components/ui/scroll-area'; // Required for scrollable content
```

---

## Props API

| Prop               | Type                                              | Default                       | Description                                              |
| ------------------ | ------------------------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `sidebar`          | `ReactNode`                                       | Required                      | Sidebar content (left column on desktop)                 |
| `main`             | `ReactNode`                                       | Required                      | Main content (right column on desktop)                   |
| `ratio`            | `{ sidebar: number; main: number }`               | `{ sidebar: 1, main: 2 }`     | Sidebar to main ratio in fr units (e.g., 1:2 = 33%/67%)  |
| `minSidebarWidth`  | `string`                                          | `"300px"`                     | Minimum sidebar width (prevents squeezing)               |
| `maxSidebarWidth`  | `string`                                          | `undefined`                   | Maximum sidebar width (optional constraint)              |
| `gap`              | `number \| { mobile?: number; desktop?: number }` | `{ mobile: 16, desktop: 24 }` | Gap between panels in pixels                             |
| `breakpoint`       | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`           | `'xl'` (1440px)               | Breakpoint for desktop layout                            |
| `mobileLayout`     | `'stack' \| 'main-only' \| 'sidebar-only'`        | `'stack'`                     | Layout behavior on mobile                                |
| `stickyOffset`     | `number`                                          | `24`                          | Sticky offset from viewport top in pixels (desktop only) |
| `intensity`        | `'subtle' \| 'medium' \| 'strong'`                | `'medium'`                    | Glass blur intensity                                     |
| `sidebarLabel`     | `string`                                          | `"Sidebar navigation"`        | ARIA label for sidebar region                            |
| `mainLabel`        | `string`                                          | `"Main content"`              | ARIA label for main region                               |
| `className`        | `string`                                          | -                             | Custom className for container                           |
| `sidebarClassName` | `string`                                          | -                             | Custom className for sidebar                             |
| `mainClassName`    | `string`                                          | -                             | Custom className for main                                |

All other standard HTML `div` attributes are supported via spread props.

---

## Usage Examples

### Basic Usage

```tsx
import { SplitLayoutGlass } from '@/components/glass/composite/split-layout-glass';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DocsLayout() {
  return (
    <SplitLayoutGlass
      sidebar={
        <>
          <div className="shrink-0 p-4 border-b border-border">
            <h3 className="text-lg font-semibold">Navigation</h3>
          </div>
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-4 space-y-2">
              <a href="#section-1" className="block p-2 rounded hover:bg-muted">
                Section 1
              </a>
              <a href="#section-2" className="block p-2 rounded hover:bg-muted">
                Section 2
              </a>
              {/* More navigation items */}
            </div>
          </ScrollArea>
        </>
      }
      main={
        <ScrollArea className="h-full">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Content Title</h1>
            <p>Your main content here...</p>
          </div>
        </ScrollArea>
      }
    />
  );
}
```

**Result:** 33%/67% split on desktop (≥1440px), stacked on mobile

---

### Custom Ratio and Width

```tsx
<SplitLayoutGlass
  ratio={{ sidebar: 1, main: 3 }} // 25% sidebar, 75% main
  minSidebarWidth="250px" // Minimum 250px width
  maxSidebarWidth="400px" // Maximum 400px width
  sidebar={<Filters />}
  main={<ProductGrid />}
/>
```

**Use case:** E-commerce product pages where filters need constrained width

---

### Intensity Variants

```tsx
// Subtle blur (8px) - minimal glass effect
<SplitLayoutGlass intensity="subtle" sidebar={...} main={...} />

// Medium blur (16px) - standard glass effect (default)
<SplitLayoutGlass intensity="medium" sidebar={...} main={...} />

// Strong blur (24px) - heavy glass effect
<SplitLayoutGlass intensity="strong" sidebar={...} main={...} />
```

---

### Mobile Layouts

#### Stack Layout (Default)

```tsx
<SplitLayoutGlass
  mobileLayout="stack" // Sidebar above main on mobile
  sidebar={<Navigation />}
  main={<Article />}
/>
```

#### Main Only

```tsx
<SplitLayoutGlass
  mobileLayout="main-only" // Hide sidebar on mobile
  sidebar={<ComplexFilters />}
  main={<ShoppingCart />}
/>
```

**Use case:** Shopping cart where filters aren't needed on mobile

#### Sidebar Only

```tsx
<SplitLayoutGlass
  mobileLayout="sidebar-only" // Hide main on mobile
  sidebar={<MobileMenu />}
  main={<DesktopContent />}
/>
```

---

### With Scrollable Content (Recommended Pattern)

**⚠️ Important:** User must structure content with `ScrollArea` for independent scrolling

```tsx
<SplitLayoutGlass
  sidebar={
    <>
      {/* Fixed header - won't scroll */}
      <div className="shrink-0 p-4 border-b border-border">
        <h3 className="font-semibold">Sidebar Header</h3>
        <button>Action Button</button>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-2">
          {/* Long list of items */}
          {items.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      </ScrollArea>
    </>
  }
  main={
    <ScrollArea className="h-full">
      <div className="p-6">{/* Long content */}</div>
    </ScrollArea>
  }
/>
```

**Key classes:**

- `shrink-0` - Prevents header from shrinking
- `flex-1 min-h-0` - Allows ScrollArea to fill remaining space
- `h-full` - Main ScrollArea fills entire height

---

### Custom Gap

```tsx
// Single value for all breakpoints
<SplitLayoutGlass gap={20} sidebar={...} main={...} />

// Different gap for mobile/desktop
<SplitLayoutGlass
  gap={{ mobile: 12, desktop: 32 }}
  sidebar={...}
  main={...}
/>
```

---

### Different Breakpoint

```tsx
<SplitLayoutGlass
  breakpoint="lg" // Two-column layout starts at 1024px instead of 1440px
  sidebar={<TOC />}
  main={<Article />}
/>
```

**Breakpoint values:**

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1440px (default)
- `2xl`: 1536px

---

### Real-World: GitHub Analytics

```tsx
export function CareerStats() {
  const years = [2024, 2023, 2022, 2021, 2020];
  const [selectedYear, setSelectedYear] = useState(2024);

  return (
    <SplitLayoutGlass
      ratio={{ sidebar: 1, main: 2 }}
      sidebar={
        <>
          <div className="shrink-0 p-4 border-b">
            <h3 className="text-lg font-semibold">Career Summary</h3>
            <BadgeGlass variant="success">Active</BadgeGlass>
          </div>
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-3 space-y-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    'w-full p-3 rounded-lg text-left transition-colors',
                    year === selectedYear && 'bg-primary/10'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{year}</span>
                    <BadgeGlass variant="default" size="sm">
                      {getCommits(year)}
                    </BadgeGlass>
                  </div>
                  <ProgressGlass value={getProgress(year)} size="sm" />
                </button>
              ))}
            </div>
          </ScrollArea>
        </>
      }
      main={
        <ScrollArea className="h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{selectedYear} Contribution Details</h1>
            {/* Detailed stats */}
          </div>
        </ScrollArea>
      }
    />
  );
}
```

---

## Responsive Behavior

### Desktop (≥ breakpoint)

- **Layout:** Two columns side by side
- **Sticky:** Both panels become sticky after scrolling past offset
- **Max Height:** `calc(100vh - offset * 2)` constrains panel height
- **Scrolling:** Each panel scrolls independently within max-height
- **Grid:** Uses CSS Grid with `minmax()` for sidebar width

### Mobile (< breakpoint)

- **Layout:** Determined by `mobileLayout` prop
  - `stack`: Single column, sidebar above main
  - `main-only`: Hide sidebar, show only main
  - `sidebar-only`: Hide main, show only sidebar
- **Sticky:** Disabled (not useful in single column)
- **Scrolling:** Normal document flow

**Testing responsive behavior:**

```tsx
// Resize browser window to see layout change at breakpoint
<SplitLayoutGlass breakpoint="xl" sidebar={...} main={...} />

// Test in Storybook with viewport addon
// Or use browser dev tools responsive mode
```

---

## Sticky Scroll Behavior

### How It Works

1. **Initial scroll:** Both panels scroll together with page
2. **Reaching offset:** Panels become `position: sticky` at `top: {stickyOffset}px`
3. **Independent scroll:** Each panel scrolls independently within `max-height` constraint
4. **No sync:** Panels do NOT scroll together to end of document

### Visual Diagram

```
┌─────────────────────────────────────┐
│         Browser Viewport            │
│  ┌─────────────────────────────┐   │
│  │  Offset (24px)              │   │
│  ├─────────────┬───────────────┤   │ ← Sticky point
│  │  Sidebar    │     Main      │   │
│  │  (sticky)   │   (sticky)    │   │
│  │             │               │   │
│  │  [scroll]   │   [scroll]    │   │
│  │    ↕        │      ↕        │   │
│  └─────────────┴───────────────┘   │
│  Offset (24px)                      │
└─────────────────────────────────────┘
```

### Adjusting Sticky Offset

```tsx
// Default (24px)
<SplitLayoutGlass stickyOffset={24} sidebar={...} main={...} />

// Smaller offset (16px) - panels stick closer to top
<SplitLayoutGlass stickyOffset={16} sidebar={...} main={...} />

// Larger offset (48px) - panels stick further from top
<SplitLayoutGlass stickyOffset={48} sidebar={...} main={...} />
```

---

## CSS Grid Architecture

### Grid Template Calculation

```tsx
// Without maxSidebarWidth (uses ratio)
minmax(300px, 1fr) 2fr // Sidebar: min 300px, max 33.3%

// With maxSidebarWidth
minmax(300px, 400px) 2fr // Sidebar: min 300px, max 400px
```

### CSS Variables

The component uses CSS variables for dynamic values:

```css
--grid-template: minmax(300px, 1fr) 2fr --sticky-offset: 24px
  --sticky-max-height: calc(100vh - calc(24px * 2));
```

### Tailwind Arbitrary Values

Desktop grid is applied via Tailwind arbitrary values:

```tsx
xl:grid-cols-[var(--grid-template)]
```

**Why not direct values?** CSS variables allow dynamic computation based on props.

---

## Accessibility

### Semantic HTML

- **`<aside>`** for sidebar - Navigation landmark
- **`<main>`** for main content - Main landmark
- Screen readers announce these regions automatically

### ARIA Labels

```tsx
<SplitLayoutGlass
  sidebarLabel="Documentation navigation" // Announces as "Documentation navigation navigation"
  mainLabel="Article content" // Announces as "Article content main"
  sidebar={...}
  main={...}
/>
```

### Keyboard Navigation

- **Tab:** Cycles through focusable elements in document order
- **Arrow keys:** Scrolls within focused ScrollArea
- **Space/Page Down:** Scrolls down in focused panel
- **Shift+Space/Page Up:** Scrolls up in focused panel

### Focus Management

```tsx
// Ensure interactive elements have visible focus
<a href="#section" className="focus:ring-2 focus:ring-primary">
  Section 1
</a>
```

### Screen Reader Testing

Test with:

- **NVDA (Windows)** - `NVDA + Down Arrow` to navigate
- **JAWS (Windows)** - `Insert + Down Arrow`
- **VoiceOver (macOS)** - `VO + Right Arrow`
- **TalkBack (Android)** - Swipe right

---

## Troubleshooting

### Sidebar too narrow

**Problem:** Sidebar shrinks below readable width

**Solution:** Increase `minSidebarWidth`

```tsx
<SplitLayoutGlass minSidebarWidth="350px" sidebar={...} main={...} />
```

---

### Sidebar too wide

**Problem:** Sidebar takes too much horizontal space

**Solution:** Set `maxSidebarWidth` or adjust ratio

```tsx
<SplitLayoutGlass
  maxSidebarWidth="400px" // Hard limit
  ratio={{ sidebar: 1, main: 3 }} // Or change ratio to 25%/75%
  sidebar={...}
  main={...}
/>
```

---

### Content not scrolling

**Problem:** Content overflows but doesn't scroll

**Solution:** Ensure proper ScrollArea structure

```tsx
// ❌ Wrong - missing flex-1 and min-h-0
<ScrollArea>
  <div>Content</div>
</ScrollArea>

// ✅ Correct - with flex-1 and min-h-0
<ScrollArea className="flex-1 min-h-0">
  <div>Content</div>
</ScrollArea>
```

---

### Sticky not working

**Problem:** Panels don't stick at top

**Causes & Solutions:**

1. **Mobile viewport** - Sticky disabled on mobile (< breakpoint)
   - Test on desktop viewport (≥1440px for default `xl` breakpoint)
2. **Parent overflow** - Parent has `overflow: hidden/auto/scroll`
   - Remove overflow from parent containers
3. **Z-index conflict** - Sticky element behind other content
   - Add `z-10` or higher to `sidebarClassName`/`mainClassName`

---

### Gap not applying

**Problem:** Desktop gap doesn't change

**Solution:** Gap is applied via inline `<style>` tag and CSS variable

```tsx
// Check that desktop gap is defined
<SplitLayoutGlass
  gap={{ mobile: 16, desktop: 32 }} // Explicitly set desktop
  sidebar={...}
  main={...}
/>
```

---

## Performance

### Bundle Size

- **Component:** ~2KB gzipped (includes all features)
- **Dependencies:** GlassCard (~1KB), ScrollArea (from shadcn/ui)
- **Total:** ~3KB gzipped

### Rendering

- **Re-renders:** Only when props change (React.memo not needed)
- **CSS Grid:** Hardware accelerated, no JavaScript layout calculations
- **Sticky:** Native CSS `position: sticky`, no scroll listeners

### Optimization Tips

```tsx
// Memoize expensive child content
const sidebar = useMemo(() => (
  <ExpensiveNavigationTree data={data} />
), [data]);

<SplitLayoutGlass sidebar={sidebar} main={...} />
```

---

## Related Components

- **[GlassCard](./GLASS_CARD.md)** - Base glass container used by SplitLayoutGlass
- **[ScrollArea](https://ui.shadcn.com/docs/components/scroll-area)** - Scrollable area (shadcn/ui)
- **[ModalGlass](./MODAL_GLASS.md)** - Modal with compound API pattern

---

## Changelog

### v2.2.0 (2025-01-XX)

- ✨ Initial release of SplitLayoutGlass
- 18 visual tests across 3 themes
- 20 unit tests with 100% coverage
- 10 Storybook stories with real-world examples
- Complete documentation

---

## Support

- **GitHub Issues:** [Report bugs](https://github.com/yhooi2/shadcn-glass-ui-library/issues)
- **Storybook:** [View live examples](https://yhooi2.github.io/shadcn-glass-ui-library/)
- **Documentation:** [CLAUDE.md](../../CLAUDE.md) for AI assistants

---

## License

MIT License - Part of [shadcn-glass-ui-library](https://github.com/yhooi2/shadcn-glass-ui-library)
