import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "@/lib/theme-context";
import { ComponentShowcase } from "./ComponentShowcase";

const meta: Meta<typeof ComponentShowcase> = {
  title: "Demo/ComponentShowcase",
  component: ComponentShowcase,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="glass">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "todo" },
    chromatic: { viewports: [1280] },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentShowcase>;

export const Default: Story = {};
