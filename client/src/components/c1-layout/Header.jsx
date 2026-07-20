import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const location = useLocation();
  
  let cartCount = 0;
  try {
    const cart = useCart();
    if (cart && typeof cart.count === 'number') {
      cartCount = cart.count;
    }
  } catch (error) {
    // Treat as optional if CartContext isn't available or ready in the current tree
    console.warn('CartContext is not available:', error.message);
  }

  // Active link helper
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      ...styles.link,
      ...(isActive ? styles.activeLink : {}),
    };
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.title}>
          <span style={styles.logoIcon}>🍃</span> CeylonCart
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
          <Link to="/products" style={getLinkStyle('/products')}>Products</Link>
          <Link to="/cart" style={getLinkStyle('/cart')}>
            Cart
            {cartCount > 0 && (
              <span style={styles.badge} aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1a472a',
    color: '#ffffff',
    padding: '1rem 2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 700,
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'opacity 0.2s ease',
  },
  logoIcon: {
    fontSize: '1.75rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  link: {
    color: '#e2f0e6',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
  },
  activeLink: {
    color: '#ffffff',
    fontWeight: 600,
    borderBottom: '2px solid #ffffff',
    borderRadius: 0,
    paddingBottom: 'calc(0.25rem - 2px)',
  },
  badge: {
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    borderRadius: '50%',
    minWidth: '18px',
    height: '18px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '6px',
    padding: '2px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
};

