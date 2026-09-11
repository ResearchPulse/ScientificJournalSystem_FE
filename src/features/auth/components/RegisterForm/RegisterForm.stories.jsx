import RegisterForm from './RegisterForm';

export default {
  title: 'Features/Auth/RegisterForm',
  component: RegisterForm,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onChange: { action: 'onChange' },
  },
};

export const Default = {
  args: {
    formData: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      dateOfBirth: '',
      agreeTerms: false,
    },
    loading: false,
    error: null,
  },
};
