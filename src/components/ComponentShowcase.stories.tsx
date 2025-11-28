import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "@/lib/theme-context";
import { ComponentShowcase } from "./ComponentShowcase";

const meta: Meta<typeof ComponentShowcase> = {
  title: "Demo/ComponentShowcase",
  component: ComponentShowcase,
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "glass";
      return (
        <ThemeProvider initialTheme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentShowcase>;

export const Glass: Story = {
  globals: {
    theme: "glass",
  },
  parameters: {
    chromatic: { viewports: [1280] },
  },
};

export const Light: Story = {
  globals: {
    theme: "light",
  },
  parameters: {
    chromatic: { viewports: [1280] },
  },
};

export const Aurora: Story = {
  globals: {
    theme: "aurora",
  },
  parameters: {
    chromatic: { viewports: [1280] },
  },
};
