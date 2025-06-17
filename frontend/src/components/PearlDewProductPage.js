import React, { useState } from 'react';
import './ProductPage.css';

function PearlDewProductPage() {
  const images = [
    "/images/珍珠露/4bf10c3038a770b3d4af941f36e77dde (1).jpg",
    "/images/珍珠露/57461b3776cf4febb8468fbecd89d0c7.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="ProductPage">
      <div className="product-container">
        <div className="image-carousel">
          <img 
            src={images[currentImageIndex]} 
            alt="珍珠露美麗膠原蛋白" 
            className="carousel-image"
          />
          {images.length > 1 && (
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
          <div className="product-badge" style={{ backgroundColor: 'var(--secondary-color)' }}>
            美麗秘密
          </div>
          <h1>珍珠露 - 美麗膠原蛋白</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,290</span>
            <span className="original-price">NT$1,590</span>
          </div>
          <p className="product-description">
            來自日本的美麗秘密，嚴選珍珠粉、膠原蛋白胜肽與多種美容成分。
            40包裝，每日一包，由內而外散發自然光采，讓肌膚重現年輕活力。
            適合追求美麗、關注肌膚保養的現代女性。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美麗膠原的秘密</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/珍珠露/57461b3776cf4febb8468fbecd89d0c7.jpg" 
            alt="珍珠露產品成分與功效說明" 
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.2)'
            }} 
          />
        </div>

        <h2>主要成分與功效</h2>
        <ul>
          <li><strong>珍珠粉：</strong>富含胺基酸和微量元素，有助於肌膚光澤與彈性</li>
          <li><strong>膠原蛋白胜肽：</strong>小分子好吸收，補充肌膚流失的膠原蛋白</li>
          <li><strong>透明質酸：</strong>強效保濕因子，維持肌膚水潤飽滿</li>
          <li><strong>維生素C：</strong>抗氧化美白，促進膠原蛋白合成</li>
          <li><strong>維生素E：</strong>延緩肌膚老化，保護細胞膜完整性</li>
        </ul>

        <h2>適用族群</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          margin: '20px 0' 
        }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              face
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>追求真淨</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>注重肌膚保養</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              schedule
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>忙碌青春</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>工作壓力大</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              nights_stay
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>日夜照顧</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>夜貓族</p>
          </div>
        </div>

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
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>內容量</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>30包/盒</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
              <p style={{ color: 'var(--text-primary)' }}>常溫保存，避免陽光直射</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>原產地</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>日本製造</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <p style={{ 
          background: 'var(--white)', 
          padding: '20px', 
          borderRadius: '10px',
          borderLeft: '4px solid var(--secondary-color)',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
        }}>
          <strong>建議用量：</strong>每日1包，餐後食用<br/>
          <strong>食用方式：</strong>可直接食用或搭配常溫開水飲用<br/>
          <strong>最佳時機：</strong>睡前食用效果更佳，讓美麗在夜間修復<br/>
          <strong>持續期間：</strong>建議連續食用2-3個月，效果更顯著
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>讓你不再煩惱</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>散發自信光采</h2>
          <p style={{ opacity: '0.9' }}>每日一包珍珠露，由內而外綻放美麗</p>
        </div>
      </div>
    </div>
  );
}

export default PearlDewProductPage; 