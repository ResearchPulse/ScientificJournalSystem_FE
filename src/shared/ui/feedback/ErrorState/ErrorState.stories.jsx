import { expect } from 'storybook/test';
import ErrorState from './ErrorState';

const meta = {
  component: ErrorState,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    title: 'Connection Error',
    message: 'Unable to reach the journal indexing server.',
    retryLabel: 'Try Again',
    onRetry: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Connection Error')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  },
};

export const CustomWarning = {
  args: {
    title: 'Quota Exceeded',
    message: 'You have reached your daily search limit.',
    icon: 'lucide:alert-circle',
  },
};
