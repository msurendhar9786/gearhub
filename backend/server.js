const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MERN Ecommerce API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
const RETRY_DELAY_MS = 5000;

const startServer = async () => {
  while (true) {
    try {
      await connectDB();
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      return;
    } catch (err) {
      console.error(`Server startup paused. Retrying MongoDB connection in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

startServer();
