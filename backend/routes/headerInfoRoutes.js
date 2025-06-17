const express = require('express');
const router = express.Router();
const HeaderInfo = require('../models/HeaderInfo');

// 獲取所有導航區塊信息
router.get('/', async (req, res) => {
  try {
    const headerInfos = await HeaderInfo.find({ isActive: true }).sort({ order: 1 });
    res.json(headerInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 獲取單個導航區塊信息
router.get('/:type', async (req, res) => {
  try {
    const headerInfo = await HeaderInfo.findOne({ type: req.params.type });
    if (!headerInfo) {
      return res.status(404).json({ message: '找不到該導航區塊信息' });
    }
    res.json(headerInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 創建或更新導航區塊信息
router.post('/', async (req, res) => {
  try {
    const { type, icon, title, content, isActive, order, settings } = req.body;
    
    let headerInfo = await HeaderInfo.findOne({ type });
    
    if (headerInfo) {
      // 更新現有記錄
      headerInfo.icon = icon || headerInfo.icon;
      headerInfo.title = title || headerInfo.title;
      headerInfo.content = content || headerInfo.content;
      headerInfo.isActive = isActive !== undefined ? isActive : headerInfo.isActive;
      headerInfo.order = order !== undefined ? order : headerInfo.order;
      headerInfo.settings = { ...headerInfo.settings, ...settings };
    } else {
      // 創建新記錄
      headerInfo = new HeaderInfo({
        type,
        icon,
        title,
        content,
        isActive,
        order,
        settings: settings || {}
      });
    }
    
    const savedHeaderInfo = await headerInfo.save();
    res.status(201).json(savedHeaderInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新導航區塊信息
router.put('/:type', async (req, res) => {
  try {
    const { icon, title, content, isActive, order, settings } = req.body;
    
    const headerInfo = await HeaderInfo.findOne({ type: req.params.type });
    if (!headerInfo) {
      return res.status(404).json({ message: '找不到該導航區塊信息' });
    }
    
    if (icon !== undefined) headerInfo.icon = icon;
    if (title !== undefined) headerInfo.title = title;
    if (content !== undefined) headerInfo.content = content;
    if (isActive !== undefined) headerInfo.isActive = isActive;
    if (order !== undefined) headerInfo.order = order;
    if (settings) headerInfo.settings = { ...headerInfo.settings, ...settings };
    
    const updatedHeaderInfo = await headerInfo.save();
    res.json(updatedHeaderInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 刪除導航區塊信息
router.delete('/:type', async (req, res) => {
  try {
    const headerInfo = await HeaderInfo.findOne({ type: req.params.type });
    if (!headerInfo) {
      return res.status(404).json({ message: '找不到該導航區塊信息' });
    }
    
    await HeaderInfo.deleteOne({ type: req.params.type });
    res.json({ message: '導航區塊信息已刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 初始化默認數據
router.post('/init', async (req, res) => {
  try {
    const defaultData = [
      {
        type: 'shipping',
        icon: 'local_shipping',
        title: '全館滿千免運',
        content: '24小時內出貨，全台快速配送',
        order: 1,
        settings: {
          freeShippingThreshold: 1000
        }
      },
      {
        type: 'discount',
        icon: 'card_giftcard',
        title: '本月全館 85 折優惠',
        content: '限時優惠，數量有限',
        order: 2,
        settings: {
          discountPercentage: 85
        }
      },
      {
        type: 'guarantee',
        icon: 'verified',
        title: '正品保證',
        content: '國際認證，品質有保障',
        order: 3,
        settings: {}
      }
    ];
    
    for (const data of defaultData) {
      const existing = await HeaderInfo.findOne({ type: data.type });
      if (!existing) {
        await new HeaderInfo(data).save();
      }
    }
    
    res.json({ message: '默認導航區塊信息已初始化' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 