import AddKeywordModal from './AddKeywordModal';

export default {
  title: 'Features/Keyword/AddKeywordModal',
  component: AddKeywordModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'onClose' },
    onAdd: { action: 'onAdd' },
  },
};

export const Open = {
  args: {
    show: true,
  },
};
