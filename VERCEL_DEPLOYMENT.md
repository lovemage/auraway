# Vercel 部署指南

## 環境變數設置

在 Vercel 控制台中設置以下環境變數：

### 必需的環境變數

1. **MONGODB_URI**
   - 描述：MongoDB 連接字串
   - 值：`mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`
   - 環境：Production, Preview, Development

### 可選的環境變數 (未來 OAuth 2.0 使用)

2. **OAUTH_GOOGLE_CLIENT_ID**
   - 描述：Google OAuth 2.0 客戶端 ID
   - 值：您的 Google OAuth 客戶端 ID

3. **OAUTH_GOOGLE_CLIENT_SECRET**
   - 描述：Google OAuth 2.0 客戶端密鑰
   - 值：您的 Google OAuth 客戶端密鑰

4. **OAUTH_FACEBOOK_CLIENT_ID**
   - 描述：Facebook OAuth 2.0 應用 ID
   - 值：您的 Facebook 應用 ID

5. **OAUTH_FACEBOOK_CLIENT_SECRET**
   - 描述：Facebook OAuth 2.0 應用密鑰
   - 值：您的 Facebook 應用密鑰

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
