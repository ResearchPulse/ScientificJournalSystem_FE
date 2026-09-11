import GeographyChart from './GeographyChart';

export default {
  title: 'Features/Zone/GeographyChart',
  component: GeographyChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockCountryData = [
  { name: 'United States', article_count: 14200 },
  { name: 'China', article_count: 13850 },
  { name: 'United Kingdom', article_count: 6420 },
  { name: 'Germany', article_count: 5890 },
  { name: 'Japan', article_count: 4210 },
  { name: 'Vietnam', article_count: 1250 },
];

export const Default = {
  args: {
    data: mockCountryData,
    regions: [],
    selectedCountry: null,
    loading: false,
  },
};

export const SelectedCountry = {
  args: {
    data: mockCountryData,
    regions: [
      { name: 'Hanoi', article_count: 720 },
      { name: 'Ho Chi Minh City', article_count: 480 },
      { name: 'Da Nang', article_count: 50 },
    ],
    selectedCountry: { name: 'Vietnam' },
    loading: false,
  },
};

export const Loading = {
  args: {
    data: [],
    regions: [],
    selectedCountry: null,
    loading: true,
  },
};
