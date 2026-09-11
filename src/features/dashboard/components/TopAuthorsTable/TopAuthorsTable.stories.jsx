import TopAuthorsTable from './TopAuthorsTable';

const meta = {
  title: 'Features/Dashboard/TopAuthorsTable',
  component: TopAuthorsTable,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    authors: [
      {
        author_id: 'a-1',
        full_name: 'Prof. Yoshua Bengio',
        primary_field: 'Computer Science',
        article_count: 540,
        h_index: 180,
      },
      {
        author_id: 'a-2',
        full_name: 'Dr. Geoffrey Hinton',
        primary_field: 'Cognitive Science',
        article_count: 490,
        h_index: 172,
      },
      {
        author_id: 'a-3',
        full_name: 'Prof. Yann LeCun',
        primary_field: 'Artificial Intelligence',
        article_count: 420,
        h_index: 155,
      },
      {
        author_id: 'a-4',
        full_name: 'Dr. Andrew Ng',
        primary_field: 'Machine Learning',
        article_count: 310,
        h_index: 130,
      },
    ],
    loading: false,
    error: null,
  },
};

export const Loading = {
  args: {
    authors: [],
    loading: true,
    error: null,
  },
};

export const Empty = {
  args: {
    authors: [],
    loading: false,
    error: null,
  },
};
