import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider, type ThemeName } from "@/lib/theme-context";
import { DesktopShowcase } from "./DesktopShowcase";

const meta: Meta<typeof DesktopShowcase> = {
  title: "Demo/DesktopShowcase",
  component: DesktopShowcase,
  decorators: [
    (Story, context) => (
      <ThemeProvider defaultTheme={context.args.theme || "glass"}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
    chromatic: { viewports: [1280] },
  },
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["glass", "light", "aurora"],
      description: "Theme variant for the showcase",
      table: {
        type: { summary: "ThemeName" },
        defaultValue: { summary: "glass" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DesktopShowcase>;

export const Default: Story = {
  args: {
    theme: "glass",
  },
};

export const LightTheme: Story = {
  args: {
    theme: "light",
  },
};

export const AuroraTheme: Story = {
  args: {
    theme: "aurora",
  },
};
