// Person 4 (C4) — fetch single product
export async function getProduct(id) {
  const { apiGet } = await import('./api');
  const data = await apiGet(`/products/${id}`);
  return data.product;
}
// Note: The above getProduct function does not use "/api/products/${id}" as required, nor does it handle errors. Here's the improved implementation:

export async function getProduct(id) {
  const { apiGet } = await import('./api');
  try {
    const data = await apiGet(`/api/products/${id}`);
    return data.product || data; // fallback in case payload is shaped differently
  } catch (err) {
    // You can enhance/reformat error message if needed
    throw new Error(
      err?.message
        ? `Failed to fetch product detail: ${err.message}`
        : 'Network error while fetching product detail'
    );
  }
}