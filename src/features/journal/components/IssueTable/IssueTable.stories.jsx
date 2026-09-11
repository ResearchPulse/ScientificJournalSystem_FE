import IssueTable from './IssueTable';

export default {
  title: 'Features/Journal/IssueTable',
  component: IssueTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onSelectIssue: { action: 'onSelectIssue' } },
};

export const Default = {
  args: {
    issues: [
      { issue_id: '1', issue_number: 1, publication_date: '2024-03-15', articles_count: 12 },
      { issue_id: '2', issue_number: 2, publication_date: '2024-06-15', articles_count: 14 },
    ],
  },
};
