// API 配置
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// API 端點
export const API_ENDPOINTS = {
  products: {
    active: '/api/products/active',
    category: (category) => `/api/products/category/${encodeURIComponent(category)}`
  },
  announcements: {
    public: '/api/announcements/public'
  },
  blog: {
    articles: '/api/blog/articles',
    init: '/api/blog/init',
    settings: '/api/blog/settings'
  },
  headerInfo: '/api/header-info'
};

// 輔助函數：構建完整的 API URL
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
}; 