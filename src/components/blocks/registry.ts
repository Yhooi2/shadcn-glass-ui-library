// ========================================
// BLOCKS REGISTRY
// Metadata for all block components
// Used for documentation and exports
// ========================================

export interface BlockMetadata {
  /** Block name */
  readonly name: string;
  /** Block description */
  readonly description: string;
  /** Component categories */
  readonly categories: readonly string[];
  /** Dependencies (Glass components used) */
  readonly dependencies: readonly string[];
}

export const blocksRegistry: Record<string, BlockMetadata> = {
  'form-elements': {
    name: 'Form Elements Block',
    description: 'Interactive form components showcase including inputs, sliders, toggles, and checkboxes',
    categories: ['forms', 'inputs', 'interactive'],
    dependencies: ['InputGlass', 'SliderGlass', 'ToggleGlass', 'CheckboxGlass', 'GlassCard'],
  },
  'progress': {
    name: 'Progress Block',
    description: 'Progress indicators and loading states including standard progress, rainbow progress, and skeletons',
    categories: ['progress', 'loading', 'feedback'],
    dependencies: ['ProgressGlass', 'RainbowProgressGlass', 'SkeletonGlass', 'GlassCard'],
  },
  'avatar-gallery': {
    name: 'Avatar Gallery Block',
    description: 'Avatar components with various sizes and status indicators',
    categories: ['avatars', 'users', 'status'],
    dependencies: ['AvatarGlass', 'ProfileAvatarGlass', 'StatusIndicatorGlass', 'GlassCard'],
  },
  'badges': {
    name: 'Badges Block',
    description: 'Badge variants, sizes, and tooltip demonstrations',
    categories: ['badges', 'labels', 'tooltips'],
    dependencies: ['BadgeGlass', 'TooltipGlass', 'GlassCard'],
  },
  'notifications': {
    name: 'Notifications Block',
    description: 'Notification and alert components with various types and states',
    categories: ['notifications', 'alerts', 'feedback'],
    dependencies: ['NotificationGlass', 'AlertGlass', 'GlassCard'],
  },
} as const;

export type BlockName = keyof typeof blocksRegistry;

export const blockNames = Object.keys(blocksRegistry) as BlockName[];

export function getBlockMetadata(name: BlockName): BlockMetadata {
  return blocksRegistry[name];
}

export function getBlocksByCategory(category: string): BlockName[] {
  return blockNames.filter((name) =>
    blocksRegistry[name].categories.includes(category)
  );
}
