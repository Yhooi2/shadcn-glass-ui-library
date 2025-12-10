import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from '@vitest/browser/context';
import { SparklineGlass } from '../glass/specialized/sparkline-glass';

const data = [10, 25, 45, 80, 60, 30, 40, 55, 70, 50, 35, 20];

afterEach(cleanup);

describe('SparklineGlass Visual', () => {
  test('default', async () => {
    render(<SparklineGlass data={data} />);
    await expect(page.locator('svg').first()).toMatchScreenshot();
  });

  test('with labels', async () => {
    render(
      <SparklineGlass
        data={data}
        labels={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']}
        showLabels
      />
    );
    await expect(page.locator('svg').first()).toMatchScreenshot();
  });

  test('highlight max', async () => {
    render(<SparklineGlass data={data} highlightMax />);
    await expect(page.locator('svg').first()).toMatchScreenshot();
  });
});
