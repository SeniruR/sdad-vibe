import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../services/api';

// Person 1 (C1) — replace with CeylonCart landing page
export default function HomePage() {
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    apiGet('/health')
      .then((data) => setApiStatus(data.message || 'connected'))
      .catch(() => setApiStatus('disconnected — start the server'));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to CeylonCart</h1>
      <p style={styles.subtitle}>
        Sri Lankan tea, spices, handicrafts &amp; apparel — delivered to your door.
      </p>
      <Link to="/products" style={styles.cta}>Browse Products</Link>
      <div style={styles.status}>
        API status: <strong>{apiStatus}</strong>
      </div>
      <p style={styles.hint}>
        Person 1: use <code>docs/PROMPTS-C1.md</code> to polish this page.
      </p>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', padding: '3rem 1rem' },
  title: { fontSize: '2rem', marginBottom: '0.5rem', color: '#1a472a' },
  subtitle: { color: '#666', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' },
  cta: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a472a',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    marginBottom: '2rem',
  },
  status: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  hint: { color: '#999', fontSize: '0.9rem' },
};
