import GeographyArticleList from './GeographyArticleList';

export default {
  title: 'Features/Zone/GeographyArticleList',
  component: GeographyArticleList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'onPageChange' },
    onArticleClick: { action: 'onArticleClick' },
  },
};

const mockArticles = [
  {
    id: 'art-1',
    title: 'Advancements in Artificial Intelligence for Climate Modeling',
    journal_name: 'Nature Climate Change',
    publication_year: 2024,
    citations_count: 78,
  },
  {
    id: 'art-2',
    title: 'Renewable Energy Transition in Southeast Asia: Policy & Practice',
    journal_name: 'Energy Policy',
    publication_year: 2023,
    citations_count: 45,
  },
];

export const Default = {
  args: {
    articles: mockArticles,
    selectedCountry: { name: 'Vietnam' },
    loading: false,
    pagination: { page: 1, limit: 10, total: 24 },
  },
};

export const Loading = {
  args: {
    articles: [],
    selectedCountry: { name: 'Vietnam' },
    loading: true,
    pagination: { page: 1, limit: 10, total: 0 },
  },
};

export const Empty = {
  args: {
    articles: [],
    selectedCountry: { name: 'Iceland' },
    loading: false,
    pagination: { page: 1, limit: 10, total: 0 },
  },
};
