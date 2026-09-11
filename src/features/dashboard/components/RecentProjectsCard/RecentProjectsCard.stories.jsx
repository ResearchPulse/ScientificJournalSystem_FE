import RecentProjectsCard from './RecentProjectsCard';

const meta = {
  title: 'Features/Dashboard/RecentProjectsCard',
  component: RecentProjectsCard,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    projects: [
      {
        project_id: 'proj-1',
        project_name: 'Deep Learning for Medical Imaging',
        journal_count: 8,
        article_count: 142,
        status: 'active',
      },
      {
        project_id: 'proj-2',
        project_name: 'Quantum Computing Frontiers',
        journal_count: 5,
        article_count: 67,
        status: 'new',
      },
      {
        project_id: 'proj-3',
        project_name: 'Renewable Energy Systems',
        journal_count: 3,
        article_count: 29,
        status: 'paused',
      },
    ],
    loading: false,
  },
};

export const Loading = {
  args: {
    projects: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    projects: [],
    loading: false,
  },
};
