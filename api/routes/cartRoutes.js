const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// 獲取購物車
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { email } = req.query;

    let cart = await Cart.findByUserId(userId);
    
    if (!cart) {
      cart = await Cart.createOrUpdate(userId, email);
    }

    res.json(cart);
  } catch (error) {
    console.error('獲取購物車失敗:', error);
    res.status(500).json({ 
      error: '獲取購物車失敗', 
      message: error.message 
    });
  }
});

// 添加商品到購物車
router.post('/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity = 1 } = req.body;
    const { email } = req.query;

    // 驗證產品
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: '產品不存在' });
    }

    if (!product.isActive) {
      return res.status(400).json({ error: '產品已下架' });
    }

    // 檢查庫存
    if (product.stock !== undefined && product.stock < quantity) {
      return res.status(400).json({ 
        error: '庫存不足', 
        availableStock: product.stock 
      });
    }

    // 獲取或創建購物車
    let cart = await Cart.findByUserId(userId);
    if (!cart) {
      cart = await Cart.createOrUpdate(userId, email);
    }

    // 添加商品
    cart.addItem(productId, quantity, product.price);
    await cart.save();

    // 重新獲取完整的購物車數據
    cart = await Cart.findByUserId(userId);
    
    res.json({
      message: '商品已添加到購物車',
      cart
    });
  } catch (error) {
    console.error('添加商品到購物車失敗:', error);
    res.status(500).json({ 
      error: '添加商品失敗', 
      message: error.message 
    });
  }
});

// 更新購物車商品數量
router.put('/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ error: '數量不能為負數' });
    }

    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: '購物車不存在' });
    }

    // 如果數量為 0，移除商品
    if (quantity === 0) {
      cart.removeItem(productId);
    } else {
      // 檢查庫存
      const product = await Product.findById(productId);
      if (product && product.stock !== undefined && product.stock < quantity) {
        return res.status(400).json({ 
          error: '庫存不足', 
          availableStock: product.stock 
        });
      }

      cart.updateItemQuantity(productId, quantity);
    }

    await cart.save();

    // 重新獲取完整的購物車數據
    const updatedCart = await Cart.findByUserId(userId);
    
    res.json({
      message: '購物車已更新',
      cart: updatedCart
    });
  } catch (error) {
    console.error('更新購物車失敗:', error);
    res.status(500).json({ 
      error: '更新購物車失敗', 
      message: error.message 
    });
  }
});

// 移除購物車商品
router.delete('/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: '購物車不存在' });
    }

    cart.removeItem(productId);
    await cart.save();

    // 重新獲取完整的購物車數據
    const updatedCart = await Cart.findByUserId(userId);
    
    res.json({
      message: '商品已從購物車移除',
      cart: updatedCart
    });
  } catch (error) {
    console.error('移除商品失敗:', error);
    res.status(500).json({ 
      error: '移除商品失敗', 
      message: error.message 
    });
  }
});

// 應用優惠券
router.post('/:userId/coupon', async (req, res) => {
  try {
    const { userId } = req.params;
    const { couponCode } = req.body;
    const { email } = req.query;

    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: '購物車不存在' });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ error: '購物車為空' });
    }

    // 查找優惠券
    const coupon = await Coupon.findOne({ 
      code: couponCode.toUpperCase(),
      isActive: true 
    });

    if (!coupon) {
      return res.status(404).json({ error: '優惠券不存在或已失效' });
    }

    // 驗證優惠券
    const validation = coupon.canUse(cart.subtotal, cart.items, email);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.reason });
    }

    // 計算折扣
    const discountResult = coupon.calculateDiscount(cart.subtotal, cart.items);
    
    // 應用優惠券
    cart.applyCoupon(couponCode.toUpperCase(), discountResult.discount);
    await cart.save();

    // 重新獲取完整的購物車數據
    const updatedCart = await Cart.findByUserId(userId);
    
    res.json({
      message: '優惠券已應用',
      cart: updatedCart,
      discount: discountResult.discount
    });
  } catch (error) {
    console.error('應用優惠券失敗:', error);
    res.status(500).json({ 
      error: '應用優惠券失敗', 
      message: error.message 
    });
  }
});

// 移除優惠券
router.delete('/:userId/coupon', async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: '購物車不存在' });
    }

    cart.removeCoupon();
    await cart.save();

    // 重新獲取完整的購物車數據
    const updatedCart = await Cart.findByUserId(userId);
    
    res.json({
      message: '優惠券已移除',
      cart: updatedCart
    });
  } catch (error) {
    console.error('移除優惠券失敗:', error);
    res.status(500).json({ 
      error: '移除優惠券失敗', 
      message: error.message 
    });
  }
});

// 清空購物車
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: '購物車不存在' });
    }

    cart.clearCart();
    await cart.save();
    
    res.json({
      message: '購物車已清空',
      cart
    });
  } catch (error) {
    console.error('清空購物車失敗:', error);
    res.status(500).json({ 
      error: '清空購物車失敗', 
      message: error.message 
    });
  }
});

module.exports = router;
