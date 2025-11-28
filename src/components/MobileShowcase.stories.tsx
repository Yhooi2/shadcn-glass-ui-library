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

export const MobileView: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="glass">
        <div style={{ width: 390, margin: "0 auto", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, overflow: "hidden" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
