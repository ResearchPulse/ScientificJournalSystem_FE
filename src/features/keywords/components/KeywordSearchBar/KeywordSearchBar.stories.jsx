import KeywordSearchBar from './KeywordSearchBar';

export default {
  title: 'Features/Keywords/KeywordSearchBar',
  component: KeywordSearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'onSearch' },
  },
};

export const Default = {
  args: {
    searchTerm: '',
    placeholder: 'Tìm kiếm từ khóa nghiên cứu...',
  },
};

export const WithValue = {
  args: {
    searchTerm: 'Neural Networks',
    placeholder: 'Tìm kiếm từ khóa nghiên cứu...',
  },
};
