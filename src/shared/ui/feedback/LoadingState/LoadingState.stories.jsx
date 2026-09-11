import { expect } from 'storybook/test';
import LoadingState from './LoadingState';

const meta = {
  component: LoadingState,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    message: 'Đang tải dữ liệu tạp chí...',
    size: 'lg',
    fullPage: false,
  },
};

export const FullPage = {
  args: {
    message: 'Đang phân tích xu hướng xuất bản...',
    size: 'lg',
    fullPage: true,
  },
};

export const CssCheck = {
  args: {
    message: 'Checking spinner display',
  },
  play: async ({ canvas }) => {
    const loading = canvas.getByRole('status');
    await expect(loading).toBeInTheDocument();
  },
};
