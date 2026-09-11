import Chip from './Chip';

export default {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['minimal', 'pill', 'outline', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const MinimalWallet = {
  args: {
    icon: 'solar:wallet-bold',
    label: '5',
    variant: 'minimal',
    size: 'md',
    onClick: () => alert('Clicked wallet chip!'),
  },
};

export const PillVariant = {
  args: {
    icon: 'solar:wallet-bold',
    label: '1,250',
    variant: 'pill',
    size: 'md',
    onClick: () => alert('Clicked pill!'),
  },
};

export const OutlineVariant = {
  args: {
    icon: 'lucide:star',
    label: '4.8',
    variant: 'outline',
    size: 'md',
  },
};

export const SubtleVariant = {
  args: {
    icon: 'lucide:file-text',
    label: '124 bài báo',
    variant: 'subtle',
    size: 'sm',
  },
};
