const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
    default: 'percentage'
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minimumAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  maximumDiscount: {
    type: Number,
    min: 0
  },
  usageLimit: {
    type: Number,
    min: 1
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validTo: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  applicableCategories: [{
    type: String
  }],
  userRestrictions: {
    newUsersOnly: {
      type: Boolean,
      default: false
    },
    specificUsers: [{
      type: String // 用戶 email 或 ID
    }]
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

// 添加索引
couponSchema.index({ code: 1 });
couponSchema.index({ validFrom: 1, validTo: 1 });
couponSchema.index({ isActive: 1 });

// 中間件
couponSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 實例方法
couponSchema.methods.isValid = function() {
  const now = new Date();
  return this.isActive &&
         this.validFrom <= now &&
         this.validTo >= now &&
         (!this.usageLimit || this.usedCount < this.usageLimit);
};

couponSchema.methods.canUse = function(cartTotal, products = [], userEmail = null) {
  if (!this.isValid()) {
    return { valid: false, reason: '優惠券已過期或不可用' };
  }

  // 檢查最低消費金額
  if (cartTotal < this.minimumAmount) {
    return {
      valid: false,
      reason: `最低消費金額為 NT$ ${this.minimumAmount.toLocaleString()}`
    };
  }

  // 檢查產品限制
  if (this.applicableProducts.length > 0) {
    const hasApplicableProduct = products.some(product =>
      this.applicableProducts.includes(product._id || product.id)
    );
    if (!hasApplicableProduct) {
      return { valid: false, reason: '此優惠券不適用於購物車中的商品' };
    }
  }

  // 檢查用戶限制
  if (this.userRestrictions.newUsersOnly && userEmail) {
    // 這裡可以添加檢查用戶是否為新用戶的邏輯
  }

  if (this.userRestrictions.specificUsers.length > 0 && userEmail) {
    if (!this.userRestrictions.specificUsers.includes(userEmail)) {
      return { valid: false, reason: '此優惠券僅限特定用戶使用' };
    }
  }

  return { valid: true };
};

couponSchema.methods.calculateDiscount = function(cartTotal, products = []) {
  const validation = this.canUse(cartTotal, products);
  if (!validation.valid) {
    return { discount: 0, reason: validation.reason };
  }

  let discount = 0;

  if (this.discountType === 'percentage') {
    discount = cartTotal * (this.discountValue / 100);
    // 如果有最大折扣限制
    if (this.maximumDiscount && discount > this.maximumDiscount) {
      discount = this.maximumDiscount;
    }
  } else if (this.discountType === 'fixed') {
    discount = Math.min(this.discountValue, cartTotal);
  }

  return {
    discount: Math.round(discount),
    finalAmount: Math.max(0, cartTotal - discount)
  };
};

// 靜態方法
couponSchema.statics.findValidCoupons = function() {
  const now = new Date();
  return this.find({
    isActive: true,
    validFrom: { $lte: now },
    validTo: { $gte: now },
    $or: [
      { usageLimit: { $exists: false } },
      { $expr: { $lt: ['$usedCount', '$usageLimit'] } }
    ]
  });
};

module.exports = mongoose.model('Coupon', couponSchema);
