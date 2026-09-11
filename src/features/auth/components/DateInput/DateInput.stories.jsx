import DateInput from './DateInput';

export default {
  title: 'Features/Auth/DateInput',
  component: DateInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
};

export const Default = {
  args: {
    name: 'birthDate',
    label: 'Date of Birth',
    value: '',
  },
};
