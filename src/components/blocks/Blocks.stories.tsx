import type { Meta, StoryObj } from '@storybook/react';
import { FormElementsBlock } from './form-elements';
import { ProgressBlock } from './progress';
import { AvatarGalleryBlock } from './avatar-gallery';
import { BadgesBlock } from './badges';
import { NotificationsBlock } from './notifications';

const meta = {
  title: 'Glass/Blocks',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const FormElements: StoryObj = {
  render: () => <FormElementsBlock />,
};

export const FormElementsWithoutTitle: StoryObj = {
  render: () => <FormElementsBlock showTitle={false} />,
};

export const Progress: StoryObj = {
  render: () => <ProgressBlock />,
};

export const ProgressWithoutTitle: StoryObj = {
  render: () => <ProgressBlock showTitle={false} />,
};

export const AvatarGallery: StoryObj = {
  render: () => <AvatarGalleryBlock />,
};

export const AvatarGalleryWithoutTitle: StoryObj = {
  render: () => <AvatarGalleryBlock showTitle={false} />,
};

export const Badges: StoryObj = {
  render: () => <BadgesBlock />,
};

export const BadgesWithoutTitle: StoryObj = {
  render: () => <BadgesBlock showTitle={false} />,
};

export const Notifications: StoryObj = {
  render: () => <NotificationsBlock />,
};

export const NotificationsWithoutTitle: StoryObj = {
  render: () => <NotificationsBlock showTitle={false} />,
};

// All blocks combined
export const AllBlocks: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        Glass UI Blocks
      </h2>

      <FormElementsBlock />
      <ProgressBlock />
      <AvatarGalleryBlock />
      <BadgesBlock />
      <NotificationsBlock />
    </div>
  ),
};

// Compact grid layout
export const BlocksGrid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl">
      <FormElementsBlock />
      <ProgressBlock />
      <AvatarGalleryBlock />
      <BadgesBlock />
      <NotificationsBlock />
    </div>
  ),
};

// Without titles (cleaner look)
export const BlocksWithoutTitles: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        Glass UI Blocks (No Titles)
      </h2>

      <FormElementsBlock showTitle={false} />
      <ProgressBlock showTitle={false} />
      <AvatarGalleryBlock showTitle={false} />
      <BadgesBlock showTitle={false} />
      <NotificationsBlock showTitle={false} />
    </div>
  ),
};
