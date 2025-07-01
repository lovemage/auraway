const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single coupon by ID
router.get('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get coupon by code
router.get('/code/:code', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      code: req.params.code.toUpperCase()
    }).populate('applicableProducts');

    if (!coupon) {
      return res.status(404).json({ message: '優惠券不存在' });
    }

    // 使用新的驗證方法
    if (!coupon.isValid()) {
      return res.status(400).json({ message: '優惠券已過期或不可用' });
    }

    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 驗證優惠券
router.post('/validate', async (req, res) => {
  try {
    const { code, cartTotal, products = [], userEmail } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase()
    }).populate('applicableProducts');

    if (!coupon) {
      return res.status(404).json({
        valid: false,
        message: '優惠券不存在'
      });
    }

    const validation = coupon.canUse(cartTotal, products, userEmail);
    if (!validation.valid) {
      return res.status(400).json({
        valid: false,
        message: validation.reason
      });
    }

    const discountResult = coupon.calculateDiscount(cartTotal, products);

    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        name: coupon.name,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue
      },
      discount: discountResult.discount,
      finalAmount: discountResult.finalAmount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 獲取有效的優惠券
router.get('/valid/list', async (req, res) => {
  try {
    const coupons = await Coupon.findValidCoupons()
      .populate('applicableProducts')
      .select('-userRestrictions.specificUsers'); // 不返回特定用戶列表

    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new coupon
router.post('/', async (req, res) => {
  try {
    const couponData = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      discountType: req.body.discountType,
      discountValue: req.body.discountValue,
      minimumAmount: req.body.minimumAmount,
      validFrom: req.body.validFrom,
      validTo: req.body.validTo,
      isActive: req.body.isActive
    };

    // 可選字段
    if (req.body.maximumDiscount) couponData.maximumDiscount = req.body.maximumDiscount;
    if (req.body.usageLimit) couponData.usageLimit = req.body.usageLimit;
    if (req.body.applicableProducts) couponData.applicableProducts = req.body.applicableProducts;
    if (req.body.applicableCategories) couponData.applicableCategories = req.body.applicableCategories;
    if (req.body.userRestrictions) couponData.userRestrictions = req.body.userRestrictions;

    const coupon = new Coupon(couponData);
    const newCoupon = await coupon.save();
    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a coupon
router.put('/:id', async (req, res) => {
  try {
    const updateData = {};

    // 更新允許的字段
    if (req.body.code !== undefined) updateData.code = req.body.code;
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.discountType !== undefined) updateData.discountType = req.body.discountType;
    if (req.body.discountValue !== undefined) updateData.discountValue = req.body.discountValue;
    if (req.body.minimumAmount !== undefined) updateData.minimumAmount = req.body.minimumAmount;
    if (req.body.maximumDiscount !== undefined) updateData.maximumDiscount = req.body.maximumDiscount;
    if (req.body.usageLimit !== undefined) updateData.usageLimit = req.body.usageLimit;
    if (req.body.validFrom !== undefined) updateData.validFrom = req.body.validFrom;
    if (req.body.validTo !== undefined) updateData.validTo = req.body.validTo;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;
    if (req.body.applicableProducts !== undefined) updateData.applicableProducts = req.body.applicableProducts;
    if (req.body.applicableCategories !== undefined) updateData.applicableCategories = req.body.applicableCategories;
    if (req.body.userRestrictions !== undefined) updateData.userRestrictions = req.body.userRestrictions;

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json(updatedCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a coupon
router.delete('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      await coupon.remove();
      res.json({ message: 'Coupon deleted' });
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
