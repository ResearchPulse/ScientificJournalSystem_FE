import ResetPasswordForm from './ResetPasswordForm';

export default {
  title: 'Features/Auth/ResetPasswordForm',
  component: ResetPasswordForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onChange: { action: 'onChange' },
  },
};

export const Default = {
  args: {
    formData: { newPassword: '', confirmPassword: '' },
    loading: false,
    error: null,
  },
};
