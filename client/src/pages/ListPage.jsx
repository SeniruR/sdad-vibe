import { useEffect, useMemo, useState } from 'react';
import ProductList from '../components/c2-list/ProductList';
import { fetchProducts } from '../services/listService';

const categoryOptions = ['All', 'Tea', 'Spices', 'Handicrafts', 'Apparel'];

export default function ListPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts()
      .then(setAllProducts)
      .catch((err) => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedCategory !== 'All') {
      const cat = selectedCategory.toLowerCase();
      result = result.filter((p) => p.category?.toLowerCase() === cat);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery]);

  return (
    <div className="page-container">
      <div className="products-toolbar">
        <h1 className="page-title">Our Products</h1>
        <div className="products-filters">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search products"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-input"
            aria-label="Filter by category"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="status-text">Loading products...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="status-text">No products match your search.</p>
      )}
      {!loading && !error && filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}
