const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // Firebase UID 或 session ID
    required: true,
    index: true
  },
  userEmail: {
    type: String,
    index: true
  },
  items: [cartItemSchema],
  appliedCoupon: {
    code: String,
    discountAmount: {
      type: Number,
      default: 0
    }
  },
  subtotal: {
    type: Number,
    default: 0,
    min: 0
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // 30 天後自動刪除
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 索引
cartSchema.index({ userId: 1 });
cartSchema.index({ userEmail: 1 });
cartSchema.index({ updatedAt: 1 });

// 中間件
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.calculateTotals();
  next();
});

// 實例方法
cartSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.total = this.subtotal - this.discountAmount;
  this.total = Math.max(0, this.total); // 確保總額不為負數
};

cartSchema.methods.addItem = function(productId, quantity = 1, price) {
  const existingItem = this.items.find(item => 
    item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.addedAt = new Date();
  } else {
    this.items.push({
      product: productId,
      quantity,
      price,
      addedAt: new Date()
    });
  }

  this.calculateTotals();
  return this;
};

cartSchema.methods.updateItemQuantity = function(productId, quantity) {
  const item = this.items.find(item => 
    item.product.toString() === productId.toString()
  );

  if (item) {
    if (quantity <= 0) {
      this.removeItem(productId);
    } else {
      item.quantity = quantity;
      item.addedAt = new Date();
      this.calculateTotals();
    }
  }

  return this;
};

cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item => 
    item.product.toString() !== productId.toString()
  );
  this.calculateTotals();
  return this;
};

cartSchema.methods.clearCart = function() {
  this.items = [];
  this.appliedCoupon = {};
  this.discountAmount = 0;
  this.calculateTotals();
  return this;
};

cartSchema.methods.applyCoupon = function(couponCode, discountAmount) {
  this.appliedCoupon = {
    code: couponCode,
    discountAmount: discountAmount
  };
  this.discountAmount = discountAmount;
  this.calculateTotals();
  return this;
};

cartSchema.methods.removeCoupon = function() {
  this.appliedCoupon = {};
  this.discountAmount = 0;
  this.calculateTotals();
  return this;
};

cartSchema.methods.getItemCount = function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
};

// 靜態方法
cartSchema.statics.findByUserId = function(userId) {
  return this.findOne({ userId }).populate('items.product');
};

cartSchema.statics.createOrUpdate = function(userId, userEmail = null) {
  return this.findOneAndUpdate(
    { userId },
    { 
      userId, 
      userEmail,
      updatedAt: new Date() 
    },
    { 
      upsert: true, 
      new: true,
      setDefaultsOnInsert: true 
    }
  ).populate('items.product');
};

module.exports = mongoose.model('Cart', cartSchema);
