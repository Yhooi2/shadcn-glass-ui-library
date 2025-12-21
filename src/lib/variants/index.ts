/**
 * Centralized CVA Variants Export
 *
 * All variant definitions are extracted here for Fast Refresh compatibility.
 * Import variants and types from this file or from specific variant files.
 */

// Glass UI Component Variants
export * from './alert-glass-variants';
export * from './avatar-glass-variants';
export * from './badge-glass-variants';
export * from './button-glass-variants';
// shadcn/ui compatible alias for asChild pattern (Issue #14)
export { buttonGlassVariants as buttonVariants } from './button-glass-variants';
export * from './dropdown-glass-variants';
export * from './glass-card-variants';
export * from './input-glass-variants';
export * from './insight-card-glass-variants';
export * from './modal-glass-variants';
export * from './notification-glass-variants';
export * from './sheet-glass-variants';
export * from './progress-glass-variants';
export * from './skeleton-glass-variants';
export * from './sparkline-glass-variants';
export * from './toggle-glass-variants';
export * from './tooltip-glass-variants';
export * from './stepper-glass-variants';

// shadcn/ui Component Variants (with aliases to avoid conflicts)
export { alertVariants as shadcnAlertVariants } from './alert-variants';
export { badgeVariants as shadcnBadgeVariants } from './badge-variants';
export { buttonVariants as shadcnButtonVariants } from './button-variants';
