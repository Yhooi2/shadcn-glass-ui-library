import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroupGlass } from './radio-group-glass';

const meta: Meta<typeof RadioGroupGlass.Root> = {
  title: 'Components/Core/RadioGroupGlass',
  component: RadioGroupGlass.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroupGlass.Root defaultValue="comfortable" className="space-y-3">
      <div className="flex items-center space-x-2">
        <RadioGroupGlass.Item value="default" id="r1" />
        <label htmlFor="r1" className="text-sm cursor-pointer">
          Default
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupGlass.Item value="comfortable" id="r2" />
        <label htmlFor="r2" className="text-sm cursor-pointer">
          Comfortable
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupGlass.Item value="compact" id="r3" />
        <label htmlFor="r3" className="text-sm cursor-pointer">
          Compact
        </label>
      </div>
    </RadioGroupGlass.Root>
  ),
};

export const ThemeSelector: Story = {
  render: () => (
    <div className="w-[300px]">
      <h3 className="mb-4 font-medium">Theme Preference</h3>
      <RadioGroupGlass.Root defaultValue="system" className="space-y-3">
        <div className="flex items-center space-x-3">
          <RadioGroupGlass.Item value="light" id="theme-light" />
          <label htmlFor="theme-light" className="flex flex-col cursor-pointer">
            <span className="text-sm font-medium">Light</span>
            <span className="text-xs text-muted-foreground">Use light theme</span>
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupGlass.Item value="dark" id="theme-dark" />
          <label htmlFor="theme-dark" className="flex flex-col cursor-pointer">
            <span className="text-sm font-medium">Dark</span>
            <span className="text-xs text-muted-foreground">Use dark theme</span>
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupGlass.Item value="system" id="theme-system" />
          <label htmlFor="theme-system" className="flex flex-col cursor-pointer">
            <span className="text-sm font-medium">System</span>
            <span className="text-xs text-muted-foreground">Follow system settings</span>
          </label>
        </div>
      </RadioGroupGlass.Root>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroupGlass.Root defaultValue="option1" className="space-y-3">
      <div className="flex items-center space-x-2">
        <RadioGroupGlass.Item value="option1" id="d1" />
        <label htmlFor="d1" className="text-sm">
          Option 1
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupGlass.Item value="option2" id="d2" disabled />
        <label htmlFor="d2" className="text-sm text-muted-foreground">
          Option 2 (disabled)
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupGlass.Item value="option3" id="d3" />
        <label htmlFor="d3" className="text-sm">
          Option 3
        </label>
      </div>
    </RadioGroupGlass.Root>
  ),
};

export const InForm: Story = {
  render: () => (
    <form className="w-[350px] p-6 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
      <h3 className="font-semibold mb-4">Notification Settings</h3>
      <RadioGroupGlass.Root defaultValue="all" className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="notify-all" className="flex items-center space-x-3 cursor-pointer">
            <RadioGroupGlass.Item value="all" id="notify-all" />
            <div>
              <p className="text-sm font-medium">All notifications</p>
              <p className="text-xs text-muted-foreground">Receive all notifications</p>
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="notify-important" className="flex items-center space-x-3 cursor-pointer">
            <RadioGroupGlass.Item value="important" id="notify-important" />
            <div>
              <p className="text-sm font-medium">Important only</p>
              <p className="text-xs text-muted-foreground">Only important notifications</p>
            </div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="notify-none" className="flex items-center space-x-3 cursor-pointer">
            <RadioGroupGlass.Item value="none" id="notify-none" />
            <div>
              <p className="text-sm font-medium">None</p>
              <p className="text-xs text-muted-foreground">Disable all notifications</p>
            </div>
          </label>
        </div>
      </RadioGroupGlass.Root>
    </form>
  ),
};
