import { expect } from 'storybook/test';
import CountdownRedirect from './CountdownRedirect';

const meta = {
  component: CountdownRedirect,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    countdown: 5,
    total: 10,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/5/i)).toBeInTheDocument();
  },
};

export const ExpiringSoon = {
  args: {
    countdown: 1,
    total: 5,
  },
};
