const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// 創建訂單
router.post('/', async (req, res) => {
    try {
        const { userId, shippingInfo, customerNote } = req.body;
        
        // 獲取購物車
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: '購物車為空' });
        }
        
        // 檢查庫存
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).json({ message: `商品 ${item.productName} 不存在` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    message: `商品 ${item.productName} 庫存不足，目前庫存：${product.stock}` 
                });
            }
        }
        
        // 生成訂單編號
        const orderNumber = Order.generateOrderNumber();
        
        // 創建訂單
        const order = new Order({
            orderNumber,
            userId,
            userEmail: cart.userEmail,
            items: cart.items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                productImage: item.productImage,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.subtotal
            })),
            shippingInfo: {
                ...shippingInfo,
                shippingFee: 0 // 將在 calculateTotal 中計算
            },
            subtotal: cart.totalAmount,
            couponCode: cart.couponCode,
            couponDiscount: cart.couponDiscount,
            totalAmount: 0, // 將在 calculateTotal 中計算
            customerNote: customerNote || ''
        });
        
        // 計算總金額
        order.calculateTotal();
        
        // 保存訂單
        await order.save();
        
        // 更新商品庫存
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } }
            );
        }
        
        // 清空購物車
        cart.clearCart();
        await cart.save();
        
        res.status(201).json({ 
            message: '訂單創建成功', 
            order,
            orderNumber: order.orderNumber
        });
    } catch (error) {
        console.error('創建訂單失敗:', error);
        res.status(500).json({ message: '創建訂單失敗', error: error.message });
    }
});

// 獲取用戶訂單列表
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10, status } = req.query;
        
        const query = { userId };
        if (status) {
            query.status = status;
        }
        
        const orders = await Order.find(query)
            .sort({ orderDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('items.productId');
        
        const total = await Order.countDocuments(query);
        
        res.json({
            orders,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('獲取訂單列表失敗:', error);
        res.status(500).json({ message: '獲取訂單列表失敗', error: error.message });
    }
});

// 獲取單個訂單詳情
router.get('/:orderNumber', async (req, res) => {
    try {
        const { orderNumber } = req.params;
        
        const order = await Order.findOne({ orderNumber }).populate('items.productId');
        if (!order) {
            return res.status(404).json({ message: '訂單不存在' });
        }
        
        res.json(order);
    } catch (error) {
        console.error('獲取訂單詳情失敗:', error);
        res.status(500).json({ message: '獲取訂單詳情失敗', error: error.message });
    }
});

// 管理員獲取所有訂單
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 20, status, search } = req.query;
        
        const query = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { orderNumber: { $regex: search, $options: 'i' } },
                { userEmail: { $regex: search, $options: 'i' } },
                { 'shippingInfo.name': { $regex: search, $options: 'i' } }
            ];
        }
        
        const orders = await Order.find(query)
            .sort({ orderDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('items.productId');
        
        const total = await Order.countDocuments(query);
        
        // 計算統計數據
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalAmount' }
                }
            }
        ]);
        
        res.json({
            orders,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            stats
        });
    } catch (error) {
        console.error('獲取訂單列表失敗:', error);
        res.status(500).json({ message: '獲取訂單列表失敗', error: error.message });
    }
});

// 更新訂單狀態
router.put('/:orderNumber/status', async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const { status, adminNote } = req.body;
        
        const order = await Order.findOne({ orderNumber });
        if (!order) {
            return res.status(404).json({ message: '訂單不存在' });
        }
        
        order.updateStatus(status);
        if (adminNote) {
            order.adminNote = adminNote;
        }
        
        await order.save();
        
        res.json({ message: '訂單狀態已更新', order });
    } catch (error) {
        console.error('更新訂單狀態失敗:', error);
        res.status(500).json({ message: '更新訂單狀態失敗', error: error.message });
    }
});

// 更新付款狀態
router.put('/:orderNumber/payment', async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const { paymentStatus, paymentMethod } = req.body;
        
        const order = await Order.findOne({ orderNumber });
        if (!order) {
            return res.status(404).json({ message: '訂單不存在' });
        }
        
        order.paymentStatus = paymentStatus;
        if (paymentMethod) {
            order.paymentMethod = paymentMethod;
        }
        
        await order.save();
        
        res.json({ message: '付款狀態已更新', order });
    } catch (error) {
        console.error('更新付款狀態失敗:', error);
        res.status(500).json({ message: '更新付款狀態失敗', error: error.message });
    }
});

// 取消訂單
router.put('/:orderNumber/cancel', async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const { reason } = req.body;
        
        const order = await Order.findOne({ orderNumber });
        if (!order) {
            return res.status(404).json({ message: '訂單不存在' });
        }
        
        if (order.status === 'shipped' || order.status === 'delivered' || order.status === 'completed') {
            return res.status(400).json({ message: '此訂單狀態無法取消' });
        }
        
        // 恢復庫存
        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: item.quantity } }
            );
        }
        
        order.updateStatus('cancelled');
        order.adminNote = reason || '訂單已取消';
        
        await order.save();
        
        res.json({ message: '訂單已取消', order });
    } catch (error) {
        console.error('取消訂單失敗:', error);
        res.status(500).json({ message: '取消訂單失敗', error: error.message });
    }
});

module.exports = router;
