import FormErrorMessage from './FormErrorMessage';

export default {
  title: 'Features/Auth/FormErrorMessage',
  component: FormErrorMessage,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    message: 'Invalid email or password. Please check and try again.',
  },
};
