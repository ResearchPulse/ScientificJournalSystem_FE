import { expect } from 'storybook/test';
import ProgressBar from './ProgressBar';

const meta = {
  component: ProgressBar,
  tags: ['ai-generated'],
};

export default meta;

export const HalfProgress = {
  args: {
    current: 5,
    total: 10,
  },
  play: async ({ canvasElement }) => {
    const bar = canvasElement.querySelector('div[style*="width: 50%"]');
    await expect(bar).not.toBeNull();
  },
};

export const Initial = {
  args: {
    current: 10,
    total: 10,
  },
};

export const Complete = {
  args: {
    current: 0,
    total: 10,
  },
};
