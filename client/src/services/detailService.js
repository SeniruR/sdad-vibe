// Person 4 (C4) — fetch single product
export async function getProduct(id) {
  const { apiGet } = await import('./api');
  const data = await apiGet(`/products/${id}`);
  return data.product;
}
