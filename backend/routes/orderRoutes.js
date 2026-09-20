const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route  POST /api/orders   (place a new order from cart items)
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Build order items from DB (source of truth for price/stock) & reduce stock
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      if (product.stock < item.qty) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        qty: item.qty,
      });

      totalPrice += product.price * item.qty;

      product.stock -= item.qty;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  GET /api/orders/my  (logged in user's orders)
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
