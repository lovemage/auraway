import React, { useState } from 'react';
import './ProductPage.css';

const LuteinProductPage = ({ onNavigateHome }) => {
  const images = [
    '/images/日本-葉黃素/c6077bb6abb93db08f907e4d95ac0ae2.jpg'
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
            alt="日本葉黃素" 
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
          <div className="product-badge" style={{ backgroundColor: 'var(--primary-color)' }}>
            日本進口
          </div>
          <h1>日本葉黃素護眼膠囊</h1>
          <div className="price-section">
            <span className="discount-price">NT$ 1,150</span>
            <span className="original-price">NT$ 1,380</span>
          </div>
          <p className="product-description">
            來自日本的頂級葉黃素護眼配方，採用金盞花萃取的天然葉黃素，
            結合玉米黃素和花青素，為您的雙眼提供全方位保護。
            有效過濾藍光傷害，維護視網膜健康，適合長時間用眼的現代人。
          </p>
          <button className="add-to-cart" onClick={onNavigateHome}>
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>日本葉黃素</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/日本-葉黃素/a13789b0a1b9488ad91d5eee85a70107.jpg" 
            alt="葉黃素護眼功效分析圖" 
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.2)'
            }} 
          />
        </div>

        <h2>商品特色</h2>
        <ul>
          <li>日本原裝進口，品質保證</li>
          <li>金盞花萃取天然葉黃素</li>
          <li>添加玉米黃素協同作用</li>
          <li>富含花青素抗氧化成分</li>
          <li>有效過濾藍光傷害</li>
          <li>維護視網膜健康</li>
        </ul>

        <h2>護眼功效分析</h2>
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
              visibility
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>視力保護</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維護視網膜健康</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              light_mode
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>藍光過濾</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>減少藍光傷害</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              security
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>抗氧化</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>清除自由基</p>
          </div>
        </div>

        <h2>適用族群</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '15px', 
          margin: '20px 0' 
        }}>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              computer
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>3C族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>長時間使用電腦、手機</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              school
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>學生族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>長時間閱讀、用眼過度</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              elderly
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>銀髮族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>視力退化、需要保護</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>60粒/瓶</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>建議用量</h4>
              <p style={{ color: 'var(--text-primary)' }}>每日1-2粒，餐後食用</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>日本製造</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <p style={{ 
          color: 'var(--text-primary)', 
          lineHeight: '1.8', 
          background: 'var(--white)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
        }}>
          建議每日1-2粒，餐後食用，配合溫開水服用。
          持續使用效果更佳。孕婦、哺乳期婦女請先諮詢醫師建議後再食用。
          避免與含鐵質的食品同時食用，以免影響吸收效果。
        </p>
      </div>
    </div>
  );
};

export default LuteinProductPage; 