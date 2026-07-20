import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin/orders' : '/products');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h1 className="page-title">Login</h1>
      <p className="auth-hint">
        Demo: admin@ceyloncart.lk / admin123 &nbsp;|&nbsp; customer@ceyloncart.lk / customer123
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="auth-footer">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
