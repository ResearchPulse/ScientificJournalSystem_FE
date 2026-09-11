import ArticleDetailError from './ArticleDetailError';

export default {
  title: 'Features/Article/ArticleDetailError',
  component: ArticleDetailError,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onRetry: { action: 'onRetry' },
  },
};

export const Default = {
  args: {
    errorMsg: 'Network timeout: Unable to retrieve article metadata from the indexing server.',
  },
};
