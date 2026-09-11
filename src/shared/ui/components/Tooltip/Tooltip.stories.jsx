import { expect } from 'storybook/test';
import Tooltip from './Tooltip';
import Button from '../Button';

const meta = {
  component: Tooltip,
  tags: ['ai-generated'],
};

export default meta;

export const Top = {
  args: {
    content: 'Verified Peer-Reviewed Journal',
    placement: 'top',
    children: <Button size="sm" variant="outline">Hover me</Button>,
  },
};

export const Right = {
  args: {
    content: 'H-Index score calculated over 5 years',
    placement: 'right',
    children: <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>What is H-Index?</span>,
  },
};

export const CssCheck = {
  args: {
    content: 'Tooltip bubble text',
    placement: 'top',
    children: <span>Target item</span>,
  },
  play: async ({ canvas }) => {
    const tooltip = canvas.getByRole('tooltip');
    await expect(tooltip).toBeInTheDocument();
  },
};
