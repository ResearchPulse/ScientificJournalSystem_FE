import { expect } from 'storybook/test';
import LoadingSkeleton from './LoadingSkeleton';

const meta = {
  component: LoadingSkeleton,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    width: '200px',
    height: '24px',
    borderRadius: '6px',
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('.skeleton-shimmer');
    await expect(skeleton).not.toBeNull();
  },
};

export const AvatarPlaceholder = {
  args: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  },
};

export const ParagraphBlock = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
      <LoadingSkeleton width="100%" height="16px" />
      <LoadingSkeleton width="90%" height="16px" />
      <LoadingSkeleton width="60%" height="16px" />
    </div>
  ),
};
