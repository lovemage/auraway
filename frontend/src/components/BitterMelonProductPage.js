import React, { useState } from 'react';
import './ProductPage.css';

function BitterMelonProductPage() {
  const images = [
    "/images/美國-苦瓜胜肽/2749cfb0ba4558cbe2b17157d7dd9f48.jpg"
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
            alt="美國-苦瓜胜肽" 
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
            美國進口
          </div>
          <h1>美國-苦瓜胜肽</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,250</span>
            <span className="original-price">NT$1,550</span>
          </div>
          <p className="product-description">
            來自美國的高純度苦瓜胜肽，採用先進萃取技術，保留苦瓜的天然活性成分，
            有助於維持正常的新陳代謝。無苦味設計，讓您輕鬆補充苦瓜的珍貴營養。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國苦瓜胜肽</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-苦瓜胜肽/47746d4d604028f10f54f720d32fe730.jpg" 
            alt="美國苦瓜胜肽產品成分與功效說明" 
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
          <li>美國原裝進口，品質保證</li>
          <li>高純度苦瓜胜肽萃取，濃縮精華</li>
          <li>專利去苦技術，無苦味易吞嚥</li>
          <li>含有豐富的苦瓜皂苷和多胜肽</li>
          <li>通過美國FDA嚴格品質檢驗</li>
          <li>素食膠囊，適合素食者食用</li>
        </ul>

        <h2>苦瓜胜肽功效分析</h2>
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
              speed
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>調節代謝</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進正常新陳代謝</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              balance
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>平衡調理</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維持身體平衡狀態</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              eco
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>天然保健</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>天然植物精華萃取</p>
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
              work
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>上班族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>久坐辦公、代謝緩慢</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              elderly
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>中高齡族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>注重養生保健、調節體質</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              restaurant
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>應酬族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>飲食不規律、需要調理</p>
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
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
              <p style={{ color: 'var(--text-primary)' }}>常溫陰涼乾燥處保存</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>美國製造</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <p style={{ 
          background: 'var(--white)', 
          padding: '20px', 
          borderRadius: '10px',
          borderLeft: '4px solid var(--secondary-color)',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)',
          lineHeight: '1.6'
        }}>
          每日1-2粒，飯前30分鐘搭配溫開水食用。
          建議空腹服用效果更佳，請勿超過每日建議攝取量。如有特殊需求請諮詢專業人士。
        </p>

        <h2>注意事項</h2>
        <div style={{ 
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '10px',
          padding: '20px',
          margin: '20px 0'
        }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#856404' }}>
            <li>請置於陰涼乾燥處，避免陽光直射</li>
            <li>開封後請密封保存，並於有效期限內食用完畢</li>
            <li>孕婦、哺乳期婦女及兒童請避免食用</li>
            <li>如有服用藥物，請諮詢醫師建議</li>
            <li>本產品為食品，不具療效，不能取代藥物治療</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BitterMelonProductPage; 