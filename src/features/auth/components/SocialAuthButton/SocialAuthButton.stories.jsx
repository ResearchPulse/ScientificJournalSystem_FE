import SocialAuthButton from './SocialAuthButton';

export default {
  title: 'Features/Auth/SocialAuthButton',
  component: SocialAuthButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export const Default = {
  args: {
    label: 'Tiếp tục với Google',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    label: 'Tiếp tục với Google',
    disabled: true,
  },
};
