const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // 確保路徑正確

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
