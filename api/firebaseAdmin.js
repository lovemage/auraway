const admin = require('firebase-admin');

// 檢查是否已經初始化
if (!admin.apps.length) {
  try {
    // 嘗試從環境變數中讀取服務帳戶金鑰（用於 Vercel 部署）
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      // 本地開發時，使用默認憑證或跳過 Firebase Admin 初始化
      console.log('⚠️  Firebase Admin 未初始化 - 缺少 FIREBASE_SERVICE_ACCOUNT_KEY 環境變數');
      console.log('   本地開發時可以跳過後端 Firebase Admin 功能');

      // 創建一個模擬的 admin 對象，避免錯誤
      module.exports = {
        auth: () => ({
          verifyIdToken: () => Promise.reject(new Error('Firebase Admin 未配置'))
        })
      };
      return;
    }
  } catch (error) {
    console.error('Firebase Admin 初始化失敗:', error.message);
    // 創建一個模擬的 admin 對象
    module.exports = {
      auth: () => ({
        verifyIdToken: () => Promise.reject(new Error('Firebase Admin 配置錯誤'))
      })
    };
    return;
  }
}

module.exports = admin;
