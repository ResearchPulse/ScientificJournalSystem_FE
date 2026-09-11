import GeographyTerritoryChart from './GeographyTerritoryChart';

export default {
  title: 'Features/Zone/GeographyTerritoryChart',
  component: GeographyTerritoryChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectCountry: { action: 'onSelectCountry' },
  },
};

const mockTerritories = [
  { name: 'United States', code: 'US', article_count: 15420 },
  { name: 'China', code: 'CN', article_count: 14890 },
  { name: 'United Kingdom', code: 'GB', article_count: 6720 },
  { name: 'Germany', code: 'DE', article_count: 5120 },
  { name: 'Japan', code: 'JP', article_count: 4210 },
  { name: 'Vietnam', code: 'VN', article_count: 1350 },
];

export const Default = {
  args: {
    data: mockTerritories,
    loading: false,
    selectedCountry: null,
    selectedYear: '2024',
  },
};

export const SelectedCountry = {
  args: {
    data: mockTerritories,
    loading: false,
    selectedCountry: mockTerritories[5],
    selectedYear: '2024',
  },
};

export const Loading = {
  args: {
    data: [],
    loading: true,
    selectedCountry: null,
    selectedYear: '2024',
  },
};
