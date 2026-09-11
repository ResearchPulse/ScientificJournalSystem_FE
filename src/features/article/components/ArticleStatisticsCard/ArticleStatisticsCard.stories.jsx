import ArticleStatisticsCard from './ArticleStatisticsCard';

export default {
  title: 'Features/Article/ArticleStatisticsCard',
  component: ArticleStatisticsCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const sampleArticle = {
  citations_count: 342,
  publication_year: 2024,
  is_open_access: true,
  volume_number: '12',
  issue_number: '4',
  pages: '102-118',
  doi: '10.1038/s41586-024-07123-4',
};

export const Default = {
  args: {
    article: sampleArticle,
  },
};

export const ClosedAccess = {
  args: {
    article: {
      ...sampleArticle,
      is_open_access: false,
      citations_count: 15,
    },
  },
};
