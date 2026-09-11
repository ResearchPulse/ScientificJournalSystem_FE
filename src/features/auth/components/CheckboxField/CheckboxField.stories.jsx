import CheckboxField from './CheckboxField';

export default {
  title: 'Features/Auth/CheckboxField',
  component: CheckboxField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
};

export const Unchecked = {
  args: {
    id: 'terms',
    label: 'I agree to the Terms of Service',
    checked: false,
  },
};

export const Checked = {
  args: {
    id: 'terms',
    label: 'I agree to the Terms of Service',
    checked: true,
  },
};
