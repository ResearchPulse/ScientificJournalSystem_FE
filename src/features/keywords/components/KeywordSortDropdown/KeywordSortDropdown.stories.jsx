import KeywordSortDropdown from './KeywordSortDropdown';

export default {
  title: 'Features/Keywords/KeywordSortDropdown',
  component: KeywordSortDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSortChange: { action: 'onSortChange' },
  },
};

export const Default = {
  args: {
    currentSort: 'article_count',
  },
};

export const SortAlphabetical = {
  args: {
    currentSort: 'name',
  },
};
