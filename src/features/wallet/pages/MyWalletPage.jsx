import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, StatCard } from '@ui';
import ROUTES from '../../../app/routes/routePaths';
import { useWalletStore } from '../../../app/store/walletStore';
import { getWalletTransactions } from '../api/walletApi';
import './MyWalletPage.css';
export default function MyWalletPage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const {
    balance,
    totalDeposit,
    totalSpent,
    fetchWallet,
    isFetched
  } = useWalletStore();
  const [recentTx, setRecentTx] = useState([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [errorTx, setErrorTx] = useState('');
  useEffect(() => {
    if (!isFetched) {
      fetchWallet();
    }
  }, [isFetched, fetchWallet]);
  useEffect(() => {
    let mounted = true;
    setLoadingTx(true);
    setErrorTx('');
    getWalletTransactions({
      page: 1,
      limit: 5
    }).then(res => {
      if (!mounted) return;
      const items = Array.isArray(res?.data) ? res.data : res?.data?.transactions;
      if (res?.success && Array.isArray(items)) {
        setRecentTx(items);
      } else {
        setErrorTx(t("wallet.khongTheTaiLichSuGiaoDichGanDa"));
      }
    }).catch(() => {
      if (mounted) setErrorTx(t("wallet.loiKetNoiLichSuGiaoDich"));
    }).finally(() => {
      if (mounted) setLoadingTx(false);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const formatCoin = n => {
    const value = Number(n || 0);
    return Number.isInteger(value) ? value.toLocaleString('en-US') : value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const formatDate = dateStr => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return `${date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })} ${date.toLocaleDateString('vi-VN')}`;
  };
  const getStatusBadgeClass = status => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'failed';
      case 'pending':
        return 'pending';
      default:
        return '';
    }
  };
  const getStatusLabel = status => {
    switch (status) {
      case 'success':
        return t("wallet.thanhCong");
      case 'failed':
        return t("wallet.thatBai");
      case 'pending':
        return t("wallet.dangXuLy");
      default:
        return status || '—';
    }
  };
  const getTxTypeLabel = type => {
    switch (type) {
      case 'deposit':
        return t("wallet.napCoin1");
      case 'spend':
        return t("wallet.tieuCoin");
      case 'refund':
        return t("wallet.hoanCoin");
      case 'admin_adjust':
        return t("wallet.heThongDieuChinh");
      default:
        return type || t("wallet.giaoDich");
    }
  };
  const getTxTypeIconClass = type => {
    switch (type) {
      case 'deposit':
        return 'deposit';
      case 'spend':
        return 'spend';
      case 'refund':
        return 'refund';
      default:
        return 'adjust';
    }
  };
  const getTxStatus = tx => tx?.status || tx?.transaction_status || tx?.payment_status || 'success';
  return <div className="my-wallet-page">
      <div className="my-wallet-hero reveal-on-scroll">
        <h1 className="my-wallet-title">{t("wallet.tongQuanTaiChinh")}</h1>
        <p className="my-wallet-subtitle">{t("wallet.theoDoiSoDuKiemTraLichSuBienDo")}</p>
      </div>

      <div className="my-wallet-grid">
        <div className="my-wallet-left-stack">
          {/* Balance Card */}
          <div className="my-wallet-balance-card reveal-on-scroll">
            <div>
              <div className="my-wallet-balance-label">{t("wallet.soDuKhaDung")}</div>
              <div className="my-wallet-balance-value">
                {formatCoin(balance)}
                <span className="text-muted-custom">Coins</span>
              </div>
            </div>
            <Button
              variant="primary"
              icon="lucide:circle-plus"
              onClick={() => navigate(ROUTES.WALLET_TOP_UP)}
            >
              {t("wallet.napThemCoin")}
            </Button>
          </div>

          {/* Transactions Card */}
          <div className="my-wallet-card reveal-on-scroll">
            <div className="my-wallet-card-header">
              <div className="my-wallet-card-title">
                <Icon icon="lucide:clock" width={18} />{t("wallet.lichSuGiaoDichGanDay")}</div>
              <Button
                variant="link"
                size="sm"
                className="p-0 text-decoration-none d-inline-flex align-items-center gap-1"
                onClick={() => navigate(ROUTES.WALLET_TRANSACTIONS)}
              >
                {t("wallet.xemTatCa")}<Icon icon="lucide:arrow-right" width={14} />
              </Button>
            </div>

            {loadingTx ? <div className="my-wallet-table-loading">{t("wallet.dangTaiLichSuGiaoDich")}</div> : errorTx ? <div className="my-wallet-table-empty">{errorTx}</div> : recentTx.length === 0 ? <div className="my-wallet-table-empty">{t("wallet.khongCoGiaoDichNaoGanDay")}</div> : <div className="my-wallet-table-wrap">
                <table className="my-wallet-table">
                  <thead>
                    <tr>
                      <th>{t("wallet.loaiGiaoDichMoTa")}</th>
                      <th>{t("wallet.thoiGian")}</th>
                      <th>{t("wallet.soTien")}</th>
                      <th>{t("wallet.trangThai")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTx.map(tx => {
                  const amountVal = tx.amount || 0;
                  const isMinus = amountVal < 0;
                  const status = getTxStatus(tx);
                  return <tr key={tx.wallet_transaction_id}>
                          <td>
                            <div className="my-wallet-table-desc">
                              <span className={`my-wallet-table-type-icon ${getTxTypeIconClass(tx.type)}`}>
                                <Icon icon={isMinus ? 'lucide:arrow-up-right' : 'lucide:arrow-down-left'} width={13} />
                              </span>
                              <div>
                                <div className="my-wallet-table-type-label">{getTxTypeLabel(tx.type)}</div>
                                <div className="my-wallet-table-detail">{tx.description || t("wallet.giaoDichViCoin")}</div>
                              </div>
                            </div>
                          </td>
                          <td>{formatDate(tx.created_at)}</td>
                          <td className={`my-wallet-table-amount ${isMinus ? 'spend' : 'deposit'}`}>
                            {isMinus ? '-' : '+'}
                            {formatCoin(Math.abs(amountVal))}
                          </td>
                          <td>
                            <span className={`my-wallet-table-badge ${getStatusBadgeClass(status)}`}>
                              {getStatusLabel(status)}
                            </span>
                          </td>
                        </tr>;
                })}
                  </tbody>
                </table>
              </div>}
          </div>
        </div>

        <div className="my-wallet-right-stack">
          {/* Stats cards using shared @ui StatCard */}
          <div className="my-wallet-stats-grid">
            <StatCard
              label={t("wallet.daSuDung")}
              value={
                <span>
                  {formatCoin(totalSpent)} <span className="text-muted-custom" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Coins</span>
                </span>
              }
              icon="lucide:arrow-up-right"
              accentColor="#ef4444"
              formatValue={false}
              className="reveal-on-scroll"
            />
            <StatCard
              label={t("wallet.daNap")}
              value={
                <span>
                  {formatCoin(totalDeposit)} <span className="text-muted-custom" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Coins</span>
                </span>
              }
              icon="lucide:arrow-down-left"
              accentColor="#22c55e"
              formatValue={false}
              className="reveal-on-scroll delay-100"
            />
          </div>

          {/* Linked accounts */}
          <div className="my-wallet-card reveal-on-scroll">
            <div className="my-wallet-card-title" style={{
            marginBottom: 16
          }}>
              <Icon icon="lucide:link-2" width={18} />{t("wallet.taiKhoanLienKet")}</div>
            <div className="my-wallet-account-list">
              <div className="my-wallet-account-item active">
                <Icon icon="solar:qr-code-bold" width={22} color="#0066cc" />
                <div style={{
                flex: 1
              }}>
                  <div className="my-wallet-account-name">PayOS (VietQR)</div>
                  <div className="my-wallet-account-status">{t("wallet.macDinhThanhToan")}</div>
                </div>
                <Icon icon="lucide:check-circle" width={16} color="#16a34a" />
              </div>
            </div>
          </div>

          {/* Security note */}
          <div className="my-wallet-card bg-secure reveal-on-scroll">
            <div className="my-wallet-card-title" style={{
            color: '#16a34a',
            marginBottom: 8
          }}>
              <Icon icon="lucide:shield-check" width={18} />{t("wallet.baoMatDaLop")}</div>
            <p style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            margin: 0
          }}>{t("wallet.researchpulseMaHoaMoiThongTinV")}</p>
          </div>
        </div>
      </div>
    </div>;
}