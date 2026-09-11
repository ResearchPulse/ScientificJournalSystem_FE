import KeywordTopicCard from './KeywordTopicCard';

export default {
  title: 'Features/Article/KeywordTopicCard',
  component: KeywordTopicCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const sampleKeywords = [
  'Deep Learning',
  'Neural Architecture Search',
  'Attention Mechanism',
  'Biomedical AI',
  'Graph Neural Networks',
];

const sampleTopics = [
  { topic_id: 't1', display_name: 'Machine Learning', score: 0.96 },
  { topic_id: 't2', display_name: 'Computer Science', score: 0.92 },
  { topic_id: 't3', display_name: 'Bioinformatics', score: 0.78 },
];

export const Default = {
  args: {
    primaryTopic: 'Machine Learning',
    keywords: sampleKeywords,
    topics: sampleTopics,
  },
};

export const WithoutTopics = {
  args: {
    primaryTopic: '',
    keywords: sampleKeywords,
    topics: [],
  },
};
