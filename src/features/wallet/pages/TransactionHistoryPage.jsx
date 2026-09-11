import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { Icon, Button, Badge, Chip } from '@ui';
import { getWalletTransactions } from '../api/walletApi';
import './TransactionHistoryPage.css';
export default function TransactionHistoryPage() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState(''); // empty for all
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    const params = {
      page,
      limit
    };
    if (filterType) params.type = filterType;
    getWalletTransactions(params).then(res => {      if (!mounted) return;
      const items = Array.isArray(res?.data) ? res.data : res?.data?.transactions;
      const pagination = res?.pagination || res?.data?.pagination;
      if (res?.success && Array.isArray(items)) {
        setTransactions(items);
        if (pagination) {
          setTotalPages(pagination.totalPages || pagination.total_pages || 1);
        }
      } else {
        setError(t("wallet.khongTheTaiLichSuGiaoDich"));
      }
    }).catch(() => {      if (mounted) setError(t("wallet.loiKetNoiLichSuGiaoDich"));
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [page, filterType]);
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
  const getStatusLabel = status => {    switch (status) {
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
  const getTxTypeLabel = type => {    switch (type) {
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
  return <div className="tx-history-page">
      <div className="tx-history-hero reveal-on-scroll">
        <Chip
          icon="solar:history-bold"
          label="ResearchPulse Wallet"
          variant="minimal"
          size="sm"
          className="mb-2"
        />
        <h1 className="tx-history-title">{t("wallet.lichSuBienDongCoin")}</h1>
        <p className="tx-history-subtitle">{t("wallet.xemLaiDanhSachNapTieuVaHoanCoi")}</p>
      </div>

      {/* Filter Tabs */}
      <div className="tx-history-filters reveal-on-scroll">
        <button
          type="button"
          className={`tx-filter-tab ${filterType === '' ? 'active' : ''}`}
          onClick={() => {
            setFilterType('');
            setPage(1);
          }}
        >
          {t("dashboard.tatCa", "All")}
        </button>
        <button
          type="button"
          className={`tx-filter-tab ${filterType === 'deposit' ? 'active' : ''}`}
          onClick={() => {
            setFilterType('deposit');
            setPage(1);
          }}
        >
          {t("wallet.napCoin1")}
        </button>
        <button
          type="button"
          className={`tx-filter-tab ${filterType === 'spend' ? 'active' : ''}`}
          onClick={() => {
            setFilterType('spend');
            setPage(1);
          }}
        >
          {t("wallet.tieuCoin")}
        </button>
        <button
          type="button"
          className={`tx-filter-tab ${filterType === 'refund' ? 'active' : ''}`}
          onClick={() => {
            setFilterType('refund');
            setPage(1);
          }}
        >
          {t("wallet.hoanCoin")}
        </button>
      </div>

      {/* Main Table Card */}
      <div className="tx-history-card reveal-on-scroll">
        {loading ? <div className="tx-history-table-loading">{t("wallet.dangTaiLichSuGiaoDich")}</div> : error ? <div className="tx-history-table-empty">{error}</div> : transactions.length === 0 ? <div className="tx-history-table-empty">{t("wallet.khongTimThayGiaoDichNao")}</div> : <>
            <div className="tx-history-table-wrap">
              <table className="tx-history-table">
                <thead>
                  <tr>
                    <th>{t("wallet.giaoDichMoTa")}</th>
                    <th>{t("wallet.idGiaoDich")}</th>
                    <th>{t("wallet.thoiGian")}</th>
                    <th>{t("wallet.bienDong")}</th>
                    <th>{t("wallet.soDuTruoc")}</th>
                    <th>{t("wallet.soDuSau")}</th>
                    <th>{t("wallet.trangThai")}</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => {
                    const amountVal = tx.amount || 0;
                    const isMinus = amountVal < 0;
                    const status = getTxStatus(tx);
                    return (
                      <tr key={tx.wallet_transaction_id}>
                        <td>
                          <div className="tx-history-table-desc">
                            <span className={`tx-history-table-type-icon ${getTxTypeIconClass(tx.type)}`}>
                              <Icon icon={isMinus ? 'lucide:arrow-up-right' : 'lucide:arrow-down-left'} width={13} />
                            </span>
                            <div>
                              <div className="tx-history-table-type-label">{getTxTypeLabel(tx.type)}</div>
                              <div className="tx-history-table-detail">{tx.description || t("wallet.giaoDichViCoin")}</div>
                            </div>
                          </div>
                        </td>
                        <td className="tx-history-id-col">
                          <span
                            className="font-monospace"
                            style={{ fontSize: '11.5px' }}
                            title={tx.wallet_transaction_id}
                          >
                            {tx.wallet_transaction_id?.length > 18
                              ? `${tx.wallet_transaction_id.slice(0, 8)}...${tx.wallet_transaction_id.slice(-6)}`
                              : tx.wallet_transaction_id}
                          </span>
                        </td>
                        <td style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{formatDate(tx.created_at)}</td>
                        <td className={`tx-history-table-amount ${isMinus ? 'spend' : 'deposit'}`}>
                          {isMinus ? '-' : '+'}
                          {formatCoin(Math.abs(amountVal))}
                          <span className="text-muted-custom ms-1" style={{ fontSize: '11px', fontWeight: 600 }}>Coins</span>
                        </td>
                        <td>
                          {formatCoin(tx.balance_before)} <span className="text-muted-custom" style={{ fontSize: '11px' }}>Coins</span>
                        </td>
                        <td style={{ fontWeight: 800 }}>
                          {formatCoin(tx.balance_after)} <span className="text-muted-custom" style={{ fontSize: '11px' }}>Coins</span>
                        </td>
                        <td>
                          <Badge pill variant={status === 'success' ? 'success' : status === 'failed' ? 'danger' : 'secondary'}>
                            {getStatusLabel(status)}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && <div className="tx-history-pagination">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  className="d-inline-flex align-items-center gap-1"
                >
                  <Icon icon="lucide:chevron-left" width={15} />
                  <span>{t("article.truoc")}</span>
                </Button>
                <span className="tx-pagination-text text-muted-custom">
                  {t("pagination.page", "Page")} {page} / {totalPages}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                  className="d-inline-flex align-items-center gap-1"
                >
                  <span>{t("article.sau", "Next")}</span>
                  <Icon icon="lucide:chevron-right" width={15} />
                </Button>
              </div>}
          </>}
      </div>
    </div>;
}