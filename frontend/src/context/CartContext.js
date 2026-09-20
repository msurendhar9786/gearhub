import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product === product._id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [
        ...prev,
        {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product !== productId));
  };

  const updateQty = (productId, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product === productId ? { ...item, qty } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
