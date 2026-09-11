import { expect } from 'storybook/test';
import Radio from './Radio';

const meta = {
  component: Radio,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'Monthly billing',
    value: 'monthly',
    checked: false,
  },
};

export const Selected = {
  args: {
    label: 'Annual billing (Save 20%)',
    description: 'Billed once annually at $120/year',
    value: 'annual',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Enterprise Plan',
    value: 'enterprise',
    disabled: true,
    checked: false,
  },
};

export const CssCheck = {
  args: {
    label: 'Radio selection check',
    value: 'check',
    checked: true,
  },
  play: async ({ canvas }) => {
    const radio = canvas.getByRole('radio');
    await expect(radio).toBeChecked();
  },
};
