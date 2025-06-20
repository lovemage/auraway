const express = require('express');
const router = express.Router();
const RecommendTag = require('../models/RecommendTag');
const Product = require('../models/Product');

// 獲取所有推薦標籤
router.get('/', async (req, res) => {
  try {
    const tags = await RecommendTag.find().sort({ sortOrder: 1, createdAt: -1 });
    
    // 更新每個標籤的產品數量
    for (let tag of tags) {
      if (tag.name === 'all') {
        tag.productCount = await Product.countDocuments({ isActive: true });
      } else {
        tag.productCount = await Product.countDocuments({ 
          isActive: true, 
          badge: tag.name 
        });
      }
      await tag.save();
    }
    
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: '獲取推薦標籤失敗', error: error.message });
  }
});

// 獲取啟用的推薦標籤
router.get('/active', async (req, res) => {
  try {
    const tags = await RecommendTag.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    
    // 更新每個標籤的產品數量
    for (let tag of tags) {
      if (tag.name === 'all') {
        tag.productCount = await Product.countDocuments({ isActive: true });
      } else {
        tag.productCount = await Product.countDocuments({ 
          isActive: true, 
          badge: tag.name 
        });
      }
    }
    
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: '獲取啟用推薦標籤失敗', error: error.message });
  }
});

// 根據標籤獲取產品
router.get('/:tagName/products', async (req, res) => {
  try {
    const { tagName } = req.params;
    let products;
    
    if (tagName === 'all') {
      products = await Product.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    } else {
      products = await Product.find({ 
        isActive: true, 
        badge: tagName 
      }).sort({ sortOrder: 1, createdAt: -1 });
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: '獲取標籤產品失敗', error: error.message });
  }
});

// 新增推薦標籤
router.post('/', async (req, res) => {
  try {
    const tagData = req.body;
    
    // 檢查是否已存在相同名稱的標籤
    const existingTag = await RecommendTag.findOne({ name: tagData.name });
    if (existingTag) {
      return res.status(400).json({ message: '標籤名稱已存在' });
    }
    
    // 計算產品數量
    let productCount = 0;
    if (tagData.name === 'all') {
      productCount = await Product.countDocuments({ isActive: true });
      tagData.performanceWarning = true;
    } else {
      productCount = await Product.countDocuments({ 
        isActive: true, 
        badge: tagData.name 
      });
    }
    
    const newTag = new RecommendTag({
      ...tagData,
      productCount
    });
    
    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    res.status(400).json({ message: '新增推薦標籤失敗', error: error.message });
  }
});

// 更新推薦標籤
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // 如果更新名稱，檢查是否與其他標籤重複
    if (updateData.name) {
      const existingTag = await RecommendTag.findOne({ 
        name: updateData.name, 
        _id: { $ne: id } 
      });
      if (existingTag) {
        return res.status(400).json({ message: '標籤名稱已存在' });
      }
    }
    
    // 計算產品數量
    if (updateData.name === 'all') {
      updateData.productCount = await Product.countDocuments({ isActive: true });
      updateData.performanceWarning = true;
    } else if (updateData.name) {
      updateData.productCount = await Product.countDocuments({ 
        isActive: true, 
        badge: updateData.name 
      });
    }
    
    const updatedTag = await RecommendTag.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTag) {
      return res.status(404).json({ message: '推薦標籤不存在' });
    }
    
    res.json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: '更新推薦標籤失敗', error: error.message });
  }
});

// 切換推薦標籤狀態
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await RecommendTag.findById(id);
    
    if (!tag) {
      return res.status(404).json({ message: '推薦標籤不存在' });
    }
    
    tag.isActive = !tag.isActive;
    const updatedTag = await tag.save();
    
    res.json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: '切換推薦標籤狀態失敗', error: error.message });
  }
});

// 刪除推薦標籤
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTag = await RecommendTag.findByIdAndDelete(id);
    
    if (!deletedTag) {
      return res.status(404).json({ message: '推薦標籤不存在' });
    }
    
    res.json({ message: '推薦標籤已刪除', deletedTag });
  } catch (error) {
    res.status(500).json({ message: '刪除推薦標籤失敗', error: error.message });
  }
});

// 初始化默認推薦標籤
router.post('/init', async (req, res) => {
  try {
    const existingTags = await RecommendTag.find();
    if (existingTags.length > 0) {
      return res.json({ message: '推薦標籤已初始化', count: existingTags.length });
    }
    
    // 從產品中提取現有的 badge 作為標籤
    const products = await Product.find({ isActive: true });
    const badgeCount = {};
    
    products.forEach(product => {
      if (product.badge) {
        badgeCount[product.badge] = (badgeCount[product.badge] || 0) + 1;
      }
    });
    
    const defaultTags = [
      {
        name: 'all',
        displayName: '全部推薦',
        description: '顯示所有推薦產品（注意：可能會降低載入速度）',
        icon: 'apps',
        color: '#6c757d',
        productCount: products.length,
        isDefault: true,
        performanceWarning: true,
        sortOrder: 0
      }
    ];
    
    // 添加從產品中提取的標籤
    let sortOrder = 1;
    for (const [badge, count] of Object.entries(badgeCount)) {
      defaultTags.push({
        name: badge,
        displayName: badge,
        description: `包含 ${count} 個 ${badge} 產品`,
        icon: 'local_offer',
        color: '#007bff',
        productCount: count,
        isDefault: false,
        performanceWarning: false,
        sortOrder: sortOrder++
      });
    }
    
    const createdTags = await RecommendTag.insertMany(defaultTags);
    res.json({ 
      message: '推薦標籤初始化完成', 
      count: createdTags.length,
      tags: createdTags 
    });
  } catch (error) {
    res.status(500).json({ message: '初始化推薦標籤失敗', error: error.message });
  }
});

module.exports = router; 