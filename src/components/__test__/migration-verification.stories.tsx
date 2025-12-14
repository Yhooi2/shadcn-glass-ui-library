/**
 * Migration Verification Stories
 *
 * Visual verification of migrated compound components:
 * - AlertGlass (compound)
 * - AvatarGlass (compound with Simple wrapper)
 * - TooltipGlass (compound with Simple wrapper)
 * - PopoverGlass (compound with Legacy wrapper)
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Settings } from 'lucide-react';

// AlertGlass - compound API
import { AlertGlass, AlertGlassTitle, AlertGlassDescription } from '../glass/ui/alert-glass';

// AvatarGlass - compound API + Simple wrapper
import { AvatarGlass, AvatarGlassFallback, AvatarGlassSimple } from '../glass/ui/avatar-glass';

// TooltipGlass - compound API + Simple wrapper
import {
  TooltipGlassProvider,
  TooltipGlass as TooltipGlassRoot,
  TooltipGlassTrigger,
  TooltipGlassContent,
  TooltipGlassSimple,
} from '../glass/ui/tooltip-glass';

// PopoverGlass - compound API + Legacy wrapper
import {
  PopoverGlass as PopoverGlassRoot,
  PopoverGlassTrigger,
  PopoverGlassContent,
  PopoverGlassLegacy,
} from '../glass/ui/popover-glass';

import { ButtonGlass } from '../glass/ui/button-glass';

const meta = {
  title: 'Testing/Migration Verification',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// ALERT GLASS - Compound API
// ========================================

export const AlertGlassCompound: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
        AlertGlass - Compound API
      </h3>

      <AlertGlass variant="default">
        <AlertGlassTitle>Information</AlertGlassTitle>
        <AlertGlassDescription>This is the compound component API</AlertGlassDescription>
      </AlertGlass>

      <AlertGlass variant="success">
        <AlertGlassTitle>Success</AlertGlassTitle>
        <AlertGlassDescription>Operation completed successfully</AlertGlassDescription>
      </AlertGlass>

      <AlertGlass variant="warning">
        <AlertGlassTitle>Warning</AlertGlassTitle>
        <AlertGlassDescription>Please review before proceeding</AlertGlassDescription>
      </AlertGlass>

      <AlertGlass variant="destructive">
        <AlertGlassTitle>Error</AlertGlassTitle>
        <AlertGlassDescription>Something went wrong</AlertGlassDescription>
      </AlertGlass>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// AVATAR GLASS - Compound + Simple
// ========================================

export const AvatarGlassCompound: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          AvatarGlass - Compound API
        </h3>
        <div className="flex items-center gap-4">
          <AvatarGlass size="default">
            <AvatarGlassFallback>JD</AvatarGlassFallback>
          </AvatarGlass>

          <AvatarGlass size="lg" status="online">
            <AvatarGlassFallback>AS</AvatarGlassFallback>
          </AvatarGlass>

          <AvatarGlass size="xl" status="busy">
            <AvatarGlassFallback>BK</AvatarGlassFallback>
          </AvatarGlass>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          AvatarGlassSimple - Backward Compatible
        </h3>
        <div className="flex items-center gap-4">
          <AvatarGlassSimple name="John Doe" size="default" />
          <AvatarGlassSimple name="Alice Smith" size="lg" status="online" />
          <AvatarGlassSimple name="Bob King" size="xl" status="busy" />
        </div>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// TOOLTIP GLASS - Compound + Simple
// ========================================

export const TooltipGlassCompound: Story = {
  render: () => (
    <TooltipGlassProvider>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            TooltipGlass - Compound API
          </h3>
          <div className="flex items-center gap-4">
            <TooltipGlassRoot>
              <TooltipGlassTrigger asChild>
                <ButtonGlass variant="ghost">Hover Me</ButtonGlass>
              </TooltipGlassTrigger>
              <TooltipGlassContent side="top">
                <p>This is a tooltip</p>
              </TooltipGlassContent>
            </TooltipGlassRoot>

            <TooltipGlassRoot>
              <TooltipGlassTrigger asChild>
                <ButtonGlass variant="default">Primary</ButtonGlass>
              </TooltipGlassTrigger>
              <TooltipGlassContent side="bottom">
                <p>Bottom tooltip</p>
              </TooltipGlassContent>
            </TooltipGlassRoot>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            TooltipGlassSimple - Backward Compatible
          </h3>
          <div className="flex items-center gap-4">
            <TooltipGlassSimple content="Simple tooltip" side="top">
              <ButtonGlass variant="ghost">Simple 1</ButtonGlass>
            </TooltipGlassSimple>

            <TooltipGlassSimple content="Another tooltip" side="bottom">
              <ButtonGlass variant="default">Simple 2</ButtonGlass>
            </TooltipGlassSimple>
          </div>
        </div>
      </div>
    </TooltipGlassProvider>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// POPOVER GLASS - Compound + Legacy
// ========================================

export const PopoverGlassCompound: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          PopoverGlass - Compound API
        </h3>
        <PopoverGlassRoot>
          <PopoverGlassTrigger asChild>
            <ButtonGlass variant="secondary">
              <Settings className="w-4 h-4 mr-2" />
              Open Popover
            </ButtonGlass>
          </PopoverGlassTrigger>
          <PopoverGlassContent side="bottom" align="center">
            <div className="w-64 p-4">
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Settings
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                This is the compound API
              </p>
            </div>
          </PopoverGlassContent>
        </PopoverGlassRoot>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          PopoverGlassLegacy - Backward Compatible
        </h3>
        <PopoverGlassLegacy
          trigger={
            <ButtonGlass variant="ghost">
              <Settings className="w-4 h-4 mr-2" />
              Legacy API
            </ButtonGlass>
          }
          side="bottom"
          align="center"
        >
          <div className="w-64 p-4">
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Legacy Settings
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              This uses the legacy trigger + children API
            </p>
          </div>
        </PopoverGlassLegacy>
      </div>
    </div>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};

// ========================================
// ALL COMPONENTS TOGETHER
// ========================================

export const AllComponentsTogether: Story = {
  render: () => (
    <TooltipGlassProvider>
      <div className="space-y-8 p-8">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          All Migrated Components
        </h2>

        {/* Alerts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Alerts
          </h3>
          <div className="space-y-2 w-96">
            <AlertGlass variant="default">
              <AlertGlassTitle>Information</AlertGlassTitle>
              <AlertGlassDescription>Default alert</AlertGlassDescription>
            </AlertGlass>
            <AlertGlass variant="success">
              <AlertGlassTitle>Success</AlertGlassTitle>
              <AlertGlassDescription>Success alert</AlertGlassDescription>
            </AlertGlass>
          </div>
        </div>

        {/* Avatars */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Avatars
          </h3>
          <div className="flex items-center gap-4">
            <AvatarGlassSimple name="User 1" size="default" />
            <AvatarGlassSimple name="User 2" size="default" status="online" />
            <AvatarGlassSimple name="User 3" size="default" status="busy" />
          </div>
        </div>

        {/* Tooltips */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Tooltips
          </h3>
          <div className="flex gap-4">
            <TooltipGlassSimple content="Tooltip 1">
              <ButtonGlass>Hover 1</ButtonGlass>
            </TooltipGlassSimple>
            <TooltipGlassSimple content="Tooltip 2">
              <ButtonGlass variant="default">Hover 2</ButtonGlass>
            </TooltipGlassSimple>
          </div>
        </div>

        {/* Popovers */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Popovers
          </h3>
          <PopoverGlassLegacy trigger={<ButtonGlass>Open Popover</ButtonGlass>} side="top">
            <div className="w-64 p-4">
              <p style={{ color: 'var(--text-primary)' }}>Popover content</p>
            </div>
          </PopoverGlassLegacy>
        </div>
      </div>
    </TooltipGlassProvider>
  ),
  async play({ canvasElement }) {
    await expect(canvasElement).toBeInTheDocument();
  },
};
