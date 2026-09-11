import KeywordRelatedArticleList from './KeywordRelatedArticleList';

export default {
  title: 'Features/Keyword/KeywordRelatedArticleList',
  component: KeywordRelatedArticleList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    articles: [
      {
        id: '1',
        title: 'Advances in Deep Multimodal Learning',
        publication_year: 2024,
        journal_name: 'IEEE Transactions on Neural Networks',
      }
    ],
    keyword: 'Deep Learning',
  },
};
