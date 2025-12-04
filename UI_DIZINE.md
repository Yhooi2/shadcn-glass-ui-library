# Visual Design System Guidelines v1.0

## Glassmorphism Design System for shadcn/ui

This document establishes authoritative visual design principles for a premium glassmorphism design
system built on shadcn/ui, supporting three themes: **Glass Dark**, **Aurora**, and **Light**. Every
specification is actionable with concrete pixel values, grounded in research from Material Design 3,
Apple Human Interface Guidelines, IBM Carbon, and industry best practices.

---

## Foundational principles drive visual harmony

The glassmorphism aesthetic demands **more generous spacing**, **stronger contrast safeguards**, and
**restrained application** compared to conventional design systems. Glass effects work best when
used sparingly—reserve translucent surfaces for **2-3 focal elements per view** maximum. The core
visual language relies on **backdrop blur**, **translucent backgrounds**, **subtle borders**, and
**glow accents** to create depth without traditional shadows.

Three mathematical foundations underpin this system: an **8px base grid** for all spacing, a **1.25
modular scale** for typography, and **OKLCH color space** for perceptually uniform theming. These
choices ensure visual consistency while enabling the premium, modern aesthetic that defines
exceptional glassmorphism implementations like Apple's Control Center and Microsoft's Fluent
Acrylic.

---

## Spacing and layout: the 8px foundation

The spacing system uses an **8px base unit** with 4px increments for fine-tuning, matching the
approach of Material Design 3, IBM Carbon, and Atlassian. This base provides generous breathing room
essential for glassmorphism—blur effects require surrounding space to appear correctly, and
translucent surfaces need visual separation to maintain figure/ground relationships.

Glassmorphism specifically demands **25-50% more internal padding** than conventional card designs.
Where a standard card might use 16px padding, glass cards should use 24-32px to achieve the premium
aesthetic and ensure text readability against variable backgrounds.

### Complete spacing token scale

| Token           | Value | Use Case                              |
| --------------- | ----- | ------------------------------------- |
| `--spacing-0`   | 0     | Reset                                 |
| `--spacing-0-5` | 2px   | Hairline borders, micro adjustments   |
| `--spacing-1`   | 4px   | Icon gaps, minimal spacing            |
| `--spacing-2`   | 8px   | Base unit, tight component spacing    |
| `--spacing-3`   | 12px  | Compact component gaps, form elements |
| `--spacing-4`   | 16px  | Standard spacing, button padding      |
| `--spacing-5`   | 20px  | Comfortable gaps                      |
| `--spacing-6`   | 24px  | Glass card padding (default)          |
| `--spacing-7`   | 28px  | Premium glass spacing                 |
| `--spacing-8`   | 32px  | Section spacing, large gaps           |
| `--spacing-10`  | 40px  | Major spacing                         |
| `--spacing-12`  | 48px  | Section breaks                        |
| `--spacing-16`  | 64px  | Page-level spacing                    |
| `--spacing-20`  | 80px  | Hero sections                         |
| `--spacing-24`  | 96px  | Maximum component spacing             |

**Touch targets** must meet the **44×44px minimum** (Apple HIG) or **48×48dp** (Material Design).
For glassmorphism buttons, use `min-height: 44px` with `padding: 12px 24px` to ensure both
accessibility compliance and visual balance.

**Responsive spacing** uses CSS `clamp()` for fluid scaling:

```css
--spacing-fluid-md: clamp(20px, 1.25rem + 1vw, 32px);
--spacing-fluid-lg: clamp(32px, 2rem + 2vw, 56px);
```

---

## Typography creates readable hierarchy on glass

The type system uses a **1.25 major third modular scale** starting from a 16px base—this ratio
provides sufficient hierarchy without the dramatic jumps of the golden ratio, making it ideal for UI
applications. Body text must be **minimum 16px** (iOS auto-zoom prevention, accessibility
compliance), with **font-weight 500** recommended on glass backgrounds for enhanced readability.

**Inter** is the recommended primary typeface for its tall x-height (69%), optical sizing support,
and screen optimization. For glassmorphism specifically, avoid thin font weights (300 or below)—the
translucent backgrounds swallow lightweight type.

### Typography token scale

| Token              | Size                                      | Line Height | Letter Spacing | Use Case               |
| ------------------ | ----------------------------------------- | ----------- | -------------- | ---------------------- |
| `--font-size-xs`   | clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem) | 1.33        | 0.025em        | Captions, timestamps   |
| `--font-size-sm`   | clamp(0.875rem, 0.8rem + 0.375vw, 1rem)   | 1.5         | 0              | Secondary text, labels |
| `--font-size-base` | clamp(1rem, 0.95rem + 0.25vw, 1.125rem)   | 1.5         | 0              | Body text              |
| `--font-size-lg`   | clamp(1.125rem, 1rem + 0.5vw, 1.25rem)    | 1.5         | 0              | Large body, lead text  |
| `--font-size-xl`   | clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)   | 1.25        | -0.01em        | H5, subheadings        |
| `--font-size-2xl`  | clamp(1.5rem, 1.25rem + 1.25vw, 2rem)     | 1.25        | -0.015em       | H4, card titles        |
| `--font-size-3xl`  | clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem) | 1.2         | -0.02em        | H3, section headers    |
| `--font-size-4xl`  | clamp(2.25rem, 1.75rem + 2.5vw, 3rem)     | 1.1         | -0.025em       | H2, page titles        |
| `--font-size-5xl`  | clamp(3rem, 2rem + 5vw, 4.5rem)           | 1           | -0.03em        | H1, hero headlines     |

### Text on glass backgrounds requires enhancement

Text readability on translucent surfaces is the critical accessibility challenge for glassmorphism.
Apply these techniques:

**Text shadow for light text on glass:**

```css
--text-shadow-glass: 0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);
```

**Semi-opaque backing for critical content:**

```css
.glass-text-container {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
}
```

---

## Color system built on OKLCH

**OKLCH** (Oklab Lightness, Chroma, Hue) is the recommended color format for 2024-2025, offering
perceptual uniformity—equal numerical changes produce equal perceived changes across all hues. This
eliminates the HSL problem where "50% lightness" appears vastly different between blue and yellow.

The color architecture follows a **three-tier token hierarchy**:

1. **Primitive tokens**: Raw color values (e.g., `--color-blue-500`)
2. **Semantic tokens**: Purpose-based references (e.g., `--color-text-primary`)
3. **Component tokens**: Specific applications (e.g., `--button-primary-bg`)

### Glassmorphism-specific color values

| Token         | Glass Dark               | Aurora                  | Light                   |
| ------------- | ------------------------ | ----------------------- | ----------------------- |
| Background    | `#0a0a0f`                | `#050510`               | `#f8f9fa`               |
| Glass surface | `rgba(255,255,255,0.08)` | `rgba(100,80,200,0.08)` | `rgba(255,255,255,0.7)` |
| Glass border  | `rgba(255,255,255,0.12)` | `rgba(150,100,255,0.2)` | `rgba(0,0,0,0.08)`      |
| Text primary  | `#e0e0e0`                | `#f0f0ff`               | `#1a1a1a`               |
| Glow accent   | `rgba(100,150,255,0.3)`  | `rgba(150,100,255,0.4)` | `rgba(99,102,241,0.15)` |

### Opacity guidelines for glass surfaces

| Context             | Opacity Range | Notes                               |
| ------------------- | ------------- | ----------------------------------- |
| Decorative glass    | 5-10%         | Subtle effect, requires strong blur |
| Standard cards      | 15-25%        | **Sweet spot** for balance          |
| Text containers     | 30-50%        | Higher opacity for readability      |
| Navigation/overlays | 40-75%        | Maximum legibility required         |

**Critical rule**: Always test contrast against the **worst-case background**—the darkest or
lightest area that might appear behind the glass element. Target **4.5:1** for body text, **3:1**
for large text and UI components.

**Dark mode**: Avoid pure black (`#000000`)—use `#121212` or `#0a0a0f` as base surfaces. Elevation
increases through lighter surface colors, not stronger shadows.

---

## Border radius creates cohesive shapes

The radius system follows an **exponential progression** that creates natural visual hierarchy.
Glassmorphism requires **slightly larger radii** than conventional design (add 2-4px) because
backdrop blur softens perceived edges.

### Border radius token scale

| Token           | Value  | Use Case                         |
| --------------- | ------ | -------------------------------- |
| `--radius-none` | 0      | Sharp corners when intentional   |
| `--radius-sm`   | 4px    | Badges, tags, small chips        |
| `--radius-md`   | 8px    | Buttons, inputs, tooltips        |
| `--radius-lg`   | 12px   | Cards, dropdown menus            |
| `--radius-xl`   | 16px   | Modal dialogs, glass panels      |
| `--radius-2xl`  | 24px   | Hero cards, feature sections     |
| `--radius-full` | 9999px | Pills, avatars, circular buttons |

**Nested element formula**: `inner-radius = outer-radius - padding`

```css
.glass-card {
  --card-padding: 16px;
  --card-radius: 16px;
  --card-inner-radius: calc(var(--card-radius) - var(--card-padding));
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}
.glass-card-inner {
  border-radius: var(--card-inner-radius);
}
```

---

## Shadows and elevation through glow

Glassmorphism replaces traditional drop shadows with **glow effects, blur depth, and translucency**
as primary elevation indicators. Reserve conventional shadows for grounding elements; use glows for
accent and focus states.

### Shadow and glow token scale

```css
/* Standard shadows (layered for realism) */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* Glass-specific shadows */
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.12);
--shadow-glass-lg: 0 16px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
--shadow-glass-inner: inset 0 1px 1px rgba(255, 255, 255, 0.1);
--shadow-glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.15);

/* Accent glows */
--shadow-glow-primary: 0 0 40px rgba(99, 102, 241, 0.4), 0 0 80px rgba(99, 102, 241, 0.2);
--shadow-glow-secondary: 0 0 40px rgba(168, 85, 247, 0.35), 0 0 80px rgba(168, 85, 247, 0.15);
```

**Elevation levels simplified for glassmorphism:**

- **Level 0**: Base surface (no shadow, standard blur)
- **Level 1**: Floating cards (`--shadow-glass` + blur 12px)
- **Level 2**: Modals/dialogs (`--shadow-glass-lg` + blur 16-24px)
- **Level 3**: Priority overlays (strong shadow + maximum blur)

---

## Glassmorphism implementation specifications

### Core CSS properties

```css
.glass-surface {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top-color: rgba(255, 255, 255, 0.35); /* Top edge shine */
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

### Blur value recommendations

| Token             | Value | Use Case                   | Performance   |
| ----------------- | ----- | -------------------------- | ------------- |
| `--glass-blur-sm` | 8px   | Subtle glass effect        | Good          |
| `--glass-blur-md` | 16px  | Standard cards/panels      | Moderate      |
| `--glass-blur-lg` | 24px  | Overlays/modals            | Moderate      |
| `--glass-blur-xl` | 32px  | Heavy background treatment | Use sparingly |

### Border specifications

| Token                      | Value                           |
| -------------------------- | ------------------------------- |
| `--glass-border-width`     | 1px                             |
| `--glass-border-opacity`   | 0.18 (18% white)                |
| `--glass-border-highlight` | 0.35 (35% white, top edge only) |

**Gradient border implementation:**

```css
border-image: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1)) 1;
```

### When to use glow effects

Use glows **sparingly** for:

- Active/focused states on interactive elements
- Primary CTA emphasis
- Brand highlight moments
- Dark mode visibility enhancement

**Avoid** glow on: every element, decorative purposes, small components.

---

## Component design specifications

### Button

| Property      | Small | Default | Large |
| ------------- | ----- | ------- | ----- |
| Height        | 32px  | 40px    | 48px  |
| Padding (H)   | 12px  | 16px    | 24px  |
| Padding (V)   | 6px   | 10px    | 12px  |
| Border Radius | 8px   | 8px     | 12px  |
| Font Size     | 14px  | 14px    | 16px  |
| Font Weight   | 500   | 500     | 500   |
| Min Width     | 64px  | 80px    | 96px  |

**Primary button**: Solid accent fill, no glass effect **Secondary button**: Glass surface with
`rgba(255,255,255,0.1)` background **Ghost button**: Transparent with 1px border, visible on solid
backgrounds only

### Input

| Property      | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| Height        | 40px (44px on mobile)                                      |
| Padding       | 12px 16px                                                  |
| Border Radius | 8px                                                        |
| Border        | 1px solid `--glass-border-color`                           |
| Font Size     | 16px (prevents iOS zoom)                                   |
| Background    | `rgba(0,0,0,0.2)` (dark) / `rgba(255,255,255,0.8)` (light) |

**Critical**: Form inputs should use **higher opacity backgrounds** than decorative
glass—readability is paramount.

### Card

| Property      | Compact          | Default          | Featured         |
| ------------- | ---------------- | ---------------- | ---------------- |
| Padding       | 16px             | 24px             | 32px             |
| Border Radius | 12px             | 16px             | 20px             |
| Background    | 15% opacity      | 20% opacity      | 20% opacity      |
| Blur          | 12px             | 16px             | 16px             |
| Border        | 1px, 15% opacity | 1px, 18% opacity | 1px, 20% opacity |

### Modal/Dialog

| Property      | Value                                        |
| ------------- | -------------------------------------------- |
| Padding       | 24px (body), 20px (header/footer)            |
| Border Radius | 20px                                         |
| Max Width     | 480px (small), 640px (medium), 800px (large) |
| Background    | `rgba(255,255,255,0.25)`                     |
| Blur          | 24px                                         |
| Scrim         | `rgba(0,0,0,0.5)`                            |

### Dropdown

| Property            | Value                   |
| ------------------- | ----------------------- |
| Padding (container) | 8px                     |
| Padding (item)      | 10px 16px               |
| Border Radius       | 12px                    |
| Background          | `rgba(255,255,255,0.2)` |
| Blur                | 16px                    |
| Min Width           | 180px                   |

### Badge

| Property      | Value                        |
| ------------- | ---------------------------- |
| Height        | 20px-24px                    |
| Padding       | 2px 8px                      |
| Border Radius | 4px (default), 9999px (pill) |
| Font Size     | 12px                         |
| Font Weight   | 500                          |

**Note**: Glass effects don't work on small elements—use solid or near-solid backgrounds for badges.

### Avatar

| Size | Dimensions | Border Radius |
| ---- | ---------- | ------------- |
| xs   | 24px       | 9999px        |
| sm   | 32px       | 9999px        |
| md   | 40px       | 9999px        |
| lg   | 56px       | 9999px        |
| xl   | 80px       | 9999px        |

### Tooltip

| Property      | Value                                      |
| ------------- | ------------------------------------------ |
| Padding       | 8px 12px                                   |
| Border Radius | 6px                                        |
| Font Size     | 12px-14px                                  |
| Background    | Solid `#1a1a2e` (dark) / `#ffffff` (light) |
| Max Width     | 240px                                      |

**Critical**: Tooltips should use **solid backgrounds**, not glass—they need maximum readability.

---

## Accessibility requirements

### Contrast ratios

| Element                         | WCAG AA (Required) | WCAG AAA (Enhanced) |
| ------------------------------- | ------------------ | ------------------- |
| Normal text (<18pt)             | **4.5:1**          | 7:1                 |
| Large text (≥18pt or 14pt bold) | **3:1**            | 4.5:1               |
| UI components                   | **3:1**            | N/A                 |

**Testing on glass**: Always test against worst-case background scenarios—check both lightest and
darkest possible backgrounds that might show through.

### Focus states

```css
.interactive:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.9),
    /* Inner ring */ 0 0 0 4px rgba(0, 0, 0, 0.8); /* Outer ring */
}
```

The double-outline technique ensures focus visibility on any background—critical for glass
components.

### Touch targets

Minimum **44×44px** (Apple) or **48×48dp** (Material Design). Visual element can be smaller if tap
area meets requirements.

### Motion and animation

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Safe animation properties**: Only animate `transform` and `opacity`—these are GPU-accelerated and
performant.

**Never exceed**: 3 flashes per second (seizure prevention).

---

## Performance optimization

### backdrop-filter impact

- GPU-intensive; limit to 2-3 elements per view
- Reduce blur on mobile: `blur(8px)` instead of `blur(16px)`
- Use `transform: translateZ(0)` for hardware acceleration
- Never animate blur values—causes severe jank

### Fallback for older browsers

```css
.glass-panel {
  background: rgba(0, 0, 0, 0.85); /* Solid fallback */
}

@supports (backdrop-filter: blur(10px)) {
  .glass-panel {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(16px);
  }
}
```

### Shadow animation technique

Never animate `box-shadow` directly—it triggers paint on every frame. Instead:

```css
.card {
  position: relative;
}
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: inherit;
  z-index: -1;
}
.card:hover::after {
  opacity: 1;
}
```

---

## Antipatterns checklist

### Layout mistakes

- ❌ Inconsistent spacing throughout UI—use spacing tokens
- ❌ Spacing too tight (cramped)—glass needs breathing room
- ❌ Breaking the grid—align all elements consistently
- ❌ Ignoring vertical rhythm—base all spacing on 8px unit

### Typography mistakes

- ❌ More than 6-8 font sizes—limit to modular scale
- ❌ Text contrast below 4.5:1—test against worst-case backgrounds
- ❌ Centered long-form text—left-align body content
- ❌ Line length over 75 characters—use max-width on containers

### Color mistakes

- ❌ Rainbow interfaces—limit to 2 primary + 2 accent colors
- ❌ Color alone conveying information—always pair with icons/text
- ❌ Pure black (#000) on pure white (#fff)—use off-black/off-white
- ❌ Insufficient contrast on glass—increase opacity or add overlays

### Glassmorphism-specific mistakes

- ❌ **Too many glass layers**—maximum 2-3 per view
- ❌ **Glass on glass on glass**—use solid backgrounds between layers
- ❌ **Glow effects everywhere**—reserve for focus/active states only
- ❌ **Glass on small elements**—badges/chips don't work with blur
- ❌ **No fallback for backdrop-filter**—always provide @supports fallback
- ❌ **Blur over 24px on mobile**—reduce for performance
- ❌ **Text without shadow on glass**—add text-shadow for readability
- ❌ **Inconsistent blur values**—use defined blur tokens

### Accessibility mistakes

- ❌ Touch targets under 44px—ensure minimum tap area
- ❌ Missing focus states—provide visible keyboard focus
- ❌ Auto-playing animations—respect prefers-reduced-motion
- ❌ No high-contrast fallback—support system accessibility modes

---

## Complete design token reference

```css
:root {
  /* ========== SPACING ========== */
  --spacing-0: 0;
  --spacing-0-5: 2px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;

  /* ========== TYPOGRAPHY ========== */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --font-size-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --font-size-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
  --font-size-5xl: clamp(3rem, 2rem + 5vw, 4.5rem);

  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* ========== BORDER RADIUS ========== */
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* ========== SHADOWS ========== */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-glass-lg: 0 16px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-glow-primary: 0 0 40px rgba(99, 102, 241, 0.4), 0 0 80px rgba(99, 102, 241, 0.2);
  --shadow-glow-secondary: 0 0 40px rgba(168, 85, 247, 0.35), 0 0 80px rgba(168, 85, 247, 0.15);

  /* ========== GLASSMORPHISM ========== */
  --glass-blur-sm: 8px;
  --glass-blur-md: 16px;
  --glass-blur-lg: 24px;
  --glass-blur-xl: 32px;
  --glass-opacity-surface: 0.2;
  --glass-opacity-overlay: 0.4;
  --glass-border-width: 1px;
  --glass-border-opacity: 0.18;
  --glass-saturation: 1.8;

  /* ========== TEXT SHADOWS ========== */
  --text-shadow-glass: 0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);
}
```

---

## Conclusion

This design system prioritizes **restraint and contrast** over visual excess. Glassmorphism achieves
its premium aesthetic through selective application—translucent surfaces work as focal points, not
ubiquitous backgrounds. The 8px spacing grid, 1.25 type scale, and OKLCH color foundation provide
mathematical consistency, while the accessibility-first approach ensures the design works for all
users.

The key differentiator between amateur and professional glassmorphism lies in three principles:
**generous spacing** that gives blur effects room to breathe, **sufficient contrast** that maintains
readability regardless of background, and **performance consciousness** that limits blur to
essential elements. Apply glass effects to 2-3 key surfaces per view, ensure 4.5:1 text contrast,
and always provide fallbacks—these rules transform glassmorphism from a trendy gimmick into a
sustainable design language.
