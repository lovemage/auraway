import React, { useState, useEffect } from 'react';
import './AurawayRecommendPage.css';
import { buildApiUrl } from '../config/api';

const AurawayRecommendPage = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [performanceWarning, setPerformanceWarning] = useState(false);

  useEffect(() => {
    fetchRecommendTags();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProductsByTag(selectedCategory);
    }
  }, [selectedCategory, categories]);

  const fetchRecommendTags = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/recommend-tags/active'));
      const tags = await response.json();
      
      if (tags.length === 0) {
        // 如果沒有推薦標籤，初始化默認標籤
        await initializeRecommendTags();
        return;
      }
      
      setCategories(tags);
      
      // 檢查是否有性能警告
      const currentTag = tags.find(tag => tag.name === selectedCategory);
      if (currentTag && currentTag.performanceWarning) {
        setPerformanceWarning(true);
      }
      
    } catch (error) {
      console.error('Error fetching recommend tags:', error);
      // 如果獲取失敗，回退到舊的方式
      fetchProductsOldWay();
    }
  };

  const initializeRecommendTags = async () => {
    try {
      await fetch(buildApiUrl('/api/recommend-tags/init'), { method: 'POST' });
      // 初始化後重新獲取
      fetchRecommendTags();
    } catch (error) {
      console.error('Error initializing recommend tags:', error);
      fetchProductsOldWay();
    }
  };

  const fetchProductsByTag = async (tagName) => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(`/api/recommend-tags/${tagName}/products`));
      const data = await response.json();
      setProducts(data);
      
      // 檢查性能警告
      const currentTag = categories.find(tag => tag.name === tagName);
      setPerformanceWarning(currentTag && currentTag.performanceWarning);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products by tag:', error);
      setLoading(false);
    }
  };

  // 舊的方式作為回退
  const fetchProductsOldWay = async () => {
    try {
      const response = await fetch(buildApiUrl('/api/products/active'));
      const data = await response.json();
      setProducts(data);
      
      // 提取所有標籤並統計
      const badgeCount = {};
      data.forEach(product => {
        if (product.badge) {
          badgeCount[product.badge] = (badgeCount[product.badge] || 0) + 1;
        }
      });
      
      // 創建分類列表，按產品數量排序
      const sortedCategories = Object.entries(badgeCount)
        .map(([badge, count]) => ({ 
          name: badge, 
          displayName: badge, 
          productCount: count,
          performanceWarning: false
        }))
        .sort((a, b) => b.productCount - a.productCount);
      
      setCategories([
        { 
          name: 'all', 
          displayName: '全部推薦', 
          productCount: data.length,
          performanceWarning: true
        },
        ...sortedCategories
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const getCategoryDisplayName = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.displayName : categoryName;
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.badge === selectedCategory);

  if (loading) {
    return (
      <div className="auraway-recommend-page">
        <div className="recommend-header">
          <h1>Auraway 推薦</h1>
          <p>為您精選最優質的保健產品</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>載入推薦產品中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auraway-recommend-page">
      <div className="recommend-header">
        <h1>Auraway 推薦</h1>
        <p>為您精選最優質的保健產品</p>
      </div>

      {/* 性能警告 */}
      {performanceWarning && (
        <div className="performance-warning">
          <div className="warning-icon">⚠️</div>
          <div className="warning-content">
            <h4>載入提醒</h4>
            <p>「全部推薦」標籤包含所有產品，可能會影響頁面載入速度。建議選擇特定分類以獲得更好的瀏覽體驗。</p>
          </div>
        </div>
      )}

      <div className="category-filter">
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category.name}
              className={`category-btn ${selectedCategory === category.name ? 'active' : ''} ${category.performanceWarning ? 'warning' : ''}`}
              onClick={() => handleCategoryChange(category.name)}
            >
              <span className="category-name">{category.displayName}</span>
              <span className="category-count">({category.productCount})</span>
              {category.performanceWarning && <span className="warning-badge">⚠️</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="auraway-recommend-content">
        <div className="current-category-info">
          <h2>
            {getCategoryDisplayName(selectedCategory)}
            <span className="product-count">共 {filteredProducts.length} 項產品</span>
          </h2>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div 
              key={product._id} 
              className="recommend-product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image-container">
                <img 
                  src={product.images && product.images.length > 0 ? product.images[0] : '/images/white-rainforest-qCDK3DN7lOs-unsplash.jpg'} 
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = '/images/white-rainforest-qCDK3DN7lOs-unsplash.jpg';
                  }}
                />
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                  {product.description.length > 80 
                    ? `${product.description.substring(0, 80)}...` 
                    : product.description}
                </p>
                <div className="product-price-container">
                  {product.originalPrice && (
                    <span className="original-price">NT$ {product.originalPrice.toLocaleString()}</span>
                  )}
                  <span className="current-price">NT$ {product.price.toLocaleString()}</span>
                </div>
                <div className="product-category">
                  <span className="category-tag">{product.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>暫無產品</h3>
            <p>此分類目前沒有可用的產品，請選擇其他分類。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AurawayRecommendPage; 