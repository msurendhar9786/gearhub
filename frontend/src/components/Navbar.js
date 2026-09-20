import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">GearHub</Link>
      <div className="nav-links">
        <Link to="/?category=laptop">Laptops</Link>
        <Link to="/?category=headphone">Headphones</Link>
        <Link to="/?category=mouse">mouse</Link>
        <Link to="/?category=keyboard">Keyboards</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <button className="link-btn" onClick={handleLogout}>Logout ({user.name})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
