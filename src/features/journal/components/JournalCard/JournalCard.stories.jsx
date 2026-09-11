import { Row } from 'react-bootstrap';
import JournalCard from './JournalCard';

const meta = {
  title: 'Features/Journal/JournalCard',
  component: JournalCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Row style={{ maxWidth: '420px', padding: '1rem' }}>
        <Story />
      </Row>
    ),
  ],
};

export default meta;

export const Active = {
  args: {
    journal: {
      id: 'j-1',
      title: 'IEEE Transactions on Neural Networks',
      publisher: 'IEEE',
      subjectCategory: 'Engineering',
      status: 'Active',
      issn: '2162-237X',
    },
  },
};

export const Pending = {
  args: {
    journal: {
      id: 'j-2',
      title: 'Communications of the ACM',
      publisher: 'Association for Computing Machinery',
      subjectCategory: 'Computer Science',
      status: 'Pending',
      issn: '0001-0782',
    },
  },
};
