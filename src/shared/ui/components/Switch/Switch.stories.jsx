import { expect } from 'storybook/test';
import Switch from './Switch';

const meta = {
  component: Switch,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const Checked = {
  args: {
    label: 'Open Access Filter',
    checked: true,
  },
};

export const Disabled = {
  args: {
    label: 'Unavailable setting',
    checked: false,
    disabled: true,
  },
};

export const CssCheck = {
  args: {
    label: 'Active switch check',
    checked: true,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('switch');
    await expect(input).toBeChecked();
  },
};
