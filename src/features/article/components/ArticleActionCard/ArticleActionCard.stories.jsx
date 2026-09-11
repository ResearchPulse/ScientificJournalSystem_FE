import ArticleActionCard from './ArticleActionCard';

export default {
  title: 'Features/Article/ArticleActionCard',
  component: ArticleActionCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onBookmarkToggle: { action: 'onBookmarkToggle' },
  },
};

const sampleArticle = {
  id: 'art-101',
  doi: '10.1038/s41586-024-07123-4',
  pdf_url: 'https://arxiv.org/pdf/2401.00001.pdf',
  landing_page_url: 'https://nature.com/articles/s41586-024-07123-4',
};

export const Default = {
  args: {
    article: sampleArticle,
    isBookmarked: false,
    isBookmarkLoading: false,
  },
};

export const Bookmarked = {
  args: {
    article: sampleArticle,
    isBookmarked: true,
    isBookmarkLoading: false,
  },
};

export const Loading = {
  args: {
    article: sampleArticle,
    isBookmarked: false,
    isBookmarkLoading: true,
  },
};
