import JournalResultCard from './JournalResultCard';

export default {
  title: 'Features/Catalog/JournalResultCard',
  component: JournalResultCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onFollow: { action: 'onFollow' },
    onTagClick: { action: 'onTagClick' },
  },
};

const sampleJournal = {
  id: 'j101',
  display_name: 'Nature Machine Intelligence',
  publisher: 'Nature Publishing Group',
  country: 'United Kingdom',
  issn: '2522-5839',
  is_open_access: true,
  quartile: 'Q1',
  subject_category_name: 'Artificial Intelligence',
  subject_area_name: 'Computer Science',
  metric_name: 'SJR',
  metric_value: '4.85',
  metric_year: '2024',
};

export const Default = {
  args: {
    journal: sampleJournal,
    isFollowed: false,
  },
};

export const Followed = {
  args: {
    journal: sampleJournal,
    isFollowed: true,
  },
};

export const ClosedAccessQ2 = {
  args: {
    journal: {
      ...sampleJournal,
      id: 'j102',
      display_name: 'Journal of Systems and Software',
      publisher: 'Elsevier',
      issn: '0164-1212',
      is_open_access: false,
      quartile: 'Q2',
      metric_value: '1.24',
    },
    isFollowed: false,
  },
};
