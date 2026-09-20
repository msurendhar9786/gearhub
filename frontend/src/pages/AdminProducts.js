import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { formatPrice, inrToUsd } from '../utils/currency';

const emptyForm = { name: '', category: 'laptop', brand: '', description: '', price: '', stock: '', image: '' };

export default function AdminProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadProducts = () => api.get('/products').then(setProducts).catch((err) => setError(err.message));

  useEffect(() => { loadProducts(); }, []);

  if (!user || !user.isAdmin) {
    return <div className="container"><p>Admin access only.</p></div>;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, price: inrToUsd(form.price), stock: Number(form.stock) };
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, category: p.category, brand: p.brand, description: p.description, price: Math.round(p.price * 83), stock: p.stock, image: p.image });
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  return (
    <div className="container">
      <h2>Admin - Manage Products</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="laptop">Laptop</option>
          <option value="headphone">Headphone</option>
          <option value="mouse">Mouse</option>
          <option value="keyboard">Keyboard</option>
        </select>
        <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price in INR" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input name="image" placeholder="Local image path, e.g. /images/product.webp" value={form.image} onChange={handleChange} />
        <button type="submit" className="btn">{editingId ? 'Update Product' : 'Add Product'}</button>
        {editingId && <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Cancel</button>}
      </form>

      <table className="admin-table">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
