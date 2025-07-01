const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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
        min: 1
    },
    subtotal: {
        type: Number,
        required: true
    }
});

const shippingInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    lineId: {
        type: String,
        default: ''
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
        default: 0
    },
    address: {
        type: String,
        default: ''
    },
    storeName: {
        type: String,
        default: ''
    },
    storeAddress: {
        type: String,
        default: ''
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
        required: true
    },
    items: [orderItemSchema],
    shippingInfo: shippingInfoSchema,
    
    // 金額相關
    subtotal: {
        type: Number,
        required: true
    },
    shippingFee: {
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
    totalAmount: {
        type: Number,
        required: true
    },
    
    // 訂單狀態
    status: {
        type: String,
        required: true,
        enum: [
            'pending',      // 待處理
            'confirmed',    // 已確認
            'processing',   // 處理中
            'shipped',      // 已出貨
            'delivered',    // 已送達
            'completed',    // 已完成
            'cancelled'     // 已取消
        ],
        default: 'pending'
    },
    
    // 付款相關
    paymentStatus: {
        type: String,
        required: true,
        enum: [
            'unpaid',       // 未付款
            'paid',         // 已付款
            'refunded'      // 已退款
        ],
        default: 'unpaid'
    },
    paymentMethod: {
        type: String,
        default: ''
    },
    
    // 備註
    customerNote: {
        type: String,
        default: ''
    },
    adminNote: {
        type: String,
        default: ''
    },
    
    // 時間戳記
    orderDate: {
        type: Date,
        default: Date.now
    },
    confirmedAt: {
        type: Date,
        default: null
    },
    shippedAt: {
        type: Date,
        default: null
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    completedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// 生成訂單編號
orderSchema.statics.generateOrderNumber = function() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = now.getTime().toString().slice(-6);
    
    return `AW${year}${month}${day}${timestamp}`;
};

// 計算運費
orderSchema.methods.calculateShippingFee = function() {
    switch (this.shippingInfo.shippingMethod) {
        case '7-11付款取貨':
            return 0;
        case '先付款-店到店7-11':
            return 0;
        case '先付款-店到店-全家':
            return 0;
        case '先付款-外島7-11':
            return 140;
        case '先付款-宅配':
            return 80;
        default:
            return 0;
    }
};

// 更新訂單狀態
orderSchema.methods.updateStatus = function(newStatus) {
    this.status = newStatus;
    const now = new Date();
    
    switch (newStatus) {
        case 'confirmed':
            this.confirmedAt = now;
            break;
        case 'shipped':
            this.shippedAt = now;
            break;
        case 'delivered':
            this.deliveredAt = now;
            break;
        case 'completed':
            this.completedAt = now;
            break;
    }
};

// 計算總金額
orderSchema.methods.calculateTotal = function() {
    this.shippingFee = this.calculateShippingFee();
    this.totalAmount = this.subtotal + this.shippingFee - this.couponDiscount;
};

// 索引
orderSchema.index({ userId: 1, orderDate: -1 });
orderSchema.index({ status: 1, orderDate: -1 });
orderSchema.index({ orderNumber: 1 });

module.exports = mongoose.model('Order', orderSchema);
