import LoginForm from './LoginForm';

export default {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onChange: { action: 'onChange' },
  },
};

export const Default = {
  args: {
    formData: { email: '', password: '' },
    loading: false,
    error: null,
  },
};
