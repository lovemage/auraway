# Auraway Shop

Auraway Shop 是一個專業的保健食品電子商務平台，致力於為用戶提供高品質的保健產品，幫助維持健康生活。

## 專案結構

- **frontend**: 前端使用 React 框架建置，提供用戶介面和購物體驗。
- **backend**: 後端使用 Express 框架和 MongoDB 資料庫，提供 API 服務和資料管理。

## 核心功能

### 產品管理系統
- **動態產品展示**: 使用 ProductGrid 組件動態從後端 API 獲取產品數據
- **產品詳情頁**: DynamicProductPage 組件支持任意產品的詳細資訊展示
- **產品說明圖**: 支持為每個產品添加專門的說明圖片，在詳情頁美觀展示
- **後台產品管理**: 完整的產品 CRUD 操作，包括圖片、規格、特色等

### 導航區塊管理
- **動態內容**: 支持後台動態編輯網站頂部的三個導航區塊
- **運費設定**: 可設定免運門檻，自動更新顯示文字
- **折扣設定**: 可設定折扣百分比，動態生成促銷信息
- **保證設定**: 正品保證信息管理
- **即時更新**: 前端自動從 API 獲取最新設定，降級顯示默認信息

### 管理後台
- **統一管理界面**: 位於 `http://localhost:5001/admin.html`
- **產品管理**: 新增、編輯、刪除產品，管理庫存和狀態
- **內容管理**: 導航區塊、公告、優惠券等動態內容管理
- **數據統計**: 產品數量、庫存警告等基礎統計功能

## 技術特點

- **響應式設計**: 採用 Cotton Candy Fairy 配色方案，支持各種設備
- **API 驅動**: 前後端分離架構，RESTful API 設計
- **動態載入**: 產品數據、導航信息等內容動態從後端獲取
- **錯誤處理**: 完善的錯誤處理和降級機制
- **SEO 友好**: 語義化 HTML 結構，良好的頁面標題和描述

## 開發

### 啟動後端服務
```bash
cd backend
npm install
npm run dev
```

### 啟動前端服務
```bash
cd frontend
npm install
npm start
```

### 初始化數據
```bash
cd backend
node init-all-products.js  # 初始化產品數據
```

## API 端點

### 產品相關
- `GET /api/products` - 獲取所有產品
- `GET /api/products/active` - 獲取上架產品
- `POST /api/products` - 創建新產品
- `PUT /api/products/:id` - 更新產品
- `DELETE /api/products/:id` - 刪除產品

### 導航區塊
- `GET /api/header-info` - 獲取導航區塊信息
- `POST /api/header-info` - 創建/更新導航區塊
- `POST /api/header-info/init` - 初始化默認數據

## 更新日誌

### 2025-06-19
- **產品說明圖功能**: 新增產品說明圖支持，包括數據模型、前端顯示和管理界面
- **產品管理優化**: 使用 ProductGrid 和 DynamicProductPage 組件重構產品展示
- **API 完善**: 完善產品 CRUD API，支持 descriptionImage 字段
- **代碼清理**: 移除不必要的測試文件，修復編譯警告

### 2025-06-17
- **UI/UX 更新**: 更新前端樣式以符合 Medium 風格設計要求
- **圖片資料夾創建**: 建立完整的產品圖片管理結構
- **產品頁面創建**: 創建第一個產品頁面組件
- **導航區塊管理**: 實現動態導航內容管理功能

## 版權

&copy; 2025 Auraway Shop. 版權所有。
