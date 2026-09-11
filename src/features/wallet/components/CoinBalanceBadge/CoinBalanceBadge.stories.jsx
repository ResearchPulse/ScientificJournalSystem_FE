import CoinBalanceBadge from './CoinBalanceBadge';

export default {
  title: 'Features/Wallet/CoinBalanceBadge',
  component: CoinBalanceBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    balance: 250000,
    loading: false,
  },
};

export const Loading = {
  args: {
    balance: 0,
    loading: true,
  },
};
