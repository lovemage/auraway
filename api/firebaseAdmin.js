const admin = require('firebase-admin');

// 從環境變數中讀取服務帳戶金鑰
// 在 Vercel 上，您需要將 serviceAccountKey.json 的內容作為環境變數 FIREBASE_SERVICE_ACCOUNT_KEY 配置
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
