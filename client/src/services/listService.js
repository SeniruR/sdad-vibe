// Person 2 (C2) — fetch products
export async function fetchProducts() {
  const { apiGet } = await import('./api');
  return apiGet('/products');
}

export async function fetchProductsByCategory(category) {
  const data = await fetchProducts();
  const products = data.products || [];
  if (!category || category === 'all') return products;
  return products.filter((p) => p.category === category);
}
