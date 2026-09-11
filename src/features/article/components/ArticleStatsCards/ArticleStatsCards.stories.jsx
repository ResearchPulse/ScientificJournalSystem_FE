import ArticleStatsCards from './ArticleStatsCards';

const meta = {
  title: 'Features/Article/ArticleStatsCards',
  component: ArticleStatsCards,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    stats: {
      totalArticles: 1420,
      openAccessCount: 680,
      authorsCount: 3890,
      topicsCount: 14,
    },
    isLoading: false,
  },
};

export const Loading = {
  args: {
    stats: null,
    isLoading: true,
  },
};
