import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p className="brand">{product.brand}</p>
      <p className="price">{formatPrice(product.price)}</p>
      <p className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </p>
      <Link to={`/product/${product._id}`} className="btn">View</Link>
    </div>
  );
}
