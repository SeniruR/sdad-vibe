import { apiPost } from './api';

export async function processPayment(paymentData) {
  try {
    const data = await apiPost('/payment/process', paymentData);
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Payment failed',
    };
  }
}
