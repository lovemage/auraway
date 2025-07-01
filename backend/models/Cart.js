const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    subtotal: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: String, // Firebase UID
        required: true,
        index: true
    },
    userEmail: {
        type: String,
        required: true
    },
    items: [cartItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    itemCount: {
        type: Number,
        required: true,
        default: 0
    },
    couponCode: {
        type: String,
        default: null
    },
    couponDiscount: {
        type: Number,
        default: 0
    },
    finalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// 計算購物車總金額的方法
cartSchema.methods.calculateTotals = function() {
    this.totalAmount = this.items.reduce((total, item) => total + item.subtotal, 0);
    this.itemCount = this.items.reduce((count, item) => count + item.quantity, 0);
    this.finalAmount = this.totalAmount - this.couponDiscount;
    this.lastUpdated = new Date();
};

// 添加商品到購物車
cartSchema.methods.addItem = function(productData, quantity = 1) {
    const existingItemIndex = this.items.findIndex(
        item => item.productId.toString() === productData._id.toString()
    );

    if (existingItemIndex > -1) {
        // 如果商品已存在，增加數量
        this.items[existingItemIndex].quantity += quantity;
        this.items[existingItemIndex].subtotal = 
            this.items[existingItemIndex].quantity * this.items[existingItemIndex].price;
    } else {
        // 添加新商品
        this.items.push({
            productId: productData._id,
            productName: productData.name,
            productImage: productData.images && productData.images.length > 0 ? productData.images[0] : '',
            price: productData.price,
            quantity: quantity,
            subtotal: productData.price * quantity
        });
    }

    this.calculateTotals();
};

// 更新商品數量
cartSchema.methods.updateItemQuantity = function(productId, quantity) {
    const itemIndex = this.items.findIndex(
        item => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
        if (quantity <= 0) {
            this.items.splice(itemIndex, 1);
        } else {
            this.items[itemIndex].quantity = quantity;
            this.items[itemIndex].subtotal = 
                this.items[itemIndex].quantity * this.items[itemIndex].price;
        }
        this.calculateTotals();
        return true;
    }
    return false;
};

// 移除商品
cartSchema.methods.removeItem = function(productId) {
    const itemIndex = this.items.findIndex(
        item => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
        this.items.splice(itemIndex, 1);
        this.calculateTotals();
        return true;
    }
    return false;
};

// 應用優惠券
cartSchema.methods.applyCoupon = function(couponCode, discountAmount) {
    this.couponCode = couponCode;
    this.couponDiscount = discountAmount;
    this.calculateTotals();
};

// 清空購物車
cartSchema.methods.clearCart = function() {
    this.items = [];
    this.couponCode = null;
    this.couponDiscount = 0;
    this.calculateTotals();
};

// 更新時間戳
cartSchema.pre('save', function(next) {
    this.lastUpdated = new Date();
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
