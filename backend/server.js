const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/auraway-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const couponRoutes = require('./routes/couponRoutes');
const headerInfoRoutes = require('./routes/headerInfoRoutes');

app.use('/api/products', productRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/header-info', headerInfoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: 'Roboto', sans-serif; text-align: center; padding: 50px;">
      <h1>🎉 Auraway Shop Backend API</h1>
      <p style="font-size: 18px; color: #666; margin: 20px 0;">後端服務器運行正常</p>
      <div style="margin: 30px 0;">
        <a href="/admin.html" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: 500;">
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
