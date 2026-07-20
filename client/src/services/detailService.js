/**
 * Fetch details for a single product by ID.
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Product data object
 */
export async function getProduct(id) {
  const { apiGet } = await import('./api');
  try {
    const data = await apiGet(`/api/products/${id}`);
    return data.product || data; // Fallback in case payload structure varies
  } catch (err) {
    throw new Error(
      err?.message
        ? `Failed to fetch product detail: ${err.message}`
        : 'Network error while fetching product detail'
    );
  }
}