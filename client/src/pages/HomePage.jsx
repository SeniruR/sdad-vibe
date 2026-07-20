import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../services/api';

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    apiGet('/health')
      .then((data) => setApiStatus(data.message || 'connected'))
      .catch(() => setApiStatus('disconnected — start the server'));
  }, []);

  const categories = [
    { name: 'Tea', icon: '🍃', description: 'World-renowned Ceylon tea leaves' },
    { name: 'Spices', icon: '🌶️', description: 'Rich, aromatic organic spices' },
    { name: 'Handicrafts', icon: '🏺', description: 'Artisanal hand-carved crafts' },
    { name: 'Apparel', icon: '👕', description: 'Traditional & modern garments' },
  ];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to CeylonCart</h1>
          <p style={styles.heroTagline}>
            Explore the finest selection of authentic Sri Lankan tea, aromatic spices, traditional handicrafts, and exquisite apparel. Crafted with care, delivered directly to your doorstep.
          </p>
          <Link to="/products" style={styles.ctaButton}>Shop Now</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Featured Categories</h2>
        <div style={styles.grid}>
          {categories.map((cat) => (
            <Link key={cat.name} to="/products" style={styles.card}>
              <div style={styles.cardIcon}>{cat.icon}</div>
              <h3 style={styles.cardTitle}>{cat.name}</h3>
              <p style={styles.cardDescription}>{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* API Health Check Status */}
      <footer style={styles.footer}>
        <div style={styles.statusBadge}>
          API Status: <span style={styles.statusValue}>{apiStatus}</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#333333',
    backgroundColor: '#fcfdfd',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    backgroundColor: '#f4f8f5',
    padding: '4rem 2rem',
    textAlign: 'center',
    borderBottom: '1px solid #e1ebe3',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '2.5rem',
    color: '#1a472a',
    margin: '0 0 1rem 0',
    fontWeight: 800,
  },
  heroTagline: {
    fontSize: '1.15rem',
    lineHeight: '1.6',
    color: '#555555',
    margin: '0 0 2rem 0',
  },
  ctaButton: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: '#1a472a',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 600,
    borderRadius: '6px',
    boxShadow: '0 4px 6px rgba(26, 71, 42, 0.2)',
    transition: 'all 0.2s ease',
  },
  categoriesSection: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: '1.75rem',
    color: '#1a472a',
    textAlign: 'center',
    margin: '0 0 2.5rem 0',
    fontWeight: 700,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem',
    width: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e8ede9',
    borderRadius: '8px',
    padding: '2rem 1.5rem',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'inherit',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#1a472a',
    margin: '0 0 0.5rem 0',
    fontWeight: 600,
  },
  cardDescription: {
    fontSize: '0.9rem',
    color: '#666666',
    margin: 0,
    lineHeight: '1.4',
  },
  footer: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f4f8f5',
    borderTop: '1px solid #e1ebe3',
    marginTop: 'auto',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e1ebe3',
    borderRadius: '20px',
    fontSize: '0.85rem',
    color: '#555555',
  },
  statusValue: {
    fontWeight: 600,
    color: '#1a472a',
  },
};

