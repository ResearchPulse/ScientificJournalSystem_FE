import RankingTabContent from './RankingTabContent';

export default {
  title: 'Features/Journal/RankingTabContent',
  component: RankingTabContent,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    rankings: [
      { year: 2024, quartile: 'Q1', sjr: 4.85, h_index: 85 },
      { year: 2023, quartile: 'Q1', sjr: 4.52, h_index: 72 },
    ],
    loading: false,
  },
};
