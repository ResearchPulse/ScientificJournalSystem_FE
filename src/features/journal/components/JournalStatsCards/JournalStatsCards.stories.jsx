import JournalStatsCards from './JournalStatsCards';

const meta = {
  title: 'Features/Journal/JournalStatsCards',
  component: JournalStatsCards,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    stats: {
      totalJournals: 1850,
      q1Journals: 420,
      totalCountries: 86,
      openAccessJournals: 950,
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
