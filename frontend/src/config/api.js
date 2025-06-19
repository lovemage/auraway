// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://auraway-aistorms-projects.vercel.app'
  : 'http://localhost:5001';

export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const API_ENDPOINTS = {
  // Product endpoints
  products: {
    all: '/api/products',
    active: '/api/products/active',
    byId: (id) => `/api/products/${id}`,
    category: (category) => `/api/products/category/${category}`,
    create: '/api/products',
    update: (id) => `/api/products/${id}`,
    delete: (id) => `/api/products/${id}`
  },
  
  // Announcement endpoints
  announcements: {
    all: '/api/announcements',
    public: '/api/announcements/public',
    byId: (id) => `/api/announcements/${id}`,
    create: '/api/announcements',
    update: (id) => `/api/announcements/${id}`,
    delete: (id) => `/api/announcements/${id}`,
    toggle: (id) => `/api/announcements/${id}/toggle`,
    stats: '/api/announcements/stats'
  },
  
  // Blog endpoints
  blog: {
    all: '/api/blog',
    settings: '/api/blog/settings',
    byId: (id) => `/api/blog/${id}`,
    create: '/api/blog',
    update: (id) => `/api/blog/${id}`,
    delete: (id) => `/api/blog/${id}`
  },
  
  // Coupon endpoints
  coupons: {
    all: '/api/coupons',
    active: '/api/coupons/active',
    byCode: (code) => `/api/coupons/code/${code}`,
    create: '/api/coupons',
    update: (id) => `/api/coupons/${id}`,
    delete: (id) => `/api/coupons/${id}`
  },
  
  // Header info endpoints
  headerInfo: '/api/header-info',
  
  // Admin endpoints
  admin: {
    login: '/api/admin/login',
    settings: '/api/admin/settings',
    updateCredentials: '/api/admin/update-credentials',
    reset: '/api/admin/reset'
  },
  
  // Health check
  health: '/api/health'
}; 