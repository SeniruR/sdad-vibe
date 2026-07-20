import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCart();

  if (items.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <p style={styles.emptyText}>Your cart is empty.</p>
        <Link to="/products" style={styles.primaryLink}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Line Total</th>
              <th style={styles.th} />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const lineTotal = item.price * item.qty;
              return (
                <tr key={item.productId} style={styles.row}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{formatPrice(item.price)}</td>
                  <td style={styles.td}>
                    <div style={styles.qtyControls}>
                      <button
                        type="button"
                        style={styles.qtyBtn}
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span style={styles.qtyValue}>{item.qty}</span>
                      <button
                        type="button"
                        style={styles.qtyBtn}
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={styles.td}>{formatPrice(lineTotal)}</td>
                  <td style={styles.td}>
                    <button
                      type="button"
                      style={styles.removeBtn}
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={styles.summary}>
        <p style={styles.subtotal}>
          Subtotal: <strong>{formatPrice(total)}</strong>
        </p>
        <div style={styles.actions}>
          <Link to="/checkout" style={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
          <Link to="/products" style={styles.secondaryLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
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
  tableWrapper: {
    overflowX: 'auto',
    marginBottom: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontWeight: 600,
    borderBottom: '2px solid #e0e0e0',
  },
  row: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '0.75rem 1rem',
    verticalAlign: 'middle',
  },
  qtyControls: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: 1,
  },
  qtyValue: {
    minWidth: '1.5rem',
    textAlign: 'center',
    fontWeight: 600,
  },
  removeBtn: {
    padding: '0.35rem 0.75rem',
    border: '1px solid #c62828',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#c62828',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '1rem',
  },
  subtotal: {
    fontSize: '1.1rem',
    color: '#333',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  checkoutBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a472a',
    color: '#fff',
    borderRadius: '8px',
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
  secondaryLink: {
    padding: '0.75rem 1.5rem',
    color: '#1a472a',
    borderRadius: '8px',
    textDecoration: 'none',
    border: '1px solid #1a472a',
    fontWeight: 600,
  },
};
