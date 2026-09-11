import DashboardStatCards from './DashboardStatCards';

const meta = {
  title: 'Features/Dashboard/DashboardStatCards',
  component: DashboardStatCards,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    stats: {
      projectCount: 6,
      keywordCount: 24,
      articleCount: 1420,
      journalCount: 18,
    },
    loading: false,
  },
};

export const Loading = {
  args: {
    stats: null,
    loading: true,
  },
};
