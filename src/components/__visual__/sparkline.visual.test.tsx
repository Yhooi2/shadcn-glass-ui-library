import { test, expect } from '@playwright/experimental-ct-react';
import { SparklineGlass } from '../glass/specialized/sparkline-glass';

const data = [10, 25, 45, 80, 60, 30, 40, 55, 70, 50, 35, 20];

test.describe('SparklineGlass Visual', () => {
  test('default', async ({ mount }) => {
    const component = await mount(<SparklineGlass data={data} />);
    await expect(component).toHaveScreenshot();
  });

  test('with labels', async ({ mount }) => {
    const component = await mount(
      <SparklineGlass
        data={data}
        labels={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']}
        showLabels
      />
    );
    await expect(component).toHaveScreenshot();
  });

  test('highlight max', async ({ mount }) => {
    const component = await mount(<SparklineGlass data={data} highlightMax />);
    await expect(component).toHaveScreenshot();
  });
});
