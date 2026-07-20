import { apiGet } from './api';

export async function fetchAllOrders() {
  const data = await apiGet('/admin/orders');
  return data.orders || [];
}
