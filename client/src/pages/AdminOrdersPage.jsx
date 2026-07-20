import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchAllOrders } from '../services/adminService';

function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}

export default function AdminOrdersPage() {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    fetchAllOrders()
      .then(setOrders)
      .catch((err) => setError(err.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Admin — Orders</h1>

      {loading && <p className="status-text">Loading orders...</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="status-text">No orders yet.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>
                    {order.customer?.name}
                    <br />
                    <small>{order.customer?.contact}</small>
                  </td>
                  <td>{order.items?.length || 0}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <span className={`badge badge-${order.paymentStatus === 'success' ? 'success' : order.paymentStatus}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/products" className="btn-secondary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
        Back to Store
      </Link>
    </div>
  );
}
