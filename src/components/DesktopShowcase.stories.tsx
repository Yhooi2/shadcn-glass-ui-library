import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "@/lib/theme-context";
import { DesktopShowcase } from "./DesktopShowcase";

const meta: Meta<typeof DesktopShowcase> = {
  title: "Demo/DesktopShowcase",
  component: DesktopShowcase,
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
type Story = StoryObj<typeof DesktopShowcase>;

export const Default: Story = {};
