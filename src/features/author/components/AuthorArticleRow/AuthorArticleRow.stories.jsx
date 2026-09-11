import AuthorArticleRow from './AuthorArticleRow';

export default {
  title: 'Features/Author/AuthorArticleRow',
  component: AuthorArticleRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    article: {
  "id": "art-1",
  "title": "Learning Deep Architectures for AI",
  "journal_name": "Foundations and Trends in Machine Learning",
  "publication_year": 2024,
  "cited_by_count": 8520,
  "primary_topic": "Deep Learning",
  "doi": "10.1561/2200000006"
},
    index: 0,
  },
};
