import { expect } from 'storybook/test';
import InputField from './InputField';

const meta = {
  component: InputField,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'Search Term',
    name: 'query',
    placeholder: 'Enter keywords, author, or DOI...',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText(/enter keywords/i);
    await userEvent.type(input, 'Deep Learning', { delay: 10 });
    await expect(input).toHaveValue('Deep Learning');
  },
};

export const WithIcon = {
  args: {
    label: 'Username',
    name: 'username',
    icon: 'lucide:user',
    placeholder: 'Enter your username',
  },
};

export const WithError = {
  args: {
    label: 'Email Address',
    name: 'email',
    icon: 'lucide:mail',
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address.',
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Author ID',
    name: 'authorId',
    value: 'AUTH-2026-98124',
    disabled: true,
  },
};
