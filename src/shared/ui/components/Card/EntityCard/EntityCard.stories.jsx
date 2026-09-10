import { expect } from 'storybook/test';
import EntityCard from './EntityCard';

const meta = {
  component: EntityCard,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    title: 'Nature Machine Intelligence',
    subtitle: 'Impact Factor: 25.898',
    description: 'High-impact interdisciplinary journal focusing on machine learning and artificial intelligence.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Nature Machine Intelligence')).toBeInTheDocument();
  },
};

export const WithMetaAndActions = {
  args: {
    title: 'Dr. Alan Turing',
    subtitle: 'University of Cambridge',
    description: 'Pioneer of theoretical computer science and artificial intelligence.',
    meta: <span className="badge bg-secondary">Citations: 98,200</span>,
    actions: <span className="badge bg-primary">Verified</span>,
  },
};

export const Interactive = {
  args: {
    title: 'Clickable Journal Item',
    subtitle: 'Tap to view trends and citation forecast',
    onClick: () => {},
  },
};
