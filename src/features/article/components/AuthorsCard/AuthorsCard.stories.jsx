import AuthorsCard from './AuthorsCard';

export default {
  title: 'Features/Article/AuthorsCard',
  component: AuthorsCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const sampleAuthors = [
  {
    author_id: 'a101',
    display_name: 'Geoffrey E. Hinton',
    affiliation: 'University of Toronto, Vector Institute',
  },
  {
    author_id: 'a102',
    display_name: 'Yann LeCun',
    affiliation: 'New York University, Meta AI',
  },
  {
    author_id: 'a103',
    display_name: 'Yoshua Bengio',
    affiliation: 'MILA, Université de Montréal',
  },
];

export const Default = {
  args: {
    authors: sampleAuthors,
  },
};

export const Empty = {
  args: {
    authors: [],
  },
};
