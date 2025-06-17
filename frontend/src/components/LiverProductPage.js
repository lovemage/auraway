import React, { useState } from 'react';
import './ProductPage.css';

function LiverProductPage() {
  const images = [
    "/images/肝精/7191177995eee51427a82b37602a4a45.jpg",
    "/images/肝精/肝經main.jpg"
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
            alt="專業肝精保健食品" 
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
            熱銷產品
          </div>
          <h1>專業肝精保健食品</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,680</span>
            <span className="original-price">NT$2,200</span>
          </div>
          <p className="product-description">
            專業級肝精保健食品，含有豐富的胺基酸、維生素B群及肝臟精華，
            有助於維護肝臟健康，促進新陳代謝，提升精神活力。
            適合工作繁忙、應酬較多的現代人日常保健使用。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>專業肝精保健</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/肝精/7191177995eee51427a82b37602a4a45.jpg" 
            alt="專業肝精保健食品成分與功效說明" 
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
          <li>高濃度肝臟精華，純度高達98%</li>
          <li>添加維生素B群，增強代謝功能</li>
          <li>豐富胺基酸配方，促進肝細胞再生</li>
          <li>無人工添加物，天然安全</li>
          <li>專業製程，保留最大營養價值</li>
          <li>適合長期保健使用</li>
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
              work
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>工作繁忙</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>經常加班熬夜</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              local_bar
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>應酬較多</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>需要護肝保健</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              elderly
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>中年保健</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維護肝臟健康</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>500mg x 60粒/瓶</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
              <p style={{ color: 'var(--text-primary)' }}>陰涼乾燥處，避免陽光直射</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>認證標章</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>GMP認證、ISO22000</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <p style={{ 
          background: 'var(--white)', 
          padding: '20px', 
          borderRadius: '10px',
          borderLeft: '4px solid var(--primary-color)',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
        }}>
          <strong>建議用量：</strong>每日2-3次，每次1-2粒，餐後食用<br/>
          <strong>食用方式：</strong>搭配溫開水服用，避免與茶、咖啡同時食用<br/>
          <strong>最佳時機：</strong>飯後30分鐘食用，吸收效果更佳<br/>
          <strong>持續期間：</strong>建議連續使用3個月以上，效果更顯著
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>守護肝臟健康</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>從專業肝精開始</h2>
          <p style={{ opacity: '0.9' }}>為忙碌的現代人提供最專業的肝臟保健方案</p>
        </div>
      </div>
    </div>
  );
}

export default LiverProductPage; 