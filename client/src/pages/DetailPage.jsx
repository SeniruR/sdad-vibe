import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductDetail from '../components/c4-detail/ProductDetail';
import '../components/c4-detail/ProductDetail.css';
import { getProduct } from '../services/detailService';

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError('');
      setNotFound(false);

      try {
        const data = await getProduct(id);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) {
          if (err.message?.toLowerCase().includes('not found')) {
            setNotFound(true);
          } else {
            setError(err.message || 'Failed to load product');
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="product-detail-loading">Loading product...</p>;
  }

  if (notFound) {
    return (
      <div className="product-detail-not-found">
        <h2>Product not found</h2>
        <p>We couldn&apos;t find a product with ID &quot;{id}&quot;.</p>
        <Link to="/products" className="product-detail-link">
          Back to Products
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-error">
        <p>{error}</p>
        <Link to="/products" className="product-detail-link">
          Back to Products
        </Link>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
