import { expect } from 'storybook/test';
import Textarea from './Textarea';

const meta = {
  component: Textarea,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'Abstract',
    placeholder: 'Write manuscript summary or abstract...',
    rows: 4,
    maxLength: 500,
  },
};

export const WithError = {
  args: {
    label: 'Rejection Reason',
    error: 'Please provide detailed comments for the author',
    rows: 3,
  },
};

export const CssCheck = {
  args: {
    label: 'Paper Notes',
    placeholder: 'Enter notes',
  },
  play: async ({ canvas }) => {
    const textarea = canvas.getByPlaceholderText('Enter notes');
    await expect(textarea).toBeInTheDocument();
  },
};
