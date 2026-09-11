import KeywordChip from './KeywordChip';

export default {
  title: 'Features/Keyword/KeywordChip',
  component: KeywordChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
    onRemove: { action: 'onRemove' },
  },
};

export const Default = {
  args: {
    keyword: { name: 'Deep Learning', count: 120 },
    removable: false,
  },
};

export const Removable = {
  args: {
    keyword: { name: 'Graph Neural Networks', count: 45 },
    removable: true,
  },
};
