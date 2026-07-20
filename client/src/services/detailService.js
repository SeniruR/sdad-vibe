import { apiGet } from './api';

export async function getProduct(id) {
  const data = await apiGet(`/products/${id}`);
  return data.product;
}
