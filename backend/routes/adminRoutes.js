const express = require('express');
const router = express.Router();
const AdminSettings = require('../models/AdminSettings');

// 初始化默認管理員設定
router.post('/init', async (req, res) => {
  try {
    const existingAdmin = await AdminSettings.findOne();
    if (!existingAdmin) {
      const defaultAdmin = new AdminSettings({
        username: 'admin',
        password: 'auraway0316'
      });
      await defaultAdmin.save();
      res.json({ message: '默認管理員設定已初始化', admin: { username: defaultAdmin.username } });
    } else {
      res.json({ message: '管理員設定已存在', admin: { username: existingAdmin.username } });
    }
  } catch (error) {
    res.status(500).json({ message: '初始化失敗', error: error.message });
  }
});

// 獲取管理員設定（不包含密碼）
router.get('/settings', async (req, res) => {
  try {
    const admin = await AdminSettings.findOne().select('-password');
    if (!admin) {
      return res.status(404).json({ message: '管理員設定不存在' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: '獲取設定失敗', error: error.message });
  }
});

// 驗證登入
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: '請提供帳號和密碼' });
    }

    const admin = await AdminSettings.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: '帳號或密碼錯誤' });
    }

    res.json({ 
      message: '登入成功', 
      admin: { 
        username: admin.username,
        lastModified: admin.lastModified
      }
    });
  } catch (error) {
    res.status(500).json({ message: '登入驗證失敗', error: error.message });
  }
});

// 更新管理員帳密
router.put('/credentials', async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;
    
    if (!currentPassword) {
      return res.status(400).json({ message: '請提供當前密碼' });
    }

    const admin = await AdminSettings.findOne();
    if (!admin) {
      return res.status(404).json({ message: '管理員設定不存在' });
    }

    // 驗證當前密碼
    if (admin.password !== currentPassword) {
      return res.status(401).json({ message: '當前密碼錯誤' });
    }

    // 更新帳密
    if (newUsername) admin.username = newUsername;
    if (newPassword) admin.password = newPassword;
    admin.lastModified = new Date();

    await admin.save();

    res.json({ 
      message: '帳密更新成功', 
      admin: { 
        username: admin.username,
        lastModified: admin.lastModified
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: '用戶名已存在' });
    } else {
      res.status(500).json({ message: '更新失敗', error: error.message });
    }
  }
});

// 重置為默認帳密
router.post('/reset', async (req, res) => {
  try {
    const { confirmReset } = req.body;
    
    if (!confirmReset) {
      return res.status(400).json({ message: '請確認重置操作' });
    }

    let admin = await AdminSettings.findOne();
    if (!admin) {
      admin = new AdminSettings();
    }

    admin.username = 'admin';
    admin.password = 'auraway0316';
    admin.lastModified = new Date();

    await admin.save();

    res.json({ 
      message: '帳密已重置為默認值', 
      admin: { 
        username: admin.username,
        lastModified: admin.lastModified
      }
    });
  } catch (error) {
    res.status(500).json({ message: '重置失敗', error: error.message });
  }
});

module.exports = router; 