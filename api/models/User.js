const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true }, // 儲存 Firebase UID
  email: { type: String, required: true, unique: true },
  name: { type: String },
  // 其他應用程式特定的使用者資料，例如：
  cart: [{ productId: String, quantity: Number }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  preferences: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
