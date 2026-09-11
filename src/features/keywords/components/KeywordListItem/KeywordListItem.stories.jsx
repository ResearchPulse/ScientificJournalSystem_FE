import KeywordListItem from './KeywordListItem';

const meta = {
  title: 'Features/Keywords/KeywordListItem',
  component: KeywordListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '380px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    keyword: {
      keyword_id: 'kw-1',
      display_name: 'Reinforcement Learning',
      article_count: 842,
      topic_name: 'Artificial Intelligence',
    },
  },
};

export const WithoutTopic = {
  args: {
    keyword: {
      keyword_id: 'kw-2',
      display_name: 'CRISPR-Cas9 Gene Editing',
      article_count: 512,
    },
  },
};
