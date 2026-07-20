import { apiGet } from './api';

export async function fetchProducts() {
  const data = await apiGet('/products');
  return data.products || [];
}

export async function fetchProductsByCategory(category) {
  const products = await fetchProducts();

  if (!category || category === 'All') {
    return products;
  }

  const normalizedCategory = category.toLowerCase();
  return products.filter((product) => product.category?.toLowerCase() === normalizedCategory);
}
