import JournalTableAdmin from './JournalTableAdmin';

export default {
  title: 'Features/Journal/JournalTableAdmin',
  component: JournalTableAdmin,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onEdit: { action: 'onEdit' }, onDelete: { action: 'onDelete' } },
};

export const Default = {
  args: {
    journals: [{
  "id": "j1",
  "journal_id": "j1",
  "title": "Nature Machine Intelligence",
  "display_name": "Nature Machine Intelligence",
  "publisher": "Nature Publishing Group",
  "issn": "2522-5839",
  "country": "United Kingdom",
  "quartile": "Q1",
  "subject_category_name": "Artificial Intelligence",
  "metric_value": "4.85",
  "metric_year": "2024"
}],
  },
};
