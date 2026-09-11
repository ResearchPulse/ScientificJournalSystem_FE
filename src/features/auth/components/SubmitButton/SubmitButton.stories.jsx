import SubmitButton from './SubmitButton';

export default {
  title: 'Features/Auth/SubmitButton',
  component: SubmitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
};

export const Default = {
  args: {
    label: 'Sign In',
    isLoading: false,
    disabled: false,
  },
};

export const Loading = {
  args: {
    label: 'Sign In',
    isLoading: true,
    loadingText: 'Authenticating...',
  },
};

export const Disabled = {
  args: {
    label: 'Create Account',
    disabled: true,
  },
};
