const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productImage: String,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    default: '台灣',
    trim: true
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String, // Firebase UID
    required: true,
    index: true
  },
  userEmail: {
    type: String,
    required: true,
    index: true,
    lowercase: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    type: shippingAddressSchema,
    required: true
  },
  shippingMethod: {
    type: String,
    required: true,
    enum: [
      '7-11付款取貨',
      '先付款-店到店7-11',
      '先付款-店到店-全家',
      '先付款-外島7-11',
      '先付款-宅配'
    ],
    default: '7-11付款取貨'
  },
  shippingFee: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'credit_card', 'bank_transfer', 'line_pay'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
    index: true
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    index: true
  },
  appliedCoupon: {
    code: String,
    discountAmount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  customerNote: {
    type: String,
    trim: true
  },
  adminNotes: [{
    note: String,
    createdBy: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  trackingNumber: String,
  estimatedDelivery: Date,
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 索引
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ userEmail: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1, createdAt: -1 });

// 中間件
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 生成訂單號碼
orderSchema.statics.generateOrderNumber = function() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const timestamp = now.getTime().toString().slice(-6);
  
  return `AW${year}${month}${day}${timestamp}`;
};

// 實例方法
orderSchema.methods.addAdminNote = function(note, createdBy = 'admin') {
  this.adminNotes.push({
    note,
    createdBy,
    createdAt: new Date()
  });
  return this;
};

orderSchema.methods.updateStatus = function(orderStatus, paymentStatus = null) {
  this.orderStatus = orderStatus;
  if (paymentStatus) {
    this.paymentStatus = paymentStatus;
  }
  
  // 自動設置交付時間
  if (orderStatus === 'delivered' && !this.deliveredAt) {
    this.deliveredAt = new Date();
  }
  
  return this;
};

orderSchema.methods.calculateTotal = function() {
  this.subtotal = this.items.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
  
  this.total = this.subtotal - this.discountAmount + this.shippingFee;
  this.total = Math.max(0, this.total);
  
  return this;
};

// 靜態方法
orderSchema.statics.findByUser = function(userId, limit = 10) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('items.product');
};

orderSchema.statics.findByOrderNumber = function(orderNumber) {
  return this.findOne({ orderNumber }).populate('items.product');
};

module.exports = mongoose.model('Order', orderSchema);
