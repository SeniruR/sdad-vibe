import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const placeholderImage = 'https://placehold.co/600x400?text=CeylonCart';

function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  function handleAddToCart() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="product-detail">
      <Link to="/products" className="product-detail-back">
        ← Back to Products
      </Link>

      <div className="product-detail-grid">
        <img
          src={product.image || placeholderImage}
          alt={product.name}
          className="product-detail-image"
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
          }}
        />

        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">{formatPrice(product.price)}</p>
          <p className="product-detail-description">{product.description}</p>

          <button type="button" className="product-detail-add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {added && <p className="product-detail-added">Added to cart!</p>}
        </div>
      </div>
    </div>
  );
}
