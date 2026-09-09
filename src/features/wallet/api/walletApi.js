/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features/wallet/api/walletApi.js
 *
 * API service để tương tác với endpoint ví coin.
 */
import api from '../../../shared/services/api';

/**
 * Lấy thông tin ví coin của user hiện tại.
 * Endpoint: GET /wallet/me
 *
 * @returns {Promise<Object>} Wallet data: { wallet_id, user_id, balance, total_deposit, total_spent, ... }
 */
export const getMyWallet = async () => {
  const response = await api.get('/wallet/me');
  return response.data;
};

/**
 * Lấy lịch sử giao dịch ví của user.
 * Endpoint: GET /wallet/me/transactions
 *
 * @param {Object} params - { page, limit, type }
 * @returns {Promise<Object>} Lịch sử giao dịch
 */
export const getWalletTransactions = async (params = {}) => {
  const response = await api.get('/wallet/me/transactions', { params });
  return response.data;
};

/**
 * Lấy danh sách gói coin đang bán (không cần đăng nhập).
 * Endpoint: GET /coin-packages
 *
 * @returns {Promise<Object>} Response: { success, code, data: [...packages] }
 */
export const getCoinPackages = async () => {
  const response = await api.get('/coin-packages');
  return response.data;
};

/**
 * Tạo giao dịch thanh toán.
 * Endpoint: POST /payments/create
 *
 * @param {Object} payload
 * @param {string} payload.packageId - ID của gói coin đã chọn.
 * @param {string} payload.paymentMethod - Phương thức thanh toán (vnpay, momo...).
 * @returns {Promise<Object>} Response: { success, data: { transactionId, paymentUrl, payment } }
 */
export const createPayment = async ({ packageId, paymentMethod = 'payos' }) => {
  const response = await api.post('/payments/create', { packageId, paymentMethod });
  return response.data;
};

/**
 * Lấy trạng thái giao dịch thanh toán.
 * Endpoint: GET /payments/{transactionId}
 *
 * @param {string} transactionId
 * @returns {Promise<Object>} Transaction detail.
 */
export const getPaymentStatus = async (transactionId) => {
  const response = await api.get(`/payments/${transactionId}`);
  return response.data;
};

/**
 * Lấy thông tin giao dịch theo PayOS orderCode.
 * Endpoint: GET /payments/payos/order/{orderCode}
 *
 * @param {string|number} orderCode
 * @returns {Promise<Object>} Transaction detail.
 */
export const getPaymentByOrderCode = async (orderCode) => {
  const response = await api.get(`/payments/payos/order/${orderCode}`);
  return response.data;
};

/**
 * Trừ coin của user cho các dịch vụ (Premium PDF, v.v...)
 * Endpoint: POST /wallet/spend
 *
 * @param {number} amount - Số lượng coin cần trừ
 * @param {string} description - Mô tả giao dịch
 * @returns {Promise<Object>}
 */
export const spendCoin = async (amount, description = 'Premium features') => {
  const response = await api.post('/wallet/spend', { amount, description });
  return response.data;
};
