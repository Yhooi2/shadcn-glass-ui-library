[**shadcn-glass-ui API Reference v1.0.7**](../README.md)

***

[shadcn-glass-ui API Reference](../globals.md) / InteractiveCard

# Variable: InteractiveCard

> `const` **InteractiveCard**: `ForwardRefExoticComponent`\<`InteractiveCardProps` & `RefAttributes`\<`HTMLDivElement`\>\>

Defined in: [src/components/glass/primitives/interactive-card.tsx:117](https://github.com/Yhooi2/shadcn-glass-ui-library/blob/926c43a35b985ce0dee6d96ce88a1fc3d72f4d67/src/components/glass/primitives/interactive-card.tsx#L117)

InteractiveCard component

Provides consistent hover animations and glass effects for card components.
Replaces ~80 lines of duplicated hover state management across 4+ components.

## Example

```tsx
// Basic usage
<InteractiveCard>
  <h3>Card Title</h3>
  <p>Card content</p>
</InteractiveCard>

// With hover effects
<InteractiveCard
  hoverLift
  hoverGlow="var(--glow-primary)"
  hoverBg="var(--card-hover-bg)"
  hoverBorderColor="var(--card-hover-border)"
>
  <MetricContent />
</InteractiveCard>

// Custom blur and rounding
<InteractiveCard
  blur="md"
  rounded="rounded-3xl"
  baseBg="var(--metric-emerald-bg)"
>
  <StatusCard />
</InteractiveCard>
```
