# OKLCH Primitive Mapping

## Complete Reference for CSS Variable Refactoring

This document maps all OKLCH color values currently used in theme files to their corresponding
primitive tokens in `oklch-primitives.css`.

**Purpose:** Use this as a reference when migrating component tokens to use primitive tokens.

---

## How to Use This Document

1. Find the OKLCH value you want to replace in theme files
2. Look up the corresponding primitive token in the tables below
3. Replace the hardcoded OKLCH value with `var(--oklch-{token})`

**Example:**

```css
/* Before */
--btn-primary-bg: oklch(66.6% 0.159 303);

/* After */
--btn-primary-bg: var(--oklch-purple-500);
```

---

## Achromatic Colors (White/Black)

### Pure Colors

| OKLCH Value       | Primitive Token | Usage                        |
| ----------------- | --------------- | ---------------------------- |
| `oklch(100% 0 0)` | `--oklch-white` | Pure white text, backgrounds |
| `oklch(0% 0 0)`   | `--oklch-black` | Pure black text, backgrounds |

### White Alpha Variants

| OKLCH Value              | Primitive Token    | Common Usage                           |
| ------------------------ | ------------------ | -------------------------------------- |
| `oklch(100% 0 0 / 0.03)` | `--oklch-white-3`  | Ultra-subtle glass backgrounds         |
| `oklch(100% 0 0 / 0.05)` | `--oklch-white-5`  | Subtle glass backgrounds, hover states |
| `oklch(100% 0 0 / 0.06)` | `--oklch-white-6`  | Light overlays                         |
| `oklch(100% 0 0 / 0.08)` | `--oklch-white-8`  | Standard glass surface                 |
| `oklch(100% 0 0 / 0.10)` | `--oklch-white-10` | Muted borders, hover backgrounds       |
| `oklch(100% 0 0 / 0.15)` | `--oklch-white-15` | Standard borders, medium glass         |
| `oklch(100% 0 0 / 0.18)` | `--oklch-white-18` | Strong borders (UI_DESIGN spec)        |
| `oklch(100% 0 0 / 0.20)` | `--oklch-white-20` | Elevated surfaces, dividers            |
| `oklch(100% 0 0 / 0.22)` | `--oklch-white-22` | Prominent card backgrounds             |
| `oklch(100% 0 0 / 0.25)` | `--oklch-white-25` | Strong borders, elevated cards         |
| `oklch(100% 0 0 / 0.30)` | `--oklch-white-30` | Muted accent states, disabled text     |
| `oklch(100% 0 0 / 0.35)` | `--oklch-white-35` | Modal glows                            |
| `oklch(100% 0 0 / 0.40)` | `--oklch-white-40` | Semi-transparent overlays              |
| `oklch(100% 0 0 / 0.50)` | `--oklch-white-50` | Subtle text, placeholders              |
| `oklch(100% 0 0 / 0.60)` | `--oklch-white-60` | Muted text                             |
| `oklch(100% 0 0 / 0.70)` | `--oklch-white-70` | Secondary text                         |
| `oklch(100% 0 0 / 0.80)` | `--oklch-white-80` | Primary text in glass theme            |
| `oklch(100% 0 0 / 0.85)` | `--oklch-white-85` | Strong backgrounds                     |
| `oklch(100% 0 0 / 0.90)` | `--oklch-white-90` | Near-opaque text                       |
| `oklch(100% 0 0 / 0.95)` | `--oklch-white-95` | Almost pure white                      |

### Black Alpha Variants

| OKLCH Value            | Primitive Token    | Common Usage              |
| ---------------------- | ------------------ | ------------------------- |
| `oklch(0% 0 0 / 0.05)` | `--oklch-black-5`  | Subtle shadows            |
| `oklch(0% 0 0 / 0.10)` | `--oklch-black-10` | Light shadows, dividers   |
| `oklch(0% 0 0 / 0.15)` | `--oklch-black-15` | Medium shadows            |
| `oklch(0% 0 0 / 0.20)` | `--oklch-black-20` | Standard shadows          |
| `oklch(0% 0 0 / 0.30)` | `--oklch-black-30` | Elevated shadows          |
| `oklch(0% 0 0 / 0.40)` | `--oklch-black-40` | Strong shadows            |
| `oklch(0% 0 0 / 0.50)` | `--oklch-black-50` | Semi-transparent overlays |
| `oklch(0% 0 0 / 0.60)` | `--oklch-black-60` | Dark overlays             |
| `oklch(0% 0 0 / 0.80)` | `--oklch-black-80` | Neon theme backgrounds    |
| `oklch(0% 0 0 / 0.90)` | `--oklch-black-90` | Near-opaque dark          |
| `oklch(0% 0 0 / 0.95)` | `--oklch-black-95` | Almost pure black         |

---

## Primary Accent Colors

### Purple Family (Glass Theme Primary)

| OKLCH Value              | Primitive Token      | Usage                            |
| ------------------------ | -------------------- | -------------------------------- |
| `oklch(82.7% 0.104 306)` | `--oklch-purple-300` | Light purple text, hover states  |
| `oklch(71.0% 0.158 303)` | `--oklch-purple-400` | Primary hover state              |
| `oklch(66.6% 0.159 303)` | `--oklch-purple-500` | **Primary accent (glass theme)** |
| `oklch(55.8% 0.182 303)` | `--oklch-purple-600` | Dark purple accent               |

**Alpha Variants (Purple-500):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(66.6% 0.159 303 / 0.10)` | `--oklch-purple-500-10`
| Subtle backgrounds | | `oklch(66.6% 0.159 303 / 0.15)` | `--oklch-purple-500-15` | Light
backgrounds | | `oklch(66.6% 0.159 303 / 0.20)` | `--oklch-purple-500-20` | Badge/alert backgrounds,
tab active | | `oklch(66.6% 0.159 303 / 0.25)` | `--oklch-purple-500-25` | Checkbox glow | |
`oklch(66.6% 0.159 303 / 0.30)` | `--oklch-purple-500-30` | Button glows, active states | |
`oklch(66.6% 0.159 303 / 0.35)` | `--oklch-purple-500-35` | Modal glows | |
`oklch(66.6% 0.159 303 / 0.40)` | `--oklch-purple-500-40` | Step indicator glows | |
`oklch(66.6% 0.159 303 / 0.50)` | `--oklch-purple-500-50` | Slider glows, strong effects | |
`oklch(66.6% 0.159 303 / 0.60)` | `--oklch-purple-500-60` | Button primary glow, focus states | |
`oklch(66.6% 0.159 303 / 0.80)` | `--oklch-purple-500-80` | Avatar backgrounds |

### Violet Family (Secondary Accent)

| OKLCH Value              | Primitive Token      | Usage                                |
| ------------------------ | -------------------- | ------------------------------------ |
| `oklch(79.5% 0.103 293)` | `--oklch-violet-300` | Primary text color, input focus      |
| `oklch(71.4% 0.138 291)` | `--oklch-violet-400` | Aurora primary text                  |
| `oklch(62.7% 0.159 291)` | `--oklch-violet-500` | **Secondary accent, aurora primary** |
| `oklch(54.1% 0.175 293)` | `--oklch-violet-600` | **Light theme primary**              |

**Alpha Variants (Violet-500):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(62.7% 0.159 291 / 0.10)` | `--oklch-violet-500-10`
| Subtle backgrounds | | `oklch(62.7% 0.159 291 / 0.15)` | `--oklch-violet-500-15` | Tab active
(aurora) | | `oklch(62.7% 0.159 291 / 0.20)` | `--oklch-violet-500-20` | Toggle active, select item
| | `oklch(62.7% 0.159 291 / 0.25)` | `--oklch-violet-500-25` | Aurora step indicator | |
`oklch(62.7% 0.159 291 / 0.30)` | `--oklch-violet-500-30` | Stepper glow | |
`oklch(62.7% 0.159 291 / 0.40)` | `--oklch-violet-500-40` | Avatar glow, profile effects | |
`oklch(62.7% 0.159 291 / 0.50)` | `--oklch-violet-500-50` | Button borders, thumb glows | |
`oklch(62.7% 0.159 291 / 0.60)` | `--oklch-violet-500-60` | Light theme button glow |

**Alpha Variants (Violet-600 - Light Theme):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(54.1% 0.175 293 / 0.10)` | `--oklch-violet-600-10`
| Light theme subtle backgrounds | | `oklch(54.1% 0.175 293 / 0.15)` | `--oklch-violet-600-15` |
Light theme tab active | | `oklch(54.1% 0.175 293 / 0.20)` | `--oklch-violet-600-20` | Light theme
selection states | | `oklch(54.1% 0.175 293 / 0.25)` | `--oklch-violet-600-25` | Light theme glow
effects | | `oklch(54.1% 0.175 293 / 0.60)` | `--oklch-violet-600-60` | Light theme borders, strong
effects |

---

## Neutral Colors (Slate Family)

### Base Slate Scale

| OKLCH Value              | Primitive Token     | Usage                            |
| ------------------------ | ------------------- | -------------------------------- |
| `oklch(96.8% 0.007 247)` | `--oklch-slate-100` | Light theme surface              |
| `oklch(92.9% 0.013 255)` | `--oklch-slate-200` | Light theme border               |
| `oklch(86.9% 0.022 252)` | `--oklch-slate-300` | Light neutral                    |
| `oklch(70.4% 0.034 256)` | `--oklch-slate-400` | Disabled text (light)            |
| `oklch(55.4% 0.046 257)` | `--oklch-slate-500` | Muted text                       |
| `oklch(44.6% 0.043 257)` | `--oklch-slate-600` | Dark muted text                  |
| `oklch(37.2% 0.044 257)` | `--oklch-slate-700` | Aurora border/surface            |
| `oklch(27.9% 0.041 260)` | `--oklch-slate-800` | Aurora surface, dark backgrounds |
| `oklch(20.8% 0.042 265)` | `--oklch-slate-900` | Success button text, very dark   |
| `oklch(12.9% 0.042 264)` | `--oklch-slate-950` | Darkest neutral                  |

**Alpha Variants (Slate-100 - Light Theme):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(96.8% 0.007 247 / 0.40)` | `--oklch-slate-100-40`
| Light transparent backgrounds | | `oklch(96.8% 0.007 247 / 0.50)` | `--oklch-slate-100-50` | Tab
container, hover states | | `oklch(96.8% 0.007 247 / 0.80)` | `--oklch-slate-100-80` | Elevated
surfaces (light) |

**Alpha Variants (Slate-200 - Light Theme Borders):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(92.9% 0.013 255 / 0.40)` | `--oklch-slate-200-40`
| Subtle borders | | `oklch(92.9% 0.013 255 / 0.50)` | `--oklch-slate-200-50` | Muted borders,
disabled | | `oklch(92.9% 0.013 255 / 0.60)` | `--oklch-slate-200-60` | Standard borders (light) | |
`oklch(92.9% 0.013 255 / 0.80)` | `--oklch-slate-200-80` | Strong borders (light) |

**Alpha Variants (Slate-700 - Aurora):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(37.2% 0.044 257 / 0.20)` | `--oklch-slate-700-20`
| Aurora disabled borders | | `oklch(37.2% 0.044 257 / 0.30)` | `--oklch-slate-700-30` | Aurora
container bg, connector | | `oklch(37.2% 0.044 257 / 0.40)` | `--oklch-slate-700-40` | Aurora card
border | | `oklch(37.2% 0.044 257 / 0.50)` | `--oklch-slate-700-50` | Aurora modal/tab border | |
`oklch(37.2% 0.044 257 / 0.60)` | `--oklch-slate-700-60` | Aurora strong borders | |
`oklch(37.2% 0.044 257 / 0.70)` | `--oklch-slate-700-70` | Aurora hover states | |
`oklch(37.2% 0.044 257 / 0.80)` | `--oklch-slate-700-80` | Aurora elevated surfaces |

**Alpha Variants (Slate-800 - Aurora):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(27.9% 0.041 260 / 0.20)` | `--oklch-slate-800-20`
| Aurora subtle surfaces | | `oklch(27.9% 0.041 260 / 0.25)` | `--oklch-slate-800-25` | Aurora card
subtle bg | | `oklch(27.9% 0.041 260 / 0.40)` | `--oklch-slate-800-40` | Aurora glass bg, card bg |
| `oklch(27.9% 0.041 260 / 0.60)` | `--oklch-slate-800-60` | Aurora card hover, search bg | |
`oklch(27.9% 0.041 260 / 0.80)` | `--oklch-slate-800-80` | Aurora input bg, checkbox bg | |
`oklch(27.9% 0.041 260 / 0.98)` | `--oklch-slate-800-98` | Aurora dropdown/notification/popover bg |

---

## Status Colors

### Success (Emerald)

| OKLCH Value              | Primitive Token       | Usage                              |
| ------------------------ | --------------------- | ---------------------------------- |
| `oklch(84.5% 0.127 163)` | `--oklch-emerald-300` | Success text (light themes)        |
| `oklch(76.5% 0.147 163)` | `--oklch-emerald-400` | **Success primary (glass/aurora)** |
| `oklch(69.6% 0.155 163)` | `--oklch-emerald-500` | Success primary (light theme)      |

**Alpha Variants (Emerald-400):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(76.5% 0.147 163 / 0.10)` |
`--oklch-emerald-400-10` | Success subtle background | | `oklch(76.5% 0.147 163 / 0.20)` |
`--oklch-emerald-400-20` | Success badge background | | `oklch(76.5% 0.147 163 / 0.30)` |
`--oklch-emerald-400-30` | Success notification glow | | `oklch(76.5% 0.147 163 / 0.40)` |
`--oklch-emerald-400-40` | Success metric glow, rainbow glow | | `oklch(76.5% 0.147 163 / 0.50)` |
`--oklch-emerald-400-50` | Success button glow |

**Alpha Variants (Emerald-500):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(69.6% 0.155 163 / 0.10)` |
`--oklch-emerald-500-10` | Light theme success subtle | | `oklch(69.6% 0.155 163 / 0.20)` |
`--oklch-emerald-500-20` | Light theme success background |

### Warning (Amber)

| OKLCH Value             | Primitive Token     | Usage                       |
| ----------------------- | ------------------- | --------------------------- |
| `oklch(87.9% 0.150 91)` | `--oklch-amber-300` | Warning text (light themes) |
| `oklch(82.8% 0.157 84)` | `--oklch-amber-400` | **Warning primary**         |
| `oklch(76.9% 0.169 75)` | `--oklch-amber-500` | Warning secondary           |

**Alpha Variants (Amber-400):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(82.8% 0.157 84 / 0.10)` | `--oklch-amber-400-10` |
Warning subtle background | | `oklch(82.8% 0.157 84 / 0.20)` | `--oklch-amber-400-20` | Warning
badge background | | `oklch(82.8% 0.157 84 / 0.30)` | `--oklch-amber-400-30` | Warning notification
glow | | `oklch(82.8% 0.157 84 / 0.40)` | `--oklch-amber-400-40` | Warning metric glow, rainbow glow
| | `oklch(82.8% 0.157 84 / 0.50)` | `--oklch-amber-400-50` | Warning button glow |

**Alpha Variants (Amber-500):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(76.9% 0.169 75 / 0.50)` | `--oklch-amber-500-50` |
Progress glow |

### Error/Destructive (Rose/Red)

| OKLCH Value             | Primitive Token    | Usage                            |
| ----------------------- | ------------------ | -------------------------------- |
| `oklch(81.0% 0.105 11)` | `--oklch-rose-300` | Error text (light themes)        |
| `oklch(71.2% 0.161 12)` | `--oklch-rose-400` | **Error primary (glass/aurora)** |
| `oklch(64.5% 0.195 12)` | `--oklch-rose-500` | Error secondary                  |
| `oklch(62.8% 0.225 29)` | `--oklch-red-500`  | **Light theme error primary**    |

**Alpha Variants (Rose-400):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(71.2% 0.161 12 / 0.10)` | `--oklch-rose-400-10` |
Error subtle background | | `oklch(71.2% 0.161 12 / 0.20)` | `--oklch-rose-400-20` | Error badge
background | | `oklch(71.2% 0.161 12 / 0.30)` | `--oklch-rose-400-30` | Error notification glow | |
`oklch(71.2% 0.161 12 / 0.40)` | `--oklch-rose-400-40` | Error metric glow | |
`oklch(71.2% 0.161 12 / 0.50)` | `--oklch-rose-400-50` | Error button glow |

**Alpha Variants (Rose-500):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(64.5% 0.195 12 / 0.10)` | `--oklch-rose-500-10` |
Rose subtle background | | `oklch(64.5% 0.195 12 / 0.20)` | `--oklch-rose-500-20` | Rose muted
background | | `oklch(64.5% 0.195 12 / 0.50)` | `--oklch-rose-500-50` | Rose button glow |

**Alpha Variants (Red-500 - Light Theme):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(62.8% 0.225 29 / 0.10)` | `--oklch-red-500-10` |
Light theme error subtle | | `oklch(62.8% 0.225 29 / 0.20)` | `--oklch-red-500-20` | Light theme
error background | | `oklch(62.8% 0.225 29 / 0.50)` | `--oklch-red-500-50` | Light theme error glow
|

### Info (Blue)

| OKLCH Value              | Primitive Token    | Usage                        |
| ------------------------ | ------------------ | ---------------------------- |
| `oklch(79.2% 0.108 251)` | `--oklch-blue-300` | Info text (light themes)     |
| `oklch(70.7% 0.143 250)` | `--oklch-blue-400` | **Info primary**             |
| `oklch(62.3% 0.180 255)` | `--oklch-blue-500` | Info secondary (light theme) |

**Alpha Variants (Blue-400):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(70.7% 0.143 250 / 0.10)` | `--oklch-blue-400-10` |
Info subtle background | | `oklch(70.7% 0.143 250 / 0.20)` | `--oklch-blue-400-20` | Info badge
background | | `oklch(70.7% 0.143 250 / 0.25)` | `--oklch-blue-400-25` | Dropdown/popover shadow | |
`oklch(70.7% 0.143 250 / 0.30)` | `--oklch-blue-400-30` | Info notification glow | |
`oklch(70.7% 0.143 250 / 0.40)` | `--oklch-blue-400-40` | Info metric glow |

**Alpha Variants (Blue-500):** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(62.3% 0.180 255 / 0.20)` | `--oklch-blue-500-20` |
Light theme info background | | `oklch(62.3% 0.180 255 / 0.50)` | `--oklch-blue-500-50` | Progress
glow (blue) |

---

## Accent Colors

### Cyan (Aurora, Orbs)

| OKLCH Value              | Primitive Token    | Usage                      |
| ------------------------ | ------------------ | -------------------------- |
| `oklch(78.9% 0.118 195)` | `--oklch-cyan-400` | Neon theme accent          |
| `oklch(71.5% 0.132 195)` | `--oklch-cyan-500` | Orb effects, progress glow |

**Alpha Variants:** | OKLCH Value | Primitive Token | Usage |
|-------------|----------------|-------| | `oklch(78.9% 0.118 195 / 0.40)` | `--oklch-cyan-400-40` |
Neon theme glowing borders | | `oklch(71.5% 0.132 195 / 0.20)` | `--oklch-cyan-500-20` | Orb-4
background effect | | `oklch(71.5% 0.132 195 / 0.40)` | `--oklch-cyan-500-40` | Glow-cyan effect | |
`oklch(71.5% 0.132 195 / 0.50)` | `--oklch-cyan-500-50` | Progress glow (cyan) |

---

## Migration Examples

### Example 1: Button Primary (Glass Theme)

**Before:**

```css
--btn-primary-bg: linear-gradient(135deg, oklch(66.6% 0.159 303), oklch(62.7% 0.159 291));
--btn-primary-text: oklch(100% 0 0);
--btn-primary-glow: 0 0 30px oklch(66.6% 0.159 303 / 0.6);
```

**After:**

```css
--btn-primary-bg: linear-gradient(135deg, var(--oklch-purple-500), var(--oklch-violet-500));
--btn-primary-text: var(--oklch-white);
--btn-primary-glow: 0 0 30px var(--oklch-purple-500-60);
```

### Example 2: Badge Success

**Before:**

```css
--badge-success-bg: oklch(76.5% 0.147 163 / 0.2);
--badge-success-text: oklch(76.5% 0.147 163);
--badge-success-border: oklch(76.5% 0.147 163 / 0.3);
```

**After:**

```css
--badge-success-bg: var(--oklch-emerald-400-20);
--badge-success-text: var(--oklch-emerald-400);
--badge-success-border: var(--oklch-emerald-400-30);
```

### Example 3: Glass Surface (Glass Theme)

**Before:**

```css
--glass-bg: oklch(100% 0 0 / 0.05);
--glass-bg-medium: oklch(100% 0 0 / 0.15);
--glass-border: oklch(100% 0 0 / 0.18);
```

**After:**

```css
--glass-bg: var(--oklch-white-5);
--glass-bg-medium: var(--oklch-white-15);
--glass-border: var(--oklch-white-18);
```

---

## Quick Reference: Most Common Mappings

### Glass Theme

| Usage         | OKLCH Value                    | Primitive Token         |
| ------------- | ------------------------------ | ----------------------- |
| Primary       | `oklch(66.6% 0.159 303)`       | `--oklch-purple-500`    |
| Primary Muted | `oklch(66.6% 0.159 303 / 0.3)` | `--oklch-purple-500-30` |
| Secondary     | `oklch(62.7% 0.159 291)`       | `--oklch-violet-500`    |
| Surface       | `oklch(100% 0 0 / 0.08)`       | `--oklch-white-8`       |
| Border        | `oklch(100% 0 0 / 0.15)`       | `--oklch-white-15`      |
| Text          | `oklch(100% 0 0 / 0.9)`        | `--oklch-white-90`      |
| Text Muted    | `oklch(100% 0 0 / 0.6)`        | `--oklch-white-60`      |

### Light Theme

| Usage   | OKLCH Value              | Primitive Token      |
| ------- | ------------------------ | -------------------- |
| Primary | `oklch(54.1% 0.175 293)` | `--oklch-violet-600` |
| Surface | `oklch(96.8% 0.007 247)` | `--oklch-slate-100`  |
| Border  | `oklch(92.9% 0.013 255)` | `--oklch-slate-200`  |
| Text    | `oklch(27.9% 0.041 260)` | `--oklch-slate-800`  |

### Aurora Theme

| Usage   | OKLCH Value                    | Primitive Token        |
| ------- | ------------------------------ | ---------------------- |
| Primary | `oklch(62.7% 0.159 291)`       | `--oklch-violet-500`   |
| Surface | `oklch(27.9% 0.041 260 / 0.4)` | `--oklch-slate-800-40` |
| Border  | `oklch(37.2% 0.044 257 / 0.4)` | `--oklch-slate-700-40` |
| Text    | `oklch(100% 0 0 / 0.9)`        | `--oklch-white-90`     |

---

## Validation Checklist

Before proceeding to Phase 2, verify:

- [x] All OKLCH values in theme files have corresponding primitives
- [x] Alpha variants for commonly-used colors are defined (10%, 15%, 20%, 25%, 30%, 40%, 50%, 60%,
      80%)
- [x] Status colors (success, warning, error, info) have sufficient variants
- [x] Neutral scale (slate) covers all theme needs
- [x] Primary accent colors for all 3 themes are included

**Total Primitive Tokens:** ~190 (base colors + alpha variants) **Expected Reduction:** From ~120
unique hardcoded OKLCH values to ~30 unique base colors

---

## Next Steps

1. ✅ **Phase 1 Complete** - Primitives defined
2. 📝 **Phase 2** - Add semantic layer to glass.css
3. 🔄 **Phase 3** - Migrate component tokens in glass.css
4. 🎨 **Phase 4** - Apply to light.css and aurora.css
5. 🧹 **Phase 5** - Cleanup and documentation
