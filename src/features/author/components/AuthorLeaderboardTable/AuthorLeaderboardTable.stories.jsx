import AuthorLeaderboardTable from './AuthorLeaderboardTable';

export default {
  title: 'Features/Author/AuthorLeaderboardTable',
  component: AuthorLeaderboardTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: { onRetry: { action: 'onRetry' } },
};

export const Default = {
  args: {
    authors: [{
  "id": "auth-1",
  "author_id": "auth-1",
  "display_name": "Dr. Yoshua Bengio",
  "name": "Dr. Yoshua Bengio",
  "works_count": 520,
  "cited_by_count": 145000,
  "h_index": 128,
  "i10_index": 410,
  "last_known_institution": {
    "display_name": "Mila - Quebec AI Institute"
  },
  "institution": "Mila - Quebec AI Institute",
  "country": "Canada"
}],
    loading: false,
    error: null,
  },
};
