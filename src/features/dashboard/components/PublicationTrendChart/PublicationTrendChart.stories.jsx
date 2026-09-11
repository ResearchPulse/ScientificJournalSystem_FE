import PublicationTrendChart from './PublicationTrendChart';

export default {
  title: 'Features/Dashboard/PublicationTrendChart',
  component: PublicationTrendChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockAnalytics = {
  years: ['2020', '2021', '2022', '2023', '2024', '2025'],
  series: [
    {
      label: 'Publications',
      data: [120, 180, 240, 310, 420, 560],
    },
    {
      label: 'Citations',
      data: [340, 520, 890, 1200, 1850, 2400],
    },
  ],
};

export const Default = {
  args: {
    analytics: mockAnalytics,
    loading: false,
    error: null,
  },
};

export const Loading = {
  args: {
    analytics: null,
    loading: true,
    error: null,
  },
};

export const Error = {
  args: {
    analytics: null,
    loading: false,
    error: 'Failed to fetch trend data',
  },
};
