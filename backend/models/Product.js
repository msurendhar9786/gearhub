const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['laptop', 'headphone', 'mouse', 'keyboard'],
    },
    brand: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
