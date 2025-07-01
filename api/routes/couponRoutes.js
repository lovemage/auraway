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
  const coupon = new Coupon({
    code: req.body.code,
    discount: req.body.discount,
    description: req.body.description,
    validFrom: req.body.validFrom,
    validTo: req.body.validTo,
  });

  try {
    const newCoupon = await coupon.save();
    res.status(201).json(newCoupon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a coupon
router.put('/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      if (req.body.code) coupon.code = req.body.code;
      if (req.body.discount) coupon.discount = req.body.discount;
      if (req.body.description) coupon.description = req.body.description;
      if (req.body.validFrom) coupon.validFrom = req.body.validFrom;
      if (req.body.validTo) coupon.validTo = req.body.validTo;

      const updatedCoupon = await coupon.save();
      res.json(updatedCoupon);
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
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
