import ForgotPasswordSuccess from './ForgotPasswordSuccess';

export default {
  title: 'Features/Auth/ForgotPasswordSuccess',
  component: ForgotPasswordSuccess,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    email: 'researcher@university.edu',
  },
};
