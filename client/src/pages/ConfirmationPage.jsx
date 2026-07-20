import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getOrder } from '../services/orderService';

function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

export default function ConfirmationPage() {
  const { orderId } = useParams();
  const { clearCart } = useCart();
  const cartCleared = useRef(false);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadOrder() {
      setLoading(true);
      setError('');

      try {
        const data = await getOrder(orderId);
        if (!cancelled) {
          setOrder(data);
          if (!cartCleared.current) {
            clearCart();
            cartCleared.current = true;
          }
        }
      } catch {
        if (!cancelled) setError('Order not found or invalid order ID.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrder();
    return () => {
      cancelled = true;
    };
  }, [orderId, clearCart]);

  if (loading) {
    return <p style={styles.center}>Loading order...</p>;
  }

  if (error || !order) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Order Not Found</h1>
        <p style={styles.error}>{error || 'Could not load this order.'}</p>
        <Link to="/products" style={styles.btn}>
          Back to Products
        </Link>
      </div>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div style={styles.container}>
      <div style={styles.successBadge}>Order Confirmed!</div>
      <h1 style={styles.title}>Thank you for your order</h1>
      <p style={styles.orderId}>
        Order ID: <strong>{order.orderId}</strong>
      </p>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Customer Details</h2>
        <p><strong>Name:</strong> {order.customer?.name}</p>
        <p><strong>Address:</strong> {order.customer?.address}</p>
        <p><strong>Contact:</strong> {order.customer?.contact}</p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Order Items</h2>
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul style={styles.itemList}>
            {items.map((item) => (
              <li key={item.productId} style={styles.itemRow}>
                <span>{item.name} × {item.qty}</span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
        )}
        <p style={styles.total}>
          Total: <strong>{formatPrice(order.total)}</strong>
        </p>
      </section>

      <section style={styles.section}>
        <span
          style={{
            ...styles.paymentBadge,
            backgroundColor:
              order.paymentStatus === 'success' ? '#16a34a' : '#c62828',
          }}
        >
          Payment: {order.paymentStatus === 'success' ? 'Paid' : order.paymentStatus}
        </span>
      </section>

      <Link to="/products" style={styles.btn}>
        Continue Shopping
      </Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  center: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  successBadge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#e8f5e9',
    color: '#1a472a',
    borderRadius: '8px',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    color: '#1a472a',
    margin: '0 0 0.5rem',
  },
  orderId: {
    color: '#666',
    marginBottom: '1.5rem',
  },
  section: {
    backgroundColor: '#fff',
    padding: '1.25rem',
    borderRadius: '8px',
    marginBottom: '1.25rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  sectionTitle: {
    fontSize: '1rem',
    margin: '0 0 0.75rem',
    color: '#333',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1rem',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
  total: {
    fontSize: '1.1rem',
    margin: 0,
  },
  paymentBadge: {
    display: 'inline-block',
    padding: '0.4rem 0.75rem',
    color: '#fff',
    borderRadius: '6px',
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  error: {
    color: '#c62828',
    marginBottom: '1rem',
  },
  btn: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a472a',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
  },
};
