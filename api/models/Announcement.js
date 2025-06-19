const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['一般公告', '活動公告', '系統公告', '優惠公告', '重要通知'],
    default: '一般公告'
  },
  priority: {
    type: String,
    enum: ['低', '中', '高', '緊急'],
    default: '中'
  },
  status: {
    type: String,
    enum: ['草稿', '已發布', '已停用'],
    default: '草稿'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  showOnHomepage: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: '#f8f9fa'
  },
  textColor: {
    type: String,
    default: '#333333'
  },
  author: {
    type: String,
    default: 'admin'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

announcementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 添加索引
announcementSchema.index({ status: 1, isActive: 1 });
announcementSchema.index({ type: 1 });
announcementSchema.index({ priority: 1 });
announcementSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
