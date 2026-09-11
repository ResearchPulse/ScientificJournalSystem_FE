import JournalFilterBar from './JournalFilterBar';

export default {
  title: 'Features/Journal/JournalFilterBar',
  component: JournalFilterBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    onFilterChange: { action: 'onFilterChange' },
    onReset: { action: 'onReset' },
  },
};

export const Default = {
  args: {
    filters: { search: '', quartile: 'all' },
  },
};
