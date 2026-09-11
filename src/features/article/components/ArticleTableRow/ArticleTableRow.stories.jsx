import ArticleTableRow from './ArticleTableRow';

export default {
  title: 'Features/Article/ArticleTableRow',
  component: ArticleTableRow,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="table-responsive">
        <table className="table article-table align-middle">
          <tbody>
            <Story />
          </tbody>
        </table>
      </div>
    ),
  ],
  argTypes: {
    onDetailClick: { action: 'onDetailClick' },
  },
};

const sampleArticle = {
  id: 'art-201',
  title: 'Attention Is All You Need in Biomedical Domain: A Comparative Study',
  journal_name: 'IEEE Transactions on Medical Imaging',
  publication_year: 2024,
  primary_topic: 'Machine Learning',
  citations_count: 512,
  authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
};

export const Default = {
  args: {
    article: sampleArticle,
    index: 0,
  },
};
