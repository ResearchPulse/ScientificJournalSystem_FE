import AuthorAreasBreakdown from './AuthorAreasBreakdown';

export default {
  title: 'Features/Author/AuthorAreasBreakdown',
  component: AuthorAreasBreakdown,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    areas: [
      { name: 'Computer Science', count: 320, percentage: 65 },
      { name: 'Mathematics', count: 110, percentage: 22 },
      { name: 'Neuroscience', count: 65, percentage: 13 },
    ],
    loading: false,
  },
};
