import KeywordArticleList from './KeywordArticleList';

export default {
  title: 'Features/Keywords/KeywordArticleList',
  component: KeywordArticleList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'onPageChange' },
    onViewDetail: { action: 'onViewDetail' },
    onRetry: { action: 'onRetry' },
  },
};

const mockArticles = [
  {
    id: 'a1',
    title: 'Attention Mechanism in Deep Learning: An In-Depth Survey',
    journal_name: 'IEEE Transactions on Neural Networks',
    publication_year: 2024,
  },
  {
    id: 'a2',
    title: 'A Benchmark for Large Language Model Alignment in Science',
    journal_name: 'Nature Scientific Reports',
    publication_year: 2023,
  },
];

export const Default = {
  args: {
    articles: mockArticles,
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 2 },
  },
};

export const Loading = {
  args: {
    articles: [],
    loading: true,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
  },
};

export const Empty = {
  args: {
    articles: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
  },
};
