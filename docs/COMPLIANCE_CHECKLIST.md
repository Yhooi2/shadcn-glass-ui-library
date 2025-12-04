# Component Compliance Checklist

Use this checklist when creating or reviewing Glass UI components to ensure they meet all design system requirements.

---

## Quick Reference

| Category | Key Requirement |
|----------|-----------------|
| Spacing | 8px grid (4px half-grid allowed) |
| Touch targets | Minimum 44x44px |
| Glass card padding | 24-32px (25-50% more than standard) |
| Body text | Minimum 16px |
| Font weight on glass | 500 minimum |
| Text contrast | 4.5:1 minimum (AA) |
| Large text contrast | 3:1 minimum |
| Glass layers | Maximum 2-3 per view |
| Blur values | sm:8, md:16, lg:24, xl:32 |
| Mobile blur | Maximum 8px |

---

## Per-Component Checklists

### Button

- [ ] Height matches size spec (sm:32, md:40, lg:48)
- [ ] Horizontal padding matches spec (sm:12, md:16, lg:24)
- [ ] Vertical padding matches spec (sm:6, md:10, lg:12)
- [ ] Border radius matches spec (sm/md:8, lg:12)
- [ ] Font size matches spec (sm/md:14, lg:16)
- [ ] Font weight is 500
- [ ] Has visible focus state
- [ ] Touch target meets 44x44px minimum
- [ ] Disabled state has 50% opacity
- [ ] Uses inline-flex for content centering
- [ ] Has smooth transition for hover effects

### Card (GlassCard)

- [ ] Padding is 24-32px (glass card requirement)
- [ ] Has glass effect (backdrop-filter with blur)
- [ ] Border radius is at least 12px
- [ ] Has semi-transparent background (15-25% opacity)
- [ ] Blur value is in valid token range (8-24px)
- [ ] Has subtle border for definition
- [ ] Spacing is on 8px grid
- [ ] Content is visible and readable

### Modal

- [ ] Body padding is 24px
- [ ] Header padding is 20px
- [ ] Footer padding is 20px
- [ ] Border radius is 20px
- [ ] Blur value is exactly 24px
- [ ] Has scrim/overlay behind
- [ ] Has accessible title
- [ ] Has close button
- [ ] Focus is trapped inside when open
- [ ] Calls onClose on Escape key
- [ ] Has dialog role

### Tooltip

- [ ] Padding is 8px 12px
- [ ] Border radius is 6px
- [ ] Font size is 12-14px
- [ ] Max width is 240px
- [ ] Has SOLID background (NOT glass)
- [ ] NO backdrop-filter/blur
- [ ] Appears on hover/focus
- [ ] Has reasonable delay before showing

### Badge

- [ ] Height is 20-24px
- [ ] Horizontal padding is 8px
- [ ] Vertical padding is 2px
- [ ] Default radius is 4px (or 9999px for pill)
- [ ] Font size is 12px
- [ ] Font weight is 500
- [ ] Has SOLID background (NOT glass)
- [ ] NO backdrop-filter/blur
- [ ] Uses inline or inline-flex display

### Input

- [ ] Height is at least 40px (44px on mobile)
- [ ] Font size is 16px (prevents iOS zoom)
- [ ] Border radius is 8px
- [ ] Has visible focus state
- [ ] Has appropriate placeholder styling
- [ ] Disabled state is visible
- [ ] Touch target meets 44x44px

### Checkbox

- [ ] Touch target area is at least 44x44px
- [ ] Has visible focus state
- [ ] Can be toggled with keyboard (Space)
- [ ] Has appropriate checked/unchecked states
- [ ] Works with associated label

### Toggle (Switch)

- [ ] Touch target is at least 44x44px
- [ ] Has visible focus state
- [ ] Can be toggled with keyboard
- [ ] Has smooth transition animation
- [ ] Has clear on/off visual states

### Tabs

- [ ] Tab triggers are focusable
- [ ] Keyboard navigation works (Arrow keys)
- [ ] Active tab has clear visual indicator
- [ ] Content changes on tab selection
- [ ] Uses appropriate ARIA attributes

### Avatar

- [ ] Has full border radius (9999px)
- [ ] Sizes follow scale (xs:24, sm:32, md:40, lg:56, xl:80)
- [ ] Has fallback for missing image
- [ ] Has status indicator option

### Progress

- [ ] Has accessible value announcements
- [ ] Visual matches percentage value
- [ ] Has smooth animation
- [ ] Has appropriate color coding

### Slider

- [ ] Thumb has adequate touch area
- [ ] Can be controlled with keyboard
- [ ] Has visible focus state on thumb
- [ ] Track shows current value visually

### Dropdown

- [ ] Container padding is 8px
- [ ] Item padding is 10px 16px
- [ ] Border radius is 12px
- [ ] Min width is 180px
- [ ] Blur is 16px
- [ ] Items are focusable
- [ ] Keyboard navigation works

### Alert

- [ ] Has appropriate variant styling
- [ ] Has accessible role (alert/status)
- [ ] Can be dismissed if closable
- [ ] Icon matches variant

### Skeleton

- [ ] Has subtle animation
- [ ] Respects reduced-motion
- [ ] Matches approximate content size
- [ ] Has appropriate contrast

### Notification

- [ ] Has clear visual hierarchy
- [ ] Has dismiss option
- [ ] Auto-dismiss timing is appropriate
- [ ] Stacks properly with multiple

---

## Accessibility Checklist

### Color Contrast

- [ ] Normal text meets 4.5:1 ratio (WCAG AA)
- [ ] Large text meets 3:1 ratio
- [ ] UI components meet 3:1 ratio
- [ ] Focus indicators are visible
- [ ] No pure black (#000) on backgrounds

### Keyboard Navigation

- [ ] All interactive elements are focusable
- [ ] Tab order is logical
- [ ] Focus is visible on all elements
- [ ] No keyboard traps
- [ ] Escape closes modals/dropdowns

### Screen Readers

- [ ] Images have alt text
- [ ] Buttons have accessible names
- [ ] Form inputs have labels
- [ ] ARIA attributes are correct
- [ ] Announcements for dynamic content

### Motion

- [ ] Respects prefers-reduced-motion
- [ ] No auto-playing animations
- [ ] Flash rate under 3 per second
- [ ] Only transform/opacity animated

### Touch

- [ ] Touch targets at least 44x44px
- [ ] Adequate spacing between targets
- [ ] No hover-only interactions on mobile

---

## Glass-Specific Checklist

### Blur Values

- [ ] Using valid blur tokens only (8, 16, 24, 32)
- [ ] Modal blur is exactly 24px
- [ ] Mobile blur reduced to 8px max
- [ ] No animated blur values

### Opacity

- [ ] Decorative: 5-10%
- [ ] Standard cards: 15-25%
- [ ] Text containers: 30-50%
- [ ] Navigation: 40-75%

### Layers

- [ ] Maximum 2-3 glass layers per view
- [ ] No glass-on-glass-on-glass
- [ ] Solid backgrounds between layers when needed

### Forbidden Glass

- [ ] Badges have NO glass effect
- [ ] Tooltips have NO glass effect
- [ ] Small elements (<24px) have NO glass
- [ ] Chips/tags have NO glass

### Performance

- [ ] Limited glass elements per view
- [ ] Has @supports fallback
- [ ] Hardware acceleration enabled
- [ ] No blur animation

---

## Theme-Specific Checklist

### Glass Theme (Dark)

- [ ] Background is `#0a0a0f` (not pure black)
- [ ] Text is light colored with good contrast
- [ ] Glass surfaces are 8% white opacity
- [ ] Borders are 12% white opacity

### Light Theme

- [ ] Background is light (`#f8f9fa`)
- [ ] Text is dark colored
- [ ] Glass surfaces are higher opacity (70%)
- [ ] Borders are subtle (8% black)

### Aurora Theme

- [ ] Background has gradient feel
- [ ] Glass surfaces have purple tint
- [ ] Maintains contrast with text
- [ ] Borders have color accent

---

## Testing Requirements

Run these tests before considering a component complete:

```bash
# Run compliance tests
npm run test:compliance

# Run unit tests
npm run test:unit

# Run visual regression tests
npm run test:visual

# Run Storybook tests
npm run test:storybook
```

### Manual Testing

- [ ] Test in all three themes
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop viewport (1440px)
- [ ] Test with keyboard only
- [ ] Test with screen reader
- [ ] Test with high contrast mode
- [ ] Test with reduced motion
