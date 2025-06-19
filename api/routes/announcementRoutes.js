const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// Get public announcements (published and active only) - 必須在 /:id 之前
router.get('/public', async (req, res) => {
  try {
    const announcements = await Announcement.find({ 
      status: '已發布', 
      isActive: true 
    }).sort({ priority: 1, createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get announcements by status - 必須在 /:id 之前
router.get('/status/:status', async (req, res) => {
  try {
    const announcements = await Announcement.find({ status: req.params.status }).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get announcements by type - 必須在 /:id 之前
router.get('/type/:type', async (req, res) => {
  try {
    const announcements = await Announcement.find({ type: req.params.type }).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get statistics - 必須在 /:id 之前
router.get('/stats/overview', async (req, res) => {
  try {
    const totalCount = await Announcement.countDocuments();
    const publishedCount = await Announcement.countDocuments({ status: '已發布' });
    const draftCount = await Announcement.countDocuments({ status: '草稿' });
    const activeCount = await Announcement.countDocuments({ isActive: true });
    const homepageCount = await Announcement.countDocuments({ showOnHomepage: true });
    
    const typeStats = await Announcement.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    const priorityStats = await Announcement.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.json({
      totalCount,
      publishedCount,
      draftCount,
      activeCount,
      homepageCount,
      typeStats,
      priorityStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
      res.json(announcement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new announcement
router.post('/', async (req, res) => {
  const announcement = new Announcement({
    title: req.body.title,
    content: req.body.content,
    type: req.body.type || '一般公告',
    priority: req.body.priority || '中',
    status: req.body.status || '草稿',
    startDate: req.body.startDate || Date.now(),
    endDate: req.body.endDate || null,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    showOnHomepage: req.body.showOnHomepage || false,
    backgroundColor: req.body.backgroundColor || '#f8f9fa',
    textColor: req.body.textColor || '#333333',
    author: req.body.author || 'admin',
    tags: req.body.tags || []
  });

  try {
    const newAnnouncement = await announcement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an announcement
router.put('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
      if (req.body.title !== undefined) announcement.title = req.body.title;
      if (req.body.content !== undefined) announcement.content = req.body.content;
      if (req.body.type !== undefined) announcement.type = req.body.type;
      if (req.body.priority !== undefined) announcement.priority = req.body.priority;
      if (req.body.status !== undefined) announcement.status = req.body.status;
      if (req.body.startDate !== undefined) announcement.startDate = req.body.startDate;
      if (req.body.endDate !== undefined) announcement.endDate = req.body.endDate;
      if (req.body.isActive !== undefined) announcement.isActive = req.body.isActive;
      if (req.body.showOnHomepage !== undefined) announcement.showOnHomepage = req.body.showOnHomepage;
      if (req.body.backgroundColor !== undefined) announcement.backgroundColor = req.body.backgroundColor;
      if (req.body.textColor !== undefined) announcement.textColor = req.body.textColor;
      if (req.body.author !== undefined) announcement.author = req.body.author;
      if (req.body.tags !== undefined) announcement.tags = req.body.tags;

      const updatedAnnouncement = await announcement.save();
      res.json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an announcement
router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
      await announcement.deleteOne();
      res.json({ message: 'Announcement deleted' });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle announcement status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
      announcement.isActive = !announcement.isActive;
      const updatedAnnouncement = await announcement.save();
      res.json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Increment view count
router.patch('/:id/view', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
      announcement.viewCount += 1;
      await announcement.save();
      res.json({ viewCount: announcement.viewCount });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
