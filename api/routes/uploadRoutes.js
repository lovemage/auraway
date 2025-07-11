const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const router = express.Router();

// GridFS bucket for image storage
let gfsBucket;

// 初始化 GridFS
mongoose.connection.once('open', () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'images'
  });
  console.log('✅ GridFS 初始化成功');
});

// 配置 multer 使用內存存儲 (用於 GridFS)
const storage = multer.memoryStorage();

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

// 單個圖片上傳到 GridFS
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '沒有上傳文件' });
    }

    if (!gfsBucket) {
      return res.status(500).json({ error: 'GridFS 未初始化' });
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const ext = path.extname(req.file.originalname);
    const filename = `product_${timestamp}_${randomNum}${ext}`;

    // 創建 GridFS 上傳流
    const uploadStream = gfsBucket.openUploadStream(filename, {
      metadata: {
        originalName: req.file.originalname,
        uploadDate: new Date(),
        contentType: req.file.mimetype
      }
    });

    // 上傳文件到 GridFS
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
      const imageUrl = `/api/upload/image/${uploadStream.id}`;
      res.json({
        success: true,
        imageUrl: imageUrl,
        filename: filename,
        originalName: req.file.originalname,
        size: req.file.size,
        fileId: uploadStream.id
      });
    });

    uploadStream.on('error', (error) => {
      console.error('GridFS 上傳錯誤:', error);
      res.status(500).json({ error: '圖片上傳失敗' });
    });

  } catch (error) {
    console.error('圖片上傳錯誤:', error);
    res.status(500).json({ error: '圖片上傳失敗' });
  }
});

// 多個圖片上傳到 GridFS
router.post('/images', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: '沒有上傳文件' });
    }

    if (!gfsBucket) {
      return res.status(500).json({ error: 'GridFS 未初始化' });
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        // 生成唯一文件名
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        const ext = path.extname(file.originalname);
        const filename = `product_${timestamp}_${randomNum}${ext}`;

        // 創建 GridFS 上傳流
        const uploadStream = gfsBucket.openUploadStream(filename, {
          metadata: {
            originalName: file.originalname,
            uploadDate: new Date(),
            contentType: file.mimetype
          }
        });

        uploadStream.end(file.buffer);

        uploadStream.on('finish', () => {
          resolve({
            imageUrl: `/api/upload/image/${uploadStream.id}`,
            filename: filename,
            originalName: file.originalname,
            size: file.size,
            fileId: uploadStream.id
          });
        });

        uploadStream.on('error', reject);
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);

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

// 從 GridFS 讀取圖片
router.get('/image/:id', async (req, res) => {
  try {
    if (!gfsBucket) {
      return res.status(500).json({ error: 'GridFS 未初始化' });
    }

    const fileId = new mongoose.Types.ObjectId(req.params.id);

    // 查找文件信息
    const files = await gfsBucket.find({ _id: fileId }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: '圖片不存在' });
    }

    const file = files[0];

    // 設置響應頭
    res.set('Content-Type', file.metadata.contentType || 'image/jpeg');
    res.set('Content-Length', file.length);

    // 創建下載流
    const downloadStream = gfsBucket.openDownloadStream(fileId);

    downloadStream.on('error', (error) => {
      console.error('圖片讀取錯誤:', error);
      res.status(500).json({ error: '圖片讀取失敗' });
    });

    // 將圖片流傳送給客戶端
    downloadStream.pipe(res);

  } catch (error) {
    console.error('圖片讀取錯誤:', error);
    res.status(500).json({ error: '圖片讀取失敗' });
  }
});

// 刪除 GridFS 中的圖片
router.delete('/image', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: '缺少圖片URL' });
    }

    if (!gfsBucket) {
      return res.status(500).json({ error: 'GridFS 未初始化' });
    }

    // 從 URL 中提取文件 ID
    const fileId = imageUrl.split('/').pop();

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ error: '無效的圖片ID' });
    }

    const objectId = new mongoose.Types.ObjectId(fileId);

    // 檢查文件是否存在
    const files = await gfsBucket.find({ _id: objectId }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: '圖片文件不存在' });
    }

    // 刪除文件
    await gfsBucket.delete(objectId);

    res.json({ success: true, message: '圖片刪除成功' });

  } catch (error) {
    console.error('圖片刪除錯誤:', error);
    res.status(500).json({ error: '圖片刪除失敗' });
  }
});

// 獲取 GridFS 中的圖片列表
router.get('/images/products', async (req, res) => {
  try {
    if (!gfsBucket) {
      return res.status(500).json({ error: 'GridFS 未初始化' });
    }

    // 獲取所有圖片文件
    const files = await gfsBucket.find({}).toArray();

    const images = files.map(file => ({
      filename: file.filename,
      imageUrl: `/api/upload/image/${file._id}`,
      size: file.length,
      uploadDate: file.uploadDate,
      originalName: file.metadata?.originalName || file.filename,
      contentType: file.metadata?.contentType || 'image/jpeg',
      fileId: file._id
    }));

    res.json({ images });
  } catch (error) {
    console.error('獲取圖片列表錯誤:', error);
    res.status(500).json({ error: '獲取圖片列表失敗' });
  }
});

module.exports = router;
