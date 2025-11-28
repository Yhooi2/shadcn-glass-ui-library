import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { SkeletonGlass } from "./SkeletonGlass";
import { GlassCard } from "./GlassCard";

const meta = {
  title: "Components/SkeletonGlass",
  component: SkeletonGlass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "title", "avatar", "thumbnail", "card"],
      description: "Skeleton variant",
    },
    width: {
      control: "text",
      description: "Custom width",
    },
    height: {
      control: "text",
      description: "Custom height",
    },
  },
} satisfies Meta<typeof SkeletonGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: "text",
    width: "200px",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Title: Story = {
  args: {
    variant: "title",
    width: "250px",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Avatar: Story = {
  args: {
    variant: "avatar",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Thumbnail: Story = {
  args: {
    variant: "thumbnail",
    width: "300px",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const Card: Story = {
  args: {
    variant: "card",
    width: "300px",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const CustomSize: Story = {
  args: {
    width: "150px",
    height: "20px",
  },
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div>
        <span className="text-xs mb-2 block" style={{ color: "var(--text-muted)" }}>Text</span>
        <SkeletonGlass variant="text" />
      </div>
      <div>
        <span className="text-xs mb-2 block" style={{ color: "var(--text-muted)" }}>Title</span>
        <SkeletonGlass variant="title" />
      </div>
      <div>
        <span className="text-xs mb-2 block" style={{ color: "var(--text-muted)" }}>Avatar</span>
        <SkeletonGlass variant="avatar" />
      </div>
      <div>
        <span className="text-xs mb-2 block" style={{ color: "var(--text-muted)" }}>Thumbnail</span>
        <SkeletonGlass variant="thumbnail" />
      </div>
      <div>
        <span className="text-xs mb-2 block" style={{ color: "var(--text-muted)" }}>Card</span>
        <SkeletonGlass variant="card" />
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ProfileCardSkeleton: Story = {
  render: () => (
    <GlassCard className="p-4 w-80">
      <div className="flex items-center gap-4">
        <SkeletonGlass variant="avatar" />
        <div className="flex-1 space-y-2">
          <SkeletonGlass variant="title" width="60%" />
          <SkeletonGlass variant="text" width="80%" />
        </div>
      </div>
    </GlassCard>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ArticleCardSkeleton: Story = {
  render: () => (
    <GlassCard className="w-80 overflow-hidden">
      <SkeletonGlass variant="thumbnail" />
      <div className="p-4 space-y-3">
        <SkeletonGlass variant="title" />
        <SkeletonGlass variant="text" />
        <SkeletonGlass variant="text" width="70%" />
      </div>
    </GlassCard>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {[1, 2, 3].map((i) => (
        <GlassCard key={i} className="p-3">
          <div className="flex items-center gap-3">
            <SkeletonGlass variant="avatar" className="w-10 h-10" />
            <div className="flex-1 space-y-2">
              <SkeletonGlass variant="text" width="70%" />
              <SkeletonGlass variant="text" width="50%" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

export const FormSkeleton: Story = {
  render: () => (
    <GlassCard className="p-6 w-80 space-y-4">
      <SkeletonGlass variant="title" width="40%" />
      <div className="space-y-3">
        <div className="space-y-1">
          <SkeletonGlass variant="text" width="30%" />
          <SkeletonGlass height="40px" />
        </div>
        <div className="space-y-1">
          <SkeletonGlass variant="text" width="30%" />
          <SkeletonGlass height="40px" />
        </div>
        <div className="space-y-1">
          <SkeletonGlass variant="text" width="30%" />
          <SkeletonGlass height="80px" />
        </div>
      </div>
      <SkeletonGlass height="40px" width="100px" />
    </GlassCard>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
