const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// 創建訂單
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      shippingAddress,
      shippingMethod = '7-11付款取貨',
      paymentMethod = 'cod',
      customerNote
    } = req.body;

    // 獲取購物車
    const cart = await Cart.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: '購物車為空' });
    }

    // 驗證庫存
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ 
          error: `產品 ${item.product} 不存在` 
        });
      }
      
      if (!product.isActive) {
        return res.status(400).json({ 
          error: `產品 ${product.name} 已下架` 
        });
      }

      if (product.stock !== undefined && product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `產品 ${product.name} 庫存不足，可用庫存：${product.stock}` 
        });
      }
    }

    // 計算運費
    const shippingFeeMap = {
      '7-11付款取貨': 0,
      '先付款-店到店7-11': 0,
      '先付款-店到店-全家': 0,
      '先付款-外島7-11': 140,
      '先付款-宅配': 80
    };
    const shippingFee = shippingFeeMap[shippingMethod] || 0;

    // 準備訂單項目
    const orderItems = await Promise.all(cart.items.map(async (item) => {
      const product = await Product.findById(item.product);
      return {
        product: item.product,
        productName: product.name,
        productImage: product.images && product.images[0],
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      };
    }));

    // 創建訂單
    const order = new Order({
      orderNumber: Order.generateOrderNumber(),
      userId,
      userEmail,
      items: orderItems,
      shippingAddress,
      shippingMethod,
      shippingFee,
      paymentMethod,
      appliedCoupon: cart.appliedCoupon,
      subtotal: cart.subtotal,
      discountAmount: cart.discountAmount,
      total: cart.subtotal - cart.discountAmount + shippingFee,
      customerNote
    });

    await order.save();

    // 更新產品庫存
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product && product.stock !== undefined) {
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();
      }
    }

    // 更新優惠券使用次數
    if (cart.appliedCoupon && cart.appliedCoupon.code) {
      await Coupon.findOneAndUpdate(
        { code: cart.appliedCoupon.code },
        { $inc: { usedCount: 1 } }
      );
    }

    // 清空購物車
    cart.clearCart();
    await cart.save();

    res.status(201).json({
      message: '訂單創建成功',
      order: await Order.findById(order._id).populate('items.product')
    });
  } catch (error) {
    console.error('創建訂單失敗:', error);
    res.status(500).json({ 
      error: '創建訂單失敗', 
      message: error.message 
    });
  }
});

// 獲取用戶訂單列表
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('items.product');

    const total = await Order.countDocuments({ userId });

    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: total
      }
    });
  } catch (error) {
    console.error('獲取訂單列表失敗:', error);
    res.status(500).json({ 
      error: '獲取訂單列表失敗', 
      message: error.message 
    });
  }
});

// 根據訂單號獲取訂單詳情
router.get('/number/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findByOrderNumber(orderNumber);
    if (!order) {
      return res.status(404).json({ error: '訂單不存在' });
    }

    res.json(order);
  } catch (error) {
    console.error('獲取訂單詳情失敗:', error);
    res.status(500).json({ 
      error: '獲取訂單詳情失敗', 
      message: error.message 
    });
  }
});

// 獲取訂單詳情
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('items.product');
    if (!order) {
      return res.status(404).json({ error: '訂單不存在' });
    }

    res.json(order);
  } catch (error) {
    console.error('獲取訂單詳情失敗:', error);
    res.status(500).json({ 
      error: '獲取訂單詳情失敗', 
      message: error.message 
    });
  }
});

// 更新訂單狀態 (管理員)
router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, paymentStatus, trackingNumber, adminNote } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: '訂單不存在' });
    }

    if (orderStatus) {
      order.updateStatus(orderStatus, paymentStatus);
    }

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    if (adminNote) {
      order.addAdminNote(adminNote);
    }

    await order.save();

    res.json({
      message: '訂單狀態已更新',
      order: await Order.findById(orderId).populate('items.product')
    });
  } catch (error) {
    console.error('更新訂單狀態失敗:', error);
    res.status(500).json({ 
      error: '更新訂單狀態失敗', 
      message: error.message 
    });
  }
});

// 取消訂單
router.put('/:orderId/cancel', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: '訂單不存在' });
    }

    if (['shipped', 'delivered'].includes(order.orderStatus)) {
      return res.status(400).json({ error: '訂單已出貨，無法取消' });
    }

    order.updateStatus('cancelled');
    if (reason) {
      order.addAdminNote(`訂單取消原因：${reason}`);
    }

    // 恢復庫存
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product && product.stock !== undefined) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await order.save();

    res.json({
      message: '訂單已取消',
      order: await Order.findById(orderId).populate('items.product')
    });
  } catch (error) {
    console.error('取消訂單失敗:', error);
    res.status(500).json({ 
      error: '取消訂單失敗', 
      message: error.message 
    });
  }
});

// 獲取所有訂單 (管理員)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      paymentStatus,
      search 
    } = req.query;

    const filter = {};
    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } },
        { 'shippingAddress.fullName': { $regex: search, $options: 'i' } }
      ];
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('items.product');

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: total
      }
    });
  } catch (error) {
    console.error('獲取訂單列表失敗:', error);
    res.status(500).json({ 
      error: '獲取訂單列表失敗', 
      message: error.message 
    });
  }
});

module.exports = router;
