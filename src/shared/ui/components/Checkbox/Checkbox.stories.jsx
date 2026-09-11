import { expect } from 'storybook/test';
import Checkbox from './Checkbox';

const meta = {
  component: Checkbox,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'I agree to the terms',
    checked: false,
  },
};

export const Checked = {
  args: {
    label: 'Scopus Indexed Journals',
    description: 'Filter only peer-reviewed Scopus publications',
    checked: true,
  },
};

export const Indeterminate = {
  args: {
    label: 'Select all journals',
    indeterminate: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled option',
    disabled: true,
    checked: true,
  },
};

export const CssCheck = {
  args: {
    label: 'Checkbox state check',
    checked: true,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('checkbox');
    await expect(input).toBeChecked();
  },
};
