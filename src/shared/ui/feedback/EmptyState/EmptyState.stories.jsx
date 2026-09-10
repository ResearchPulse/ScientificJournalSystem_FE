import { expect } from 'storybook/test';
import EmptyState from './EmptyState';

const meta = {
  component: EmptyState,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    title: 'No Publications Found',
    description: 'Try adjusting your search filters or keywords.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No Publications Found')).toBeInTheDocument();
  },
};

export const WithAction = {
  args: {
    title: 'No Bookmarks Yet',
    description: 'Save articles to read them later.',
    actionLabel: 'Explore Trends',
    onAction: () => {},
  },
};

export const CustomIcon = {
  args: {
    title: 'Empty Workspace',
    description: 'No active analysis jobs in progress.',
    icon: 'lucide:inbox',
  },
};
