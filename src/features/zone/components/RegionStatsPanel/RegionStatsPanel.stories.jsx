import RegionStatsPanel from './RegionStatsPanel';

export default {
  title: 'Features/Zone/RegionStatsPanel',
  component: RegionStatsPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onRetry: { action: 'onRetry' },
  },
};

const mockRegions = [
  { id: '1', name: 'California', article_count: 3200, university_count: 42 },
  { id: '2', name: 'Massachusetts', article_count: 2800, university_count: 35 },
  { id: '3', name: 'New York', article_count: 2100, university_count: 28 },
];

export const Default = {
  args: {
    regions: mockRegions,
    selectedCountry: { name: 'United States' },
    loading: false,
    error: null,
  },
};

export const NoCountrySelected = {
  args: {
    regions: [],
    selectedCountry: null,
    loading: false,
    error: null,
  },
};

export const Loading = {
  args: {
    regions: [],
    selectedCountry: { name: 'United States' },
    loading: true,
    error: null,
  },
};

export const Error = {
  args: {
    regions: [],
    selectedCountry: { name: 'United States' },
    loading: false,
    error: 'Failed to retrieve regional breakdown statistics.',
  },
};
