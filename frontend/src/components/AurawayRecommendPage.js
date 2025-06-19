import React, { useState, useEffect } from 'react';
import './AurawayRecommendPage.css';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const AurawayRecommendPage = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
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
        .map(([badge, count]) => ({ badge, count }))
        .sort((a, b) => b.count - a.count);
      
      setCategories([
        { badge: 'all', count: data.length },
        ...sortedCategories
      ]);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.badge === selectedCategory);

  const getCategoryDisplayName = (badge) => {
    const categoryNames = {
      'all': '全部推薦',
      '美國進口': '🇺🇸 美國進口',
      '日本進口': '🇯🇵 日本進口',
      '加拿大進口': '🇨🇦 加拿大進口',
      '新上市': '✨ 新上市',
      '熱銷產品': '🔥 熱銷產品',
      '熱銷': '🔥 熱銷',
      '美肌養顏': '💄 美肌養顏',
      '美麗秘密': '🌹 美麗秘密',
      '美味酵素': '🍃 美味酵素',
      '青蔬酵素': '🥬 青蔬酵素',
      '口嚼錠': '💊 口嚼錠'
    };
    return categoryNames[badge] || badge;
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  if (loading) {
    return (
      <div className="auraway-recommend-loading">
        <div className="loading-spinner"></div>
        <p>載入推薦產品中...</p>
      </div>
    );
  }

  return (
    <div className="auraway-recommend-page">
      <div className="auraway-recommend-header">
        <h1 className="auraway-recommend-title">
          <span className="title-icon">✨</span>
          Auraway 精選推薦
        </h1>
        <p className="auraway-recommend-subtitle">
          為您精心挑選的優質保健產品
        </p>
      </div>

      <div className="auraway-recommend-categories">
        <div className="categories-container">
          {categories.map(({ badge, count }) => (
            <button
              key={badge}
              className={`category-button ${selectedCategory === badge ? 'active' : ''}`}
              onClick={() => setSelectedCategory(badge)}
            >
              <span className="category-name">{getCategoryDisplayName(badge)}</span>
              <span className="category-count">({count})</span>
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
                <p className="product-description">{product.description}</p>
                
                <div className="product-price">
                  <span className="current-price">NT$ {product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="original-price">NT$ {product.originalPrice}</span>
                  )}
                </div>
                
                <div className="product-features">
                  {(() => {
                    // 優先顯示 specifications.features，如果沒有則顯示 tags
                    const features = product.specifications?.features || product.tags || [];
                    return features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ));
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>暫無產品</h3>
            <p>此分類目前沒有產品，請選擇其他分類</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AurawayRecommendPage; 