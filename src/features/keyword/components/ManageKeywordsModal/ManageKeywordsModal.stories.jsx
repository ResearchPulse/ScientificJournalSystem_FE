import ManageKeywordsModal from './ManageKeywordsModal';

export default {
  title: 'Features/Keyword/ManageKeywordsModal',
  component: ManageKeywordsModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'onClose' },
    onDelete: { action: 'onDelete' },
  },
};

export const Open = {
  args: {
    show: true,
    keywords: [
      { id: '1', name: 'Reinforcement Learning', count: 85 },
      { id: '2', name: 'Robotics', count: 42 },
    ],
  },
};
