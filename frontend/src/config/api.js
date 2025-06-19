// API 配置
const isDevelopment = process.env.NODE_ENV === 'development';

// 根據環境設定 API 基礎 URL
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5001/api'  // 開發環境
  : '/api';  // 生產環境 (Vercel)

// API 端點
export const API_ENDPOINTS = {
  // 產品相關
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCTS_ACTIVE: `${API_BASE_URL}/products/active`,
  
  // 公告相關
  ANNOUNCEMENTS: `${API_BASE_URL}/announcements`,
  ANNOUNCEMENTS_ACTIVE: `${API_BASE_URL}/announcements/active`,
  
  // 部落格相關
  BLOG: `${API_BASE_URL}/blog`,
  
  // 優惠券相關
  COUPONS: `${API_BASE_URL}/coupons`,
  
  // 標題資訊
  HEADER_INFO: `${API_BASE_URL}/header-info`,
  
  // 管理員相關
  ADMIN: `${API_BASE_URL}/admin`,
  
  // 健康檢查
  HEALTH: `${API_BASE_URL}/health`
};

// 通用 API 請求函數
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default API_BASE_URL; 