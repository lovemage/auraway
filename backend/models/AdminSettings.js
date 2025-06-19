const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: 'admin'
  },
  password: {
    type: String,
    required: true,
    default: 'auraway0316'
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminSettings', adminSettingsSchema); 