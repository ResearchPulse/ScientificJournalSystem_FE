import AuthorMetricsCards from './AuthorMetricsCards';

export default {
  title: 'Features/Author/AuthorMetricsCards',
  component: AuthorMetricsCards,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    metrics: {
      works_count: 520,
      cited_by_count: 145000,
      h_index: 128,
      i10_index: 410,
    },
    loading: false,
  },
};

export const Loading = {
  args: {
    metrics: null,
    loading: true,
  },
};
