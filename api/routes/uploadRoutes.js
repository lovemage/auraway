const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// 確保上傳目錄存在
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// 配置 multer 存儲
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/images/products');
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名：時間戳 + 隨機數 + 原始擴展名
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const ext = path.extname(file.originalname);
    const filename = `product_${timestamp}_${randomNum}${ext}`;
    cb(null, filename);
  }
});

// 文件過濾器
const fileFilter = (req, file, cb) => {
  // 只允許圖片文件
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('只允許上傳圖片文件'), false);
  }
};

// 配置 multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 限制
  }
});

// 單個圖片上傳
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '沒有上傳文件' });
    }

    const imageUrl = `/images/products/${req.file.filename}`;
    res.json({
      success: true,
      imageUrl: imageUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('圖片上傳錯誤:', error);
    res.status(500).json({ error: '圖片上傳失敗' });
  }
});

// 多個圖片上傳
router.post('/images', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: '沒有上傳文件' });
    }

    const uploadedImages = req.files.map(file => ({
      imageUrl: `/images/products/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    }));

    res.json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length
    });
  } catch (error) {
    console.error('圖片上傳錯誤:', error);
    res.status(500).json({ error: '圖片上傳失敗' });
  }
});

// 刪除圖片
router.delete('/image', (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: '缺少圖片URL' });
    }

    // 從URL中提取文件名
    const filename = path.basename(imageUrl);
    const filePath = path.join(__dirname, '../public/images/products', filename);

    // 檢查文件是否存在
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: '圖片刪除成功' });
    } else {
      res.status(404).json({ error: '圖片文件不存在' });
    }
  } catch (error) {
    console.error('圖片刪除錯誤:', error);
    res.status(500).json({ error: '圖片刪除失敗' });
  }
});

// 獲取產品圖片列表
router.get('/images/products', (req, res) => {
  try {
    const productsDir = path.join(__dirname, '../public/images/products');
    
    if (!fs.existsSync(productsDir)) {
      return res.json({ images: [] });
    }

    const files = fs.readdirSync(productsDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    const images = imageFiles.map(filename => ({
      filename,
      imageUrl: `/images/products/${filename}`,
      size: fs.statSync(path.join(productsDir, filename)).size
    }));

    res.json({ images });
  } catch (error) {
    console.error('獲取圖片列表錯誤:', error);
    res.status(500).json({ error: '獲取圖片列表失敗' });
  }
});

module.exports = router;
