import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider, type ThemeName } from "@/lib/theme-context";
import { MobileShowcase } from "./MobileShowcase";

const meta: Meta<typeof MobileShowcase> = {
  title: "Demo/MobileShowcase",
  component: MobileShowcase,
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
    chromatic: { viewports: [390] },
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
type Story = StoryObj<typeof MobileShowcase>;

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

export const MobileView: Story = {
  args: {
    theme: "glass",
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider defaultTheme={context.args.theme || "glass"}>
        <div style={{ width: 390, margin: "0 auto", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, overflow: "hidden" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
