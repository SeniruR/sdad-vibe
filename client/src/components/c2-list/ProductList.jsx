import { Link } from 'react-router-dom';
import './ProductList.css';

const placeholderImage = 'https://placehold.co/600x400?text=CeylonCart';

export default function ProductList({ products = [] }) {
  if (!products || products.length === 0) {
    return <p className="product-list-empty">No products found</p>;
  }

  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          className="product-card"
        >
          <img
            src={product.image || placeholderImage}
            alt={product.name}
            className="product-card-image"
            onError={(event) => {
              event.currentTarget.src = placeholderImage;
            }}
          />

          <div className="product-card-body">
            <span className="product-category">{product.category}</span>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${Number(product.price).toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
