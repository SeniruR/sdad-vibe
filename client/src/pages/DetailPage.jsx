// Person 4 (C4) — Product detail page (FR2)
export default function DetailPage() {
  return (
    <div>
      <h2>Product Detail</h2>
      <p>TODO: Person 4 — use docs/PROMPTS-C4.md</p>
    </div>
  );
}
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as detailService from '../services/detailService';
import ProductDetail from '../components/ProductDetail';

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setProduct(null);

    detailService
      .getProduct(id)
      .then((data) => {
        if (isMounted) {
          if (!data || !data.name) {
            setProduct(null);
            setError('Product not found (404).');
          } else {
            setProduct(data);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          if (err.message && err.message.toLowerCase().includes('404')) {
            setError('Product not found (404).');
          } else {
            setError(
              'Could not load product details. Please try again later.'
            );
          }
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: 16 }}>
        <Link to="/products" style={{ textDecoration: 'none', color: '#0074cc' }}>
          ← Back to Products
        </Link>
      </div>
      {loading && (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <span>Loading product...</span>
        </div>
      )}
      {!loading && (error || !product) && (
        <div
          style={{
            background: '#fbe9e7',
            color: '#c62828',
            border: '1px solid #ffccbc',
            padding: '1rem',
            borderRadius: 8,
            marginBottom: 20,
          }}
          data-testid="error-callout"
        >
          {error || 'Product not found.'}
        </div>
      )}
      {!loading && product && (
        <ProductDetail product={product} />
      )}
    </div>
  );
}