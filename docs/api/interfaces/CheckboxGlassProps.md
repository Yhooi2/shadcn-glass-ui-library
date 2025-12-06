[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / CheckboxGlassProps

# Interface: CheckboxGlassProps

Defined in: [src/components/glass/ui/checkbox-glass.tsx:94](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/checkbox-glass.tsx#L94)

Props for the CheckboxGlass component

A glass-themed checkbox with accessible keyboard navigation, focus management,
and touch-friendly targets. Features glow effects and theme-aware styling.

## Accessibility

- **Keyboard Navigation:** Full keyboard support with Enter/Space to toggle, Tab to focus (WCAG 2.1.1)
- **Focus Management:** Visible focus ring using `--focus-glow` CSS variable (WCAG 2.4.7)
- **Screen Readers:** Dual implementation with native `<input type="checkbox">` (hidden) + visual `<div role="checkbox">`
- **ARIA Attributes:** Uses `role="checkbox"` and `aria-checked` for proper state announcement
- **Label Association:** Visual label automatically associated with checkbox via `<label>` wrapper
- **Touch Targets:** 44x44px minimum touch area per Apple HIG (WCAG 2.5.5 compliance)
- **Color Contrast:** Check mark and backgrounds meet WCAG AA contrast ratio 4.5:1
- **Motion:** Transitions respect `prefers-reduced-motion` settings

## Example

```tsx
// Basic checkbox with label
<CheckboxGlass checked={agreed} onChange={setAgreed} label="I agree to terms" />

// Checkbox with accessible name (no visual label)
<CheckboxGlass
  checked={checked}
  onChange={setChecked}
  aria-label="Select all items"
/>

// Form integration with validation
<form onSubmit={handleSubmit}>
  <CheckboxGlass
    checked={newsletter}
    onChange={setNewsletter}
    label="Subscribe to newsletter"
    aria-describedby="newsletter-help"
  />
  <p id="newsletter-help">Receive weekly updates</p>
  <CheckboxGlass
    checked={terms}
    onChange={setTerms}
    label="Accept terms and conditions"
    required
    aria-invalid={submitted && !terms}
  />
  {submitted && !terms && (
    <span role="alert">You must accept the terms</span>
  )}
</form>

// Disabled checkbox (state announced to screen readers)
<CheckboxGlass
  checked={true}
  onChange={() => {}}
  label="This option is locked"
  disabled
/>

// Checkbox group with fieldset
<fieldset>
  <legend>Select your interests</legend>
  <CheckboxGlass
    checked={interests.tech}
    onChange={(checked) => setInterests({ ...interests, tech: checked })}
    label="Technology"
  />
  <CheckboxGlass
    checked={interests.design}
    onChange={(checked) => setInterests({ ...interests, design: checked })}
    label="Design"
  />
</fieldset>
```

## Extends

- `Omit`\<`React.InputHTMLAttributes`\<`HTMLInputElement`\>, `"onChange"`\>

## Properties

### checked

> `readonly` **checked**: `boolean`

Defined in: [src/components/glass/ui/checkbox-glass.tsx:96](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/checkbox-glass.tsx#L96)

#### Overrides

`Omit.checked`

***

### onChange()?

> `readonly` `optional` **onChange**: (`checked`) => `void`

Defined in: [src/components/glass/ui/checkbox-glass.tsx:97](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/checkbox-glass.tsx#L97)

#### Parameters

##### checked

`boolean`

#### Returns

`void`

***

### label?

> `readonly` `optional` **label**: `string`

Defined in: [src/components/glass/ui/checkbox-glass.tsx:98](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/ui/checkbox-glass.tsx#L98)
