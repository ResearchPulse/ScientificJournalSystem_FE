import { expect } from 'storybook/test';
import StatCard from './StatCard';

const meta = {
  component: StatCard,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'Total Indexed Papers',
    value: 12450,
    icon: 'lucide:book-open',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Total Indexed Papers')).toBeInTheDocument();
  },
};

export const PositiveTrend = {
  args: {
    label: 'Weekly Citations',
    value: 1530,
    growth: 18.5,
    growthLabel: 'vs last week',
    icon: 'lucide:trending-up',
  },
};

export const NegativeTrend = {
  args: {
    label: 'Publication Velocity',
    value: 320,
    growth: -5.2,
    growthLabel: 'this month',
    icon: 'lucide:trending-down',
  },
};

export const Loading = {
  args: {
    label: 'Loading Metrics',
    value: 0,
    loading: true,
  },
};
