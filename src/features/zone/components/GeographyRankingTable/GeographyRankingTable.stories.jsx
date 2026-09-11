import GeographyRankingTable from './GeographyRankingTable';

export default {
  title: 'Features/Zone/GeographyRankingTable',
  component: GeographyRankingTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectCountry: { action: 'selectedCountry' },
  },
};

const mockCountries = [
  { id: '1', name: 'United States', article_count: 14200, country_code: 'US' },
  { id: '2', name: 'China', article_count: 13850, country_code: 'CN' },
  { id: '3', name: 'United Kingdom', article_count: 6420, country_code: 'GB' },
  { id: '4', name: 'Germany', article_count: 5890, country_code: 'DE' },
  { id: '5', name: 'Japan', article_count: 4210, country_code: 'JP' },
  { id: '6', name: 'Vietnam', article_count: 1250, country_code: 'VN' },
];

export const Default = {
  args: {
    data: mockCountries,
    loading: false,
    selectedCountry: null,
  },
};

export const SelectedCountry = {
  args: {
    data: mockCountries,
    loading: false,
    selectedCountry: mockCountries[1], // China
  },
};

export const Loading = {
  args: {
    data: [],
    loading: true,
    selectedCountry: null,
  },
};

export const Empty = {
  args: {
    data: [],
    loading: false,
    selectedCountry: null,
  },
};
