import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then(setProduct).catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="container"><p className="error">{error}</p></div>;
  if (!product) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container product-detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p className="brand">{product.brand}</p>
        <p>{product.description}</p>
        <p className="price">{formatPrice(product.price)}</p>
        <p>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>

        {product.stock > 0 && (
          <div className="qty-row">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
            <button
              className="btn"
              onClick={() => {
                addToCart(product, qty);
                navigate('/cart');
              }}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
