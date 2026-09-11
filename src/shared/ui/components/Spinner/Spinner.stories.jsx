import { expect } from 'storybook/test';
import Spinner from './Spinner';

const meta = {
  component: Spinner,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    size: 'md',
    variant: 'primary',
  },
};

export const Small = {
  args: {
    size: 'sm',
    variant: 'primary',
  },
};

export const Large = {
  args: {
    size: 'lg',
    variant: 'dark',
  },
};

export const CssCheck = {
  args: {
    size: 'md',
    variant: 'primary',
  },
  play: async ({ canvas }) => {
    const spinner = canvas.getByRole('status');
    await expect(spinner).toBeInTheDocument();
  },
};
