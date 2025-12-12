import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { InsightCardGlass } from '../glass/atomic/insight-card-glass';

// Wait for animations to settle
async function waitForStability(ms = 100) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

describe('InsightCardGlass Visual', () => {
  afterEach(() => {
    cleanup();
  });

  test('default', async () => {
    render(
      <div data-testid="insight-card-default">
        <InsightCardGlass text="Test insight" detail="Details" />
      </div>
    );
    await waitForStability();
    const container = page.getByTestId('insight-card-default');
    await expect(container).toMatchScreenshot('insight-card-default');
  });

  test('all variants', async () => {
    render(
      <div data-testid="insight-card-variants" className="space-y-2">
        <InsightCardGlass variant="default" text="Default" />
        <InsightCardGlass variant="highlight" text="Highlight" />
        <InsightCardGlass variant="warning" text="Warning" />
        <InsightCardGlass variant="growth" text="Growth" />
        <InsightCardGlass variant="decline" text="Decline" />
      </div>
    );
    await waitForStability();
    const container = page.getByTestId('insight-card-variants');
    await expect(container).toMatchScreenshot('insight-card-variants');
  });
});
