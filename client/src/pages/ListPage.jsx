import { useEffect, useState } from 'react';
import ProductList from '../components/c2-list/ProductList';
import { fetchProducts, fetchProductsByCategory } from '../services/listService';

const categoryOptions = ['All', 'Tea', 'Spices', 'Handicrafts', 'Apparel'];

export default function ListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleCategoryChange = async (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    try {
      setLoading(true);
      setError('');
      const data = await fetchProductsByCategory(category);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Our Products</h1>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={styles.select}
          aria-label="Filter products by category"
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {loading && <p style={styles.status}>Loading products...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem 1rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  title: {
    margin: 0,
    color: '#1f2937',
  },
  select: {
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
  status: {
    color: '#6b7280',
  },
  error: {
    color: '#b91c1c',
    fontWeight: 600,
  },
};
