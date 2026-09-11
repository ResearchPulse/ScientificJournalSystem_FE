import AuthorProfileHeader from './AuthorProfileHeader';

export default {
  title: 'Features/Author/AuthorProfileHeader',
  component: AuthorProfileHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    author: {
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
},
    loading: false,
  },
};
