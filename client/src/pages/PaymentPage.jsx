import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { processPayment } from '../services/paymentService';

const PENDING_ORDER_KEY = 'ceyloncart-pending-order-id';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId =
    location.state?.orderId || localStorage.getItem(PENDING_ORDER_KEY);

  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!nameOnCard.trim() || cardNumber.replace(/\s+/g, '').length < 12) {
      setError('Please enter valid card details.');
      return;
    }

    setProcessing(true);
    try {
      const result = await processPayment({
        orderId,
        cardName: nameOnCard,
        cardNumber,
      });

      if (result.success) {
        navigate(`/confirmation/${orderId}`);
      } else {
        setError(result.message || 'Payment failed. Please try again.');
      }
    } catch {
      setError('Something went wrong while processing payment.');
    } finally {
      setProcessing(false);
    }
  }

  if (!orderId) {
    return (
      <div style={styles.container}>
        <div style={styles.alert}>
          No order found. Please complete checkout first.
        </div>
        <button type="button" style={styles.btn} onClick={() => navigate('/cart')}>
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <span style={styles.badge}>Simulated Payment — no real charges</span>
      <h1 style={styles.title}>Payment</h1>
      <p style={styles.subtitle}>Order ID: <strong>{orderId}</strong></p>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name on Card *
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            style={styles.input}
            required
            disabled={processing}
          />
        </label>

        <label style={styles.label}>
          Card Number *
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/[^\d ]/g, ''))}
            placeholder="1234 5678 9012 3456"
            style={styles.input}
            maxLength={19}
            required
            disabled={processing}
          />
          <span style={styles.hint}>Card ending in 0000 will be declined (test rule)</span>
        </label>

        <button type="submit" style={styles.btn} disabled={processing}>
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  badge: {
    display: 'inline-block',
    padding: '0.4rem 0.75rem',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    color: '#1a472a',
    margin: '0 0 0.5rem',
  },
  subtitle: {
    color: '#666',
    marginBottom: '1.5rem',
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
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#444',
  },
  input: {
    padding: '0.6rem 0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 400,
  },
  hint: {
    fontSize: '0.8rem',
    color: '#888',
    fontWeight: 400,
  },
  error: {
    color: '#c62828',
    marginBottom: '1rem',
  },
  alert: {
    padding: '1rem',
    backgroundColor: '#fdecea',
    color: '#c62828',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  btn: {
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
};
