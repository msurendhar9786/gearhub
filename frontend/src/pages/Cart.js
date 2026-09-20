import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/currency';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping</Link></p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <p>{item.name}</p>
                <p>{formatPrice(item.price)}</p>
              </div>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item.product, Number(e.target.value))}
              />
              <button className="link-btn" onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
          ))}
          <h3>Total: {formatPrice(totalPrice)}</h3>
          <button
            className="btn"
            onClick={() => navigate(user ? '/checkout' : '/login')}
          >
            {user ? 'Checkout' : 'Login to Checkout'}
          </button>
        </>
      )}
    </div>
  );
}
