import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { formatPrice } from '../utils/currency';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/orders/my').then(setOrders).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container">
      <h2>My Orders</h2>
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> {formatPrice(order.totalPrice)}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} x {item.qty} - {formatPrice(item.price * item.qty)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
