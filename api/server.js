const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const productRoutes = require('./routes/productRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const blogRoutes = require('./routes/blogRoutes');
const couponRoutes = require('./routes/couponRoutes');
const headerInfoRoutes = require('./routes/headerInfoRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global connection variable for caching
let cachedConnection = null;

// MongoDB connection with proper serverless optimization
const connectDB = async () => {
  // Return cached connection if it exists and is ready
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    // Configure mongoose for serverless environment
    mongoose.set('strictQuery', false);
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://aistorm0910:derWbD9u9MW4GRJt@ivan.w6ickfj.mongodb.net/auraway-shop';
    
    // Optimized connection options for Vercel serverless
    const connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 1, // Maintain up to 1 socket connection
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
    });

    console.log('New MongoDB connection established');
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Routes
app.use('/api/products', productRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/header-info', headerInfoRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Auraway Shop API is running',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Export for Vercel with connection management
module.exports = async (req, res) => {
  try {
    // Ensure database connection before handling requests
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message 
    });
  }
}; 