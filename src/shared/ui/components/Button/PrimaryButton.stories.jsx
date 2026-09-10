import { expect } from 'storybook/test';
import PrimaryButton from './PrimaryButton';

const meta = {
  component: PrimaryButton,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    children: 'Search Papers',
    icon: 'lucide:search',
    variant: 'primary',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /search papers/i });
    await expect(button).toHaveAttribute('type', 'button');
  },
};

export const Outline = {
  args: {
    children: 'Filter',
    variant: 'outline',
  },
};

export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Action',
    disabled: true,
  },
};

// Mandatory project-wide single CssCheck story
export const CssCheck = {
  args: {
    children: 'Delete Permanent',
    variant: 'destructive',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /delete permanent/i });
    // PrimaryButton destructive variant sets background to #dc3545 (rgb(220, 53, 69))
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(220, 53, 69)');
  },
};
