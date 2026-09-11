import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, Button } from '@ui';
import Header from '../../landing/components/Header';
import ROUTES from '../../../app/routes/routePaths';
import { useWalletStore } from '../../../app/store/walletStore';
import { getPaymentByOrderCode, getMyWallet, getPaymentStatus } from '../api/walletApi';
import './PaymentResultPage.css';
export default function PaymentResultPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setBalance,
    fetchWallet
  } = useWalletStore();
  const [stage, setStage] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [payment, setPayment] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const orderCode = searchParams.get('orderCode') || '';
  const transactionId = searchParams.get('transactionId') || searchParams.get('vnp_TxnRef') || searchParams.get('txnRef') || '';
  const payosStatus = searchParams.get('status') || '';
  const isCancelled = searchParams.get('cancel') === 'true' || payosStatus === 'CANCELLED';
  const isSuccessParam = (searchParams.get('code') === '00' && !isCancelled) || payosStatus === 'PAID';

  useEffect(() => {
    let mounted = true;
    const runFlow = async () => {
      setLoading(true);
      setErrorMessage('');
      setStage('pending');

      if (isCancelled) {
        if (mounted) {
          setStage('failed');
          setErrorMessage(t("wallet.giaoDichBiHuy") || 'Giao dịch đã bị hủy hoặc chưa hoàn tất.');
          setLoading(false);
        }
        return;
      }

      try {
        let paymentData = null;

        // Ưu tiên tra cứu theo orderCode của PayOS
        if (orderCode) {
          try {
            const res = await getPaymentByOrderCode(orderCode);
            paymentData = res?.data || null;
            if (mounted && paymentData) setPayment(paymentData);
          } catch {
            // fallback nếu BE chưa sync
          }
        }

        // Fallback tra cứu theo transactionId
        if (!paymentData && transactionId) {
          try {
            const paymentRes = await getPaymentStatus(transactionId);
            paymentData = paymentRes?.data || null;
            if (mounted && paymentData) setPayment(paymentData);
          } catch {
            // keep whatever we have
          }
        }

        if (!mounted) return;

        const paymentStatus = paymentData?.payment_status;
        const shouldShowSuccess = paymentStatus === 'success' || isSuccessParam;
        const shouldShowFailed = isCancelled || paymentStatus === 'failed' || paymentStatus === 'cancelled' || paymentStatus === 'refunded';

        // Refresh số dư ví khi thanh toán thành công
        if (shouldShowSuccess) {
          try {
            const walletRes = await getMyWallet();
            const balance = walletRes?.data?.balance;
            if (typeof balance === 'number') {
              setWalletBalance(balance);
              setBalance(balance);
            }
            fetchWallet();
          } catch {
            // ignore wallet refresh failure in result UI
          }
        }

        if (shouldShowSuccess) {
          setStage('success');
        } else if (shouldShowFailed) {
          setStage('failed');
          setErrorMessage(paymentData?.note || t("wallet.giaoDichChuaDuocXacNhanThanhCo"));
        } else {
          setStage('pending');
          setErrorMessage(paymentData?.note || t("wallet.heThongDangChoXacNhanGiaoDichT"));
        }
      } catch (err) {
        if (!mounted) return;
        setStage('failed');
        setErrorMessage(err?.response?.data?.message || err?.message || t("wallet.khongTheXacMinhGiaoDich"));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    runFlow();
    return () => {
      mounted = false;
    };
  }, [location.search, orderCode, transactionId, isCancelled, isSuccessParam, fetchWallet, setBalance, t]);
  const formatCoin = n => Number.isInteger(n) ? Number(n || 0).toLocaleString('en-US') : Number(n || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const formatVND = n => Number(n || 0).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
  const statusUI = {
    success: {
      iconClass: 'success',
      icon: 'lucide:badge-check',
      title: t("wallet.thanhToanThanhCong"),
      subtitle: t("wallet.giaoDichCuaBanDaDuocXacNhanCoi")
    },
    failed: {
      iconClass: 'failed',
      icon: 'lucide:circle-x',
      title: t("wallet.thanhToanThatBai"),
      subtitle: t("wallet.giaoDichChuaHoanTatBanCoTheThu")
    },
    pending: {
      iconClass: 'pending',
      icon: 'lucide:clock-3',
      title: t("wallet.dangXacNhanGiaoDich"),
      subtitle: t("wallet.heThongDangXuLyKetQuaThanhToan")
    }
  };
  const currentStatus = statusUI[stage];
  return <div className="payment-result-page">
      <Header />
      <div className="payment-result-inner">
        <div className="payment-result-shell">
          <div className={`payment-result-icon ${currentStatus.iconClass}`}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" /> : <Icon icon={currentStatus.icon} width={38} />}
          </div>

          <h1 className="payment-result-title">{loading ? t("wallet.dangKiemTraGiaoDich") : currentStatus.title}</h1>
          <p className="payment-result-subtitle">
            {loading ? t("wallet.heThongDangDongBoTrangThaiThan") : currentStatus.subtitle}
          </p>

          <div className="payment-result-card">
            <div className="payment-result-balance">
              <div>
                <div className="payment-result-balance__label">{t("wallet.soDuViHienTai")}</div>
                <div className="payment-result-balance__value">
                  {walletBalance == null ? '—' : formatCoin(walletBalance)} Coins
                </div>
              </div>
              {payment?.payment_status && <div className="payment-result-info" style={{
              minWidth: 150
            }}>
                  <div className="payment-result-info__label">{t("wallet.trangThai")}</div>
                  <div className="payment-result-info__value">{payment.payment_status}</div>
                </div>}
            </div>

            <div className="payment-result-grid">
              <div className="payment-result-info">
                <div className="payment-result-info__label">{t("wallet.maGiaoDich")}</div>
                <div className="payment-result-info__value">{payment?.order_code || orderCode || payment?.transaction_id || transactionId || '—'}</div>
              </div>
              <div className="payment-result-info">
                <div className="payment-result-info__label">{t("journal.phuongThuc")}</div>
                <div className="payment-result-info__value">{payment?.payment_method === 'momo' ? 'MoMo' : 'PayOS (VietQR)'}</div>
              </div>
              <div className="payment-result-info">
                <div className="payment-result-info__label">{t("wallet.goiCoin")}</div>
                <div className="payment-result-info__value">{payment?.package_name || t("wallet.goiCoinDaChon")}</div>
              </div>
              <div className="payment-result-info">
                <div className="payment-result-info__label">{t("wallet.soTien")}</div>
                <div className="payment-result-info__value">{payment?.amount ? formatVND(payment.amount) : '—'}</div>
              </div>
              <div className="payment-result-info">
                <div className="payment-result-info__label">{t("wallet.tongCoinNhan")}</div>
                <div className="payment-result-info__value">{payment?.total_coin ? `${formatCoin(payment.total_coin)} Coins` : '—'}</div>
              </div>
              <div className="payment-result-info">
                <div className="payment-result-info__label">{t("wallet.thoiGian")}</div>
                <div className="payment-result-info__value">{payment?.paid_at || payment?.created_at || '—'}</div>
              </div>
            </div>
          </div>

          {!loading && stage === 'failed' && errorMessage && <div className="payment-result-alert failed">
              <Icon icon="lucide:triangle-alert" width={16} style={{
            marginTop: 2,
            flexShrink: 0
          }} />
              <span>{errorMessage}</span>
            </div>}

          {!loading && stage === 'pending' && errorMessage && <div className="payment-result-alert pending">
              <Icon icon="lucide:info" width={16} style={{
            marginTop: 2,
            flexShrink: 0
          }} />
              <span>{errorMessage}</span>
            </div>}

          <div className="payment-result-actions d-flex justify-content-center gap-3 flex-wrap mt-4">
            {stage === 'success' ? <>
                <Button variant="primary" icon="lucide:wallet" onClick={() => navigate(ROUTES.WALLET_TOP_UP)}>
                  {t("wallet.napThemCoin")}
                </Button>
                <Button variant="outline" icon="lucide:layout-dashboard" onClick={() => navigate(ROUTES.DASHBOARD)}>
                  {t("wallet.quayVeDashboard")}
                </Button>
              </> : stage === 'failed' ? <>
                <Button variant="primary" icon="lucide:rotate-ccw" onClick={() => navigate(ROUTES.WALLET_TOP_UP)}>
                  {t("article.thuLai")}
                </Button>
                <Button variant="outline" icon="lucide:arrow-left" onClick={() => navigate(-1)}>
                  {t("auth.quayLai")}
                </Button>
              </> : <>
                <Button variant="primary" icon="lucide:refresh-cw" onClick={() => window.location.reload()}>
                  {t("wallet.kiemTraLaiTrangThai")}
                </Button>
                <Button variant="outline" icon="lucide:wallet" onClick={() => navigate(ROUTES.WALLET_TOP_UP)}>
                  {t("wallet.veTrangNapCoin")}
                </Button>
              </>}
          </div>

          <div className="payment-result-footer-note">
            <Icon icon="lucide:shield-check" width={14} />{t("wallet.ketQuaDuocDongBoTuVnpayVaHeTho")}</div>
        </div>
      </div>
    </div>;
}