import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">GearHub</Link>
          <p>Gaming gear built for your next win.</p>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <Link to="/?category=laptop">Laptops</Link>
          <Link to="/?category=headphone">Headphones</Link>
          <Link to="/?category=mouse">Mice</Link>
          <Link to="/?category=keyboard">Keyboards</Link>
        </div>

        <div className="footer-column">
          <h3>Account</h3>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GearHub</span>
        <span>Fast gear. Fair prices. Zero excuses.</span>
      </div>
    </footer>
  );
}
