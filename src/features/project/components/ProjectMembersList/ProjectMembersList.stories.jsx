import ProjectMembersList from './ProjectMembersList';

const meta = {
  title: 'Features/Project/ProjectMembersList',
  component: ProjectMembersList,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    project: {
      project_id: 'p-1',
      user_role: 'OWNER',
    },
    currentUser: {
      id: 'u-1',
      email: 'owner@researchpulse.org',
    },
    members: [
      {
        user_id: 'u-1',
        first_name: 'Duy',
        last_name: 'Le',
        email: 'owner@researchpulse.org',
        role: 'OWNER',
        status: 'ACTIVE',
      },
      {
        user_id: 'u-2',
        first_name: 'Minh',
        last_name: 'Nguyen',
        email: 'minh.nguyen@example.edu',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
      {
        user_id: 'u-3',
        first_name: 'Sarah',
        last_name: 'Connor',
        email: 'sarah.connor@example.edu',
        role: 'MEMBER',
        status: 'INVITED',
      },
    ],
    loading: false,
  },
};

export const Loading = {
  args: {
    project: { project_id: 'p-1', user_role: 'OWNER' },
    members: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    project: { project_id: 'p-1', user_role: 'OWNER' },
    members: [],
    loading: false,
  },
};
