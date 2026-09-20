import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);
    try {
      const order = await api.post('/orders', {
        items: cartItems.map((i) => ({ product: i.product, qty: i.qty })),
        shippingAddress: address,
      });
      clearCart();
      navigate(`/orders`);
      console.log('Order placed:', order._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return <div className="container"><p>Your cart is empty.</p></div>;
  }

  return (
    <div className="container auth-form">
      <h2>Checkout</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={placeOrder}>
        <input name="address" placeholder="Address" value={address.address} onChange={handleChange} required />
        <input name="city" placeholder="City" value={address.city} onChange={handleChange} required />
        <input name="postalCode" placeholder="Postal Code" value={address.postalCode} onChange={handleChange} required />
        <input name="country" placeholder="Country" value={address.country} onChange={handleChange} required />
        <h3>Total: {formatPrice(totalPrice)}</h3>
        <button type="submit" className="btn" disabled={placing}>
          {placing ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
