import GenderSelect from './GenderSelect';

export default {
  title: 'Features/Auth/GenderSelect',
  component: GenderSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
};

export const Default = {
  args: {
    value: '',
  },
};
