import TrendingKeywordsCard from './TrendingKeywordsCard';

export default {
  title: 'Features/Dashboard/TrendingKeywordsCard',
  component: TrendingKeywordsCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onKeywordClick: { action: 'onKeywordClick' },
  },
};

const sampleKeywords = [
  { keyword: 'Deep Learning', count: 1840 },
  { keyword: 'Transformers', count: 1420 },
  { keyword: 'Graph Neural Networks', count: 980 },
  { keyword: 'Reinforcement Learning', count: 750 },
  { keyword: 'Computer Vision', count: 620 },
];

export const Default = {
  args: {
    keywords: sampleKeywords,
    loading: false,
    error: null,
  },
};

export const Loading = {
  args: {
    keywords: [],
    loading: true,
    error: null,
  },
};

export const Empty = {
  args: {
    keywords: [],
    loading: false,
    error: null,
  },
};
