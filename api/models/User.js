const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  // OAuth 2.0 相關字段（為未來準備）
  oauthProvider: { type: String }, // 'google', 'facebook', 'github' 等
  oauthId: { type: String }, // OAuth 提供商的用戶 ID
  // 其他應用程式特定的使用者資料
  cart: [{ productId: String, quantity: Number }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  preferences: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
