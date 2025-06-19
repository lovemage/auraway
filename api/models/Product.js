const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    default: '健康保健',
  },
  badge: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  descriptionImage: {
    type: String,
    default: '',
  },
  specifications: {
    content: String,        // 內容量
    storage: String,        // 保存方式
    origin: String,         // 產地
    ingredients: String,    // 成分
    usage: String,          // 食用方法
    features: [String],     // 商品特色
  },
  tags: [{
    type: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
