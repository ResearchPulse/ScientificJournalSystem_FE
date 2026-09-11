import WalletLayout from './WalletLayout';

export default {
  title: 'Features/Wallet/WalletLayout',
  component: WalletLayout,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export const Default = {
  render: () => (
    <WalletLayout>
      <div className="p-4 bg-light rounded-3 text-center text-muted">
        Nội dung trang quản lý ví & nạp coin
      </div>
    </WalletLayout>
  ),
};
