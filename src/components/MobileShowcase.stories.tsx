import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider } from "@/lib/theme-context";
import { MobileShowcase } from "./MobileShowcase";

const meta: Meta<typeof MobileShowcase> = {
  title: "Demo/MobileShowcase",
  component: MobileShowcase,
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
    chromatic: { viewports: [390] },
  },
};

export default meta;
type Story = StoryObj<typeof MobileShowcase>;

export const Default: Story = {};
