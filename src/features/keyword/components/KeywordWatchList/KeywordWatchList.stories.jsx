import KeywordWatchList from './KeywordWatchList';

export default {
  title: 'Features/Keyword/KeywordWatchList',
  component: KeywordWatchList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    keywords: [
      { id: '1', name: 'Artificial Intelligence', count: 320 },
      { id: '2', name: 'Computer Vision', count: 140 },
    ],
  },
};
