const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get active products only
router.get('/active', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ 
      category: req.params.category, 
      isActive: true 
    }).sort({ sortOrder: 1, createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    originalPrice: req.body.originalPrice,
    stock: req.body.stock,
    category: req.body.category,
    badge: req.body.badge,
    images: req.body.images || [],
    specifications: req.body.specifications || {},
    tags: req.body.tags || [],
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    sortOrder: req.body.sortOrder || 0,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (req.body.name) product.name = req.body.name;
      if (req.body.description) product.description = req.body.description;
      if (req.body.price !== undefined) product.price = req.body.price;
      if (req.body.originalPrice !== undefined) product.originalPrice = req.body.originalPrice;
      if (req.body.stock !== undefined) product.stock = req.body.stock;
      if (req.body.category) product.category = req.body.category;
      if (req.body.badge !== undefined) product.badge = req.body.badge;
      if (req.body.images) product.images = req.body.images;
      if (req.body.specifications) product.specifications = req.body.specifications;
      if (req.body.tags) product.tags = req.body.tags;
      if (req.body.isActive !== undefined) product.isActive = req.body.isActive;
      if (req.body.sortOrder !== undefined) product.sortOrder = req.body.sortOrder;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product stock
router.patch('/:id/stock', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.stock = req.body.stock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle product active status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isActive = !product.isActive;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
