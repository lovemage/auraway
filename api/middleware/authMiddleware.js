const admin = require('../firebaseAdmin'); // 引入 Firebase Admin SDK
const User = require('../models/User'); // 引入您的 MongoDB User 模型

const authenticateFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ message: '未提供認證 Token' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // 將解碼後的 Token 資訊附加到請求物件
    
    // 檢查或建立 MongoDB 中的使用者資料
    let userDoc = await User.findOne({ firebaseUid: decodedToken.uid });
    if (!userDoc) {
      // 如果 MongoDB 中沒有這個使用者，則建立一個新的使用者文件
      userDoc = new User({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        // 您可以在這裡設定其他預設值
      });
      await userDoc.save();
      console.log('在 MongoDB 中建立新使用者:', userDoc.email);
    }
    req.mongoUser = userDoc; // 將 MongoDB 使用者文件附加到請求物件

    next();
  } catch (error) {
    console.error('Firebase Token 驗證失敗:', error);
    return res.status(403).json({ message: '無效或過期的 Token' });
  }
};

module.exports = authenticateFirebaseToken;
