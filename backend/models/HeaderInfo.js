const mongoose = require('mongoose');

const headerInfoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['shipping', 'discount', 'guarantee'],
    unique: true
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  settings: {
    // 針對運費設定
    freeShippingThreshold: {
      type: Number,
      default: 1000,
    },
    // 針對折扣設定
    discountPercentage: {
      type: Number,
      default: 85,
    },
    // 其他動態設定
    customValue: {
      type: String,
      default: '',
    }
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

headerInfoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('HeaderInfo', headerInfoSchema); 