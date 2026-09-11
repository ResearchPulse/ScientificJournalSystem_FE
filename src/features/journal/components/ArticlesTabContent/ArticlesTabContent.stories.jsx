import ArticlesTabContent from './ArticlesTabContent';

export default {
  title: 'Features/Journal/ArticlesTabContent',
  component: ArticlesTabContent,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    articles: [
      {
        id: '1',
        title: 'Deep Multi-Agent Coordination via Attention',
        publication_year: 2024,
        citations_count: 85,
      },
    ],
    loading: false,
  },
};
