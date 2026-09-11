import AuthorRankBadge from './AuthorRankBadge';

export default {
  title: 'Features/Author/AuthorRankBadge',
  component: AuthorRankBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const FirstPlace = { args: { rank: 1 } };
export const SecondPlace = { args: { rank: 2 } };
export const ThirdPlace = { args: { rank: 3 } };
export const StandardRank = { args: { rank: 12 } };
