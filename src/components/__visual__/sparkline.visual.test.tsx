import { describe, test, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { page } from 'vitest/browser';
import { SparklineGlass } from '../glass/specialized/sparkline-glass';

const data = [10, 25, 45, 80, 60, 30, 40, 55, 70, 50, 35, 20];

// Wait for animations to settle
async function waitForStability(ms = 100) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

afterEach(cleanup);

describe('SparklineGlass Visual', () => {
  test('default', async () => {
    render(
      <div data-testid="sparkline-default">
        <SparklineGlass data={data} />
      </div>
    );
    await waitForStability();
    const container = page.getByTestId('sparkline-default');
    await expect(container).toMatchScreenshot('sparkline-default');
  });

  test('with labels', async () => {
    render(
      <div data-testid="sparkline-labels">
        <SparklineGlass
          data={data}
          labels={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']}
          showLabels
        />
      </div>
    );
    await waitForStability();
    const container = page.getByTestId('sparkline-labels');
    await expect(container).toMatchScreenshot('sparkline-labels');
  });

  test('highlight max', async () => {
    render(
      <div data-testid="sparkline-highlight">
        <SparklineGlass data={data} highlightMax />
      </div>
    );
    await waitForStability();
    const container = page.getByTestId('sparkline-highlight');
    await expect(container).toMatchScreenshot('sparkline-highlight');
  });
});
