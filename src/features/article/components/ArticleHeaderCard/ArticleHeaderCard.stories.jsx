import ArticleHeaderCard from './ArticleHeaderCard';

const meta = {
  title: 'Features/Article/ArticleHeaderCard',
  component: ArticleHeaderCard,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    article: {
      article_id: 'art-101',
      title: 'Attention Is All You Need: Architecture, Efficiency, and Emergence in Foundation Models',
      is_open_access: true,
      publication_year: 2024,
      doi: '10.1145/3318464.3389700',
      journal_name: 'Journal of Artificial Intelligence Research',
      journal_id: 'j-42',
      authors: [
        { name: 'Dr. Ashish Vaswani', display_name: 'Dr. Ashish Vaswani' },
        { name: 'Noam Shazeer', display_name: 'Noam Shazeer' },
        { name: 'Niki Parmar', display_name: 'Niki Parmar' },
      ],
    },
  },
};

export const ClosedAccess = {
  args: {
    article: {
      article_id: 'art-102',
      title: 'Thermodynamics of Quantum Computing Systems in Cryogenic Environments',
      is_open_access: false,
      publication_year: 2023,
      doi: '10.1038/s41586-023-00000-0',
      journal_name: 'Nature Physics',
      journal_id: 'j-18',
      authors: [
        { name: 'Prof. John Martinis', display_name: 'Prof. John Martinis' },
      ],
    },
  },
};
