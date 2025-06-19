import React, { useState, useEffect } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const ProductGrid = ({ category = null, limit = null, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = buildApiUrl(API_ENDPOINTS.products.active);
      
      if (category) {
        url = buildApiUrl(API_ENDPOINTS.products.category(category));
      }
      
      const response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        
        // 如果有限制數量，則截取指定數量的產品
        if (limit) {
          data = data.slice(0, limit);
        }
        
        setProducts(data);
      } else {
        throw new Error('無法載入產品數據');
      }
    } catch (error) {
      console.error('載入產品失敗:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  if (loading) {
    return (
      <div className="products-grid">
        {[...Array(limit || 6)].map((_, index) => (
          <div key={index} className="product-card loading">
            <div className="product-tumb loading-placeholder"></div>
            <div className="product-details">
              <div className="loading-placeholder-text"></div>
              <div className="loading-placeholder-text"></div>
              <div className="loading-placeholder-text"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-grid">
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          載入產品時發生錯誤: {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="products-grid">
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          目前沒有可用的產品
        </div>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          {product.badge && <div className="badge">{product.badge}</div>}
          <div 
            className="product-tumb" 
            onClick={() => handleProductClick(product)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.jpg'} 
              alt={product.name}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          <div className="product-details">
            <span className="product-catagory">{product.category}</span>
            <h4>
              <a 
                href="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  handleProductClick(product); 
                }}
              >
                {product.name}
              </a>
            </h4>
            <p>{product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}</p>
            <div className="product-bottom-details">
              <div className="product-price">
                {product.originalPrice && (
                  <small>NT$ {product.originalPrice.toLocaleString()}</small>
                )}
                NT$ {product.price.toLocaleString()}
              </div>
              <div className="product-links">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-heart"></i>
                </a>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-shopping-cart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 