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
    const coupon = await Coupon.findOne({ code: req.params.code });
    if (coupon) {
      // Check if coupon is valid based on date
      const now = new Date();
      if (now >= coupon.validFrom && now <= coupon.validTo) {
        res.json(coupon);
      } else {
        res.status(400).json({ message: 'Coupon expired or not yet valid' });
      }
    } else {
      res.status(404).json({ message: 'Coupon not found' });
    }
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
