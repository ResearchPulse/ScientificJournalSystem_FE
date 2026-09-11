import { expect } from 'storybook/test';
import FormError from './FormError';

const meta = {
  component: FormError,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    children: 'Invalid ISSN format. Expected format: 1234-5678',
  },
};

export const CssCheck = {
  args: {
    children: 'Field is required',
  },
  play: async ({ canvas }) => {
    const error = canvas.getByRole('alert');
    await expect(error).toBeInTheDocument();
  },
};
