import AuthorArticlesSection from './AuthorArticlesSection';

export default {
  title: 'Features/Author/AuthorArticlesSection',
  component: AuthorArticlesSection,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'onPageChange' },
    onSortChange: { action: 'onSortChange' },
  },
};

export const Default = {
  args: {
    articles: [{
  "id": "art-1",
  "title": "Learning Deep Architectures for AI",
  "journal_name": "Foundations and Trends in Machine Learning",
  "publication_year": 2024,
  "cited_by_count": 8520,
  "primary_topic": "Deep Learning",
  "doi": "10.1561/2200000006"
}],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 1 },
  },
};
