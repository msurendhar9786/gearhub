const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  qty: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    totalPrice: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
