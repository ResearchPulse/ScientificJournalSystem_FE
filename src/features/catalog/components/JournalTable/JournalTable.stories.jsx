import JournalTable from './JournalTable';

export default {
  title: 'Features/Catalog/JournalTable',
  component: JournalTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onFollow: { action: 'onFollow' },
  },
};

const mockJournals = [
  {
    id: 'j1',
    display_name: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
    issn: '0162-8828',
    publisher: 'IEEE Computer Society',
    country: 'United States',
    quartile: 'Q1',
    metric_value: '23.6',
    metric_year: '2024',
    is_open_access: false,
  },
  {
    id: 'j2',
    display_name: 'Nature Reviews Immunology',
    issn: '1474-1733',
    publisher: 'Nature Publishing Group',
    country: 'United Kingdom',
    quartile: 'Q1',
    metric_value: '18.9',
    metric_year: '2024',
    is_open_access: true,
  },
  {
    id: 'j3',
    display_name: 'Knowledge-Based Systems',
    issn: '0950-7051',
    publisher: 'Elsevier',
    country: 'Netherlands',
    quartile: 'Q1',
    metric_value: '8.8',
    metric_year: '2023',
    is_open_access: false,
  },
];

export const Default = {
  args: {
    journals: mockJournals,
    followedJournals: { j1: true },
  },
};

export const Empty = {
  args: {
    journals: [],
    followedJournals: {},
  },
};
