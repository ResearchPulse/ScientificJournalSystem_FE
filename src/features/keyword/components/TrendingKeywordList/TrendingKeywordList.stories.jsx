import TrendingKeywordList from './TrendingKeywordList';

export default {
  title: 'Features/Keyword/TrendingKeywordList',
  component: TrendingKeywordList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    trendingKeywords: [
      { name: 'Large Language Models', count: 1450 },
      { name: 'Diffusion Models', count: 980 },
      { name: 'Quantum Machine Learning', count: 430 },
    ],
  },
};
