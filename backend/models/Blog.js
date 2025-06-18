const mongoose = require('mongoose');

// 文章模型
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: '編輯部'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Blog設定模型
const BlogSettingsSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    default: 'Aura Post 專欄'
  },
  blogDescription: {
    type: String,
    default: '健康知識分享，專業營養資訊'
  },
  headerImage: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#333333'
  },
  accentColor: {
    type: String,
    default: '#007bff'
  }
}, {
  timestamps: true
});

const Article = mongoose.model('Article', ArticleSchema);
const BlogSettings = mongoose.model('BlogSettings', BlogSettingsSchema);

module.exports = { Article, BlogSettings }; 