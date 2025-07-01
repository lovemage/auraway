const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Import routes
const productRoutes = require('./routes/productRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const blogRoutes = require('./routes/blogRoutes');
const couponRoutes = require('./routes/couponRoutes');
const headerInfoRoutes = require('./routes/headerInfoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiNutritionistRoutes = require('./routes/aiNutritionistRoutes');

const app = express();

const authenticateFirebaseToken = require('./middleware/authMiddleware');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from backend/public directory
app.use(express.static('public'));

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
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MongoDB URI is not defined. Please set MONGODB_URI environment variable.');
    }
    
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
app.use('/api/ai-nutritionist', aiNutritionistRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Auraway Shop API is running',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Admin UI route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// Root route
app.get('/api/', (req, res) => {
  res.send(`
    <div style="font-family: 'Roboto', sans-serif; text-align: center; padding: 50px;">
      <h1>🎉 Auraway Shop Backend API</h1>
      <p style="font-size: 18px; color: #666; margin: 20px 0;">後端服務器運行正常</p>
      <div style="margin: 30px 0;">
        <a href="/admin" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: 500;">
          🖥️ 進入後台管理系統
        </a>
      </div>
      <div style="margin-top: 30px; color: #888;">
        <p>API端點：</p>
        <p>• <a href="/api/products">/api/products</a> - 產品管理</p>
        <p>• <a href="/api/announcements">/api/announcements</a> - 公告管理</p>
        <p>• <a href="/api/coupons">/api/coupons</a> - 優惠券管理</p>
      </div>
    </div>
  `);
});

// 範例：保護一個需要認證的路由
app.get('/api/protected-data', authenticateFirebaseToken, (req, res) => {
  // 只有經過認證的使用者才能訪問這裡
  // req.user 包含 Firebase 的使用者資訊 (uid, email 等)
  // req.mongoUser 包含 MongoDB 中的使用者文件
  res.json({
    message: '這是受保護的資料！',
    firebaseUser: req.user,
    mongoUser: req.mongoUser
  });
});

// 處理前端註冊後，將 Firebase UID 儲存到 MongoDB 的路由
app.post('/api/register-user-data', authenticateFirebaseToken, async (req, res) => {
  try {
    // authenticateFirebaseToken 中間件已經將 Firebase 使用者資訊放在 req.user 中
    const firebaseUid = req.user.uid;
    const email = req.user.email; // 或者從 req.body 中獲取，但從 req.user 更可靠

    // 檢查使用者是否已經存在於 MongoDB (雖然 authMiddleware 已經做了初步檢查)
    let user = await User.findOne({ firebaseUid: firebaseUid });

    if (user) {
      return res.status(200).json({ message: '使用者已存在於 MongoDB', user });
    }

    // 在 MongoDB 中建立新的使用者文件
    user = new User({
      firebaseUid: firebaseUid,
      email: email,
      // 您可以在這裡添加其他預設的使用者資料
      // name: req.body.name || '新用戶', // 假設前端也發送了 name
    });

    await user.save();
    res.status(201).json({ message: '使用者資料已成功儲存到 MongoDB', user });

  } catch (error) {
    console.error('儲存使用者資料到 MongoDB 失敗:', error);
    res.status(500).json({ message: '伺服器錯誤，無法儲存使用者資料' });
  }
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

// Start the server for local development if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001; // Use 5001 to avoid conflict with frontend
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
} 