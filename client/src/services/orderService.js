import { apiGet, apiPost } from './api';

export async function createOrder(orderData) {
  const data = await apiPost('/orders', orderData);
  return data.order;
}

export async function getOrder(orderId) {
  const data = await apiGet(`/orders/${orderId}`);
  return data.order;
}
