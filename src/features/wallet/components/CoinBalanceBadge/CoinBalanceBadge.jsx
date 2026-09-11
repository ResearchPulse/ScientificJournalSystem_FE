/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features/wallet/components/CoinBalanceBadge.jsx
 *
 * Component hiển thị số dư coin sử dụng Chip từ bộ UI chung (@ui).
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@ui';
import { useWalletStore } from '@/app/store/walletStore';
import ROUTES from '@/app/routes/routePaths';

export default function CoinBalanceBadge({ className = '', onClick }) {
  const navigate = useNavigate();
  const { balance, fetchWallet, isFetched, isLoading } = useWalletStore();

  useEffect(() => {
    // Chỉ gọi API nếu chưa fetch lần nào
    if (!isFetched) {
      fetchWallet();
    }
  }, [isFetched, fetchWallet]);

  // Format số dư: chỉ hiện thập phân khi không tròn (e.g., 1,250 hoặc 1,250.50)
  const isWholeNumber = Number.isInteger(balance);
  const formattedBalance = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: isWholeNumber ? 0 : 2
  }).format(balance);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(ROUTES.WALLET);
    }
  };

  return (
    <Chip
      icon="solar:wallet-bold"
      label={isLoading && !isFetched ? '...' : formattedBalance}
      variant="minimal"
      onClick={handleClick}
      className={className}
      aria-label="Số dư ví"
    />
  );
}
