import { expect } from 'storybook/test';
import Avatar, { AvatarGroup } from './Avatar';

const meta = {
  component: Avatar,
  tags: ['ai-generated'],
};

export default meta;

export const Initials = {
  args: {
    name: 'Nguyen Van A',
    size: 'lg',
    status: 'online',
  },
};

export const WithIcon = {
  args: {
    icon: 'lucide:user',
    size: 'lg',
    bgColor: 'var(--primary-100)',
    color: 'var(--primary)',
  },
};

export const Square = {
  args: {
    name: 'Harvard University',
    shape: 'square',
    size: 'xl',
    bgColor: '#a51c30',
  },
};


export const Group = {
  render: () => (
    <AvatarGroup max={3} size="md">
      <Avatar name="John Doe" bgColor="var(--primary)" />
      <Avatar name="Alice Smith" bgColor="#10b981" />
      <Avatar name="Bob Johnson" bgColor="#0ea5e9" />
      <Avatar name="Charlie Brown" bgColor="#8b5cf6" />
      <Avatar name="David Miller" bgColor="#f59e0b" />
    </AvatarGroup>
  ),
};

export const CssCheck = {
  args: {
    name: 'Test Scientist',
    size: 'md',
  },
  play: async ({ canvas }) => {
    const avatar = canvas.getByTitle('Test Scientist');
    await expect(avatar).toBeInTheDocument();
  },
};

