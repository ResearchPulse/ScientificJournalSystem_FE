import ArticleDetailEmpty from './ArticleDetailEmpty';

export default {
  title: 'Features/Article/ArticleDetailEmpty',
  component: ArticleDetailEmpty,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    articleId: 'art-9999-not-found',
  },
};
