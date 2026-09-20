// Run with: npm run seed
// Populates the database with sample gaming gear products.
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'ASUS ROG Strix G16 Gaming Laptop',
    category: 'laptop',
    brand: 'ASUS',
    description: 'Intel Core i7, RTX 4060, 16GB RAM, 165Hz display.',
    price: 1299.99,
    stock: 10,
    image: '/images/asus-rog-strix-g16.webp',
  },
  {
    name: 'Lenovo Legion 5 Pro',
    category: 'laptop',
    brand: 'Lenovo',
    description: 'Ryzen 7, RTX 4070, 32GB RAM, QHD 165Hz panel.',
    price: 1499.0,
    stock: 8,
    image: '/images/lenovo-legion-5-pro.webp',
  },
  {
    name: 'HyperX Cloud II Gaming Headset',
    category: 'headphone',
    brand: 'HyperX',
    description: '7.1 virtual surround sound, memory foam ear cushions.',
    price: 79.99,
    stock: 25,
    image: '/images/hyperx-cloud-ii.webp',
  },
  {
    name: 'SteelSeries Arctis Nova Pro',
    category: 'headphone',
    brand: 'SteelSeries',
    description: 'Hi-Res audio, active noise cancellation, wireless.',
    price: 199.99,
    stock: 15,
    image: '/images/steelseries-arctis-nova-pro.webp',
  },
  {
    name: 'Logitech G Pro X Superlight',
    category: 'mouse',
    brand: 'Logitech',
    description: 'Ultra-lightweight wireless gaming mouse, 25K DPI sensor.',
    price: 149.99,
    stock: 30,
    image: '/images/logitech-g-pro-x-superlight.webp',
  },
  {
    name: 'Razer DeathAdder V3',
    category: 'mouse',
    brand: 'Razer',
    description: 'Ergonomic shape, 30K DPI optical sensor, 90hr battery.',
    price: 99.99,
    stock: 20,
    image: '/images/razer-deathadder-v3.webp',
  },
  {
    name: 'Corsair K70 RGB Pro Mechanical Keyboard',
    category: 'keyboard',
    brand: 'Corsair',
    description: 'Cherry MX switches, per-key RGB, aluminum frame.',
    price: 169.99,
    stock: 18,
    image: '/images/corsair-k70-rgb-pro.webp',
  },
  {
    name: 'Keychron K8 Pro',
    category: 'keyboard',
    brand: 'Keychron',
    description: 'Hot-swappable mechanical keyboard, wireless & wired.',
    price: 109.99,
    stock: 22,
    image: '/images/keychron-k8-pro.webp',
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded');

    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true,
      });
      console.log('Admin user created: admin@example.com / admin123');
    }

    console.log('Seeding complete');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
