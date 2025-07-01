# Vercel 部署指南

## 環境變數設置

在 Vercel 控制台中設置以下環境變數：

### 必需的環境變數

1. **MONGODB_URI**
   - 描述：MongoDB 連接字串
   - 值：`mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
   - 環境：Production, Preview, Development

### 可選的環境變數 (如果使用 Firebase Admin)

2. **FIREBASE_PROJECT_ID**
   - 描述：Firebase 項目 ID
   - 值：您的 Firebase 項目 ID

3. **FIREBASE_PRIVATE_KEY**
   - 描述：Firebase Admin SDK 私鑰
   - 值：完整的私鑰字串（包含 -----BEGIN PRIVATE KEY----- 等）

4. **FIREBASE_CLIENT_EMAIL**
   - 描述：Firebase Admin SDK 客戶端郵箱
   - 值：firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

## 部署步驟

1. 在 Vercel 控制台中設置上述環境變數
2. 推送代碼到 GitHub
3. Vercel 會自動觸發部署

## 故障排除

如果遇到 "Command npm run vercel-build exited with 1" 錯誤：

1. 確認所有必需的環境變數已設置
2. 檢查 MongoDB 連接字串是否正確
3. 確認 MongoDB 集群允許來自 Vercel 的連接（IP 白名單設為 0.0.0.0/0）

## 本地開發

1. 複製 `.env.example` 為 `.env`
2. 填入您的實際環境變數值
3. 運行 `npm run dev` 啟動開發服務器
