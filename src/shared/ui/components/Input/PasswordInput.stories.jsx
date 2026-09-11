import { expect } from 'storybook/test';
import PasswordInput from './PasswordInput';

const meta = {
  component: PasswordInput,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const WithError = {
  args: {
    label: 'Confirm Password',
    value: '12345',
    error: 'Password must be at least 8 characters with a special symbol',
  },
};

export const CssCheck = {
  args: {
    label: 'Login Password',
    placeholder: 'Test password',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Test password');
    await expect(input).toHaveAttribute('type', 'password');
  },
};
