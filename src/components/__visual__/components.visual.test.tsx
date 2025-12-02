/**
 * Visual Regression Tests for Glass Components
 * Tests each component across all 3 themes (glass, light, aurora)
 *
 * Run: npm run test:visual
 * Update baselines: npm run test:visual:update
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';

// Components
import { ButtonGlass } from '../ButtonGlass';
import { InputGlass } from '../InputGlass';
import { GlassCard } from '../GlassCard';
import { BadgeGlass } from '../BadgeGlass';
import { AlertGlass } from '../AlertGlass';
import { ToggleGlass } from '../ToggleGlass';
import { CheckboxGlass } from '../CheckboxGlass';
import { TooltipGlass } from '../TooltipGlass';
import { ModalGlass } from '../ModalGlass';
import { DropdownGlass } from '../DropdownGlass';
import { TabsGlass } from '../TabsGlass';
import { AvatarGlass } from '../AvatarGlass';
import { SkeletonGlass } from '../SkeletonGlass';
import { ProgressGlass } from '../ProgressGlass';
import { SliderGlass } from '../SliderGlass';
import { NotificationGlass } from '../NotificationGlass';

// Theme context
import { ThemeProvider } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div data-testid="visual-test-container" data-theme={theme}>
        {component}
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 100) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

describe('Visual Regression Tests', () => {
  // Clean up after each test to prevent element conflicts
  afterEach(() => {
    cleanup();
  });

  describe.each(THEMES)('Theme: %s', (theme) => {

    test(`ButtonGlass primary - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="primary" data-testid="button">
          Primary Button
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-primary-${theme}`);
    });

    test(`InputGlass default - ${theme}`, async () => {
      renderWithTheme(
        <InputGlass placeholder="Enter text..." data-testid="input" />,
        theme
      );
      await waitForStability();
      const input = page.getByTestId('input');
      await expect(input).toMatchScreenshot(`input-default-${theme}`);
    });

    test(`GlassCard default - ${theme}`, async () => {
      renderWithTheme(
        <GlassCard data-testid="card">
          <p>Card content</p>
        </GlassCard>,
        theme
      );
      await waitForStability();
      const card = page.getByTestId('card');
      await expect(card).toMatchScreenshot(`card-default-${theme}`);
    });

    test(`BadgeGlass default - ${theme}`, async () => {
      renderWithTheme(
        <BadgeGlass data-testid="badge">Badge</BadgeGlass>,
        theme
      );
      await waitForStability();
      const badge = page.getByTestId('badge');
      await expect(badge).toMatchScreenshot(`badge-default-${theme}`);
    });

    test(`AlertGlass info - ${theme}`, async () => {
      renderWithTheme(
        <AlertGlass type="info" title="Info" data-testid="alert">
          This is an info alert
        </AlertGlass>,
        theme
      );
      await waitForStability();
      const alert = page.getByTestId('alert');
      await expect(alert).toMatchScreenshot(`alert-info-${theme}`);
    });

    test(`ToggleGlass on - ${theme}`, async () => {
      renderWithTheme(
        <ToggleGlass checked={true} onChange={() => {}} data-testid="toggle" />,
        theme
      );
      await waitForStability();
      const toggle = page.getByTestId('toggle');
      await expect(toggle).toMatchScreenshot(`toggle-on-${theme}`);
    });

    test(`CheckboxGlass checked - ${theme}`, async () => {
      renderWithTheme(
        <CheckboxGlass checked={true} onChange={() => {}} label="Checked" data-testid="checkbox" />,
        theme
      );
      await waitForStability();
      const checkbox = page.getByTestId('checkbox');
      await expect(checkbox).toMatchScreenshot(`checkbox-checked-${theme}`);
    });

    test(`TooltipGlass - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="tooltip-container" style={{ padding: '50px' }}>
          <TooltipGlass content="Tooltip text" position="top">
            <span data-testid="tooltip-trigger">Hover me</span>
          </TooltipGlass>
        </div>,
        theme
      );
      await waitForStability(200);
      // Hover to show tooltip
      const trigger = page.getByTestId('tooltip-trigger');
      await trigger.hover();
      await waitForStability(200);
      const container = page.getByTestId('tooltip-container');
      await expect(container).toMatchScreenshot(`tooltip-top-${theme}`);
    });

    test(`TabsGlass default - ${theme}`, async () => {
      renderWithTheme(
        <TabsGlass
          data-testid="tabs"
          tabs={[
            { id: 'tab1', label: 'Tab 1' },
            { id: 'tab2', label: 'Tab 2' },
          ]}
          activeTab="tab1"
          onChange={() => {}}
        />,
        theme
      );
      await waitForStability();
      const tabs = page.getByTestId('tabs');
      await expect(tabs).toMatchScreenshot(`tabs-default-${theme}`);
    });

    test(`AvatarGlass md online - ${theme}`, async () => {
      renderWithTheme(
        <AvatarGlass size="md" status="online" name="John Doe" data-testid="avatar" />,
        theme
      );
      await waitForStability();
      const avatar = page.getByTestId('avatar');
      await expect(avatar).toMatchScreenshot(`avatar-md-online-${theme}`);
    });

    test(`SkeletonGlass text - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="skeleton-container" style={{ width: '200px' }}>
          <SkeletonGlass variant="text" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('skeleton-container');
      await expect(container).toMatchScreenshot(`skeleton-text-${theme}`);
    });

    test(`ProgressGlass 50% violet - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-container" style={{ width: '200px' }}>
          <ProgressGlass value={50} gradient="violet" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('progress-container');
      await expect(container).toMatchScreenshot(`progress-violet-50-${theme}`);
    });

    test(`SliderGlass 50% - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="slider-container" style={{ width: '200px' }}>
          <SliderGlass value={50} onChange={() => {}} />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('slider-container');
      await expect(container).toMatchScreenshot(`slider-50-${theme}`);
    });

    test(`NotificationGlass info - ${theme}`, async () => {
      renderWithTheme(
        <NotificationGlass
          type="info"
          title="Notification"
          message="This is a notification"
          onClose={() => {}}
          data-testid="notification"
        />,
        theme
      );
      await waitForStability(200);
      const notification = page.getByTestId('notification');
      await expect(notification).toMatchScreenshot(`notification-info-${theme}`);
    });
  });

  // ==========================================
  // ITERATION 2: Component Variants
  // ==========================================

  describe.each(THEMES)('Component Variants - Theme: %s', (theme) => {
    // ButtonGlass variants
    test(`ButtonGlass ghost - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="ghost" data-testid="button">
          Ghost Button
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-ghost-${theme}`);
    });

    test(`ButtonGlass text - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="text" data-testid="button">
          Text Button
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-text-${theme}`);
    });

    // AlertGlass variants
    test(`AlertGlass success - ${theme}`, async () => {
      renderWithTheme(
        <AlertGlass type="success" title="Success" data-testid="alert">
          Operation completed successfully
        </AlertGlass>,
        theme
      );
      await waitForStability();
      const alert = page.getByTestId('alert');
      await expect(alert).toMatchScreenshot(`alert-success-${theme}`);
    });

    test(`AlertGlass warning - ${theme}`, async () => {
      renderWithTheme(
        <AlertGlass type="warning" title="Warning" data-testid="alert">
          Please review before continuing
        </AlertGlass>,
        theme
      );
      await waitForStability();
      const alert = page.getByTestId('alert');
      await expect(alert).toMatchScreenshot(`alert-warning-${theme}`);
    });

    test(`AlertGlass error - ${theme}`, async () => {
      renderWithTheme(
        <AlertGlass type="error" title="Error" data-testid="alert">
          Something went wrong
        </AlertGlass>,
        theme
      );
      await waitForStability();
      const alert = page.getByTestId('alert');
      await expect(alert).toMatchScreenshot(`alert-error-${theme}`);
    });

    // BadgeGlass variants
    test(`BadgeGlass success - ${theme}`, async () => {
      renderWithTheme(
        <BadgeGlass variant="success" data-testid="badge">Success</BadgeGlass>,
        theme
      );
      await waitForStability();
      const badge = page.getByTestId('badge');
      await expect(badge).toMatchScreenshot(`badge-success-${theme}`);
    });

    test(`BadgeGlass warning - ${theme}`, async () => {
      renderWithTheme(
        <BadgeGlass variant="warning" data-testid="badge">Warning</BadgeGlass>,
        theme
      );
      await waitForStability();
      const badge = page.getByTestId('badge');
      await expect(badge).toMatchScreenshot(`badge-warning-${theme}`);
    });

    test(`BadgeGlass danger - ${theme}`, async () => {
      renderWithTheme(
        <BadgeGlass variant="danger" data-testid="badge">Danger</BadgeGlass>,
        theme
      );
      await waitForStability();
      const badge = page.getByTestId('badge');
      await expect(badge).toMatchScreenshot(`badge-danger-${theme}`);
    });

    test(`BadgeGlass info - ${theme}`, async () => {
      renderWithTheme(
        <BadgeGlass variant="info" data-testid="badge">Info</BadgeGlass>,
        theme
      );
      await waitForStability();
      const badge = page.getByTestId('badge');
      await expect(badge).toMatchScreenshot(`badge-info-${theme}`);
    });

    // NotificationGlass variants
    test(`NotificationGlass success - ${theme}`, async () => {
      renderWithTheme(
        <NotificationGlass
          type="success"
          title="Success"
          message="Operation completed"
          onClose={() => {}}
          data-testid="notification"
        />,
        theme
      );
      await waitForStability(200);
      const notification = page.getByTestId('notification');
      await expect(notification).toMatchScreenshot(`notification-success-${theme}`);
    });

    test(`NotificationGlass warning - ${theme}`, async () => {
      renderWithTheme(
        <NotificationGlass
          type="warning"
          title="Warning"
          message="Please review"
          onClose={() => {}}
          data-testid="notification"
        />,
        theme
      );
      await waitForStability(200);
      const notification = page.getByTestId('notification');
      await expect(notification).toMatchScreenshot(`notification-warning-${theme}`);
    });

    test(`NotificationGlass error - ${theme}`, async () => {
      renderWithTheme(
        <NotificationGlass
          type="error"
          title="Error"
          message="Something went wrong"
          onClose={() => {}}
          data-testid="notification"
        />,
        theme
      );
      await waitForStability(200);
      const notification = page.getByTestId('notification');
      await expect(notification).toMatchScreenshot(`notification-error-${theme}`);
    });

    // ProgressGlass gradient variants
    test(`ProgressGlass blue - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-container" style={{ width: '200px' }}>
          <ProgressGlass value={70} gradient="blue" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('progress-container');
      await expect(container).toMatchScreenshot(`progress-blue-${theme}`);
    });

    test(`ProgressGlass emerald - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-container" style={{ width: '200px' }}>
          <ProgressGlass value={70} gradient="emerald" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('progress-container');
      await expect(container).toMatchScreenshot(`progress-emerald-${theme}`);
    });

    test(`ProgressGlass rose - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-container" style={{ width: '200px' }}>
          <ProgressGlass value={70} gradient="rose" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('progress-container');
      await expect(container).toMatchScreenshot(`progress-rose-${theme}`);
    });

    // ToggleGlass off state
    test(`ToggleGlass off - ${theme}`, async () => {
      renderWithTheme(
        <ToggleGlass checked={false} onChange={() => {}} data-testid="toggle" />,
        theme
      );
      await waitForStability();
      const toggle = page.getByTestId('toggle');
      await expect(toggle).toMatchScreenshot(`toggle-off-${theme}`);
    });

    // CheckboxGlass unchecked state
    test(`CheckboxGlass unchecked - ${theme}`, async () => {
      renderWithTheme(
        <CheckboxGlass checked={false} onChange={() => {}} label="Unchecked" data-testid="checkbox" />,
        theme
      );
      await waitForStability();
      const checkbox = page.getByTestId('checkbox');
      await expect(checkbox).toMatchScreenshot(`checkbox-unchecked-${theme}`);
    });

    // AvatarGlass status variants
    test(`AvatarGlass offline - ${theme}`, async () => {
      renderWithTheme(
        <AvatarGlass size="md" status="offline" name="Jane Doe" data-testid="avatar" />,
        theme
      );
      await waitForStability();
      const avatar = page.getByTestId('avatar');
      await expect(avatar).toMatchScreenshot(`avatar-offline-${theme}`);
    });

    test(`AvatarGlass away - ${theme}`, async () => {
      renderWithTheme(
        <AvatarGlass size="md" status="away" name="Bob Smith" data-testid="avatar" />,
        theme
      );
      await waitForStability();
      const avatar = page.getByTestId('avatar');
      await expect(avatar).toMatchScreenshot(`avatar-away-${theme}`);
    });
  });

  // Modal and Dropdown tests (separate due to portal/overlay)
  describe.each(THEMES)('Overlay components - Theme: %s', (theme) => {
    test(`ModalGlass opened - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="modal-container" style={{ width: '600px', height: '400px', position: 'relative' }}>
          <ModalGlass isOpen={true} onClose={() => {}} title="Modal Title">
            <p>Modal content</p>
          </ModalGlass>
        </div>,
        theme
      );
      await waitForStability(300);
      const container = page.getByTestId('modal-container');
      await expect(container).toMatchScreenshot(`modal-opened-${theme}`);
    });

    test(`DropdownGlass opened - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="dropdown-container" style={{ padding: '100px' }}>
          <DropdownGlass
            trigger={<ButtonGlass data-testid="dropdown-trigger">Open Menu</ButtonGlass>}
            items={[
              { label: 'Item 1', onClick: () => {} },
              { label: 'Item 2', onClick: () => {} },
            ]}
          />
        </div>,
        theme
      );
      await waitForStability(100);
      // Click trigger to open dropdown
      const trigger = page.getByTestId('dropdown-trigger');
      await trigger.click();
      await waitForStability(200);
      const container = page.getByTestId('dropdown-container');
      await expect(container).toMatchScreenshot(`dropdown-opened-${theme}`);
    });
  });

  // ==========================================
  // ITERATION 3: Disabled States
  // ==========================================

  describe.each(THEMES)('Disabled States - Theme: %s', (theme) => {
    test(`ButtonGlass primary disabled - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="primary" disabled data-testid="button">
          Disabled Primary
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-primary-disabled-${theme}`);
    });

    test(`ButtonGlass ghost disabled - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="ghost" disabled data-testid="button">
          Disabled Ghost
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-ghost-disabled-${theme}`);
    });

    test(`InputGlass disabled - ${theme}`, async () => {
      renderWithTheme(
        <InputGlass placeholder="Disabled input" disabled data-testid="input" />,
        theme
      );
      await waitForStability();
      const input = page.getByTestId('input');
      await expect(input).toMatchScreenshot(`input-disabled-${theme}`);
    });

    test(`ToggleGlass disabled on - ${theme}`, async () => {
      renderWithTheme(
        <ToggleGlass checked={true} onChange={() => {}} disabled data-testid="toggle" />,
        theme
      );
      await waitForStability();
      const toggle = page.getByTestId('toggle');
      await expect(toggle).toMatchScreenshot(`toggle-disabled-on-${theme}`);
    });

    test(`ToggleGlass disabled off - ${theme}`, async () => {
      renderWithTheme(
        <ToggleGlass checked={false} onChange={() => {}} disabled data-testid="toggle" />,
        theme
      );
      await waitForStability();
      const toggle = page.getByTestId('toggle');
      await expect(toggle).toMatchScreenshot(`toggle-disabled-off-${theme}`);
    });

    test(`CheckboxGlass disabled checked - ${theme}`, async () => {
      renderWithTheme(
        <CheckboxGlass checked={true} onChange={() => {}} disabled label="Disabled Checked" data-testid="checkbox" />,
        theme
      );
      await waitForStability();
      const checkbox = page.getByTestId('checkbox');
      await expect(checkbox).toMatchScreenshot(`checkbox-disabled-checked-${theme}`);
    });

    test(`CheckboxGlass disabled unchecked - ${theme}`, async () => {
      renderWithTheme(
        <CheckboxGlass checked={false} onChange={() => {}} disabled label="Disabled Unchecked" data-testid="checkbox" />,
        theme
      );
      await waitForStability();
      const checkbox = page.getByTestId('checkbox');
      await expect(checkbox).toMatchScreenshot(`checkbox-disabled-unchecked-${theme}`);
    });

    test(`SliderGlass disabled - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="slider-container" style={{ width: '200px' }}>
          <SliderGlass value={50} onChange={() => {}} disabled />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('slider-container');
      await expect(container).toMatchScreenshot(`slider-disabled-${theme}`);
    });
  });

  // ==========================================
  // ITERATION 4: Size Variants
  // ==========================================

  describe.each(THEMES)('Size Variants - Theme: %s', (theme) => {
    // ButtonGlass sizes
    test(`ButtonGlass size sm - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="primary" size="sm" data-testid="button">
          Small
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-size-sm-${theme}`);
    });

    test(`ButtonGlass size lg - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="primary" size="lg" data-testid="button">
          Large
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-size-lg-${theme}`);
    });

    test(`ButtonGlass size icon - ${theme}`, async () => {
      renderWithTheme(
        <ButtonGlass variant="primary" size="icon" data-testid="button">
          +
        </ButtonGlass>,
        theme
      );
      await waitForStability();
      const button = page.getByTestId('button');
      await expect(button).toMatchScreenshot(`button-size-icon-${theme}`);
    });

    // AvatarGlass sizes
    test(`AvatarGlass size sm - ${theme}`, async () => {
      renderWithTheme(
        <AvatarGlass size="sm" name="Small Avatar" data-testid="avatar" />,
        theme
      );
      await waitForStability();
      const avatar = page.getByTestId('avatar');
      await expect(avatar).toMatchScreenshot(`avatar-size-sm-${theme}`);
    });

    test(`AvatarGlass size lg - ${theme}`, async () => {
      renderWithTheme(
        <AvatarGlass size="lg" name="Large Avatar" data-testid="avatar" />,
        theme
      );
      await waitForStability();
      const avatar = page.getByTestId('avatar');
      await expect(avatar).toMatchScreenshot(`avatar-size-lg-${theme}`);
    });

    test(`AvatarGlass size xl - ${theme}`, async () => {
      renderWithTheme(
        <AvatarGlass size="xl" name="XL Avatar" data-testid="avatar" />,
        theme
      );
      await waitForStability();
      const avatar = page.getByTestId('avatar');
      await expect(avatar).toMatchScreenshot(`avatar-size-xl-${theme}`);
    });

    // ProgressGlass sizes
    test(`ProgressGlass size sm - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-container" style={{ width: '200px' }}>
          <ProgressGlass value={70} size="sm" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('progress-container');
      await expect(container).toMatchScreenshot(`progress-size-sm-${theme}`);
    });

    test(`ProgressGlass size lg - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-container" style={{ width: '200px' }}>
          <ProgressGlass value={70} size="lg" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('progress-container');
      await expect(container).toMatchScreenshot(`progress-size-lg-${theme}`);
    });

    test(`ProgressGlass size xl - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="progress-container" style={{ width: '200px' }}>
          <ProgressGlass value={70} size="xl" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('progress-container');
      await expect(container).toMatchScreenshot(`progress-size-xl-${theme}`);
    });

    // ModalGlass sizes
    test(`ModalGlass size sm - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="modal-container" style={{ width: '600px', height: '400px', position: 'relative' }}>
          <ModalGlass isOpen={true} onClose={() => {}} title="Small Modal" size="sm">
            <p>Small modal content</p>
          </ModalGlass>
        </div>,
        theme
      );
      await waitForStability(300);
      const container = page.getByTestId('modal-container');
      await expect(container).toMatchScreenshot(`modal-size-sm-${theme}`);
    });

    test(`ModalGlass size lg - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="modal-container" style={{ width: '800px', height: '500px', position: 'relative' }}>
          <ModalGlass isOpen={true} onClose={() => {}} title="Large Modal" size="lg">
            <p>Large modal content</p>
          </ModalGlass>
        </div>,
        theme
      );
      await waitForStability(300);
      const container = page.getByTestId('modal-container');
      await expect(container).toMatchScreenshot(`modal-size-lg-${theme}`);
    });

    // SkeletonGlass variants
    test(`SkeletonGlass avatar - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="skeleton-container">
          <SkeletonGlass variant="avatar" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('skeleton-container');
      await expect(container).toMatchScreenshot(`skeleton-avatar-${theme}`);
    });

    test(`SkeletonGlass card - ${theme}`, async () => {
      renderWithTheme(
        <div data-testid="skeleton-container" style={{ width: '200px' }}>
          <SkeletonGlass variant="card" />
        </div>,
        theme
      );
      await waitForStability();
      const container = page.getByTestId('skeleton-container');
      await expect(container).toMatchScreenshot(`skeleton-card-${theme}`);
    });
  });
});
