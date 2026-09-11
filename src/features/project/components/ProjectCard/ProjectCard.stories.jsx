import ProjectCard from './ProjectCard';

const meta = {
  title: 'Features/Project/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
};

export default meta;

export const Active = {
  args: {
    project: {
      project_id: 'p-1',
      title: 'Graph Neural Networks for Drug Discovery',
      description: 'Systematic tracking of multi-relational graph architectures in molecular biology.',
      subject_area: { name: 'Biotechnology & Bioinformatics' },
      created_at: '2025-02-15T08:00:00Z',
      keywords_count: 14,
      status: 'ACTIVE',
      owner: {
        first_name: 'Duy',
        last_name: 'Le',
        email: 'duy.le@example.edu',
      },
      members: [
        { first_name: 'Hao', last_name: 'Nguyen', email: 'hao.nguyen@example.edu' },
        { first_name: 'Minh', last_name: 'Tran', email: 'minh.tran@example.edu' },
      ],
    },
    isRecent: false,
  },
};

export const Deleted = {
  args: {
    project: {
      project_id: 'p-2',
      title: 'Archived Quantum Annealing Benchmark',
      description: 'Historical dataset and citation metrics of D-Wave system benchmarks.',
      subject_area: { name: 'Physics & Astronomy' },
      created_at: '2024-08-10T12:00:00Z',
      keywords_count: 5,
      status: 'DELETED',
    },
    isRecent: false,
  },
};
