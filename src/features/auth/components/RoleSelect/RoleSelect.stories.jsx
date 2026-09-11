import RoleSelect from './RoleSelect';

export default {
  title: 'Features/Auth/RoleSelect',
  component: RoleSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: { onChange: { action: 'onChange' } },
};

export const Default = {
  args: {
    value: 'READER',
  },
};
