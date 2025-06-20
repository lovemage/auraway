import React, { useState, useEffect } from 'react';
import './ProductPage.css';

const DynamicProductPage = ({ product, onNavigateHome }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading] = useState(!product);
  const [productData] = useState(product);

  useEffect(() => {
    if (!product && window.location.hash) {
      // 如果沒有傳入產品數據，嘗試從URL或其他方式獲取
      // 這裡可以根據需要實現產品ID獲取邏輯
    }
  }, [product]);

  const nextImage = () => {
    if (productData?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productData.images.length);
    }
  };

  const prevImage = () => {
    if (productData?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productData.images.length) % productData.images.length);
    }
  };

  if (loading || !productData) {
    return (
      <div className="ProductPage">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          載入中...
        </div>
      </div>
    );
  }

  const images = productData.images || ['/images/placeholder.jpg'];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="ProductPage">
      <div className="product-container">
        <div className="image-carousel">
          <img 
            src={images[currentImageIndex]} 
            alt={productData.name} 
            className="carousel-image"
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          {hasMultipleImages && (
            <>
              <button onClick={prevImage} className="carousel-arrow prev">
                <span className="material-icons">chevron_left</span>
              </button>
              <button onClick={nextImage} className="carousel-arrow next">
                <span className="material-icons">chevron_right</span>
              </button>
              <div className="carousel-controls">
                {images.map((_, index) => (
                  <div 
                    key={index} 
                    className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)} 
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="product-details">
          {productData.badge && (
            <div className="product-badge" style={{ backgroundColor: 'var(--secondary-color)' }}>
              {productData.badge}
            </div>
          )}
          <h1>{productData.name}</h1>
          <div className="price-section">
            <span className="discount-price">NT${productData.price?.toLocaleString()}</span>
            {productData.originalPrice && (
              <span className="original-price">NT${productData.originalPrice?.toLocaleString()}</span>
            )}
          </div>
          <p className="product-description">
            {productData.description}
          </p>
          <button className="add-to-cart" onClick={onNavigateHome}>
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>{productData.name}</h2>
        
        {/* 產品說明圖 */}
        {productData.descriptionImage && (
          <div style={{ 
            textAlign: 'center', 
            margin: '30px 0',
            background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <img 
              src={productData.descriptionImage} 
              alt={`${productData.name}產品說明`} 
              style={{ 
                width: '100%', 
                maxWidth: '800px', 
                height: 'auto',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(130, 191, 183, 0.2)'
              }} 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* 產品特色 */}
        {productData.specifications?.features && productData.specifications.features.length > 0 && (
          <>
            <h2>商品特色</h2>
            <ul>
              {productData.specifications.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {/* 營養成分分析 - 可以根據產品分類動態調整 */}
        <h2>產品優勢</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          margin: '20px 0' 
        }}>
          {getProductAdvantages(productData).map((advantage, index) => (
            <div key={index} style={{ 
              textAlign: 'center', 
              padding: '20px',
              background: 'var(--white)',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <span className="material-icons" style={{ 
                fontSize: '48px', 
                color: advantage.color, 
                marginBottom: '10px' 
              }}>
                {advantage.icon}
              </span>
              <h3 style={{ color: advantage.color, marginBottom: '10px' }}>
                {advantage.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* 產品規格 */}
        {productData.specifications && (
          <>
            <h2>產品規格</h2>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
              borderRadius: '15px',
              padding: '25px',
              margin: '20px 0'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px' 
              }}>
                {productData.specifications.content && (
                  <div style={{ 
                    background: 'var(--white)', 
                    padding: '15px', 
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>內容量</h4>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                      {productData.specifications.content}
                    </p>
                  </div>
                )}
                {productData.specifications.storage && (
                  <div style={{ 
                    background: 'var(--white)', 
                    padding: '15px', 
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
                    <p style={{ color: 'var(--text-primary)' }}>
                      {productData.specifications.storage}
                    </p>
                  </div>
                )}
                {productData.specifications.origin && (
                  <div style={{ 
                    background: 'var(--white)', 
                    padding: '15px', 
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                      {productData.specifications.origin}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* 食用方法 */}
        {productData.specifications?.usage && (
          <>
            <h2>食用方法</h2>
            <div style={{ 
              background: 'var(--light-teal)',
              borderRadius: '15px',
              padding: '25px',
              margin: '20px 0'
            }}>
              <p style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1em',
                lineHeight: '1.6',
                margin: 0
              }}>
                {productData.specifications.usage}
              </p>
            </div>
          </>
        )}

        {/* 主要成分 */}
        {productData.specifications?.ingredients && (
          <>
            <h2>主要成分</h2>
            <div style={{ 
              background: 'var(--white)',
              borderRadius: '15px',
              padding: '25px',
              margin: '20px 0',
              border: '2px solid var(--light-teal)',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
            }}>
              <p style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1em',
                lineHeight: '1.6',
                margin: 0
              }}>
                {productData.specifications.ingredients}
              </p>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            onClick={onNavigateHome}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '1.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            返回首頁
          </button>
        </div>
      </div>
    </div>
  );
};

// 根據產品分類和特性生成產品優勢
const getProductAdvantages = (product) => {
  const defaultAdvantages = [
    {
      icon: 'verified',
      title: '品質保證',
      description: '嚴格品質控制',
      color: 'var(--primary-color)'
    },
    {
      icon: 'local_shipping',
      title: '快速配送',
      description: '24小時內出貨',
      color: 'var(--secondary-color)'
    },
    {
      icon: 'favorite',
      title: '健康首選',
      description: '專業推薦',
      color: 'var(--primary-color)'
    }
  ];

  // 根據產品分類定制優勢
  if (product.category === '美容保養') {
    return [
      {
        icon: 'auto_awesome',
        title: '美容養顏',
        description: '由內而外散發光彩',
        color: 'var(--secondary-color)'
      },
      {
        icon: 'sentiment_very_satisfied',
        title: '抗老化',
        description: '延緩老化過程',
        color: 'var(--primary-color)'
      },
      {
        icon: 'spa',
        title: '天然成分',
        description: '溫和不刺激',
        color: 'var(--secondary-color)'
      }
    ];
  } else if (product.category === '心血管保健') {
    return [
      {
        icon: 'favorite',
        title: '護心健康',
        description: '維護心血管',
        color: 'var(--primary-color)'
      },
      {
        icon: 'trending_up',
        title: '提升活力',
        description: '增強體力',
        color: 'var(--secondary-color)'
      },
      {
        icon: 'shield',
        title: '預防保健',
        description: '預防勝於治療',
        color: 'var(--primary-color)'
      }
    ];
  } else if (product.category === '護眼保健') {
    return [
      {
        icon: 'visibility',
        title: '護眼明目',
        description: '保護視力健康',
        color: 'var(--secondary-color)'
      },
      {
        icon: 'computer',
        title: '藍光防護',
        description: '過濾有害藍光',
        color: 'var(--primary-color)'
      },
      {
        icon: 'wb_sunny',
        title: '抗氧化',
        description: '預防眼部老化',
        color: 'var(--secondary-color)'
      }
    ];
  }

  return defaultAdvantages;
};

export default DynamicProductPage; 