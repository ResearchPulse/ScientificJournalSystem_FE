import ArticleFilterBar from './ArticleFilterBar';

export default {
  title: 'Features/Article/ArticleFilterBar',
  component: ArticleFilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    updateFilters: { action: 'updateFilters' },
    clearFilters: { action: 'clearFilters' },
  },
};

export const Default = {
  args: {
    filters: {
      search: '',
      year: '',
      access: '',
      journal_id: '',
      topic_id: '',
      sort: 'created_at-desc',
    },
  },
};

export const WithActiveFilters = {
  args: {
    filters: {
      search: 'Quantum Machine Learning',
      year: '2024',
      access: 'oa',
      journal_id: '',
      topic_id: '',
      sort: 'created_at-desc',
    },
  },
};
