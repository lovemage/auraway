const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// 獲取用戶購物車
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        let cart = await Cart.findOne({ userId }).populate('items.productId');
        
        if (!cart) {
            // 如果購物車不存在，創建一個空的購物車
            const userEmail = req.query.email && req.query.email.trim() ? req.query.email.trim() : 'guest@auraway.com';
            cart = new Cart({
                userId,
                userEmail,
                items: [],
                totalAmount: 0,
                itemCount: 0,
                finalAmount: 0
            });
            await cart.save();
        }
        
        res.json(cart);
    } catch (error) {
        console.error('獲取購物車失敗:', error);
        res.status(500).json({ message: '獲取購物車失敗', error: error.message });
    }
});

// 添加商品到購物車
router.post('/:userId/items', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity = 1 } = req.body;
        
        // 獲取商品資訊
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: '商品不存在' });
        }
        
        // 檢查庫存
        if (product.stock < quantity) {
            return res.status(400).json({ message: '庫存不足' });
        }
        
        // 獲取或創建購物車
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                userEmail: req.body.userEmail || 'guest@auraway.com',
                items: [],
                totalAmount: 0,
                itemCount: 0,
                finalAmount: 0
            });
        }
        
        // 添加商品到購物車
        cart.addItem(product, quantity);
        await cart.save();
        
        res.json({ message: '商品已添加到購物車', cart });
    } catch (error) {
        console.error('添加商品到購物車失敗:', error);
        res.status(500).json({ message: '添加商品失敗', error: error.message });
    }
});

// 更新購物車商品數量
router.put('/:userId/items/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;
        
        if (quantity < 0) {
            return res.status(400).json({ message: '數量不能為負數' });
        }
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: '購物車不存在' });
        }
        
        // 如果數量為0，則移除商品
        if (quantity === 0) {
            cart.removeItem(productId);
        } else {
            // 檢查商品庫存
            const product = await Product.findById(productId);
            if (product && product.stock < quantity) {
                return res.status(400).json({ message: '庫存不足' });
            }
            
            const updated = cart.updateItemQuantity(productId, quantity);
            if (!updated) {
                return res.status(404).json({ message: '購物車中沒有此商品' });
            }
        }
        
        await cart.save();
        res.json({ message: '購物車已更新', cart });
    } catch (error) {
        console.error('更新購物車失敗:', error);
        res.status(500).json({ message: '更新購物車失敗', error: error.message });
    }
});

// 從購物車移除商品
router.delete('/:userId/items/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: '購物車不存在' });
        }
        
        const removed = cart.removeItem(productId);
        if (!removed) {
            return res.status(404).json({ message: '購物車中沒有此商品' });
        }
        
        await cart.save();
        res.json({ message: '商品已從購物車移除', cart });
    } catch (error) {
        console.error('移除商品失敗:', error);
        res.status(500).json({ message: '移除商品失敗', error: error.message });
    }
});

// 應用優惠券
router.post('/:userId/coupon', async (req, res) => {
    try {
        const { userId } = req.params;
        const { couponCode } = req.body;
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: '購物車不存在' });
        }
        
        if (!couponCode) {
            // 移除優惠券
            cart.applyCoupon(null, 0);
            await cart.save();
            return res.json({ message: '優惠券已移除', cart });
        }
        
        // 驗證優惠券
        const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
        if (!coupon) {
            return res.status(404).json({ message: '優惠券不存在' });
        }
        
        const now = new Date();
        if (now < new Date(coupon.validFrom) || now > new Date(coupon.validTo)) {
            return res.status(400).json({ message: '優惠券已過期或尚未生效' });
        }
        
        // 應用優惠券
        cart.applyCoupon(coupon.code, coupon.discount);
        await cart.save();
        
        res.json({ message: '優惠券已應用', cart, coupon });
    } catch (error) {
        console.error('應用優惠券失敗:', error);
        res.status(500).json({ message: '應用優惠券失敗', error: error.message });
    }
});

// 清空購物車
router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: '購物車不存在' });
        }
        
        cart.clearCart();
        await cart.save();
        
        res.json({ message: '購物車已清空', cart });
    } catch (error) {
        console.error('清空購物車失敗:', error);
        res.status(500).json({ message: '清空購物車失敗', error: error.message });
    }
});

// 獲取購物車商品數量
router.get('/:userId/count', async (req, res) => {
    try {
        const { userId } = req.params;
        
        const cart = await Cart.findOne({ userId });
        const itemCount = cart ? cart.itemCount : 0;
        
        res.json({ itemCount });
    } catch (error) {
        console.error('獲取購物車數量失敗:', error);
        res.status(500).json({ message: '獲取購物車數量失敗', error: error.message });
    }
});

module.exports = router;
