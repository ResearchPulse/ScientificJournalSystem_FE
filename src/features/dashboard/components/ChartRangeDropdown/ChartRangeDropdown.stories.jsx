import ChartRangeDropdown from './ChartRangeDropdown';

export default {
  title: 'Features/Dashboard/ChartRangeDropdown',
  component: ChartRangeDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export const Default = {
  args: {
    value: '5',
  },
};

export const TenYears = {
  args: {
    value: '10',
  },
};

export const AllTime = {
  args: {
    value: 'all',
  },
};
