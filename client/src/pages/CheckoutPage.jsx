import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';

const PENDING_ORDER_KEY = 'ceyloncart-pending-order-id';

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const [form, setForm] = useState({ name: '', address: '', contact: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Checkout</h1>
        <p style={styles.emptyText}>Your cart is empty. Add items before checkout.</p>
        <Link to="/products" style={styles.primaryLink}>
          Browse Products
        </Link>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.address.trim() || !form.contact.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const order = await createOrder({
        customer: {
          name: form.name.trim(),
          address: form.address.trim(),
          contact: form.contact.trim(),
        },
        items,
        total,
      });

      localStorage.setItem(PENDING_ORDER_KEY, order.orderId);
      navigate('/payment', { state: { orderId: order.orderId } });
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.layout}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.sectionTitle}>Customer Details</h2>

          <label style={styles.label}>
            Name *
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Address *
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={3}
              style={styles.textarea}
            />
          </label>

          <label style={styles.label}>
            Contact *
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              placeholder="Phone or email"
              style={styles.input}
            />
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Placing Order...' : 'Continue to Payment'}
          </button>
        </form>

        <aside style={styles.summary}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>
          <ul style={styles.itemList}>
            {items.map((item) => (
              <li key={item.productId} style={styles.itemRow}>
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <p style={styles.total}>
            Total: <strong>{formatPrice(total)}</strong>
          </p>
          <Link to="/cart" style={styles.backLink}>
            Back to Cart
          </Link>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  title: {
    fontSize: '1.75rem',
    color: '#1a472a',
    marginBottom: '1.5rem',
  },
  emptyText: {
    color: '#666',
    marginBottom: '1.5rem',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '2rem',
    alignItems: 'start',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    color: '#333',
    margin: '0 0 1rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    fontSize: '0.9rem',
    color: '#444',
    fontWeight: 600,
  },
  input: {
    padding: '0.6rem 0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 400,
  },
  textarea: {
    padding: '0.6rem 0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 400,
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  error: {
    color: '#c62828',
    margin: 0,
    fontSize: '0.9rem',
  },
  submitBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a472a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1rem',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
    fontSize: '0.95rem',
  },
  total: {
    fontSize: '1.1rem',
    margin: '0 0 1rem',
  },
  backLink: {
    color: '#1a472a',
    textDecoration: 'none',
    fontWeight: 600,
  },
  primaryLink: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a472a',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
  },
};
