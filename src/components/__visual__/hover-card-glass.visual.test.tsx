/**
 * Visual Regression Tests for HoverCardGlass
 * Tests component across all 3 themes (glass, light, aurora)
 *
 * Run: npx vitest --project=visual hover-card
 * Update baselines: gh workflow run update-screenshots.yml
 */

import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { CalendarDays, ExternalLink, Github, User } from 'lucide-react';
import {
  HoverCardGlass,
  HoverCardGlassTrigger,
  HoverCardGlassContent,
  HoverCardGlassLegacy,
} from '@/components/glass/ui/hover-card-glass';
import {
  AvatarGlass,
  AvatarGlassImage,
  AvatarGlassFallback,
} from '@/components/glass/ui/avatar-glass';
import { ButtonGlass } from '@/components/glass/ui/button-glass';
import { ThemeProvider, type Theme } from '@/lib/theme-context';

const THEMES: Theme[] = ['glass', 'light', 'aurora'];

// Helper to render component with theme
function renderWithTheme(component: React.ReactNode, theme: Theme) {
  return render(
    <ThemeProvider defaultTheme={theme}>
      <div
        data-testid="visual-test-container"
        data-theme={theme}
        style={{
          width: '500px',
          height: '350px',
          padding: '100px 24px 24px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background:
            theme === 'glass'
              ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #1e1b4b 100%)'
              : theme === 'aurora'
                ? 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #2d1b4e 100%)'
                : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        }}
      >
        {component}
      </div>
    </ThemeProvider>
  );
}

// Wait for animations to settle
async function waitForStability(ms = 200) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('HoverCardGlass Visual Tests', () => {
  afterEach(() => {
    cleanup();
  });

  // ==================== TEST 1: USER PROFILE CARD ====================

  describe.each(THEMES)('User Profile - Theme: %s', (theme) => {
    test(`hover-card-user-profile-${theme}`, async () => {
      renderWithTheme(
        <HoverCardGlassLegacy
          trigger={
            <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
              @shadcn
            </span>
          }
          open={true}
          side="bottom"
        >
          <div className="flex gap-4">
            <AvatarGlass>
              <AvatarGlassImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarGlassFallback>SC</AvatarGlassFallback>
            </AvatarGlass>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                @shadcn
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                The creator of shadcn/ui and Taxonomy.
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays
                  className="mr-2 h-4 w-4 opacity-70"
                  style={{ color: 'var(--text-muted)' }}
                />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Joined December 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardGlassLegacy>,
        theme
      );

      await waitForStability(300);
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`hover-card-user-profile-${theme}.png`);
    });
  });

  // ==================== TEST 2: LINK PREVIEW ====================

  describe.each(THEMES)('Link Preview - Theme: %s', (theme) => {
    test(`hover-card-link-preview-${theme}`, async () => {
      renderWithTheme(
        <HoverCardGlassLegacy
          trigger={
            <span
              className="inline-flex items-center gap-1 underline cursor-pointer"
              style={{ color: 'var(--text-accent)' }}
            >
              GitHub
              <ExternalLink className="w-3 h-3" />
            </span>
          }
          open={true}
          side="bottom"
          align="start"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
              <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                GitHub
              </h4>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              GitHub is where over 100 million developers shape the future of software.
            </p>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--separator-bg)' }}>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                github.com
              </span>
            </div>
          </div>
        </HoverCardGlassLegacy>,
        theme
      );

      await waitForStability(300);
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`hover-card-link-preview-${theme}.png`);
    });
  });

  // ==================== TEST 3: NO ARROW ====================

  describe.each(THEMES)('No Arrow - Theme: %s', (theme) => {
    test(`hover-card-no-arrow-${theme}`, async () => {
      renderWithTheme(
        <HoverCardGlassLegacy
          trigger={
            <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
              Hover (no arrow)
            </span>
          }
          open={true}
          showArrow={false}
          side="bottom"
        >
          <div className="space-y-2">
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              No Arrow
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              This hover card has no arrow pointer.
            </p>
          </div>
        </HoverCardGlassLegacy>,
        theme
      );

      await waitForStability(300);
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`hover-card-no-arrow-${theme}.png`);
    });
  });

  // ==================== TEST 4: RIGHT SIDE POSITION ====================

  describe.each(THEMES)('Right Side - Theme: %s', (theme) => {
    test(`hover-card-right-side-${theme}`, async () => {
      renderWithTheme(
        <HoverCardGlassLegacy
          trigger={
            <ButtonGlass variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              View Profile
            </ButtonGlass>
          }
          open={true}
          side="right"
          align="start"
        >
          <div className="space-y-2">
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Profile Preview
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Positioned on the right side.
            </p>
          </div>
        </HoverCardGlassLegacy>,
        theme
      );

      await waitForStability(300);
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`hover-card-right-side-${theme}.png`);
    });
  });

  // ==================== TEST 5: COMPOUND API ====================

  describe.each(THEMES)('Compound API - Theme: %s', (theme) => {
    test(`hover-card-compound-${theme}`, async () => {
      renderWithTheme(
        <HoverCardGlass open={true}>
          <HoverCardGlassTrigger asChild>
            <span className="underline cursor-pointer" style={{ color: 'var(--text-accent)' }}>
              @radix-ui
            </span>
          </HoverCardGlassTrigger>
          <HoverCardGlassContent side="bottom" align="start">
            <div className="flex gap-4">
              <AvatarGlass>
                <AvatarGlassFallback>R</AvatarGlassFallback>
              </AvatarGlass>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Radix UI
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Unstyled, accessible components for building high-quality design systems.
                </p>
              </div>
            </div>
          </HoverCardGlassContent>
        </HoverCardGlass>,
        theme
      );

      await waitForStability(300);
      const container = page.getByTestId('visual-test-container');
      await expect(container).toMatchScreenshot(`hover-card-compound-${theme}.png`);
    });
  });
});
