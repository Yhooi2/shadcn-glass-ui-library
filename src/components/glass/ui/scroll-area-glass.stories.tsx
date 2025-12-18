import type { Meta, StoryObj } from '@storybook/react';
import { ScrollAreaGlass } from './scroll-area-glass';
import { SeparatorGlass } from './separator-glass';

const meta: Meta<typeof ScrollAreaGlass> = {
  title: 'Components/Core/ScrollAreaGlass',
  component: ScrollAreaGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const Vertical: Story = {
  render: () => (
    <ScrollAreaGlass className="h-72 w-48 rounded-md border border-[var(--glass-border)]">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <SeparatorGlass className="my-2" />
          </div>
        ))}
      </div>
    </ScrollAreaGlass>
  ),
};

const artworks = [
  { artist: 'Ornella Binni', art: 'Landscape A' },
  { artist: 'Tom Byrom', art: 'Landscape B' },
  { artist: 'Vladimir Malyavko', art: 'Landscape C' },
  { artist: 'Annie Spratt', art: 'Landscape D' },
  { artist: 'Filip Mroz', art: 'Landscape E' },
  { artist: 'Ales Nesetril', art: 'Landscape F' },
  { artist: 'Pawel Czerwinski', art: 'Landscape G' },
  { artist: 'Oleg Laptev', art: 'Landscape H' },
];

export const Horizontal: Story = {
  render: () => (
    <ScrollAreaGlass
      className="w-96 whitespace-nowrap rounded-md border border-[var(--glass-border)]"
      orientation="horizontal"
    >
      <div className="flex w-max space-x-4 p-4">
        {artworks.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <div className="h-[150px] w-[200px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">{artwork.art}</span>
              </div>
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by <span className="font-semibold text-foreground">{artwork.artist}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollAreaGlass>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollAreaGlass
      className="h-72 w-96 rounded-md border border-[var(--glass-border)]"
      orientation="both"
    >
      <div className="p-4" style={{ width: '800px' }}>
        <h4 className="mb-4 text-sm font-medium">Large Content Area</h4>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="h-24 w-40 rounded-md bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center"
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </ScrollAreaGlass>
  ),
};
