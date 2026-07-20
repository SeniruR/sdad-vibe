import { Link } from 'react-router-dom';
// Person 1 (C1) — replace with full CeylonCart header
export default function Header() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.title}>CeylonCart</Link>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1a472a',
    color: '#fff',
  },
  title: { margin: 0, fontSize: '1.25rem', color: '#fff', textDecoration: 'none', fontWeight: 'bold' },
  nav: { display: 'flex', gap: '1rem' },
  link: { color: '#eee', textDecoration: 'none' },
};
