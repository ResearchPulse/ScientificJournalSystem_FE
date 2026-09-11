import RoleBadge from './RoleBadge';

const meta = {
  title: 'Features/Admin/RoleBadge',
  component: RoleBadge,
  tags: ['autodocs'],
};

export default meta;

export const Researcher = {
  args: {
    role: 'RESEARCHER',
  },
};

export const Lecturer = {
  args: {
    role: 'LECTURER',
  },
};

export const Student = {
  args: {
    role: 'STUDENT',
  },
};

export const Administrator = {
  args: {
    role: 'ADMINISTRATOR',
  },
};
