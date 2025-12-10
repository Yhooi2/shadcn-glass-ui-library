import { test, expect } from '@playwright/experimental-ct-react';
import { InsightCardGlass } from '../glass/atomic/insight-card-glass';

test.describe('InsightCardGlass Visual', () => {
  test('default', async ({ mount }) => {
    const component = await mount(<InsightCardGlass text="Test insight" detail="Details" />);
    await expect(component).toHaveScreenshot();
  });

  test('all variants', async ({ mount }) => {
    const component = await mount(
      <div className="space-y-2">
        <InsightCardGlass variant="default" text="Default" />
        <InsightCardGlass variant="highlight" text="Highlight" />
        <InsightCardGlass variant="warning" text="Warning" />
        <InsightCardGlass variant="growth" text="Growth" />
        <InsightCardGlass variant="decline" text="Decline" />
      </div>
    );
    await expect(component).toHaveScreenshot();
  });
});
