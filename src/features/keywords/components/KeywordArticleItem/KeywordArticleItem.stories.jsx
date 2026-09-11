import KeywordArticleItem from './KeywordArticleItem';

const meta = {
  title: 'Features/Keywords/KeywordArticleItem',
  component: KeywordArticleItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '640px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    article: {
      article_id: 'art-88',
      title: 'Deep Q-Networks for Continuous Control in Robotics Manipulation',
      abstract: 'We introduce a novel architecture enabling continuous state-action exploration with prioritized replay buffers.',
      publication_year: 2024,
      journal_name: 'IEEE Transactions on Robotics',
      citations_count: 85,
      doi: '10.1109/TRO.2024.1029384',
    },
  },
};
