# Auraway Shop - Vercel 部署指南

## 🚀 部署步驟

### 1. 準備工作

1. **註冊 Vercel 帳號**：前往 [vercel.com](https://vercel.com) 註冊帳號
2. **連接 GitHub**：將您的 GitHub 帳號連接到 Vercel
3. **設置 MongoDB Atlas**：
   - 前往 [MongoDB Atlas](https://cloud.mongodb.com)
   - 創建免費的 M0 集群
   - 獲取連接字串

### 2. 環境變數設置

在 Vercel 專案設置中添加以下環境變數：

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auraway-shop
NODE_ENV=production
REACT_APP_API_URL=https://your-vercel-app.vercel.app
```

### 3. 部署方式

#### 方式一：GitHub 自動部署 (推薦)
1. 將代碼推送到 GitHub
2. 在 Vercel 中選擇 "Import Git Repository"
3. 選擇您的倉庫
4. Vercel 會自動檢測配置並部署

#### 方式二：Vercel CLI 部署
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 4. 部署後檢查

- 前端：`https://your-app.vercel.app`
- API：`https://your-app.vercel.app/api/products`
- 管理後台：`https://your-app.vercel.app/admin.html`

## 📝 注意事項

1. **首次部署**：可能需要 3-5 分鐘
2. **資料庫初始化**：首次訪問會自動初始化產品數據
3. **圖片路徑**：確保所有圖片都在 `frontend/public/images/` 目錄下
4. **環境變數**：記得在 Vercel 設置正確的環境變數

## 🔧 故障排除

### 常見問題：
1. **API 調用失敗**：檢查 `REACT_APP_API_URL` 是否正確
2. **資料庫連接失敗**：檢查 `MONGODB_URI` 是否正確
3. **圖片無法顯示**：檢查圖片路徑是否正確

### 查看日誌：
- Vercel Dashboard → 您的專案 → Functions → 查看日誌 