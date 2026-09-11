import CountryStatsTable from './CountryStatsTable';

export default {
  title: 'Features/Zone/CountryStatsTable',
  component: CountryStatsTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectCountry: { action: 'onSelectCountry' },
  },
};

const mockData = [
  { country_id: '1', name: 'United States', code: 'US', article_count: 15420, journal_count: 420 },
  { country_id: '2', name: 'China', code: 'CN', article_count: 14890, journal_count: 380 },
  { country_id: '3', name: 'United Kingdom', code: 'GB', article_count: 6720, journal_count: 190 },
  { country_id: '4', name: 'Germany', code: 'DE', article_count: 5120, journal_count: 150 },
  { country_id: '5', name: 'Vietnam', code: 'VN', article_count: 1350, journal_count: 24 },
];

export const Default = {
  args: {
    data: mockData,
    loading: false,
    selectedCountry: null,
  },
};

export const WithSelectedCountry = {
  args: {
    data: mockData,
    loading: false,
    selectedCountry: mockData[4],
  },
};

export const Loading = {
  args: {
    data: [],
    loading: true,
    selectedCountry: null,
  },
};
