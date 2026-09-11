import ArticleTable from './ArticleTable';

export default {
  title: 'Features/Article/ArticleTable',
  component: ArticleTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onDetailClick: { action: 'onDetailClick' },
    onClearFilters: { action: 'onClearFilters' },
  },
};

const sampleArticles = [
  {
    id: 'art-1',
    title: 'Generative Adversarial Nets for Medical Image Synthesis',
    journal_name: 'Nature Machine Intelligence',
    publication_year: 2024,
    primary_topic: 'Computer Science',
    citations_count: 840,
    authors: ['Ian Goodfellow', 'Jean Pouget-Abadie'],
  },
  {
    id: 'art-2',
    title: 'Deep Residual Learning for Image Recognition',
    journal_name: 'IEEE TPAMI',
    publication_year: 2023,
    primary_topic: 'Machine Learning',
    citations_count: 1420,
    authors: ['Kaiming He', 'Xiangyu Zhang'],
  },
];

export const Default = {
  args: {
    articles: sampleArticles,
    isLoading: false,
  },
};

export const Loading = {
  args: {
    articles: [],
    isLoading: true,
  },
};

export const Empty = {
  args: {
    articles: [],
    isLoading: false,
  },
};
