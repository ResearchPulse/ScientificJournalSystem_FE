import { expect } from 'storybook/test';
import Alert from './Alert';

const meta = {
  component: Alert,
  tags: ['ai-generated'],
};

export default meta;

export const Info = {
  args: {
    variant: 'info',
    title: 'New Publication Data Available',
    children: 'The 2025 SJR indicator ranking dataset has just been synchronized.',
    dismissible: true,
  },
};

export const Success = {
  args: {
    variant: 'success',
    title: 'Paper Added to Project',
    children: 'The selected article has been successfully pinned to your research workspace.',
    dismissible: true,
  },
};

export const Warning = {
  args: {
    variant: 'warning',
    title: 'Session Expiring Soon',
    children: 'Your authentication token will expire in 5 minutes. Please save your work.',
  },
};

export const Danger = {
  args: {
    variant: 'danger',
    title: 'Failed to Fetch Citations',
    children: 'An unexpected server error occurred while retrieving bibliographic data.',
  },
};

export const CssCheck = {
  args: {
    variant: 'info',
    children: 'Alert visibility test',
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toBeInTheDocument();
  },
};
