import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (category) query.set('category', category);
        if (search) query.set('search', search);
        const data = await api.get(`/products?${query.toString()}`);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  return (
    <div className="container">
      <div className="hero">
        <h1>Gear up for the win</h1>
        <p>Laptops, headphones, mouse & keyboards for competitive gaming.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(e.target.search.value);
          }}
        >
          <input name="search" placeholder="Search products..." />
          <button type="submit" className="btn">Search</button>
        </form>
      </div>

      <div className="category-filters">
        <button onClick={() => setSearchParams({})} className={!category ? 'active' : ''}>All</button>
        <button onClick={() => setSearchParams({ category: 'laptop' })} className={category === 'laptop' ? 'active' : ''}>Laptops</button>
        <button onClick={() => setSearchParams({ category: 'headphone' })} className={category === 'headphone' ? 'active' : ''}>Headphones</button>
        <button onClick={() => setSearchParams({ category: 'mouse' })} className={category === 'mouse' ? 'active' : ''}>Mouse</button>
        <button onClick={() => setSearchParams({ category: 'keyboard' })} className={category === 'keyboard' ? 'active' : ''}>Keyboards</button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
        {!loading && products.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}
