import ForgotPasswordForm from './ForgotPasswordForm';

export default {
  title: 'Features/Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onChange: { action: 'onChange' },
  },
};

export const Default = {
  args: {
    email: '',
    loading: false,
    error: null,
  },
};
