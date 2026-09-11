import GeographyStatsCards from './GeographyStatsCards';

export default {
  title: 'Features/Zone/GeographyStatsCards',
  component: GeographyStatsCards,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockCountryStats = [
  { name: 'United States', article_count: 14200 },
  { name: 'China', article_count: 13850 },
  { name: 'United Kingdom', article_count: 6420 },
];

export const Default = {
  args: {
    countryStats: mockCountryStats,
    globalRegions: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    regions: [],
    selectedCountry: null,
    loading: false,
    pagination: { total: 195 },
  },
};

export const WithSelectedCountry = {
  args: {
    countryStats: mockCountryStats,
    globalRegions: [{ id: 1 }, { id: 2 }, { id: 3 }],
    regions: [{ id: 10, name: 'California' }, { id: 11, name: 'New York' }, { id: 12, name: 'Texas' }],
    selectedCountry: { name: 'United States' },
    loading: false,
    pagination: { total: 195 },
  },
};

export const Loading = {
  args: {
    countryStats: [],
    globalRegions: [],
    regions: [],
    selectedCountry: null,
    loading: true,
  },
};
