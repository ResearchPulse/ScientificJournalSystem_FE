import KeywordList from './KeywordList';

export default {
  title: 'Features/Keywords/KeywordList',
  component: KeywordList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'onPageChange' },
    onViewArticles: { action: 'onViewArticles' },
    onRetry: { action: 'onRetry' },
  },
};

const mockKeywords = [
  { keyword_id: '1', name: 'Machine Learning', article_count: 8520 },
  { keyword_id: '2', name: 'Deep Learning', article_count: 6410 },
  { keyword_id: '3', name: 'Natural Language Processing', article_count: 4210 },
  { keyword_id: '4', name: 'Computer Vision', article_count: 3950 },
];

export const Default = {
  args: {
    keywords: mockKeywords,
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 4 },
  },
};

export const Loading = {
  args: {
    keywords: [],
    loading: true,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
  },
};

export const Empty = {
  args: {
    keywords: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0 },
  },
};
