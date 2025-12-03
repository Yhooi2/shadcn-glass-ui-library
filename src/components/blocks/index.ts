/**
 * Glass UI Blocks (Level 5)
 *
 * Complete, ready-to-use sections built from Glass components.
 * Follows shadcn/ui blocks pattern for easy integration.
 */

export { ButtonsBlock, type ButtonsBlockProps } from './buttons';

export { FormElementsBlock, type FormElementsBlockProps } from './form-elements';
export { ProgressBlock, type ProgressBlockProps } from './progress';
export { AvatarGalleryBlock, type AvatarGalleryBlockProps } from './avatar-gallery';
export { BadgesBlock, type BadgesBlockProps } from './badges';
export { NotificationsBlock, type NotificationsBlockProps } from './notifications';

export {
  blocksRegistry,
  blockNames,
  getBlockMetadata,
  getBlocksByCategory,
  type BlockMetadata,
  type BlockName,
} from './registry';
