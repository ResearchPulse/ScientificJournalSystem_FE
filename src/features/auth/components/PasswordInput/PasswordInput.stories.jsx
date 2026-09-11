import PasswordInput from './PasswordInput';

export default {
  title: 'Features/Auth/PasswordInput',
  component: PasswordInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
};

export const Default = {
  args: {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter password...',
  },
};
