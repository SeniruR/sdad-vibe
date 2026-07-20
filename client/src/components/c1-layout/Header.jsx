import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const { count: cartCount } = useCart();

  const getLinkClass = (path) =>
    location.pathname === path ? 'nav-link nav-link-active' : 'nav-link';

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="site-logo">
          <span aria-hidden="true">🍃</span> CeylonCart
        </Link>

        <nav className="site-nav">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/products" className={getLinkClass('/products')}>Products</Link>
          <Link to="/cart" className={getLinkClass('/cart')}>
            Cart
            {cartCount > 0 && (
              <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </Link>
          {isAdmin && (
            <Link to="/admin/orders" className={getLinkClass('/admin/orders')}>
              Admin
            </Link>
          )}
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name.split(' ')[0]}</span>
              <button type="button" className="nav-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={getLinkClass('/login')}>Login</Link>
              <Link to="/register" className="nav-link nav-link-cta">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
